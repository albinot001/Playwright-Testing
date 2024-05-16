const { chromium } = require('playwright');

describe('Testing Inspire11.com', function() {
  let browser;
  let page;

  before(async function() {
    browser = await chromium.launch();
  });

  beforeEach(async function() {
    page = await browser.newPage();
  });

  afterEach(async function() {
    await page.close();
  });

  after(async function() {
    await browser.close();
  });

  it('should have correct homepage title', async function() {
    this.timeout(10000);
    await page.goto('https://www.inspire11.com/');
    const title = await page.title();
    if (!title.includes('Inspire11')) {
      throw new Error('Homepage title is incorrect');
    }
  });

  it('should navigate to Services page', async function() {
    this.timeout(10000);
    await page.goto('https://www.inspire11.com/');
    await page.click('text=Services');
    const title = await page.title();
    if (!title.includes('Services')) {
      throw new Error('Services page title is incorrect');
    }
  });

  it('should navigate to About Us page', async function() {
    this.timeout(10000);
    await page.goto('https://www.inspire11.com/');
    await page.click('text=About');
    const title = await page.title();
    if (!title.includes('About')) {
      throw new Error('About Us page title is incorrect');
    }
  });

  it('should navigate to Contact page', async function() {
    this.timeout(15000);
    await page.goto('https://www.inspire11.com/');
    await page.click('text=Contact');
    const title = await page.title();
    if (!title.includes('Contact')) {
      throw new Error('Contact page title is incorrect');
    }
  });

  it('should have functional social media links in the footer', async function() {
    this.timeout(20000);
    await page.goto('https://www.inspire11.com/');
    await page.waitForSelector('footer');
    const socialMediaLinks = await page.$$('footer a[aria-label^="Follow us"]');
    if (socialMediaLinks.length === 0) {
      throw new Error('No social media links found in the footer');
    }
  });
  
  it('should be responsive on different devices', async function() {
    this.timeout(10000);
    await page.goto('https://www.inspire11.com/');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.setViewportSize({ width: 1366, height: 768 });
  });
});

