describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.clear();
    });
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.get('input').should('have.length.at.least', 2);
    cy.get('button').contains(/log in/i).should('exist');
  });

  it('should navigate to register page', () => {
    cy.contains('a', /create one/i).should('exist').click();
    cy.url().should('include', '/register');
  });

  it('should login successfully with valid credentials', () => {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: {
        token: 'test-token-123',
        user: { id: 1, firstname: 'andi', lastname: 'kaeser', name: 'Andi Kaeser' }
      }
    }).as('loginRequest');

    cy.get('input').eq(0).type('andi');
    cy.get('input').eq(1).type('kaeser');
    cy.get('button').contains(/log in/i).click();

    cy.wait('@loginRequest');
  });
});

describe('Navigation', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('authToken', 'test-token');
      win.localStorage.setItem('currentUser', JSON.stringify({ id: 1, firstname: 'andi', lastname: 'kaeser' }));
    });
    cy.visit('/');
  });

  it('should show logout button when user is logged in', () => {
    cy.get('button').contains(/logout/i).should('exist');
  });

  it('should logout and redirect to login', () => {
    cy.get('button').contains(/logout/i).click();
    cy.url().should('include', '/login');
    
    cy.window().then((win) => {
      expect(win.localStorage.getItem('authToken')).to.be.null;
      expect(win.localStorage.getItem('currentUser')).to.be.null;
    });
  });
});

describe('Home Page', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('authToken', 'test-token');
      win.localStorage.setItem('currentUser', JSON.stringify({ id: 1, firstname: 'andi', lastname: 'kaeser' }));
    });
    cy.visit('/');
  });

  it('should display home page', () => {
    cy.get('body').should('exist');
  });

  it('should have navbar', () => {
    cy.get('.v-app-bar').should('exist');
  });
});

describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should display register form', () => {
    cy.get('input').should('have.length.at.least', 2);
  });

  it('should have login link', () => {
    cy.contains('a', /log in/i).should('exist');
  });
});