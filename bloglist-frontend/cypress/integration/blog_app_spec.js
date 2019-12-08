describe('Blog app with login', function () {
  const user = {
    name: 'Test Name',
    username: 'testusername',
    password: 'testpassword'
  }

  const createBlog = () => {
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
    createBlog()
  })

  it('can delete a blog', function () {
    createBlog()

    cy.contains('test title test author')
      .click()

    cy.contains('remove')
      .click()

    cy.wait(500)

    cy.contains('test title test author').should('not.exist')
  })

  it('can like a blog', function () {
    createBlog()

    cy.contains('test title test author')
      .click()

    cy.get('#like-button')
      .click()
    cy.wait(500)

    cy.get('#like-button')
      .click()
    cy.wait(500)

    cy.get('#like-button')
      .click()
    cy.wait(500)

    cy.contains('3 likes')
  })

  it('can add a comment', function () {
    createBlog()

    cy.contains('test title test author')
      .click()

    cy.get('input')
      .type('Test Comment')

    cy.contains('add comment')
      .click()

    cy.contains('Test Comment')
  })

  it('users page works', function () {
    createBlog()

    cy.visit('http://localhost:3000/users')

    cy.contains('1')

    cy.get('a:last')
      .click()

    cy.contains('test title')
  })

  it('notification shows up', function() {
    createBlog()

    cy.contains('test title by test author added')
  })
})