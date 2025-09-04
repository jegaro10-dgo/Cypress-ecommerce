class InventoryPage{
    //definimos los selectores
    getShoppingCartLink(){
        return cy.get('.shopping_cart_link');
    }
    getShoppingCartBadge(){
        return cy.get('.shopping_cart_badge');
    }
    addProductToCart(productName){
        cy.get(`[data-test="add-to-cart-${productName}"]`).click();
    }
    getAddToCartButton(){
        return cy.get('[data-test^="add-to-cart"]');
    }
    getRemoveButton(){
        return cy.get('[data-test^="Remove"]');
    }
    //Definimos las acciones
    verifyPageLoaded(){
        return this.getShoppingCartLink().should('be.visible');
    }
    addProductToCart(productName){
        // En este caso, el "productName" corresponde a la última parte del ID del botón.
        // Ejemplo: 'sauce-labs-backpack'
        cy.get(`#add-to-cart-${productName}`).click();
    }
}
export default new InventoryPage();