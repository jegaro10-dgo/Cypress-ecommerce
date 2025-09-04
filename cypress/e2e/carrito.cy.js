
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import LoginPage from '../pages/LoginPage';

describe('Flujo de compra en Saucedemo', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    // El comando "beforeEach" se ejecuta antes de cada caso de prueba.
    // Es perfecto para tareas repetitivas como el login.
    LoginPage.login('standard_user', 'secret_sauce');
    cy.screenshot('FlujoCompra-1-Inventario-Inicial');
  });

  it('Debería agregar un producto al carrito y verificar que se muestra el conteo correcto', () => {
    const productName = 'sauce-labs-backpack';
    InventoryPage.addProductToCart(productName);
    cy.screenshot('FlujoCompra-2-Inventario-Producto-Agregado');

    // 2. Verifica el conteo del ícono del carrito.
    // El ícono debe mostrar un "1" para indicar un producto.
    InventoryPage.getShoppingCartBadge().should('have.text', '1');

    // 3. Haz clic en el ícono del carrito para ir a la página de checkout.
    InventoryPage.getShoppingCartLink().click();
    cy.screenshot('FlujoCompra-3-PaginaCarrito');

    // 4. Verifica que la página del carrito se cargó correctamente.
    // El título de la página debe ser "Your Cart".
    CartPage.getCartTitle().should('have.text', 'Your Cart');

    // 5. Verifica que el producto que agregaste está en la lista.
    // El nombre del producto debe estar visible.
    CartPage.getCartItem().should('contain.text', 'Sauce Labs Backpack');
  });

  it('Debería agregar multiples productos al carrito y verificar que se muestre el conteo correcto',()=>{
    InventoryPage.addProductToCart('sauce-labs-backpack');
    InventoryPage.addProductToCart('sauce-labs-bike-light');
    InventoryPage.addProductToCart('sauce-labs-bolt-t-shirt');

    // Verifica que el número en el carrito es el correcto
    InventoryPage.getShoppingCartBadge().should('have.text', '3');

    // Navega al carrito y verifica que los tres productos están ahí
    InventoryPage.getShoppingCartLink().click();
    CartPage.getCartItem().should('have.length', 3);
  });

    //Nuevo caso de prueba eliminar producto del carrito
  it('Debería eliminar un producto del carrito y verificar que el carrito esta vacío', () => {
    const productName = 'sauce-labs-backpack';

    // 1. Agrega el producto al carrito. Reutilizamos esta línea del caso de prueba anterior.
    InventoryPage.addProductToCart(productName);
    cy.screenshot('FlujoCompra-4-Inventario-ProductoParaEliminar');

    // 2. Navega a la página del carrito.
    InventoryPage.getShoppingCartLink().click();
    cy.screenshot('FlujoCompra-5-Carrito-AntesDeEliminar');

    // 3. Eliminamos el producto del carrito
    CartPage.removeItemFromCart(productName);
    cy.screenshot('FlujoCompra-6-Carrito-DespuesDeEliminar');

    // 4. Verificar que el producto ya no está en el carrito
    // usamos el comando "should('not.exist')" para asegurar que el elemento ya no existe en el DOM
    InventoryPage.getShoppingCartBadge().should('not.exist');

    // 5. Verifica que el incono del carrito ya no tiene el badge de conteo
    // para esto usamos "should('not.exist')" en el elemento del conteo
    CartPage.getCartItem().should('not.exist');
  });
 
});