import { AzureFunction, Context } from '@azure/functions'

const httpTrigger: AzureFunction = async function (context: Context): Promise<void> {
  const Apify = require('apify')
  const requestList = await Apify.openRequestList('urls', [{ url: 'https://news.google.com/' }])
  const handlePageFunction = async ({ page, _ }) => {
    await page.pdf({ path: 'example.pdf' })
  }

  const crawler = new Apify.PuppeteerCrawler({
    requestList,
    handlePageFunction,
    launchContext: {
      launchOptions: {
        headless: true
      }
    }
  })

  await crawler.run()

  context.res = {
    status: 200
  }
}

export default httpTrigger
