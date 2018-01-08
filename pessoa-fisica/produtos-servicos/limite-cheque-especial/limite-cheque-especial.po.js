class LimiteChequeEspecial{
    constructor(){
        this.secao = element(by.css('nova-sessao[titulo="Limite Cheque Especial"]'));
        this.linhaCredito = element(by.model('$ctrl.limiteChequeEspecial.selected'));
        this.taxaAm = element(by.model('$ctrl.limiteChequeEspecial.taxa'));
        this.valor = element(by.model('$ctrl.limiteChequeEspecial.valorSolicitado'));
        this.tipoVencimento = element(by.model('$ctrl.limiteChequeEspecial.tipoVencimento'));
        this.finalidade = element(by.model('$ctrl.limiteChequeEspecial.finalidade'));

        this.btnSalvar = element(by.id('btnSalvar'));
        this.mensagemSucesso = element(by.css('mensagem-sucesso[mensagens="ctrl.sucessos"]'));
        
        this.tamanhoDosCampos = {
            finalidade: 120,
            valor: 21
        }
    }

    abreSecao(){
        return this.secao.click();
    }
    
    setLinhaCredito(texto) {
        var linhaSelecionada = this.linhaCredito.element(by.css('.ui-select-search'));
        this.linhaCredito.click();
        linhaSelecionada.sendKeys(texto);      
        element.all(by.css('.ui-select-choices-row-inner span')).first().click();
    }

    setTipoVencimento(texto){
        texto = texto || 'Fixo';
        return this.tipoVencimento.element(by.cssContainingText('option', texto)).click();
    }

    clicaSalvar(){
        return this.btnSalvar.click();
    }

    preencheCampos(){
        this.setLinhaCredito('abertura conta');
        this.valor.sendKeys('2.500,00');
        this.setTipoVencimento();
        this.finalidade.sendKeys('Finalidade');
    }
}

module.exports = new LimiteChequeEspecial();
