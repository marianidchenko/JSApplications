const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

//Please exchange URL here if running a different server than Live Server
//add headless if desired tobrowser = await chromium.launch;

const url = ('http://localhost:5500')

describe('Tests', async function() {
    this.timeout(8000);

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

    it('loads all messages into chat', async () => {
        await page.goto(url);
        await page.click('text=Refresh');

        const isVisible = await page.isVisible('textarea[id="messages"]');
        expect(isVisible).to.be.true;
        let messages = await page.$eval('textarea[id="messages"]', (m) => m.value);
        expect(messages).to.contains(`Spami: Hello, are you there?`);
        expect(messages).to.contains(`Garry: Yep, whats up :?`);
        expect(messages).to.contains(`Spami: How are you? Long time no see? :)`);
        expect(messages).to.contains(`George: Hello, guys! :))`);
        expect(messages).to.contains(`Spami: Hello, George nice to see you! :)))`);
    });
    
    it('posts a new message and shows it on reload', async () => {
        await page.goto(url);

        await page.fill('input#author', 'Az');
        await page.fill('input#content', 'Stiga spam');

        await Promise.all([
            page.click('text=Send'),
            page.waitForRequest(request => request.method() == 'POST')
        ]);
        await page.click('text=Refresh');
        await page.waitForSelector('textarea[id="messages"]');

        messages = await page.$eval('textarea[id="messages"]', (m) => m.value);
        expect(messages).to.contains(`Az: Stiga spam`);
    })
})