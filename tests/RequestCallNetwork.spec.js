const { test, expect } = require('@playwright/test')


test('@security test unauthorized access', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/");
    const email = "bawanesonu658@gmail.com";
    const EmailId = page.locator("#userEmail");

    const password = page.locator("#userPassword");
    const signIn = page.locator("[type='submit']");
   

    await EmailId.fill(email);
    await password.fill("Test@1234");
    await signIn.click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();


    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer*"
        , route =>
            route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'}))
    await page.locator("button:has-text('View')").first().click();

   await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

})