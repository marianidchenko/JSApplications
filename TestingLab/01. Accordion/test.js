const { chromium } = require('playwright-chromium');
const  { expect } = require('chai');

let browser, page;
const url = 'http://localhost:5500/index.html'

describe('E2E tests', async function() {
    this.timeout(5000);
    before(async () => { browser = await chromium.launch();});
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('initial load', async () => {
        await page.goto(url);
        
        const content = await page.textContent('#main')
        expect(content).to.contains('Scalable Vector Graphics')
        expect(content).to.contains('Open standard')
        expect(content).to.contains('Unix')
        expect(content).to.contains('ALGOL')
    });

    it('should get content from server on button click', async () => {
        await page.goto(url);
        await page.click('text=More');

        let isVisible = await page.isVisible('.extra p');
        expect(isVisible).to.be.true;

        let buttonLess = await page.textContent('text=Less');
        expect(buttonLess).to.not.be.undefined;
    });

    it('should change button back and hide info when less is clicked', async () => {
        await page.goto(url);
        await page.click('text=More');
        await page.click('text=Less');

        let buttonMore = await page.textContent('text=More');
        expect(buttonMore).to.not.be.undefined;

        let isVisible = await page.isVisible('.extra p'); //
        expect(isVisible).to.be.false;
    })
})