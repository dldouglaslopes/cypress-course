/// <reference types="Cypress" /> 

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => cy.visit('./src/index.html'))

    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('[id="firstName"]').type('Nome').should('have.value', 'Nome')
        cy.get('[id="lastName"]').type('Sobrenome').should('have.value', 'Sobrenome')
        cy.get('[id="email"]').type('nome@email.com').should('have.value', 'nome@email.com')
        cy.get('[id="open-text-area"]')
            .type('Eu tenho uma dúvidaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', {delay: 0})
            .should('have.value', 'Eu tenho uma dúvidaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('[id="firstName"]').type('Nome').should('have.value', 'Nome')
        cy.get('[id="lastName"]').type('Sobrenome').should('have.value', 'Sobrenome')
        cy.get('[id="email"]').type('nome.com').should('have.value', 'nome.com')
        cy.get('[id="open-text-area"]')
            .type('Eu tenho uma dúvida', {delay: 0})
            .should('have.value', 'Eu tenho uma dúvida')

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
})