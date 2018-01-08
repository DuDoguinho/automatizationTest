let Data = require('../../../comum/data');
let Modal = require('../../../comum/modal');
class PlanoSaude {
    constructor() {
        this.sessao = element(by.css('[titulo="Planos de Saúde"]'));

        this.tipoPlanoSaude = element(by.id('tipoPlanoSaude'));
        this.instituicaoSaude = element(by.model('$ctrl.planoDeSaude.instituicaoSaude'));
        this.valorMensal = element(by.model('$ctrl.planoDeSaude.valorMensal'));
        this.tipoCobertura = element(by.model('$ctrl.planoDeSaude.tipoCobertura'));
        this.dataVencimento = element(by.model('$ctrl.planoDeSaude.dataVencimento'));

        this.botaoSalvar = element(by.id('adicionarPlanoDeSaude'));
        this.botaoCancelar = element(by.id('cancelarPlanoDeSaude'));
        this.botaoNovo = element(by.id('novoPlanoDeSaude'));
        this.listaVazia = element(by.css('lista-planos-de-saude>div.listaVazia'));
    
        this.tamanhoDosCampos = {
            vlMensal: 15
        }
    }

    acessaPagina(cpf) {
        cpf = cpf || '51404821341';
        browser.get('#/cadastro/terceiro/' + cpf + '/dados-complementares');
    }

    abreSessao(){
        return this.sessao.click();
    }

    setTipoPlano(texto) {
        texto = texto || 'Médico';
        this.tipoPlanoSaude.element(by.cssContainingText('option', texto)).click();
    }

    setInstituicao(texto) {
        texto = texto || 'Golden Cross';
        this.instituicaoSaude.element(by.cssContainingText('option', texto)).click();
    }

    setCobertura(texto) {
        texto = texto || 'Completa';
        this.tipoCobertura.element(by.cssContainingText('option', texto)).click();
    }

    preencherCamposObrigatorios(id) {
        id = id || "";
        this.setTipoPlano();
        this.setInstituicao();
        this.valorMensal.sendKeys('25000'+id);
        this.setCobertura();
        this.dataVencimento.sendKeys(Data.dataAtual());
    }

    insereMultiplos(total){
        for (var i = 0; i < total; i++) {
            this.botaoNovo.click();
            this.preencherCamposObrigatorios(i);
            this.botaoSalvar.click();
        }
    }

    getTableRows(){
        return element.all(by.repeater('(index, plano) in $ctrl.planosSaude'));
    }

    excluir(){
        let tableRows = this.getTableRows();

        let botaoExcluir = tableRows.all(by.css('button[title="Remover"]')).first();
            botaoExcluir.click().then(()=>{
                let btnConfirma = Modal.getModalBtn();
                    btnConfirma.click();
            });
    }

    editarReferencia(valorMensal){
        let tableRows = this.getTableRows(),
            botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();

        botaoEditar.click();
        this.valorMensal.clear();
        this.valorMensal.sendKeys(valorMensal);
        this.botaoSalvar.click();
    }

}
module.exports = new PlanoSaude();
