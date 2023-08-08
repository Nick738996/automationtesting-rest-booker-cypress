describe('template spec', function () {
  beforeEach(function () {
    cy.visit('/').contains('button', 'Let me hack!').click();
    cy.clearAllCookies();
    cy.fixture('guest.json').as('guestInfo');
  });

  it('should book a room as a guest', function () {
    cy.contains('button', 'Book this room').click();
    cy.get('div.col-sm-4')
      .find('.input-group.mb-3')
      .each((inputs, index) => {
        const information = [
          this.guestInfo.firstname,
          this.guestInfo.lastname,
          this.guestInfo.email,
          this.guestInfo.phone,
        ];
        cy.wrap(inputs).type(information[index]);
      });
    cy.contains('button', 'Today').click();
  });
  it('should send a message as a guest', function () {
    let fullName = this.guestInfo.firstname + ' ' + this.guestInfo.lastname;
    const information = [
      fullName,
      this.guestInfo.email,
      this.guestInfo.phone,
      this.guestInfo.subject,
      this.guestInfo.message,
    ];
    cy.intercept('POST', Cypress.env('apiUrl') + '/message/').as('message');

    cy.get('div.row.contact')
      .find('form')
      .find('.input-group')
      .each((inputsMessage, index) => {
        cy.wrap(inputsMessage).type(information[index]);
      });
    cy.contains('button', 'Submit').click();
    cy.contains('h2', 'Thanks for getting in touch ' + fullName)
      .siblings('p')
      .eq(1)
      .should('contain', this.guestInfo.subject);

    cy.wait('@message').then(xhr => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(201);
      expect(xhr.response.statusMessage).to.equal('Created');
      expect(xhr.response.body.email).to.equal('Brandon123@test.com');
    });
  });
  it('login as admin', function () {
    cy.loginAdmin();
    cy.intercept('GET', Cypress.env('apiUrl') + '/message/count', {
      fixture: '../fixtures/test.json',
    }).then(xhr => {
      console.log(xhr);
    });
  });
});
