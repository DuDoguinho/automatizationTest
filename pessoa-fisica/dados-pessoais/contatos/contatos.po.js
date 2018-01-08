let Modal = require('../../../comum/modal');

class Contatos {
    constructor() {
        this.sessao = element(by.css('[titulo="Contatos"]'));
        this.form = this.sessao.element(by.css('form[name="formContatos"]'));
        this.tipoSelecionado = element(by.id('pessoaisTipoContato'));

        this.tipoTelefone = this.sessao.element(by.model('$ctrl.telefone.tipoTelefone'));
        this.numeroTelefone = this.sessao.element(by.model('$ctrl.telefone.numero'));
        this.obsTelefone = this.sessao.element(by.model('$ctrl.telefone.observacao'));
        this.sms = this.sessao.element(by.model('$ctrl.telefone.podeEnviarSMS'));

        this.tipoEmail = this.sessao.element(by.model('$ctrl.contato.tipoEmail'));
        this.enderecoEmail = this.sessao.element(by.model('$ctrl.contato.endereco'));
        this.obsEmail = this.sessao.element(by.model('$ctrl.contato.observacao'));

        this.botaoNovo = element(by.id('pessoaisnovoContato'));
        this.botaoSalvar = this.sessao.element(by.id('pessoaissalvarContato'));
        this.botaoCancelar = this.sessao.element(by.id('pessoaiscancelarContato'));
        this.listaVazia = this.sessao.element(by.css('lista-contato>div.listaVazia'));

        this.byColunaTipoTelefone = by.binding('contato.tipoTelefone');

        this.tamanhoDosCampos = {
            numeroTelefone: 11,
            obsTelefone: 40,
            enderecoEmail: 60,
            obsEmail: 255
        }
    }
    salvar() {
        return this.botaoSalvar.click();
    }

    acessaPagina(cpf) {        
        browser.get('#/cadastro/terceiro/'+cpf.replace('.','').replace('.','').replace('-','')+'/dados-pessoais/');
    }

    abreSessao() {
        return this.sessao.click();
    }

    setTipoContato(texto) {
        texto = texto || 'Telefone';
        return this.tipoSelecionado.element(by.cssContainingText('option', texto)).click();
    }

    setTipoTelefone(texto) {
        texto = texto || 'RESIDENCIAL';
        return this.tipoTelefone.element(by.cssContainingText('option', texto)).click();
    }

    setTipoEmail(texto) {
        texto = texto || 'PESSOAL';
        return this.tipoEmail.element(by.cssContainingText('option', texto)).click();
    }

    getTableRowsTelefones() {
        return element.all(by.repeater('(index, contato) in $ctrl.contatos.telefones'));
    }

    getTableRowsEmails() {
        return element.all(by.repeater('(index, contato) in $ctrl.contatos.emails'));
    }

    preencherTodosTelefone(id, foneJson) {
        id = id || '';
        this.setTipoContato('Telefone');
        this.setTipoTelefone(foneJson.tipo);
        this.numeroTelefone.sendKeys(foneJson.ddd);
        this.numeroTelefone.sendKeys(foneJson.fone);
        this.obsTelefone.sendKeys(foneJson.observacoes || ('Observação telefone ' + id));
    }

    preencherTodosEmail(id, emailJson) {
        id = id || '';
        this.setTipoContato('E-mail');
        this.setTipoEmail(emailJson.tipo);
        this.enderecoEmail.sendKeys(emailJson.contato || 'emailDoFulano@a.com');
        this.obsEmail.sendKeys(emailJson.observacoes || ('Observação e-mail ' + id));
    }

    insereTelefones(fones) {
        if (fones.length > 0) {
            for (let i = 0; i < fones.length; i++) {
                this.botaoNovo.click();
                this.preencherTodosTelefone(i, fones[i]);
                this.botaoSalvar.click();
            }
        } else {
            console.log("Nenhum email inserido.");
        }
    }

    insereEmails(emails) {
        if (emails.length > 0) {
            for (let i = 0; i < emails.length; i++) {
                this.botaoNovo.click();
                this.preencherTodosEmail(i, emails[i]);
                this.botaoSalvar.click();
            }
        } else {
            console.log("Nenhum email inserido.");
        }
    }

    excluiContato(tipo) {
        let tableRows = (tipo == 'telefone') ? this.getTableRowsTelefones() : this.getTableRowsEmails();

        let botaoExcluir = tableRows.all(by.css('button[title="Remover"]')).first();
        botaoExcluir.click().then(() => {
            let btnConfirma = Modal.getModalBtn();
            btnConfirma.click();
        });
    }

    editaContato(tipo) {
        let tableRows = (tipo == 'telefone') ? this.getTableRowsTelefones() : this.getTableRowsEmails();

        let botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();
        botaoEditar.click();
    }
}
module.exports = new Contatos();