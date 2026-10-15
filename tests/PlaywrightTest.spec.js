
import {test,expect } from '@playwright/test';

test('Playwright Special Locator', async ({page})=>
{
 await page.goto("https://rahulshettyacademy.com/angularpractice/");
 await page.getByLabel("Check me out if you Love IceCreams!").check(); // click on check box click or check can be used 
 await page.getByLabel("Employed").check(); // click on Radio button
 await page.getByLabel("Gender").selectOption("Female"); // click on Dropdown 
 await page.getByPlaceholder("Password").fill("abc123");
 await page.getByRole("button",{name:'Submit'}).click(); // click on Submit Button by role Method 
 await page.getByText("Success! The Form has been submitted successfully!.").isVisible(); // success msg is aapered 
 await page.getByRole("link",{name:'Shop'}).click(); // click on Shop Tab 
 await page.locator("app-card").filter({hasText:'Samsung Note 8'}).getByRole("button",{name:'Add '}).click(); // click on samsung



})