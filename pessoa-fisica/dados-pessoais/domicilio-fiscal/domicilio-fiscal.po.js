let Modal = require('../../../comum/modal');

class DomicilioFiscal{
    constructor(){
        this.secao = element(by.css('[titulo="Domicílio Fiscal"]'));

        this.pais = element(by.model('$ctrl.pais'));
        this.nrIdentificacao = element(by.model('$ctrl.domicilio.numeroIdentificacao'));
        this.observacoes = element(by.model('$ctrl.domicilio.observacao'));
        this.cpfTitular = element(by.model('$ctrl.cpfCnpjNome.cpf'));

        this.btnSalvar = element(by.id('salvartitular'));
        this.btnCancelar =  element(by.id('cancelartitular'));
        this.btnNovo =  element(by.id('novoDomicilio'));

        this.byColunaPais = by.binding('domicilio.siglaPais.descricao');
        this.byColunaNrIdentificacao = by.binding('domicilio.numeroIdentificacao');
        this.byColunaObservacoes = by.binding('domicilio.observacao');
        
        this.listaVazia = element(by.css('lista-domicilios>div.listaVazia'));

        this.tamanoDosCampos = {
            nrIdentificacao: 12,
            observacoes: 200
        }
    }
        
    acessaPagina(cpf) {
        let _cpf = cpf || '51404821341';
        browser.get('#/cadastro/terceiro/'+_cpf.replace('.','').replace('.','').replace('-','')+'/dados-pessoais/');
    }

    abreSecao(){
        return this.secao.click();
    }

    getTableRows() {
        return element.all(by.repeater('(index, domicilio) in $ctrl.domicilios'));
    }

    editar() {
        let tableRows = this.getTableRows(),
            botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();
        botaoEditar.click();
    }

    excluir() {
        let tableRows = this.getTableRows(),
            botaoExcluir = tableRows.all(by.css('button[title="Remover"]')).first();

        botaoExcluir.click().then(() => {
            let btnConfirma = Modal.getModalBtn();
            btnConfirma.click();
        });
    }

    clicaNovo(){
        this.btnNovo.click();
    }

    clicaSalvar(){
        return this.btnSalvar.click();
    }

    clicaCancelar(){
        this.btnCancelar.click();
    }

    setPais(texto) {
        var paisSelecionado = this.pais.element(by.css('.ui-select-search'));
        this.pais.click();
        paisSelecionado.sendKeys(texto);      
        element.all(by.css('.ui-select-choices-row-inner span')).first().click();
    }

    preencheIdentificacao(texto){
        let text = texto || '22222222'
        this.nrIdentificacao.sendKeys(text);
    }

    preencheObservacao(texto){
        let text = texto || 'Observacao Identificacao'
        this.observacoes.sendKeys(text);
    }
}

module.exports = new DomicilioFiscal();