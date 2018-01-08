class RestricoesAcatadas {
    constructor() {
        this.sessao = element(by.css('[titulo="Restrições Acatadas"]'));
        this.dataRestricao = this.sessao.element(by.model('$ctrl.restricaoAcatada.data'));
        this.observacao = this.sessao.element(by.model('$ctrl.restricaoAcatada.observacao'));
        this.valor = this.sessao.element(by.model('$ctrl.restricaoAcatada.valor'));
        this.responsavel = this.sessao.element(by.model('$ctrl.restricaoAcatada.responsavel'));
        this.tipoRestricao = this.sessao.element(by.model('$ctrl.restricaoAcatada.tipo'));

        this.botaoNovo = this.sessao.element(by.id('novaRestricoesAcatadas'));
        this.botaoSalvar = this.sessao.element(by.id('adicionaRestricaoAcatada'));
        this.botaoCancelar = this.sessao.element(by.id('cancelarReferencia'));
        this.listaVazia = this.sessao.element(by.css('lista-restricao-acatada>div.listaVazia'));

        this.byColunaData = by.binding("restricao.data.format('DD/MM/YYYY')");
        this.byColunaObservacao = by.binding("restricao.observacao");
        this.byColunaValor = by.binding("restricao.valor | finance:true");
        this.byColunaResponsavel = by.binding("restricao.responsavel");
        this.byCOlunaTipo = by.binding("restricao.tipo");
        

        this.tamanhoDosCampos = {
            observacao: 60,
            responsavel: 25,
            valor: 15
        }
    }

    acessaPagina(cpf) {
        cpf = cpf || '51404821341';
        browser.get('#/cadastro/terceiro/' + cpf + '/analise-cadastral');
    }

    abreSessao() {
        return this.sessao.click();
    }

    clicaNovo() {
        this.botaoNovo.click();
    }

    clicaSalvar() {
        return this.botaoSalvar.click();
    }

    clicaCancelar() {
        this.botaoCancelar.click();
    }

    getTableRows() {
        return element.all(by.repeater('(index, restricao) in $ctrl.restricoesAcatadas'));
    }

    editar() {
        let tableRows = this.getTableRows(),
            botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();
        botaoEditar.click();
    }

    preencheObservacao(obs) {
        this.observacao.sendKeys(obs || 'Preenchendo campo observacao');
    }

    preencheValor(num) {
        this.valor.sendKeys(num);
    }

    preencheResponsavel(nome) {
        this.responsavel.sendKeys(nome);
    }

    setDataRestricao(data) {
        data = data || '14072017';
        this.dataRestricao.sendKeys(data);
    }

    setTipoRestricao(texto) {
        this.tipoRestricao.element(by.cssContainingText('option', texto || 'Acatado')).click();
    }
}

module.exports = new RestricoesAcatadas();