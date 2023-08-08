Cypress.Commands.add('loginAdmin', () => {
  cy.intercept('POST', Cypress.env('apiUrl') + '/auth/validate').as(
    'validation'
  );
  const adminCredentials = {
    username: Cypress.env('username'),
    password: Cypress.env('password'),
  };
  cy.request({
    url: Cypress.env('apiUrl') + '/auth/login',
    method: 'POST',
    body: adminCredentials,
  }).then(xhr => {
    expect(xhr.status).to.equal(200);
  });
  cy.visit('/#/admin');
  cy.wait('@validation').then(body => {
    const token = body.request.body;
    cy.log(token);
  });
});
