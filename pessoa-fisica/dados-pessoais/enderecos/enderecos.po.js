let Data = require('../../../comum/data');
let Modal = require('../../../comum/modal');
class Endereco {
    constructor() {
        this.sessao = element(by.css('[titulo="Endereços"]'));
        this.tipoEndereco = this.sessao.element(by.model('$ctrl.endereco.tipoEndereco'));
        this.cep = this.sessao.element(by.model('$ctrl.endereco.cep'));
        this.principal = this.sessao.element(by.model('$ctrl.endereco.principal'));
        this.empostamento = this.sessao.element(by.model('$ctrl.endereco.empostamento'));
        this.logradouro = this.sessao.element(by.model('$ctrl.endereco.logradouro'));
        this.numero = this.sessao.element(by.model('$ctrl.endereco.numero'));
        this.enderecoSemNumero = this.sessao.element(by.model('$ctrl.endereco.enderecoSemNumero'));
        this.caixaPostal = this.sessao.element(by.model('$ctrl.endereco.caixaPostal'));
        this.complemento = this.sessao.element(by.model('$ctrl.endereco.complemento'));
        this.bairro = this.sessao.element(by.model('$ctrl.endereco.bairro'));
        this.estado = this.sessao.element(by.model('$ctrl.endereco.estado'));
        this.codigoCidade = this.sessao.element(by.model('$ctrl.endereco.codigoCidade'));
        this.situacaoEndereco = this.sessao.element(by.model('$ctrl.endereco.situacaoEndereco'));
        this.resideDesde = this.sessao.element(by.model('$ctrl.endereco.resideDesde'));
        this.mesesDeResidencia = this.sessao.element(by.model('$ctrl.mesesDeResidencia'));
        this.checkBoxPrincipal = this.sessao.element(by.model('$ctrl.endereco.principal'));
        this.checkBoxEmpostamento = this.sessao.element(by.model('$ctrl.endereco.empostamento'));
        this.botaoSalvar = element(by.id('adicionarEndereco'));
        this.botaoCancelar = element(by.id('cancelarNovoEndereco'));
        this.botaoNovo = element(by.id('novoEndereco'));
        this.listaVazia = element(by.css('endereco-lista>div.listaVazia'));

        this.byColunaCep = by.binding('endereco.cep | brCep');
        this.byColunaLogradouro = by.binding('endereco.logradouro');
        this.byColunaNumero = by.binding('endereco.numero');
        this.byColunaCidade = by.binding('endereco.cidade');

        this.msgSucesso = element(by.css('mensagem-sucesso[mensagens="ctrl.sucessos"]'));

        this.tamanhoDosCampos = {
            logradouro: 40,
            numero: 10,
            caixaPostal: 8,
            complemento: 30,
            bairro: 20
        }
    }

    acessaPagina(cpf) {
        cpf = cpf || '51404821341';
        browser.get('#/cadastro/terceiro/' + cpf + '/dados-pessoais');
    }

    abreSessao() {
        return this.sessao.click();
    }

    setTipoEndereco(texto) { 
        texto = texto || 'Residencial';              
        return this.tipoEndereco.element(by.cssContainingText('option', texto)).click();        
    }

    setUf(texto) {
        texto = texto || 'RS';
        this.estado.element(by.cssContainingText('option', texto)).click();
    }

    setCidade(texto) {
        texto = texto || 'Charqueadas';
        element.all(by.cssContainingText('option', texto)).first().click();
    }

    setSituacaoEndereco(texto) {
        texto = texto || 'Própria';
        this.situacaoEndereco.element(by.cssContainingText('option', texto)).click();
    }

    marcaPrincipal(){
        return this.checkBoxPrincipal.click();
    }

    marcaEmpostamento(){
        this.checkBoxEmpostamento.click();
    }

    preencherCamposObrigatorios(id, endereco) {
        id = id || "";
        this.setTipoEndereco(endereco.tipo || 'Residencial');
        this.cep.sendKeys(endereco.cep || '96745000');
        this.logradouro.sendKeys(endereco.logradouro || 'Logradouro ' + id);
        this.numero.sendKeys(endereco.numero || '123' + id);
        this.caixaPostal.sendKeys(endereco.caixaPostal || '321' + id);
        this.complemento.sendKeys(endereco.complemento || 'CASA ' + id);
        this.bairro.clear();
        this.bairro.sendKeys(endereco.bairro || 'BAIRRO ' + id);
        this.setUf(endereco.uf);
        this.setCidade(endereco.cidade);
        this.principal.evaluate(this.principal.getAttribute('ng-model')).then((txt) => {
            if (txt === true) {
                this.setSituacaoEndereco(endereco.situacaoEndereco);
                this.resideDesde.sendKeys(Data.dataMesAno(2,'-')+protractor.Key.TAB);
            }
        });


    }

    insereMultiplos(enderecos) {
        if (enderecos.length > 0) {
            for (var i = 0; i < enderecos.length; i++) {
                this.botaoNovo.click();
                this.preencherCamposObrigatorios(i, enderecos[i]);
                this.botaoSalvar.click();
            }
        } else {
            console.log("Nenhum endereço inserido.");
        }
    }

    getTableRows() {
        return element.all(by.repeater('(index, endereco) in $ctrl.enderecos'));
    }

    excluir() {
        let tableRows = this.getTableRows(),
            botaoExcluir = tableRows.all(by.css('button[title="Remover"]')).first();

        botaoExcluir.click().then(() => {
            let btnConfirma = Modal.getModalBtn();
            btnConfirma.click();
        });
    }

    editar(cep) {
        let tableRows = this.getTableRows(),
            botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();

        botaoEditar.click();
        this.cep.clear();
        this.cep.sendKeys(cep);
        this.botaoSalvar.click();
    }

    editaPrimeiro() {
        let tableRows = this.getTableRows(),
            botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();

        return botaoEditar.click();
    }
}
module.exports = new Endereco();