const{test, expect} = require('@playwright/test');


test('Calendar validation', async ({ page }) => {

        const monthNumber ="6";
        const date ="10";
        const year ="2026";
        const expectedResult =[monthNumber,date,year];

        await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
       // await page.locator(".react-date-picker__calendar-button").click();
        await page.locator(".react-date-picker__inputGroup").click();
        await page.locator(".react-calendar__navigation__label").click(); //month
        await page.locator(".react-calendar__navigation__label").click(); //year
        await page.getByText(year).click();
        await page.locator(".react-calendar__tile").nth(Number(monthNumber)-1).click();
        await page.locator("//abbr[text()='"+date+"']").click();
       
        const inputs = page.locator('.react-date-picker__inputGroup__input');

        for(let i=0; i<expectedResult.length; ++i)
        {

             const value = await inputs.nth(i).inputValue();
             expect(value).toEqual(expectedResult[i]);
        }




       

});

































        



