import {faker} from '@faker-js/faker';

describe('registro de usuario en Demo Web Shop', () =>{
    it('Debería registrar un nuevo usuario exitosamente con datos aleatorios', ()=>{
        // 1. Visitar la página principal
        cy.visit('https://demowebshop.tricentis.com/');
        // 2. Navegar a la página de registro
        cy.get('.ico-register').click();

        //Genear datos aleatorios con faker.js
        const randomFirstName = faker.person.firstName();
        const randomLastName = faker.person.lastName();
        const uniqueEmail = `testuser_${Date.now()}@${faker.internet.domainName()}`;
        const randomPassword = faker.internet.password();

        //se crea el objeto del nuevo usuario
        const newUser = {
            email: uniqueEmail,
            password: randomPassword
        };

        // 3. Llenar el formulario de registro con datos aleatorios usando faker
        cy.get('#gender-male').click();
        // Llenar el campo de nombre
        cy.get('#FirstName').type(randomFirstName);
        // Llenar el campo de apellido
        cy.get('#LastName').type(randomLastName);
        // Llenar el campo de email
        cy.get('#Email').type(uniqueEmail);
        // Llenar el campo de contraseña
        cy.get('#Password').type(randomPassword);
        // Confirmar el password
        cy.get('#ConfirmPassword').type(randomPassword);
        // realizar captura de pantalla
        cy.screenshot('registro.cy.js/Formulario-completo-1');

        // 4. Hacer click en el botón de registro
        cy.get('#register-button').click();

        // 5. Verificar que el registro fue exitoso
        cy.get('.result').should('be.visible').and('contain', 'Your registration completed');
        cy.get('.ico-logout').should('be.visible');

        // 6. Guardar datos en arhivo json
        cy.task('fileExists', 'cypress/fixtures/user_data.json').then(exists => {
        if (exists) {
         // 2. Si el archivo existe, lo leemos
        cy.readFile('cypress/fixtures/user_data.json').then((users) => {
        let usersArray = users;

        // Si el contenido del archivo no es un arreglo, lo convertimos
        if (!Array.isArray(usersArray)) {
        usersArray = [usersArray];
        }

        // Agregamos el nuevo usuario
        usersArray.push(newUser);
      
         // Escribimos la lista completa de vuelta al archivo
        cy.writeFile('cypress/fixtures/user_data.json', usersArray);
        });
    } else {
        // 3. Si el archivo no existe, lo creamos con el primer usuario como arreglo
        cy.writeFile('cypress/fixtures/user_data.json', [newUser]);
            }
        });
    });
});