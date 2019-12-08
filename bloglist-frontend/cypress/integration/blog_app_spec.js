describe('Blog app with login', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')

    cy.get('#username')
      .type('asd')
    cy.get('#password')
      .type('asdasd')
    cy.contains('login')
      .click()
  })

  it('can log in', function () {
    cy.contains('ggg logged in')
  })

  it('can create new blog after logging in', function() {
    cy.contains('ggg logged in')

    cy.contains('new blog')
      .click()

    cy.get('#title')
      .type('test title')
    cy.get('#author')
      .type('test author')
    cy.get('#url')
      .type('test url')

    cy.get('#create-button')
      .click()

    cy.contains('test title test author')
  })
})