const { test, expect } = require('@playwright/test');



test('2nd test Case Practice', async ({ page }) => {


        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

        const email = "bawanesonu658@gmail.com";
        const password = "Test@1234";
        await page.getByPlaceholder("email@example.com").fill(email);
        await page.getByPlaceholder("enter your passsword").fill(password);
        await page.getByRole("button", { name: 'login' }).click();
        await page.locator(".card-body b").first().waitFor();
        await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" }).getByRole("button", { name: " Add To Cart" }).click();
        await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();
        await page.locator("div li").first().waitFor(); // wait of page load of list of product add to cart 
        await expect(page.getByText("ZARA COAT 3")).toBeVisible();
        await page.getByRole("button", { name: "Checkout" }).click();
        await page.getByPlaceholder("Select Country").pressSequentially('ind', { delay: 150 });
        await page.getByRole("button", { name: "India" }).nth(1).click();
        await page.getByText("Place Order").click();
        

        await expect(page.getByText("Thankyou for the order.")).toBeVisible();
        await page.pause();
});


