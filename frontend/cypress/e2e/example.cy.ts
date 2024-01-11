describe('My First Test', () => {
  before(() => {
    cy.login('admin@admin.com', '123456789')
  });

  it('visits the app root url', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Hello World! Aqui é o backend')
  });

  it('visits the app register url', () => {
    cy.visit('http://localhost/register')
    cy.get('body').should('contain', 'Register')
    cy.contains('h2', 'Register')
    cy.get('#name').type('Teste')
    cy.get('#email').type('admin@admin.com')
    cy.get('#password').type('123456789')
    cy.get('button').click()
  });

  it('visits the app login url', () => {
    cy.session('session', () => {
      cy.visit('http://localhost/login')
      cy.get('body').should('contain', 'Login')
      cy.contains('h2', 'Login')
      cy.get('#email').type('admin@admin.com')
      cy.get('#password').type('123456789')
      cy.get('button').click()
      cy.url().should('include', '/dashboard')
      cy.visit('http://localhost/dashboard')
      cy.contains('h1', 'Gráficos')
    }).then((resp) => {
      cy.log(JSON.stringify(resp))
    })

  });

  it('visits the app dashboard url', () => {
    cy.visit('http://localhost/dashboard')
    cy.contains('h1', 'Gráficos')
    cy.intercept('http://localhost:3000/subscribers', (req) => {
      req.headers['authorization'] = `Bearer ${window.localStorage.getItem('access_token')}`
    }).as('getSubscribers')
  });
});
