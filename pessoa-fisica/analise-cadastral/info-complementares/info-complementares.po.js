class InfoComplementares {
    constructor(){
        this.sessao = element(by.css('[titulo="Informações Complementares"]'));
        this.tipoPessoa = this.sessao.element(by.model('$ctrl.informacoesComplementares.codigoTipoPessoa'));
        this.dataAnalise = this.sessao.element(by.model('$ctrl.informacoesComplementares.dataAnalise'));
        this.posto = this.sessao.element(by.model('$ctrl.informacoesComplementares.codigoPosto'));
        this.avaliacaoGerente = this.sessao.element(by.model('$ctrl.informacoesComplementares.avaliacaoGerente'));
        this.observacao = this.sessao.element(by.model('$ctrl.informacoesComplementares.observacao'));
        this.observacaoContrato = this.sessao.element(by.model('$ctrl.informacoesComplementares.observacaoContrato'));
    
        this.tamanhoDosCampos = {
            observacao: 240,
            observacaoContrato: 240
        }
    }

    acessaPagina(cpf) {
        cpf = cpf || '51404821341';
        browser.get('#/cadastro/terceiro/' + cpf + '/analise-cadastral');
    }

    abreSessao(){
        return this.sessao.click();
    }

    setTipoPessoa(texto) {
        this.tipoPessoa.element(by.cssContainingText('option', texto || 'FISICA IMUNE')).click();
    }

    setDataAnalise(data) {
        data = data || '';
        this.dataAnalise.sendKeys(data);
    }

    setPosto (texto) {        
        this.posto.element(by.cssContainingText('option', texto || '2 - Posto 2')).click();
    }

    setAvaliacaoGerente(texto) {
        this.avaliacaoGerente.element(by.cssContainingText('option', texto || 'Regular')).click();
    }

    preencheObservacao(texto){
        let obs = texto || 'Preenchendo campo observacao';
        this.observacao.sendKeys(obs);
    }

    preencheNovaObservacao(texto){
        let obs = texto || 'Preenchendo novamente o campo observacao';
        this.observacao.sendKeys(obs);
    }
    
    preencheObservacaoContrato(texto){
        let obs = texto || 'Preenchendo campo observacao contrato';
        this.observacaoContrato.sendKeys(obs);
    }

    preencheNovaObservacaoContrato(texto){
        let obs = texto || 'Preenchendo novamente o campo observacao contrato';
        this.observacaoContrato.sendKeys(obs);
    }
}

module.exports = new InfoComplementares();