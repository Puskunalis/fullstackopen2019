describe('Blog app with login', function () {
  const user = {
    name: 'Test Name',
    username: 'testusername',
    password: 'testpassword'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')

    cy.get('#username')
      .type(user.username)
    cy.get('#password')
      .type(user.password)
    cy.contains('login')
      .click()
  })

  it('can log in', function () {
    cy.contains(`${user.name} logged in`)
  })

  it('can create a new blog', function () {
    cy.contains(`${user.name} logged in`)

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

  it('can delete a blog', function () {
    cy.contains(`${user.name} logged in`)

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
      .click()

    cy.contains('remove')
      .click()

    cy.wait(500)

    cy.contains('test title test author').should('not.exist')
  })
})