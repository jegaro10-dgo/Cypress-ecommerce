describe('Login de usuario con datos guardados', () => {
  let usersData; // Variable para guardar la lista de usuarios

  // El hook 'before' se ejecuta una vez antes de todas las pruebas en este archivo
  before(() => {
    // Leer el archivo user_data.json
    cy.readFile('cypress/fixtures/user_data.json').then((users) => {
      // Guardar la lista completa de usuarios
      usersData = users;
    });
  });

  it('Debería iniciar sesión exitosamente con el ÚLTIMO usuario registrado', () => {
    // Usar la variable usersData para seleccionar al usuario
    // usersData.length - 1 nos da la posición del último usuario en el arreglo
    const userToLogin = usersData[usersData.length - 1];

    // Verificar que tenemos un usuario para iniciar sesión
    expect(userToLogin).to.exist;

    // 1. Visitar la página de login
    cy.visit('https://demowebshop.tricentis.com/login');

    // 2. Llenar el formulario de login con los datos del usuario seleccionado
    cy.get('#Email').type(userToLogin.email);
    cy.get('#Password').type(userToLogin.password);

    // 3. Hacer clic en el botón de login
    cy.get('input[value="Log in"]').click();

    // 4. Verificar que el login fue exitoso
    cy.get('.header-links > ul > :nth-child(1) > .account')
      .should('contain', userToLogin.email);
    cy.get('.ico-logout').should('be.visible');
  });

  // Puedes duplicar el test y cambiar el índice para probar con otros usuarios
  it('Debería iniciar sesión exitosamente con el PRIMER usuario registrado', () => {
    // Usar el índice [0] para seleccionar al primer usuario del arreglo
    const userToLogin = usersData[0];

    // Verificar que tenemos un usuario para iniciar sesión
    expect(userToLogin).to.exist;

    cy.visit('https://demowebshop.tricentis.com/login');
    cy.get('#Email').type(userToLogin.email);
    cy.get('#Password').type(userToLogin.password);
    cy.get('input[value="Log in"]').click();
    cy.get('.header-links > ul > :nth-child(1) > .account')
      .should('contain', userToLogin.email);
    cy.get('.ico-logout').should('be.visible');
  });
});