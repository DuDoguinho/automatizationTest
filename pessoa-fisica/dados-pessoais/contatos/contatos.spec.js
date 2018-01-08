let Contatos = require('./contatos.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let GeraCPF = require('../../../comum/cpfCnpj');
let cpf = '';

describe('Contatos', () => {
    beforeAll(()=>{
        cpf = GeraCPF.getCPF();
    });

    describe('Formulário', function () {

        describe('Telefone', function () {
            beforeEach(() => {
                Contatos.acessaPagina(cpf);
                Contatos.sessao.element(by.css('.step-section')).click();
                Contatos.botaoNovo.click();
            });

            it('deve validar os campos obrigatórios de telefone', () => {
                Contatos.botaoSalvar.click();

                expect(Mensagem.obrigatoriedade(Contatos.tipoTelefone)).toBeTruthy();
                expect(Mensagem.obrigatoriedade(Contatos.numeroTelefone)).toBeTruthy();
            });

            it('deve validar tamanho máximo dos campos de telefone', () => {
                Estresse.estressarCampo(Contatos.obsTelefone, 100);
                Estresse.estressarCampo(Contatos.numeroTelefone, 100);

                Estresse.avaliarLength(Contatos.obsTelefone, Contatos.tamanhoDosCampos.obsTelefone);
                Estresse.avaliarLength(Contatos.numeroTelefone, Contatos.tamanhoDosCampos.numeroTelefone);
            });

            it('deve validar telefone', () => {
                Contatos.numeroTelefone.sendKeys('0');
                Contatos.numeroTelefone.sendKeys(protractor.Key.TAB);

                expect(Mensagem.obrigatoriedade(Contatos.numeroTelefone)).toBeTruthy();
                expect(Mensagem.textoMensagem(Contatos.numeroTelefone)).toEqual('Telefone inválido');
            });

            it('deve cancelar', () => {
                expect(Contatos.form.isDisplayed()).toBeTruthy();

                Contatos.botaoCancelar.click();
                expect(Contatos.form.isPresent()).not.toBeTruthy();
            });
        });

        describe('E-mail', function () {
            beforeEach(() => {
                Contatos.acessaPagina(cpf);
                Contatos.sessao.element(by.css('.step-section')).click();
                Contatos.botaoNovo.click();
                Contatos.setTipoContato('E-mail');
            });

            it('deve validar os campos obrigatórios de email', () => {
                Contatos.botaoSalvar.click();

                expect(Mensagem.obrigatoriedade(Contatos.tipoEmail)).toBeTruthy();
                expect(Mensagem.obrigatoriedade(Contatos.enderecoEmail)).toBeTruthy();
            });

            it('deve validar tamanho máximo dos campos de e-mail', () => {
                Estresse.estressarCampo(Contatos.obsEmail, 400);

                Estresse.avaliarLength(Contatos.obsEmail, Contatos.tamanhoDosCampos.obsEmail);
            });

            it('deve validar email', () => {
                Contatos.enderecoEmail.sendKeys('00000');
                element(by.css('body')).click();

                expect(Mensagem.obrigatoriedade(Contatos.enderecoEmail)).toBeTruthy();
                expect(Mensagem.textoMensagem(Contatos.enderecoEmail)).toEqual('E-mail inválido');
            });

            it('deve cancelar', () => {
                expect(Contatos.form.isDisplayed()).toBeTruthy();

                Contatos.botaoCancelar.click();
                expect(Contatos.form.isPresent()).not.toBeTruthy();
            });
        });
    });

    describe('Listagem', function () {
        beforeEach(() => {
            Contatos.acessaPagina(cpf);
            Contatos.sessao.element(by.css('.step-section')).click();
        });

        describe('Telefone', function () {

            it('deve adicionar múltiplos telefones', () => {
                let fones = DadosCadastro.cadastro.dadosPessoais.contatos.fones;

                Contatos.insereTelefones(fones);

                let tableRows = Contatos.getTableRowsTelefones();
                expect(tableRows.count()).toEqual(fones.length);
                expect(Contatos.form.isPresent()).toBe(false);
            });

            it('deve remover telefone', () => {
                let fones = DadosCadastro.cadastro.dadosPessoais.contatos.fones;

                Contatos.insereTelefones(fones);
                Contatos.excluiContato('telefone');

                let rowsTelefones = Contatos.getTableRowsTelefones();
                expect(rowsTelefones.count()).toEqual(fones.length-1);
                expect(Contatos.form.isPresent()).toBe(false);
            });

            it('deve editar telefone', () => {
                let fones = DadosCadastro.cadastro.dadosPessoais.contatos.fones;
                let novoNumero = "(51) 99999-9999";
                let novoTipo = "CELULAR";

                Contatos.insereTelefones(fones);
                Contatos.editaContato('telefone');
                expect(Contatos.form.isDisplayed()).toBe(true);

                Contatos.numeroTelefone.clear();
                Contatos.numeroTelefone.sendKeys(novoNumero);
                Contatos.setTipoTelefone(novoTipo);
                Contatos.botaoSalvar.click();

                let tableRows = Contatos.getTableRowsTelefones();
                let labelNovoTelefone = tableRows.all(by.binding('contato.ddd + contato.numero | brPhoneNumber')).first();
                let labelNovoTipo = tableRows.all(by.binding('contato.tipoTelefone')).first();

                expect(labelNovoTelefone.getText()).toEqual(novoNumero);
                expect(labelNovoTipo.getText()).toEqual(novoTipo);
                expect(tableRows.count()).toBe(fones.length);
                expect(Contatos.form.isPresent()).toBe(false);
            });
        });

        describe('E-mail', function () {

            it('deve adicionar múltiplos e-mails', () => {
                let emails = DadosCadastro.cadastro.dadosPessoais.contatos.emails;

                Contatos.insereEmails(emails);

                let numeroDeEmails = (Contatos.getTableRowsEmails()).count();
                expect(numeroDeEmails).toBe(emails.length);
                expect(Contatos.form.isPresent()).toBe(false);
            });

            it('deve remover e-mail', () => {
                let emails = DadosCadastro.cadastro.dadosPessoais.contatos.emails;

                Contatos.insereEmails(emails);
                Contatos.excluiContato('email');

                let rowsEmails = Contatos.getTableRowsEmails();
                expect(rowsEmails.count()).toBe(emails.length-1);
                expect(Contatos.form.isPresent()).toBe(false);
            });

            it('deve editar e-mail', () => {
                let emails = DadosCadastro.cadastro.dadosPessoais.contatos.emails;
                let emailNovo = "NOVOEMAIL@TESTE.COM";
                let novoTipo = "COMERCIAL";

                Contatos.insereEmails(emails);
                Contatos.editaContato('email');
                expect(Contatos.form.isDisplayed()).toBe(true);

                Contatos.enderecoEmail.clear();
                Contatos.enderecoEmail.sendKeys(emailNovo);
                Contatos.setTipoEmail(novoTipo);
                Contatos.botaoSalvar.click();

                let tableRows = Contatos.getTableRowsEmails();
                let labelNovoEmail = tableRows.all(by.binding('contato.endereco')).first();
                let labelNovoTipo = tableRows.all(by.binding('contato.tipoEmail')).first();

                expect(labelNovoEmail.getText()).toEqual(emailNovo);
                expect(labelNovoTipo.getText()).toEqual(novoTipo);
                expect(tableRows.count()).toBe(emails.length);
                expect(Contatos.form.isPresent()).toBe(false);
            });

        });

        describe('Geral', function () {

            it('deve mostrar mensagem de lista vazia inicialmente', () => {
                let tableRowsTelefones = Contatos.getTableRowsTelefones();
                let tableRowsEmails = Contatos.getTableRowsEmails();

                expect(Contatos.listaVazia.isDisplayed()).toBe(true);
                expect(tableRowsTelefones.count()).toEqual(0);
                expect(tableRowsEmails.count()).toEqual(0);
            });

            it('deve remover todos os contatos', () => {
                let telefones = DadosCadastro.cadastro.dadosPessoais.contatos.fones, 
                    emails = DadosCadastro.cadastro.dadosPessoais.contatos.emails;

                Contatos.insereTelefones(telefones);
                Contatos.insereEmails(emails);

                for (let i = 0; i < telefones.length; i++) Contatos.excluiContato('telefone');
                for (let i = 0; i < emails.length; i++) Contatos.excluiContato('email');

                let contatos = 0;
                Contatos.getTableRowsTelefones().count().then((count) => {
                    contatos += count;
                });
                Contatos.getTableRowsEmails().count().then((count)=> {
                    contatos += count;
                });

                expect(contatos).toBe(0);
                expect(Contatos.form.isPresent()).toBe(false);
                expect(Contatos.listaVazia.isDisplayed()).toBe(true);
            });

        });
    });

});
