class Poderes{
    constructor(){
        this.secao = element(by.css('nova-sessao[titulo="Poderes Cartão Autógrafo"]'));
        this.subSecao = element(by.css('nova-sessao[titulo="Poderes"]'));

        this.nome = element(by.id('pessoa'));
        this.cpf = element(by.id('cpfCartaoAutografo'));

        this.individual = element(by.model('$ctrl.marcarTodos'));
        this.conjunta = element(by.model('$ctrl.marcarTodos'));
        this.prejudicado = element(by.model('$ctrl.marcarTodos'));
        this.observacoes = element(by.id('outrasAutorizacoesObservacoes'));

        this.btnSalvarPoderes = element(by.id('adicionarPoderCartaoAutografo'));
        this.btnCancelar = element(by.id('cancelarPoderCartaoAutografo'));

        this.btnNovo = element(by.id('novoPoderCartaoAutografo'));
        this.listaVazia = element(by.css('lista-poderes-cartao-autografo>div.listaVazia'));

        this.btnSalvar = element(by.id('btnSalvar'));
        this.msgSucesso = element(by.css('mensagem-sucesso[mensagens="ctrl.sucessos"]'));

        this.tamanhoDosCampos = {
            observacoes: 200
        }
    }

    abreSecao(){
        return this.secao.click();
    }

    abreSubSecao(){
        return this.subSecao.click();
    }

    clicaNovo(){
        return this.btnNovo.click();
    }

    salvaPoderes(){
        return this.btnSalvarPoderes.click();
    }

    cancela(){
        return this.btnCancelar.click();
    }

    setPessoa(texto){
        texto = texto || 'Titular - JUAREZ MEQUETREFE AUTO';
        this.nome.element(by.cssContainingText('option', texto)).click();
    }

    clicaIndividual(){
        return this.individual.click();
    }

    clicaConjunta(){
        return this.conjunta.click();
    }
    
    clicaPrejudicado(){
        return this.prejudicado.click();
    }

    preencheObservacoes(){
        this.observacoes.sendKeys('Preenchendo Observações');
    }
}

module.exports = new Poderes();