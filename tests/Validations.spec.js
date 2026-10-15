const { test, expect } = require("@playwright/test")

test("Validations ", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //  await page.goto("https://www.google.com/");
    //  await page.goBack();
    //  await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible(); // click on Textbox 
    await page.locator("#hide-textbox").click(); // click on Hide button
    await expect(page.locator("#displayed-text")).toBeHidden(); // click on it and observe the textbox is hide

    await page.locator("#confirmbtn").click();
    page.on('dialog', dialog => dialog.accept);  // Handle Alert Popup msg 


    // Mouse hover 
    await page.locator("#mousehover").hover();

    // Frame into Frame 

    const framespage = page.locator("#courses-iframe");
    // await framespage.locator("li a[href*='lifetime-access']:visible").click();
    await framespage.locator(" li .new-navbar-highlighter:visible").click();
    const text1 = await framespage.locator(".text h2").textContent();
    console.log(text1.split(" ")[1]);


})