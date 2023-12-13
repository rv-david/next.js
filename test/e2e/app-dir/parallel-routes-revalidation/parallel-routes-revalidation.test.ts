import { createNextDescribe } from 'e2e-utils'
import { check } from 'next-test-utils'

createNextDescribe(
  'parallel-routes-revalidation',
  {
    files: __dirname,
  },
  ({ next }) => {
    it('should submit the action and revalidate the page data', async () => {
      const browser = await next.browser('/')
      await check(() => browser.hasElementByCssSelector('#create-entry'), false)

      // there shouldn't be any data yet
      expect((await browser.elementsByCss('#entries li')).length).toBe(0)

      await browser.elementByCss("[href='/is-open']").click()

      await check(() => browser.hasElementByCssSelector('#create-entry'), true)

      await browser.elementById('create-entry').click()

      // we created an entry and called revalidate, so we should have 1 entry
      await check(
        async () => (await browser.elementsByCss('#entries li')).length,
        1
      )

      await browser.elementById('create-entry').click()

      // we created an entry and called revalidate, so we should have 2 entries
      await check(
        async () => (await browser.elementsByCss('#entries li')).length,
        2
      )

      await browser.elementByCss("[href='/']").click()

      // following a link back to `/` should close the modal
      await check(() => browser.hasElementByCssSelector('#create-entry'), false)
    })
  }
)
