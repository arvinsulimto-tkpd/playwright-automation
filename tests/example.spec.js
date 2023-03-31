const {test, expect} = require('@playwright/test')


test('Test A',async ({page})=>
{
    const username = page.locator("//*[@name='username']")
    const password = page.locator("//*[@name='password']")
    const submit = page.locator("//*[@name='signin']")
    const titles = page.locator(".card-body a")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")

    await username.type("rahulshettyacademy")
    await password.type("learning")

    // waiting new navigation because its move to another link(still on same tab)
    await Promise.all([
        page.waitForNavigation(),
        submit.click()

    ])

    console.log(await titles.allTextContents());
});

test('Test B',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")

    const dropdown = page.locator("select.form-control")
    const radio = page.locator(".radiotextsty").last()

    await dropdown.selectOption("consult")
    await radio.click();

    await page.locator("#okayBtn").click()

    await expect(radio).toBeChecked()

    await page.locator("#terms").click()

    // pause page
    //await page.pause();
});

test.only('Test C',async ({browser})=>
{

    const context = await browser.newContext()
    const page = await context.newPage()

    const username = page.locator("//*[@name='username']")


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")

   
    const documentLink = page.locator("[href*='documents-request']")

    await expect(documentLink).toHaveAttribute("class","blinkingText")


    //move to another tab
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
         documentLink.click()
    ])

    const text = await newPage.locator(".red").textContent()

    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]


    await username.type(domain)

    //await page.pause();
});