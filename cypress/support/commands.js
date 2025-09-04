// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// -- This is a parent command --
// Cypress.Commands.add('login', (username, password) => { ... })
//
// Ejemplo de un comando personalizado para el login
Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://www.saucedemo.com/')
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
});
// comando que permite manejar sesiones, guarda los datos en las cookies
// Agrega la importación del Page Object del login
import LoginPage from '../pages/LoginPage';

Cypress.Commands.add('apiLogin', (username) => {
    // Usamos cy.session para no tener que logearnos en cada test
    // La primera vez que se ejecuta, el código dentro de la función se corre
    cy.session(username, () => {
        // En lugar de usar cookies, usamos la lógica de login que ya creaste.
        // Esto es más confiable porque simula una sesión real
        // y se beneficia de la lógica de espera de tu Page Object.
        cy.visit('https://www.saucedemo.com/');
        LoginPage.login('standard_user', 'secret_sauce');
    });
});
