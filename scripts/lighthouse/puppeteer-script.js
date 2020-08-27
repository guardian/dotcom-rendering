/**
 * @param {puppeteer.Browser} browser
 * @param {{url: string, options: LHCI.CollectCommand.Options}} context
 */
module.exports = async (browser, context) => {
  const url = 'http://localhost:9000/Article?url=https://www.theguardian.com/commentisfree/2020/feb/08/hungary-now-for-the-new-right-what-venezuela-once-was-for-the-left#noads';
  const page = await browser.newPage();
  await page.goto(url);
  const cookie = {
          name: 'gu-cmp-disabled',
          value: 'true',
          url: url,
          'Max-Age': '31536000', //year
        };

  await page.setCookie(cookie);
};
