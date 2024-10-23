// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (form) => {
    cy.get('[id="firstName"]').type(form.firstName).should('have.value', form.firstName)
    cy.get('[id="lastName"]').type(form.lastName).should('have.value', form.lastName)
    cy.get('[id="email"]').type(form.email).should('have.value', form.email)
    cy.get('[id="open-text-area"]')
        .type(form.duvida, {delay: 0})
        .should('have.value', form.duvida)

    cy.get('button[type="submit"]').click()
})