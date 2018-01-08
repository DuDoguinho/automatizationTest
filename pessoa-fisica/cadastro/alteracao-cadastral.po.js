class AlteracaoCadastral {
    constructor(cpf) {
        cpf = cpf.replace('.', '').replace('.', '').replace('-', '')
        this.renda = element(by.css('a[href="#/alteracao/pessoa-fisica/' + cpf + '/renda"]'));
        this.endereco = element(by.css('a[href="#/alteracao/pessoa-fisica/' + cpf + '/endereco"]'));
        this.dependentes = element(by.css('a[href="#/alteracao/pessoa-fisica/' + cpf + '/dependentes"]'));
        this.estadoCivil = element(by.css('a[href="#/alteracao/pessoa-fisica/' + cpf + '/estado-civil"]'));
        this.veiculos = element(by.css('a[href="#/alteracao/pessoa-fisica/' + cpf + '/veiculos"]'));
        this.imoveis = element(by.css('a[href="#/alteracao/pessoa-fisica/' + cpf + '/imoveis"]'));
        this.dadosProfissionais = element(by.css('a[href="#/alteracao/pessoa-fisica/' + cpf + '/dados-profissionais"]'));
        this.cartaoAutografo = element(by.css('a[href="#/alteracao/pessoa-fisica/' + cpf + '/cartao-autografo"]'));
        this.dadosPessoais = element(by.css('a[href="#/alteracao/pessoa-fisica/' + cpf + '/dados-pessoais"]'));
        this.dadosComplementares = element(by.css('a[href="#/alteracao/pessoa-fisica/' + cpf + '/dados-complementares"]'));
        this.produtos = element(by.css('a[href="#/alteracao/pessoa-fisica/' + cpf + '/produtos"]'));
        this.contaCorrente = element(by.css('a[href="#/alteracao/pessoa-fisica/' + cpf + '/conta-corrente"]'));
        this.matricula = element(by.css('a[href="#/alteracao/pessoa-fisica/' + cpf + '/matricula"]'));
        this.analiseCadastral = element(by.css('a[href="#/alteracao/pessoa-fisica/' + cpf + '/analise-cadastral"]'));
        this.dadosPessoais = element(by.id('simple-btn-keyboard-nav'));

        this.cpfModal = element(by.id('cpfField'));
        this.buscar = element(by.css('modal-cpf')).element(by.css('button.btn-confirmacao'));
        this.matriculaSearchBtn = element(by.css('label[uib-btn-radio="\'MATRICULA\'"]'));
        this.contaSearchBtn = element(by.css('label[uib-btn-radio="\'CONTA\'"]'));
        this.matContaSearchField = element(by.css('input[name="buscaMatConta"]'));        
    }

    buscaCpf(cpf_) {
        return this.cpfModal.sendKeys(cpf_).then(() => {
            return this.buscar.click();
        });
    }

    buscaMatricula(matricula) {
        return this.matriculaSearchBtn.click().then(()=>{
            this.matContaSearchField.sendKeys(matricula);
            return this.buscar.click();
        });
    }

    buscaConta(conta){
        return this.contaSearchBtn.click().then(()=>{
            this.matContaSearchField.sendKeys(conta);
            return this.buscar.click();
        });        
    }

    navegaParaRenda() {
        this.renda.click();
    }

    clicaSecao(texto, cpf){
        return this.dadosPessoais.click().then(()=>{
            return element(by.css('a[href="#/alteracao/pessoa-fisica/'+cpf.replace('.', '').replace('.', '').replace('-', '')+'/'+texto+'"]')).click();
        });
    }
}

module.exports = AlteracaoCadastral;