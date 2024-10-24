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

        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('[id="firstName"]').type('Nome').should('have.value', 'Nome')
        cy.get('[id="lastName"]').type('Sobrenome').should('have.value', 'Sobrenome')
        cy.get('[id="email"]').type('nome.com').should('have.value', 'nome.com')
        cy.get('[id="open-text-area"]')
            .type('Eu tenho uma dúvida', {delay: 0})
            .should('have.value', 'Eu tenho uma dúvida')

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('[id="phone"]').type('ABC').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('[id="firstName"]').type('Nome').should('have.value', 'Nome')
        cy.get('[id="lastName"]').type('Sobrenome').should('have.value', 'Sobrenome')
        cy.get('[id="email"]').type('nome@email.com').should('have.value', 'nome@email.com')
        cy.get('[id="open-text-area"]')
            .type('Eu tenho uma dúvida', {delay: 0})
            .should('have.value', 'Eu tenho uma dúvida')

        cy.get('[id="phone-checkbox"]').check()

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('[id="firstName"]').type('Nome').should('have.value', 'Nome').clear().should('have.value', '')
        cy.get('[id="lastName"]').type('Sobrenome').should('have.value', 'Sobrenome').clear().should('have.value', '')
        cy.get('[id="email"]').type('nome@email.com').should('have.value', 'nome@email.com').clear().should('have.value', '')
        cy.get('[id="open-text-area"]')
            .type('Eu tenho uma dúvida', {delay: 0})
            .should('have.value', 'Eu tenho uma dúvida')
            .clear()
            .should('have.value', '')
        cy.get('[id="phone"]').type('1234').should('have.value', '1234').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', function() {
        const form = {
           firstName: 'Nome',
           lastName: 'Sobrenome',
           email: 'nome@email.com',
           duvida: 'Eu tenho uma dúvida'
        }

        cy.fillMandatoryFieldsAndSubmit(form)

        cy.get('.success').should('be.visible')
    })
})