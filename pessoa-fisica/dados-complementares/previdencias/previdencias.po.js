let Data = require('../../../comum/data');
let Modal = require('../../../comum/modal');
class Previdencia {
    constructor() {
        this.sessao = element(by.css('[titulo="Previdências"]'));

        this.tipoPrevidencia = element(by.id('tipoPrevidencia'));
        this.instituicao = element(by.model('$ctrl.previdencia.instituicao'));
        this.valorContribuicao = element(by.model('$ctrl.previdencia.valorContribuicao'));
        this.valorMontante = element(by.model('$ctrl.previdencia.valorMontante'));
        this.dataInicioContribuicao = element(by.model('$ctrl.previdencia.dataInicioContribuicao'));
        this.mesesContribuicao = element(by.model('$ctrl.previdencia.mesesContribuicao'));
        this.numeroDependentesSemPlano = element(by.model('$ctrl.previdencia.numeroDependentesSemPlano'));
        this.numeroProposta = element(by.model('$ctrl.previdencia.numeroProposta'));
        this.possuiDependente = element(by.model('$ctrl.previdencia.possuiDependente'));

        this.botaoSalvar = element(by.id('salvarPrevidencia'));
        this.botaoCancelar = element(by.id('cancelarPrevidencia'));
        this.botaoNovo = element(by.id('novaPrevidencia'));
        this.listaVazia = element(by.css('lista-previdencias>div.listaVazia'));

        this.tamanhoDosCampos = {
            valorContribuicao: 15,
            valorMontante: 15,
            numeroDependentesSemPlano: 3,
            numeroProposta: 12
        }
    }

    acessaPagina(cpf) {
        cpf = cpf || '51404821341';
        browser.get('#/cadastro/terceiro/' + cpf + '/dados-complementares');
    }

    abreSessao(){
        return this.sessao.click();
    }

    setTipoPrevidencia(texto) {
        texto = texto || 'Complementar';
        this.tipoPrevidencia.element(by.cssContainingText('option', texto)).click();
    }

    setInstituicao(texto) {
        texto = texto || 'Banco Itaú';
        this.instituicao.element(by.cssContainingText('option', texto)).click();
    }

    preencherCamposObrigatorios(id) {
        id = id || "";
        this.setTipoPrevidencia();
        this.setInstituicao();
        this.valorContribuicao.sendKeys('68000'+id);
        this.valorMontante.sendKeys('25000'+id);
        this.dataInicioContribuicao.sendKeys(Data.dataAtual());
        this.numeroDependentesSemPlano.sendKeys('5');
        this.numeroProposta.sendKeys('123' + id);
        this.possuiDependente.click();
    }

    insereMultiplos(total){
        for (var i = 0; i < total; i++) {
            this.botaoNovo.click();
            this.preencherCamposObrigatorios(i);
            this.botaoSalvar.click();
        }
    }

    getTableRows(){
        return element.all(by.repeater('(index, previdencia) in $ctrl.previdencias'));
    }

    excluir(){
        let tableRows = this.getTableRows();

        let botaoExcluir = tableRows.all(by.css('button[title="Remover"]')).first();
            botaoExcluir.click().then(()=>{
                let btnConfirma = Modal.getModalBtn();
                    btnConfirma.click();
            });
    }

    editar(valorContribuicao){
        let tableRows = this.getTableRows(),
            botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();

        botaoEditar.click();
        this.valorContribuicao.clear();
        this.valorContribuicao.sendKeys(valorContribuicao);
        this.botaoSalvar.click();
    }

}
module.exports = new Previdencia();
