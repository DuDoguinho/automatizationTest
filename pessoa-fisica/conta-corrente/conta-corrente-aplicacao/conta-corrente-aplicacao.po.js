class ContaAplicacao{
    constructor(){
        this.sessao = element(by.css('[titulo="Aplicação"]'));
        
        this.resgateAutomatico = this.sessao.element(by.model('$ctrl.aplicacaoFinanceira.resgateAutomatico'));
        this.carenciaChequeEspecial = this.sessao.element(by.model('$ctrl.aplicacaoFinanceira.considerarCarenciaChequeEspecial'));
    }

    abreSessao(){
        return this.sessao.click();
    }

    clicaResgateAutomatico(){
        return this.resgateAutomatico.click();
    }

    clicaCarenciaChequeEspecial(){
        return this.carenciaChequeEspecial.click();
    }
}

module.exports = new ContaAplicacao();