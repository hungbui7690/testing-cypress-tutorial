/*
  Sharing Logic with Test Hooks 
  - before, beforeEach, afterEach, after...
  - test preparation or cleanup


*/

/// <reference types="Cypress" />

describe('contact form', () => {
  before(() => {
    // run once before all tests
  })

  // # run before each test
  beforeEach(() => {
    // visiting a website
    cy.visit('/about')

    // seeding a db
    // ...
  })

  afterEach(() => {
    // run after each test
  })

  after(() => {
    // run once after all tests
  })

  it('should submit the form', () => {
    cy.get('[data-cy="contact-input-message"]').type('Hello world!')
    cy.get('[data-cy="contact-input-name"]').type('John Doe')
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el.attr('disabled')).to.be.undefined
      expect(el.text()).to.eq('Send Message')
    })
    cy.get('[data-cy="contact-input-email"]').type('test@example.com{enter}')
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn')
    cy.get('@submitBtn').contains('Sending...')
    cy.get('@submitBtn').should('have.attr', 'disabled')
  })

  it('should validate the form input', () => {
    cy.get('[data-cy="contact-btn-submit"]').click()
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr('disabled')
      expect(el.text()).to.not.equal('Sending...')
    })
    cy.get('[data-cy="contact-btn-submit"]').contains('Send Message')
    cy.get('[data-cy="contact-input-message"]').as('msgInput')
    cy.get('@msgInput').focus().blur()
    cy.get('@msgInput')
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined
        expect(el.attr('class')).contains('invalid')
      })

    cy.get('[data-cy="contact-input-name"]').focus().blur()
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined
        expect(el.attr('class')).contains('invalid')
      })

    cy.get('[data-cy="contact-input-email"]').focus().blur()
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined
        expect(el.attr('class')).contains('invalid')
      })
  })
})