const { test, expect } = require('@playwright/test');
const{ LoginPage } = require('../pageObject/LoginPage');
const { log } = require('node:console');


test('Client App Login', async ({ page }) => {

        const userName = "bawanesonu658@gmail.com";
        const password = "Test@1234";
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
       await loginPage.vaidateLogin(userName,password);
       

        const listofproduct = page.locator(".card-body b");
        const products = page.locator('.card-body');
        const productname = 'ADIDAS ORIGINAL';
        const clickOncart = page.locator("[routerlink*='cart']"); //[attribute*=value]
        //const listofaddcartproduct = page.locator("");


        const title1 = await page.title();
        console.log('Page tilet: ', title1);
        await expect(page).toHaveTitle("Let's Shop"); // Assertion 


        //await page.waitForLoadState('networkidle');
        await listofproduct.first().waitFor();
        console.log(await listofproduct.allTextContents());
        const count = await products.count();  // count of product and click on zara product with for loop 
        for (let i = 0; i < count; ++i) {
                if (await products.nth(i).locator("b").textContent() == productname) // if condition select the product locator include 
                {
                        // add to  cart 
                        await products.nth(i).locator("text= Add To Cart").click(); // you  can wright locator on the basis of text  
                        break;
                }

        }

        await clickOncart.click();

        await page.locator("div li").first().waitFor(); // wait of page load of list of product add to cart 
        const bool = await page.locator('h3', { hasText: productname }).isVisible(); // text is visible or not that we haved added 
        expect(bool).toBeTruthy(); //assertion 


        // const cartproduct =  page.locator('h3',{hasText: productname}); // text is visible or not that we haved added 
        // await expect(cartproduct).toBeVisible(); //assertion 



        // fill the text in Text Field
        await page.locator("text=Checkout").click();
        await page.locator("div.title:has-text('CVV Code')").locator("xpath=following::input[1]").fill("100"); // css and xpath is used 
        await page.locator("div.title:has-text('Name on Card ')").locator("xpath=following::input[1]").fill("Saniya");
        //  await page.locator("div.title:has-text('Apply Coupon ')").locator("xpath=following::input[1]").fill("test245");
        //  const click = page.locator("[type='submit']").click();

        // search india from Dropdown  // ONE BY ONE LETTER CAN SEARCH IN SEARCH FIELD DROPDOWN [ PRESSsEQUENTIALLY]
        await page.locator("[placeholder*='Select ']").pressSequentially('ind', { delay: 150 });
        const dropdown = page.locator(".ta-results");// grab all the options 
        await dropdown.waitFor(); // wait for the page load 
        const optionscount = await dropdown.locator("button").count(); // count of options 

        for (let i = 0; i < optionscount; ++i) { // to select the option use for loop give conditions 
                const text = await dropdown.locator("button").nth(i).textContent();
                if (text === " India") {
                        await dropdown.locator("button").nth(i).click();
                        break;

                }
        }


        //Assertion apply compare email id that is valid or not 
        await expect(page.locator(".details__user [type='text']").first()).toHaveText(userName);
        await page.locator(".action__submit").click();

        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

        const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderid);


        // Compare the Orderid Dynamic find the order history page 
        await page.locator("button[routerlink*=myorders]").click();
        const rows = page.locator("tbody tr");
        await page.locator("tbody").waitFor();

        for (let i = 0; i < await rows.count(); ++i) {

                const rowordeId = await rows.nth(i).locator("th").textContent();
                if (orderid.includes(rowordeId))      // parant.includes(rowordeId)
                {
                        await rows.nth(i).locator("button").first().click();
                        break;
                }
        }

        const orderIdDetails = await page.locator(".col-text").textContent();
        expect(orderid.includes(orderIdDetails)).toBeTruthy();        //parent order .child 
        console.log("Details Page Order Id: ", orderIdDetails);




});


