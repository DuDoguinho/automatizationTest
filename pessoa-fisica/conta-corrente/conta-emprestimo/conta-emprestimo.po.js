class ContaEmprestimo{
    constructor(){
        this.sessao = element(by.css('[titulo="Emprestimo"]'));
        
        this.amortizacaoAutomatica = this.sessao.element(by.model('$ctrl.indicadoresEmprestimo.amortizacaoAutomatica'));
        this.liberacaoAutomatica = this.sessao.element(by.model('$ctrl.indicadoresEmprestimo.liberacaoAutomatica'));
        this.contratoPreAprovado = this.sessao.element(by.model('$ctrl.indicadoresEmprestimo.contratoPreAprovado'));
    }

    abreSessao(){
        return this.sessao.click();
    }

    clicaAmortizacao(){
        return this.amortizacaoAutomatica.click();
    }

    clicaLiberacaoAutomatica(){
        return this.liberacaoAutomatica.click();
    }

    clicaPreAprovado(){
        return this.contratoPreAprovado.click();
    }
}

module.exports = new ContaEmprestimo();