const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

//Please exchange URL here if running a different server than Live Server
//Keep in mind the test can be ran once as it makes permanent changes 
//Last 2 tests will fail if repeated
//Restart the server if repeat is needed
//add headless if desired tobrowser = await chromium.launch;


const url = ('http://localhost:5500')


const mockData = {
    "d953e5fb-a585-4d6b-92d3-ee90697398a0":{
        "author":"J.K.Rowling",
        "title":"Harry Potter and the Philosopher's Stone"
    },
    "d953e5fb-a585-4d6b-92d3-ee90697398a1":{
        "title":"C# Fundamentals",
        "author":"Svetlin Nakov"
    }
};

function json(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
};

describe('Tests', async function () {
    this.timeout(5000);

    let page, browser;

    before(async () => {
        browser = await chromium.launch({});
    });
    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    it('loads and displays all books', async () => {
        await page.route('**/jsonstore/collections/books*', (route, request) => {
            route.fulfill(json(mockData));
        });
        await page.goto(url);
        await page.click('text=Load All Books');
        await page.waitForSelector('text=Harry Potter')

        const rows = await page.$$eval('tr', (rows) => rows.map(r => r.textContent.trim()));
    
        expect(rows[1]).to.contains('Harry Potter');
        expect(rows[1]).to.contains('Rowling');
        expect(rows[2]).to.contains('C# Fundamentals');
        expect(rows[2]).to.contains('Nakov');
    });

    it('can create a book', async () => {
        await page.goto(url);
        await page.fill('form#createForm >> input[name="title"]', 'Title');
        await page.fill('form#createForm >> input[name="author"]', 'Author');
        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'POST'),
            page.click('form#createForm >> text=Submit')
        ]);
        
        const data = JSON.parse(request.postData());
        expect(data.title).to.equal('Title');
        expect(data.author).to.equal('Author');
    });

    it('can edit a book', async () => {
        await page.goto(url)
        await Promise.all([
            page.click('text=Load All Books'),
            page.click('.editBtn')
        ]);

        const isVisible = await page.isVisible('#editForm');
        expect(isVisible).to.be.true;

        let title = await page.inputValue('form#editForm >> input[name="title"]');

        expect(title).to.includes('Harry Potter')
        title = await page.fill('form#editForm >> input[name="title"]', 'ChangedTitle');
        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'PUT'),
            page.click('form#editForm >> text=Save')
        ]);

        await page.click('text=Load All Books');
        await page.waitForSelector('text=C#')

        const rows = await page.$$eval('tr', (rows) => rows.map(r => r.textContent.trim()));

        expect(rows[1]).to.contains('Changed');
    });

    it('can delete a book', async () => {
        await page.goto(url)
        await Promise.all([
            page.click('text=Load All Books'),
            page.click('.deleteBtn'),
            page.on('dialog', dialog => dialog.accept())
        ]);
        await page.click('text=LOAD ALL BOOKS');
        const content = await page.textContent('table tbody');
        expect(content).not.to.contain('Rowling');
    });
})