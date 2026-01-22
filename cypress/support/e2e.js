// cypress/support/e2e.js
// Alternatively you can use CommonJS syntax:
// require('./commands')

// Disable uncaught exception handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

// Add custom commands
Cypress.Commands.add('login', (firstname = 'andi', lastname = 'kaeser') => {
  cy.window().then((win) => {
    win.localStorage.setItem('authToken', 'test-token');
    win.localStorage.setItem('currentUser', JSON.stringify({ id: 1, firstname, lastname, name: 'Andi Kaeser' }));
  });
});

Cypress.Commands.add('logout', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('authToken');
    win.localStorage.removeItem('currentUser');
  });
});
