const { test, expect } = require('@playwright/test');
const path = require('node:path');

test('Browser Context Playwright', async ({ browser }) => {

    const context = await browser.newContext();  // open new Tab of chrome 
    const page = await context.newPage();       // open new page refresh page 
    await page.goto("https://www.flipkart.com/");  // Paste the URl 


});

test('Page Playwright test', async ({ page }) => {

    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const allTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const title = await page.title();
    //console.log(await page.title());
    console.log('Page Title:', title);
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy'); // assertion apply

    // css Selector in Playwright  
    await username.fill("bawanesonu");
    await password.fill("learning");
    await signIn.click();

    // print network details of response and request 
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status));

    console.log(await page.locator("[style*='block']").textContent());      // get the error msg toggle error msg 
    await expect(page.locator("[style*='block']")).toContainText("Incorrect"); // Assertion get 

    await username.fill(""); // wiped out the Text field
    await username.fill("rahulshettyacademy"); // again fill the text
    await signIn.click();
    //console.log(await page.locator(".card-body a").textContent());
    // console.log(await allTitles.first().textContent()); // 
    // console.log(await allTitles.nth(1).textContent());
    console.log(await allTitles.allTextContents());  // Returns and [] above list is not appered 





});

test('UI COntrols', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const radiobtn = page.locator("input[type='radio']");
    const popupmsg = page.locator("#okayBtn");
    const selectOptions = page.locator("select.form-control");
    const checkboxselect = page.locator("#terms");
    const documentLink = page.locator("[href*='documents-request']");
    const signbtn = page.locator("#signInBtn");


    await username.fill("rahulshettyacademy ");
    await password.fill("learning");
    await radiobtn.last().click();
    await popupmsg.click();
    console.log(await radiobtn.last().isChecked());   // print in Console 
    await expect(radiobtn.last()).toBeChecked();  // Assertion 

    await selectOptions.selectOption("consult");

    await checkboxselect.click();
    //Screenshot taking 
    await page.screenshot({path:'screenshot.png'});
    await page.locator("[type='password']").screenshot({path:'path.png'});

    await expect(checkboxselect).toBeChecked();  // Assertion
    await checkboxselect.uncheck();
    expect(await checkboxselect.isChecked()).toBeFalsy(); // Assertion 

    await expect(documentLink).toHaveAttribute("class", "blinkingText");  //find the class and Attribute on blinking link
});


test('child control windows', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const documentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all

        ([
            context.waitForEvent('page'),  // New Page will open on linking on link 
            documentLink.click(),

        ])
    //New Page
    const textnewpage = await newPage.locator(".red").textContent();
    const arraytext = textnewpage.split("@");
    const domaintext = arraytext[1].split(" ")[0];
    console.log("Extracted the domain;", domaintext);
    await page.locator("#username").fill(domaintext);
    console.log("Input the value:", await page.locator("#username").inputValue());
    await page.pause();

});

test('Add to cart ', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const Emailidlogin = page.locator("#userEmail");
    const Passwordlogin = page.locator("#userPassword");
    const LoginSubmitbutn = page.locator("[type='submit']");
    const email = "bawanesonu658@gmail.com";
    const pass = "Test@1234";
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




    await Emailidlogin.fill(email);
    await Passwordlogin.fill(pass);
    await LoginSubmitbutn.click();
    const titlepage = await page.title();
    console.log("tTitle of The Page : ", titlepage);

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
// Visual testing perform with Playwright 

test.only('Visual Testing ', async ({ page }) => {
await page.goto("https://flightaware.com/")
expect(await page.screenshot()).toMatchSnapshot('landing.png');



})
