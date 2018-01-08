let Modal = require('../../comum/modal');
let CpfCnpj = require('../../comum/cpfCnpj');
var path = require('path');
var remote = require('selenium-webdriver/remote');
    
class CartaoAutografo {
    constructor() {
        this.sessao = element(by.css('[titulo="Cartão autógrafo"]'));
        this.sessaoPoderes = this.sessao.element(by.css('[titulo="Poderes"]'));

        this.nome = element(by.model('$ctrl.cartaoAutografo.pessoa'));
        this.cpf = element(by.id('cpfCartaoAutografo'));
        this.btnCarregarImagem = element(by.css('div[ng-model="$ctrl.cartaoAutografo.assinatura"]'));
        this.inputCarregarImagem = element(by.css('input[type="file"][ng-model="$ctrl.cartaoAutografo.assinatura"]'));
        this.assinatura = element(by.id('imagemAssinatura'));
        this.observacao = element(by.id('outrasAutorizacoesObservacoes'));

        // Cheques
        this.emitir = element.all(by.model('$ctrl.poderes.cheques[poder.contrato]')).get(0);
        this.caucionar = element.all(by.model('$ctrl.poderes.cheques[poder.contrato]')).get(3);
        this.endossar = element.all(by.model('$ctrl.poderes.cheques[poder.contrato]')).get(6);
        this.avalizar = element.all(by.model('$ctrl.poderes.cheques[poder.contrato]')).get(9);

        this.botaoSalvar = element(by.id('adicionarCartaoAutografo'));
        this.botaoCancelar = element(by.id('cancelarCartaoAutografo'));
        this.botaoNovo = element(by.id('novaCartaoAutografo'));
        this.listaVazia = element(by.css('lista-cartao-autografo>div.listaVazia'));

        this.mensagemSucesso = element(by.css('div.alert-success'));

        this.tamanhoDosCampos = {
            observacao: 200
        }
    }

    acessaPagina(cpf) {
        cpf = cpf || '55502478017';
        browser.get('#/cadastro/terceiro/' + cpf.replace('.','').replace('.','').replace('-','') + '/cartao-autografo');
    }

    abreSessao(){
        return this.sessao.click();
    }

    setNome(texto) {
        texto = texto || 'João da Silva';
        return this.nome.element(by.cssContainingText('option', texto)).click();
    }

    preencherCamposObrigatorios(cartaoAutografo) {
        this.setNome(cartaoAutografo.nome);
    }

    preencherTodosOsCampos(cartaoAutografo){
        this.setNome(cartaoAutografo.nome);
        this.carregarAssinatura();

        this.sessaoPoderes.element(by.css('.step-section')).click();
        this.emitir.click();
        this.caucionar.click();
        this.endossar.click();
        this.avalizar.click();
        this.observacao.sendKeys('Observação Cartão Autógrafo')
    }

    carregarAssinatura(fileName){
        browser.setFileDetector(new remote.FileDetector());
        let fileToUpload = fileName || 'assinatura.jpg';
        let absolutePath = path.resolve(__dirname, fileToUpload);
        //console.log(absolutePath);
        
        return this.inputCarregarImagem.sendKeys(absolutePath);
    }

    getTableRows(){
        return element.all(by.repeater('(index, cartaoAutografo) in $ctrl.cartoesAutografo'));
    }

    excluir(){
        let tableRows = this.getTableRows();

        let botaoExcluir = tableRows.all(by.css('button[title="Remover"]')).first();
            botaoExcluir.click().then(()=>{
                let btnConfirma = Modal.getModalBtn();
                    btnConfirma.click();
            });
    }

    editar(valorAtual){
        let tableRows = this.getTableRows(),
            botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();

        botaoEditar.click();
        this.valorAtual.clear();
        this.valorAtual.sendKeys(valorAtual);
        this.botaoSalvar.click();
    }


    converteImagem(){
        var fs = require('fs');
        let path = require('path');
        let fileToUpload = './assinatura.jpg';
        let absolutePath = path.resolve(__dirname, fileToUpload);

        // function to encode file data to base64 encoded string
        var bitmap = fs.readFileSync(absolutePath);
        return new Buffer(bitmap).toString('base64');        
    }
}
module.exports = new CartaoAutografo();
