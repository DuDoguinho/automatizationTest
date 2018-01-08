let Data = require('../../../comum/data');
let Modal = require('../../../comum/modal');
class Seguro {
    constructor() {
        this.sessao = element(by.css('[titulo="Seguros"]'));

        this.tipoSeguro = element(by.id('tipoSeguro'));
        this.seguradora = element(by.id('seguradora'));
        this.vencimento = element(by.model('$ctrl.seguro.dataVencimento'));
        this.valorSeguro = element(by.model('$ctrl.seguro.valorSeguro'));
        this.valorSegurado = element(by.model('$ctrl.seguro.valorSegurado'));
        this.apolice = element(by.model('$ctrl.seguro.apolice'));
        this.corretora = element(by.model('$ctrl.seguro.corretora'));

        this.botaoSalvar = element(by.id('adicionarSeguro'));
        this.botaoCancelar = element(by.id('cancelarSeguro'));
        this.botaoNovo = element(by.id('novoSeguro'));
        this.listaVazia = element(by.css('lista-seguros>div.listaVazia'));

        this.formulario = element(by.css('dados-seguro[seguro="$ctrl.seguro"]'));
        
        this.tamanhoDosCampos = {
            valorSeguro: 15,
            valorSegurado: 15,
            apolice: 20,
            corretora: 25
        }
    }

    acessaPagina(cpf) {
        cpf = cpf || '51404821341';
        browser.get('#/cadastro/terceiro/' + cpf + '/dados-complementares');
    }

    abreSessao(){
        return this.sessao.click();
    }

    setTipoSeguro(texto) {
        texto = texto || 'Seguro Saúde';
        this.tipoSeguro.element(by.cssContainingText('option', texto)).click();
    }

    setSeguradora(texto) {
        texto = texto || 'ALLIANZ SEGUROS S.A.';
        this.seguradora.element(by.cssContainingText('option', texto)).click();
    }

    preencherCamposObrigatorios(id) {
        id = id || "";
        this.setTipoSeguro();
        this.setSeguradora();
        this.vencimento.sendKeys(Data.dataAtual());
        this.valorSeguro.sendKeys('25000');
        this.valorSegurado.sendKeys('30000000');
        this.apolice.sendKeys('9999999' + id);
        this.corretora.sendKeys('Corretora ' + id);
    }

    insereMultiplos(total){
        for (var i = 0; i < total; i++) {
            this.botaoNovo.click();
            this.preencherCamposObrigatorios(i);
            this.botaoSalvar.click();
        }
    }

    getTableRows(){
        return element.all(by.repeater('(index, seguro) in $ctrl.seguros'));
    }

    excluir(){
        let tableRows = this.getTableRows();

        let botaoExcluir = tableRows.all(by.css('button[title="Remover"]')).first();
            botaoExcluir.click().then(()=>{
                let btnConfirma = Modal.getModalBtn();
                    btnConfirma.click();
            });
    }

    editarReferencia(valorSegurado){
        let tableRows = this.getTableRows(),
            botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();

        botaoEditar.click();
        this.valorSegurado.clear();
        this.valorSegurado.sendKeys(valorSegurado);
        this.botaoSalvar.click();
    }

}
module.exports = new Seguro();
