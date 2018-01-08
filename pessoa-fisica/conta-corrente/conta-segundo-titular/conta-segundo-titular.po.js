class ContaSegundoTitular {
    constructor(){
        this.secao = element(by.css('[titulo="Vincular 2º Titular"]'));
    
        this.matricula = element(by.model('$ctrl.titular.matricula'));
        this.cpfSegundoTitular = element(by.model('$ctrl.titular.cpfCnpj'));
        this.nomeCompleto = element(by.model('$ctrl.titular.nome'));

        this.btnNovo = element(by.id('novoDependente'));
        this.btnSalvar = element(by.id('salvartitular'));
    }

    abreSecao(){
        return this.secao.click();
    }

    clicaNovo(){
        this.btnNovo.click();
    }

    clicaSalvar(){
        this.btnSalvar.click();
    }
}

module.exports = new ContaSegundoTitular();