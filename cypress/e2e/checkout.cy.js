import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';

describe('Flujo de pago en Saucedemo', () => {
  beforeEach(() => {
    // Realiza el login antes de cada prueba
    cy.visit('https://www.saucedemo.com/');
    LoginPage.login('standard_user', 'secret_sauce');
    
    // Agrega un producto al carrito para poder acceder al checkout
    InventoryPage.addProductToCart('sauce-labs-backpack');
    InventoryPage.getShoppingCartLink().click();
    CartPage.getCheckoutButton().click();
  });

  it('Debería validar la información del formulario de pago', () => {
    // 1. Completa los campos del formulario
    cy.get('#first-name').type('Juan');
    cy.get('#last-name').type('Perez');
    cy.get('#postal-code').type('12345');
    cy.screenshot('Checkout-1-FormularioLleno');

    // 2. Envía el formulario
    cy.get('#continue').click();

    // 3. Verifica que la página de resumen se cargó correctamente
    cy.get('.title').should('have.text', 'Checkout: Overview');
    cy.get('.summary_total_label').should('be.visible');
    cy.screenshot('Checkout-2-ResumenDeCompra');
  });

  it('Debería mostrar un mensaje de error si faltan campos en el formulario', () => {
    // 1. Envía el formulario sin llenar los campos
    cy.get('#continue').click();

    // 2. Verifica que se muestra el mensaje de error
    cy.get('.error-message-container').should('be.visible')
      .and('contain.text', 'Error: First Name is required');
    cy.screenshot('Checkout-3-ErrorDeValidacion');
  });
});