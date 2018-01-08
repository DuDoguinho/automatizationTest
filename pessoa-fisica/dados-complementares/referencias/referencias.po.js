let Modal = require('../../../comum/modal');

class Referencia {
    constructor() {
        this.sessao = element(by.css('[titulo="Referências"]'));

        this.nomeBancoEmpresa = element(by.model('$ctrl.referencia.nomeBancoEmpresa'));
        this.agenciaLoja = element(by.id('referenciaAgenciaLoja'));

        this.telefone = element(by.css('dados-telefone[telefone="$ctrl.referencia.telefone"]'));
        this.tipoTelefone = this.telefone.element(by.model('$ctrl.telefone.tipoTelefone'));
        this.numero = this.telefone.element(by.model('$ctrl.telefone.numero'));
        this.observacao = this.telefone.element(by.model('$ctrl.telefone.observacao'));

        this.botaoSalvar = element(by.id('salvarReferencia'));
        this.botaoCancelar = element(by.id('cancelarReferencia'));
        this.botaoNovo = element(by.id('novaReferencia'));
        this.listaVazia = element(by.css('lista-referencia>div.listaVazia'));

        this.tamanhoDosCampos = {
            nomeBancoEmpresa: 40,
            agenciaLoja: 30,
            observacao: 40
        }
    }

    acessaPagina(cpf) {
        cpf = cpf || '51404821341';
        browser.get('#/cadastro/terceiro/' + cpf + '/dados-complementares');
    }

    abreSessao(){
        return this.sessao.click();
    }

    setTipoTelefone(texto) {
        texto = texto || 'COMERCIAL';
        this.tipoTelefone.element(by.cssContainingText('option', texto)).click();
    }

    preencherCamposObrigatorios(id) {
        id = id || "";
        this.nomeBancoEmpresa.sendKeys('Referência ' + id);
        this.agenciaLoja.sendKeys('Agência/Loja ' + id);
        this.setTipoTelefone();
        this.numero.sendKeys('51879878979');
        this.observacao.sendKeys('Observação ' + id);
    }

    insereMultiplos(total){
        for (var i = 0; i < total; i++) {
            this.botaoNovo.click();
            this.preencherCamposObrigatorios(i);
            this.botaoSalvar.click();
        }
    }

    getTableRows(){
        return element.all(by.repeater('(index, referencia) in $ctrl.referencias'));
    }

    excluirContato(){
        let tableRows = this.getTableRows();

        let botaoExcluir = tableRows.all(by.css('button[title="Remover"]')).first();
            botaoExcluir.click().then(()=>{
                let btnConfirma = Modal.getModalBtn();
                    btnConfirma.click();
            });
    }

    editarReferencia(nomeBancoEmpresa){
        let tableRows = this.getTableRows(),
            botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();

        botaoEditar.click();
        this.nomeBancoEmpresa.clear();
        this.nomeBancoEmpresa.sendKeys(nomeBancoEmpresa);
        this.botaoSalvar.click();
    }

}
module.exports = new Referencia();
