class LoginPage {
    // definimos los selectores de la página de login
    getUsernameInput(){
        return cy.get('[data-test="username"]');
    }
    getPasswordInput(){
        return cy.get('[data-test="password"]');
    }
    getLoginButton(){
        return cy.get('[data-test="login-button"]');
    }
    getErrorMessage(){
        return cy.get('[data-test="error"]');
    }
    // Definimos la acción del login
    login(username, password){
        this.getUsernameInput().should('be.visible').type(username);
        this.getPasswordInput().type(password);
        this.getLoginButton().click();
    }
}
export default new LoginPage();