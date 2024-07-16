describe('template spec', () => {
  beforeEach(() => {
  cy.visit('http://localhost:3000')
  })

  it('Should website load', () => {
    cy.get('.text-3xl').should('have.text','NY Times Most Popular Articles')
  })

  it('Should check load api data and click to read more button', () => {
    cy.get('.flex-wrap > :nth-child(1)').should('be.visible');
    cy.get(':nth-child(1) > .flex-col > .flex > .align-middle').click();
  })

  it('should show Particular Article',() => {
    cy.get(':nth-child(1) > .flex-col > .flex > .align-middle').click();
    cy
      .get('.relative > img')
      .get('.mb-3 > h5')
      .get('.my-2 > :nth-child(1)')
      .should('be.visible');
    cy.get('.pt-3 > .align-middle').click();
    cy.get('.flex-wrap > :nth-child(1)').should('be.visible');
  })
})