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

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('[id="product"]').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('[id="product"]').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('[id="product"]').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        //duas formas de fazer
        cy.get('input[type="radio"]').check("feedback").should('have.value', 'feedback')
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($el, index, $list) => {
            cy.wrap($el).check().should('be.checked')
        })
    })

    it('marca ambos os checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .as('checkboxes')
            .check()
        //duas formas de fazer
            .should('be.checked')

        cy.get('@checkboxes')
            .each(checkbox => {
                expect(checkbox[0].checked).to.equal(true)
            })

        //duas formas de fazer
        cy.get('input[type="checkbox"]').last().uncheck().eq(false)
        cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando drag-and-drop', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dado um alias', function() {
        cy.fixture('example.json').as('myFixture')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@myFixture', { action: 'drag-drop' })
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
})