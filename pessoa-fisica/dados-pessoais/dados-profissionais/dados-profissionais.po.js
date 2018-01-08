let Combobox = require('../../../widgets/combobox.js');

class DadosProfissionais {
    constructor() {
        this.dadosProfissionais = element(by.css('a[href="#/alteracao/pessoa-fisica/81220011657/dados-profissionais"]'));
        this.sessao = element(by.css('[titulo="Dados Profissionais"]'));
        this.grauInstrucao = this.sessao.element(by.model('$ctrl.profissional.grauInstrucao'));
        this.grauInstrucaoRepeater = "instrucao in $ctrl.instrucoes";
        this.profissao = this.sessao.element(by.model('$ctrl.profissional.profissao'));
        this.profissaoRepeater = 'profissao in $select.items';        
        
        this.categoria = this.sessao.element(by.model('$ctrl.profissional.especialidade'));
        this.categoriaRepeater = 'especialidade in $select.items';
        
        this.inicioProfissional = this.sessao.element(by.model('$ctrl.profissional.inicioProfissional'));
        this.mesesProfissao = this.sessao.element(by.model('$ctrl.profissional.mesesProfissao'));
        this.nrRegistroProfissional = this.sessao.element(by.model('$ctrl.profissional.nrRegistroProfissional'));
        this.cdOrgaoResponsavel = this.sessao.element(by.model('$ctrl.profissional.cdOrgaoResponsavel'));
        this.cdOrgaoResponsavelRepeater = 'orgao in $select.items';
        this.ufRegistro = this.sessao.element(by.model('$ctrl.profissional.ufRegistro'));
        this.ufRegistroRepeater = 'estado in $ctrl.estados';
        this.cpfModal = element(by.model("$ctrl.cpfModal"));
        this.buscar = element(by.css('.uni-btns btn-confirmacao btn-sm'));
    
        
        this.tamanhoDosCampos = {
            nrRegistroProfissional: 15
        }
    }

    acessaPagina() {
        browser.get('#/cadastro/terceiro/51404821341/dados-pessoais/');
    }

    abreSessao(){
        return this.sessao.click();
    }

    preencheObrigatorios(dadosProfissionaisJson){                
        this.grauInstrucao.element(by.cssContainingText('option', dadosProfissionaisJson.grauInstrucao || 'Doutorado')).click();
        Combobox.clickFirst(this.profissao,this.profissaoRepeater, dadosProfissionaisJson.profissao || 'MUSICO');        
        Combobox.clickFirst(this.categoria,'especialidade in $select.items', dadosProfissionaisJson.categoria || 'MUSICO');
        this.nrRegistroProfissional.sendKeys('123456');
    }
    
    acessaUpdate(cpf){
        cpf = cpf || '39533772808';
        browser.get('#/alteracao/pessoa-fisica/' + cpf + '/dados-profissionais');
       
    }

    setGrauInstrucao(texto) {
        this.grauInstrucao.element(by.cssContainingText('option', texto || 'Mestrado')).click();
    }

    setProfissao(texto) {
       Combobox.clickFirst(this.profissao,this.profissaoRepeater,texto || 'VICE REITOR');
    }

    setCategoria(texto) {
        Combobox.clickFirst(this.categoria,this.categoriaRepeater,texto || 'NEUROLOGISTA');
    }

    preenchenrRegistroProfissional(valor) {
        valor = valor || '8888';
        this.nrRegistroProfissional.clear();
        this.nrRegistroProfissional.sendKeys(valor);
        
    }

    setcdOrgaoResponsavel(texto){
        Combobox.clickFirst(this.cdOrgaoResponsavel,this.cdOrgaoResponsavelRepeater,texto || 'CRTR');
    
    }

    setufRegistro(texto) {
        this.ufRegistro.element(by.cssContainingText('option', texto || 'RJ')).click();
    }

}
module.exports = new DadosProfissionais();
