const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./Utils/APIUtils');
const loginPayload = { userEmail: "bawanesonu658@gmail.com", userPassword: "Test@1234" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
const fakePayLoaders = { data: [], message: "No Orders" };
let response;


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtlis = new APIUtils(apiContext, loginPayload);
    response = await apiUtlis.createOrder(orderPayload);

});


test('@Success Response', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {

        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayLoaders);
        route.fulfill(
            {
                response, body,
            }
        )

    })

    const clickOnOrder = page.locator("button[routerlink*='myorders']");
    clickOnOrder.click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());

});