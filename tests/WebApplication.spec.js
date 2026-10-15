const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./Utils/APIUtils');
const loginPayload = { userEmail: "bawanesonu658@gmail.com", userPassword: "Test@1234" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
let response;


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtlis = new APIUtils(apiContext, loginPayload);
    response = await apiUtlis.createOrder(orderPayload);


});


test('@API Place Order', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");

    const email = "bawanesonu658@gmail.com";
    const listofProductsname = page.locator(".card-body b");
    const productscount = page.locator(".card-body");
    const productName = "ADIDAS ORIGINAL";
    const clickOnCart = page.locator("[routerlink*='cart']");
    const cartProduct = page.locator("div li");
    const fillCVV = page.locator("div .title:has-text('CVV Code ')").locator("xpath=following::input[1]");
    const fillName = page.locator("div .title:has-text('Name on Card ')").locator("xpath=following::input[1]");
    const compareEmail = page.locator(".details__user [type='text']");
    const clickonCountry = page.locator("[placeholder*='Select ']");
    const listofCountry = page.locator(".ta-results");
    const placeholderclick = page.locator(".action__submit ");
    const textthanku = page.locator(".hero-primary");
    const orderid = page.locator(".em-spacer-1 .ng-star-inserted");
    const clickOnOrdersh = page.locator("button[routerlink*=myorders]");


    // list of product print and count and click on Add to cart  
    await listofProductsname.first().waitFor();
    console.log(await listofProductsname.allTextContents());
    const countProducts = await productscount.count();
    for (let i = 0; i < countProducts; ++i) {
        if (await productscount.nth(i).locator("b").textContent() == productName) {
            await productscount.nth(i).locator("text= Add To Cart").click();
            break;
        }

    }

    // Navigate to My Cart and Check the Product is addedd or Not and Verify
    await clickOnCart.click();
    await cartProduct.first().waitFor();  // wait for list of cart product load 
    const bool = await page.locator('h3', { hasText: productName }).isVisible();  // that product is added or not 
    expect(bool).toBeTruthy();
    console.log("the addidas is added into the cart:", bool);
    await page.locator("text=Checkout").click();

    // Navigate to payment Mode 
    await fillCVV.fill("100");
    await fillName.fill("sonu");

    // compare th email id 
    await expect(compareEmail.first()).toHaveText(email);

    // Dropdown Country 
    await clickonCountry.pressSequentially('ind', { delay: 150 });
    await listofCountry.waitFor();
    const dropdownoptionsselect = await listofCountry.locator("button").count();

    for (let i = 0; i < dropdownoptionsselect; ++i) {
        const text1 = await listofCountry.locator("button").nth(i).textContent();
        if (text1 == " India") {
            await listofCountry.locator("button").nth(i).click();
            break;

        }
    }
    await placeholderclick.click();

    // Thank u for order compare with Assertion

    await expect(textthanku).toHaveText(" Thankyou for the order. ");
    const orderidtext = await orderid.textContent();
    console.log(orderidtext);


    //In Order History compare that order id and click on viw button 
    await clickOnOrdersh.click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowsId = await rows.nth(i).locator("th").textContent();

        if (rowsId?.trim() === response.orderId) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderId2 = await page.locator(".col-text").textContent();
    expect(orderId2.trim()).toBe(response.orderId).toBeTruthy();
  //  expect(response.orderId.includes(orderId2 )).toBeTruthy();
    console.log("final order id :", orderId2);




    // for (let i = 0; i < await rows.count(); ++i) {
    //     const rowsId = await rows.nth(i).locator("th").textContent();
    //     if (rowsId && response.orderId.includes(rowsId.trim())) {
    //         await rows.nth(i).locator("button").first().click();
    //         break;
    //     }
    // }

    // const orderId2 = await page.locator(".col-text").textContent();
    // expect(response.orderId.includes(orderId2 )).toBeTruthy();
    // //console.log("final order id :", orderid);





});