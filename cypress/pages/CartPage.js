class CartPage{
    //Definimos los selectores
    getCartTitle(){
        return cy.get('.title');
    }
    getCartItem(){
        return cy.get('.cart_item');
    }
    getRemoveButton(){
        return cy.get('[data-test^="Remove"]');
    }
    getCheckoutButton(){
        return cy.get('[data-test="checkout"]');
    }
    //Definimnos la acción para eliminar un producto
    removeItemFromCart(productName){
        //usamos el nombre del producto
        cy.get(`#remove-${productName}`).click();
    }
}
export default new CartPage();