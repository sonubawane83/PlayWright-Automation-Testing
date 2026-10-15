// Login UI -> JSOn
// test browser -> can u open the browser with json again, cart-order, orerdetails , order history 


const { test, expect } = require('@playwright/test');
let webContext; // declerared globally 

test.beforeAll(async ({ browser }) => {


    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const Emailidlogin = page.locator("#userEmail");
    const Passwordlogin = page.locator("#userPassword");
    const LoginSubmitbutn = page.locator("[type='submit']");
    const email = "bawanesonu658@gmail.com";
    const pass = "Test@1234";

    await Emailidlogin.fill(email);
    await Passwordlogin.fill(pass);
    await LoginSubmitbutn.click();
    const titlepage = await page.title();
    console.log("tTitle of The Page : ", titlepage);

    // list of product print and count and click on Add to cart  
    await page.waitForLoadState('networkidle');

    await context.storageState({ path: 'state.json' });

    webContext = await browser.newContext({ storageState: 'state.json' });  // knowledge about all the browser 

})





test('TestCase1 ', async () => {


    const page = await webContext.newPage(); // Injected that token in it by storage method  login at the begining then not login the page 
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

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

    for (let i = 0; i < await rows.count(); ++i) {
        const rowsId = await rows.nth(i).locator("th").textContent();
        if (orderidtext.includes(rowsId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderId2 = await page.locator(".col-text").textContent();
    expect(orderidtext.includes(orderId2)).toBeTruthy();
    console.log("final order id :", orderId2);





})