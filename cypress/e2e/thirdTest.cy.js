describe('Testing playground', () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.visit('http://uitestingplayground.com/');
  });

  it('Dynamic ID', () => {
    cy.get('#overview')
      .find('div.container')
      .first()
      .children('div')
      .contains('h3', 'Dynamic ID')
      .click();
    cy.contains('button', 'Button with Dynamic ID').click().log('clicked');
  });
  it('Class Attribute', () => {
    cy.get('#overview')
      .find('div')
      .children('div')
      .first()
      .contains('h3', 'Class Attribute')
      .click();
    cy.get('.btn-primary').click().log('Primary clicked!');
    cy.on('window:alert', t => {
      expect(t).to.exist();
    });
  });
  it('Hidden Layers', () => {
    cy.get('#overview')
      .find('div')
      .children('div')
      .first()
      .contains('h3', 'Hidden Layers')
      .click();
    cy.get('#greenButton').click();
    cy.get('#greenButton').click();
    // cy.contains('button', 'Button').click();
    // cy.contains('button', 'Button').click();
  });
  it.only('Load Delay', () => {
    cy.get('#overview')
      .find('div')
      .children('div')
      .first()
      .contains('h3', 'Load Delay')
      .click()
      .wait(2000);
    cy.contains('button', 'Button Appearing After Delay').click();
  });
});
