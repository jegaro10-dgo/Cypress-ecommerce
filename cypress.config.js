const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implementa los 'event listeners' de Node aquí
      allureWriter(on, config);

      // La función debe retornar la configuración al final
      return config;
    },
  },
});