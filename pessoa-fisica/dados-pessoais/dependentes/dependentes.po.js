let Data = require('../../../comum/data');
let Modal = require('../../../comum/modal');
let CpfCnpj = require('../../../comum/cpfCnpj');

class Dependente {
    constructor() {
        this.sessao = element(by.css('[titulo="Dependentes"]'));

        this.form = this.sessao.element(by.css('dados-dependente[dependente="$ctrl.dependente"]'));
        this.cpf = element(by.id('dependenteCPF'));
        this.nomeCompleto = element(by.model('$ctrl.dependente.nomeCompleto'));
        this.dataNascimento = element(by.model('$ctrl.dependente.dataNascimento'));
        this.tipoDependencia = element(by.model('$ctrl.dependente.tipoDependencia'));
        this.valorRenda = element(by.model('$ctrl.dependente.valorRenda'));
        this.valorPensao = element(by.model('$ctrl.dependente.valorPensao'));

        this.botaoSalvar = element(by.id('salvarDependente'));
        this.botaoCancelar = element(by.id('cancelarDependente'));
        this.botaoNovo = element(by.id('novoDependente'));
        this.listaVazia = element(by.css('lista-dependentes>div.listaVazia'));

        this.byColunaCpf = by.binding('dependente.cpf | brCpf');
        this.byColunaNome = by.binding('dependente.nomeCompleto');
        this.byColunaNascimento = by.binding("dependente.dataNascimento.format('DD/MM/YYYY')");

        this.tamanhoDosCampos = {
            nomeCompleto: 65,
            vlRenda: 15,
            vlPensao: 15
        }
    }

    acessaPagina(cpf) {
        cpf = cpf || '51404821341';
        browser.get('#/cadastro/terceiro/' + cpf + '/dados-pessoais');
    }

    abreSessao(){
        return this.sessao.click();
    }

    clicaNovo(){
        return this.botaoNovo.click();
    }

    clicaSalvar(){
        return this.botaoSalvar.click();
    }

    setTipoDependencia(texto) {
        texto = texto || '51 - Incapaz';
        this.tipoDependencia.element(by.cssContainingText('option', texto)).click();
    }

    preencherCamposObrigatorios(id, dependente) {
        id = id || "";
        this.cpf.sendKeys(dependente.cpf, CpfCnpj.getCPF());
        this.nomeCompleto.sendKeys(dependente.nome || 'NOME COMPLETO ' + id);
        this.dataNascimento.sendKeys(dependente.dataNasc || Data.dataAtual());
        this.setTipoDependencia(dependente.tipo);
        this.valorRenda.sendKeys(dependente.valorRenda || 'R$ 80,92');
        this.valorPensao.sendKeys(dependente.valorPensao || 'R$ 401,32');
    }

    insereMultiplos(arrDadosJson){        
        for (var i = 0; i < arrDadosJson.length; i++) {
            this.botaoNovo.click();
            this.preencherCamposObrigatorios(i, arrDadosJson[i]);
            this.botaoSalvar.click();
        }
    }

    getTableRows(){
        return element.all(by.repeater('(index, dependente) in $ctrl.dependentes'));
    }

    excluir(){
        let tableRows = this.getTableRows();

        let botaoExcluir = tableRows.all(by.css('button[title="Remover"]')).first();
            botaoExcluir.click().then(()=>{
                let btnConfirma = Modal.getModalBtn();
                    btnConfirma.click();
            });
    }

    editar(dependente){
        let tableRows = this.getTableRows(),
            botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();

        botaoEditar.click();
        if(dependente.cpf){
            this.cpf.clear();
            this.cpf.sendKeys(dependente.cpf);
        }
        if(dependente.nome){
            this.nomeCompleto.clear();
            this.nomeCompleto.sendKeys(dependente.nome);
        }
        if(dependente.dataNasc){
            this.dataNascimento.clear()
            this.dataNascimento.sendKeys(dependente.dataNasc);
        }
        if(dependente.tipo){
            this.tipoDependencia.sendKeys(dependente.tipo);
        }
        if(dependente.valorRenda){
            this.valorRenda.clear();
            this.valorRenda.sendKeys(dependente.valorRenda);
        }
        if(dependente.valorPensao){
            this.valorPensao.clear();
            this.valorPensao.sendKeys(dependente.valorPensao);
        }        
        this.botaoSalvar.click();
    }

}
module.exports = new Dependente();
