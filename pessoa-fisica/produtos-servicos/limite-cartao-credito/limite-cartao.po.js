class LimiteCartao{
    constructor(){
        this.secao = element(by.css('nova-sessao[titulo="Limite Cartão de Credito"]'));
        this.linhaCredito = element(by.model('$ctrl.limiteCartaoCredito.selected'));
        this.taxaAm = element(by.model('$ctrl.limiteCartaoCredito.taxa'));
        this.valor = element(by.model('$ctrl.limiteCartaoCredito.valorSolicitado'));
        this.tipoVencimento = element(by.model('$ctrl.limiteCartaoCredito.tipoVencimento'));
        this.finalidade = element(by.model('$ctrl.limiteCartaoCredito.finalidade'));
        this.mensagemSucesso = element(by.css('mensagem-sucesso[mensagens="ctrl.sucessos"]'));

        this.btnSalvar = element(by.id('btnSalvar'));
    
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
        this.setLinhaCredito('debito');
        this.valor.sendKeys('2.500,00');
        this.setTipoVencimento();
        this.finalidade.sendKeys('Finalidade');
    }
}

module.exports = new LimiteCartao();