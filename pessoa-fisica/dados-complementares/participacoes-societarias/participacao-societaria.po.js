let CpfCnpj = require('../../../comum/cpfCnpj');
let Modal = require('../../../comum/modal');

class ParticipacaoSocietaria {
    constructor() {
        this.sessao = element(by.css('[titulo="Participações Societárias"]'));

        this.cnpj = element(by.id('participacaoSocietariaCNPJ'));
        this.nome = element(by.model('$ctrl.participacaoSocietaria.nome'));
        this.percentualParticipacao = element(by.model('$ctrl.participacaoSocietaria.percentualParticipacao'));
        this.funcaoCargo = element(by.model('$ctrl.participacaoSocietaria.funcaoCargo'));

        this.botaoSalvar = element(by.id('adicionarParticipacaoSocietaria'));
        this.botaoCancelar = element(by.id('cancelarParticipacaoSocietaria'));
        this.botaoNovo = element(by.id('novoParticipacaoSocietaria'));
        this.listaVazia = element(by.css('lista-participacao-societaria>div.listaVazia'));

        this.tamanhoDosCampos = {
            nome: 40
        }
    }

    acessaPagina(cpf) {
        cpf = cpf || '51404821341';
        browser.get('#/cadastro/terceiro/' + cpf + '/dados-complementares');
    }

    abreSessao(){
        return this.sessao.click();
    }

    setFuncaoCargo(texto) {
        texto = texto || 'SÓCIO/ADMINISTRADOR';
        this.funcaoCargo.element(by.cssContainingText('option', texto)).click();
    }

    preencherCamposObrigatorios(participacaoSocietaria, id) {
        id = id || "";
        this.cnpj.sendKeys(participacaoSocietaria.cnpj || "70.811.846/0001-97");
        this.nome.sendKeys(participacaoSocietaria.nome || ('Empresa ' + id));
        this.percentualParticipacao.sendKeys(participacaoSocietaria.participacao || '1500');
        this.setFuncaoCargo(participacaoSocietaria.funcaoCargo);
    }

    insereMultiplos(participacoesSocietarias){
        let cnpjs = []
        for (var i = 0; i < participacoesSocietarias.length; i++) {
            let cnpj = participacoesSocietarias[i].cnpj;
            this.botaoNovo.click();
            this.preencherCamposObrigatorios(participacoesSocietarias[i], i);
            this.botaoSalvar.click();
            cnpjs.push(cnpj);
        }
        return cnpjs;
    }

    getTableRows(){
        return element.all(by.repeater('(index, participacaoSocietaria) in $ctrl.participacoesSocietarias'));
    }

    excluirContato(){
        let tableRows = this.getTableRows();

        let botaoExcluir = tableRows.all(by.css('button[title="Remover"]')).first();
            botaoExcluir.click().then(()=>{
                let btnConfirma = Modal.getModalBtn();
                    btnConfirma.click();
            });
    }

    editarParticipacaoSocietaria(cnpj){
        let tableRows = this.getTableRows(),
            botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();

        botaoEditar.click();
        this.cnpj.clear();
        this.cnpj.sendKeys(cnpj);
        this.botaoSalvar.click();
    }

}
module.exports = new ParticipacaoSocietaria();
