class Filiacao {
    constructor() {
        this.sessao = element(by.css('[titulo="Filiação"]'));
        this.nomePai = element(by.model('$ctrl.filiacao.nomePai'));
        this.nomeMae = element(by.model('$ctrl.filiacao.nomeMae'));
        this.nomePaiNaoDeclarado = element(by.model('$ctrl.filiacao.nomePaiNaoDeclarado'));
        this.nomeMaeNaoDeclarado = element(by.model('$ctrl.filiacao.nomeMaeNaoDeclarado'));

        this.tamanhoDosCampos = {
            nomePai: 65,
            nomeMae: 65
        }
    }

    acessaPagina() {
        browser.get('#/cadastro/terceiro/51404821341/dados-pessoais/');
    }

    abreSessao(){
        return this.sessao.click();
    }

    preencherCamposObrigatorios(pai, mae){
        this.nomePai.sendKeys(pai || 'João Silva');
        this.nomeMae.sendKeys(mae || 'Maria Silva');
    }    

    limparCamposObrigatorios(){
        this.nomePai.clear();
        this.nomeMae.clear();
    }

    clickCheckboxes(){
        this.nomePaiNaoDeclarado.click();
        this.nomeMaeNaoDeclarado.click();
    }

}


module.exports = new Filiacao();
