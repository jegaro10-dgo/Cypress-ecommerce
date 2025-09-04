import InventoryPage from '../pages/InventoryPage';
import LoginPage from '../pages/LoginPage';

const checkOrder = (type, pageObject) => {
  if (type === 'ascendente') {
    pageObject.getProductNames().then($names => {
      const names = $names.map((index, el) => Cypress.$(el).text()).get();
      const sortedNames = [...names].sort();
      expect(names).to.deep.equal(sortedNames);
    });
  } else if (type === 'descendente') {
    pageObject.getProductNames().then($names => {
      const names = $names.map((index, el) => Cypress.$(el).text()).get();
      const sortedNames = [...names].sort().reverse();
      expect(names).to.deep.equal(sortedNames);
    });
  }
};

describe('Funcionalidad de ordenamiento de productos', () => {
  beforeEach(() => {
    // Iniciar sesión antes de cada prueba
    cy.visit('https://www.saucedemo.com/');
    LoginPage.login('standard_user', 'secret_sauce');
    // Espera a que un elemento de la página de inventario esté visible
    cy.get('.inventory_list').should('be.visible');
  });

  it('Debería ordenar los productos por precio de bajo a alto y de alto a bajo', () => {
    // Ordenamiento por precio de bajo a alto
    InventoryPage.sortProducts('lohi');
    InventoryPage.getProductPrices().then($prices => {
      const prices = $prices.map((index, el) => Cypress.$(el).text().replace('$', '')).get();
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sortedPrices);
    });
    
    // Ordenamiento por precio de alto a bajo y viceverza
    InventoryPage.sortProducts('hilo');
    InventoryPage.getProductPrices().then($prices => {
      const prices = $prices.map((index, el) => Cypress.$(el).text().replace('$', '')).get();
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sortedPrices);
    });
    
    cy.screenshot('ordenar-productos-por-precio');
  });

  it('Debería ordenar los productos por nombre de A-Z y Z-A', () => {
    // Ordenamiento por nombre de A a Z
    InventoryPage.sortProducts('az');
    checkOrder('ascendente', InventoryPage);

    // Ordenamiento por nombre de Z a A
    InventoryPage.sortProducts('za');
    checkOrder('descendente', InventoryPage);

    cy.screenshot('ordenar-productos-por-nombre');
  });
});