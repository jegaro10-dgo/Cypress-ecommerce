const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        fileExists(path) {
          return fs.existsSync(path);
        }
      });
      allureWriter(on, config);
      return config;
    },
  },
});