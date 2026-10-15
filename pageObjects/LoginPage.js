class LoginPage {

    constructor(page) {

        this.page = page;
        this.loginemail = page.locator("#userEmail");
        this.loginpassword = page.locator("#userPassword");
        this.submitbutton = page.locator("[value='Login']");

    }

    async goTo() {
        await this.page.goTo("https://rahulshettyacademy.com/client/#auth/login");
        await this.loginemail.waitFor({state: 'visible'});


    }


    async vaidateLogin(userName, password) {
        await this.loginemail.fill(userName);
        await this.loginpassword.fill(password);
        await this.submitbutton.click();
    }



}
module.exports = { LoginPage };