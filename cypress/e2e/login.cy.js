import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage'; 
//import { describe } from 'mocha';

// Describe el conjunto de pruebas que vamos a realizar
describe('Login en el sitio de e-commerce', () => {
  // Define un caso de prueba individual
  it('Debería permitir a un usuario iniciar sesión exitosamente', () => {
    // 1. Visita la página de inicio de sesión
    cy.visit('https://www.saucedemo.com/');
    LoginPage.login('standard_user', 'secret_sauce');

    // 4. Verifica que el inicio de sesión fue exitoso
    // La URL debe cambiar a la página de inventario
    cy.url().should('include', '/inventory.html')
    // También puedes verificar la presencia de un elemento en la nueva página
    cy.get('.shopping_cart_link').should('be.visible')
  });

  // Caso de prueba 2: Login fallido para un usuario bloqueado
  it('Debería mostrar un mensaje de error para un usuario bloqueado', () => {
    cy.visit('https://www.saucedemo.com/');
    // Usamos el comando personalizado para intentar el login
    LoginPage.login('locked_out_user', 'secret_sauce');
    // Verificamos que el mensaje de error es visible y contiene el texto correcto
    LoginPage.getErrorMessage().should('be.visible').and('contain', 'Epic sadface: Sorry, this user has been locked out.');
  });
  
  // Caso de prueba 3: Prueba de regresión visual
  it('Debería tener el aspecto visual correcto en la página de login', () => {
    cy.visit('https://www.saucedemo.com');
    // Espera a que el elemento del logo esté visible anste de tomar la captura
    cy.get('.login_logo').should('be.visible');
    // Se usa el comando nativo de cypress para tomar una captura de pantalla de la ventana
    cy.screenshot('pagina-login-visual');
  });
});