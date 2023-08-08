describe('Swagger Petstore', () => {
  it('should add a new pet to the store', () => {
    const body = {
      id: 0,
      category: {
        id: 0,
        name: 'string',
      },
      name: 'doggie',
      photoUrls: ['string'],
      tags: [
        {
          id: 0,
          name: 'string',
        },
      ],
      status: 'available',
    };
    cy.visit('https://petstore.swagger.io/');
    cy.request('POST', 'https://petstore.swagger.io/v2/pet', body).then(xhr => {
      console.log(xhr);
      expect(xhr.status).to.equal(200);
      expect(xhr.body.name).to.equal('doggie');
      expect(xhr.body.category.id).to.equal(0);
    });
  });
  it('should get information from Swagger store', () => {
    cy.visit('https://petstore.swagger.io/');
    cy.intercept('GET', 'https://petstore.swagger.io/v2/swagger.json', {
      fixture: '../fixtures/swagger.json',
    }).as('swagger');
    cy.wait('@swagger').then(xhr => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.response.body.host).to.equal('petstore.swagger.io');
      expect(xhr.response.body.tags[0].description).to.equal('This is a test');
    });
  });
});
