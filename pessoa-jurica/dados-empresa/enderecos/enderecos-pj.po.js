let Modal = require('../../../comum/modal');

class EnderecosPj{
    constructor(){
        this.secao = element(by.css('nova-sessao[titulo="Endereços"]'));
        this.tipoEndereco = element(by.model('$ctrl.endereco.tipoEndereco'));
        this.cep = element(by.model('$ctrl.endereco.cep'));
        this.enderecoPrincipal = element(by.model('$ctrl.endereco.principal'));
        this.empostamento = element(by.model('$ctrl.endereco.empostamento'));
        this.logradouro = element(by.model('$ctrl.endereco.logradouro'));
        this.numero = element(by.model('$ctrl.endereco.numero'));
        this.semNumero = element(by.model('$ctrl.endereco.enderecoSemNumero'));
        this.caixaPostal = element(by.model('$ctrl.endereco.caixaPostal'));
        this.complemento = element(by.model('$ctrl.endereco.complemento'));
        this.bairro = element(by.model('$ctrl.endereco.bairro'));
        this.uf = element(by.model('$ctrl.endereco.estado'));
        this.cidade = element(by.model('$ctrl.endereco.codigoCidade'));
        this.situacaoEndereco = element(by.model('$ctrl.endereco.situacaoEndereco'));
        this.valorAluguel = element(by.model('$ctrl.endereco.valorAluguel'));
        this.resideDesde = element(by.model('$ctrl.endereco.resideDesde'));
        this.mesesResidencia = element(by.model('$ctrl.mesesDeResidencia'));
        this.listaVazia = element(by.css('endereco-lista>div.listaVazia'));

        this.byColunaCep = by.binding('endereco.cep | brCep');
        this.byColunaLogradouro = by.binding('endereco.logradouro');
        this.byColunaNumero = by.binding('endereco.numero');
        this.byColunaCidade = by.binding('endereco.cidade');

        this.botaoNovo = element(by.id('novoEndereco'));
        this.botaoSalvar = element(by.id('adicionarEndereco'));
        this.botaoCancelar = element(by.id('cancelarNovoEndereco'));
    
        this.tamanahoDosCampos = { 
            logradouro: 40,
            numero: 10,
            caixaPostal: 8,
            complemento: 30,
            bairro: 20            
        }
    }

    acessaPagina(cnpj){
        browser.get('#/cadastro/pessoa-juridica/'+cnpj.replace('.','').replace('.','').replace('/','').replace('-','')+'/dados-empresa/');
    }
    
    abreSecao(){
        this.secao.click();
    }

    clicaNovo(){
        this.botaoNovo.click();
    }

    clicaSalvar(){
        this.botaoSalvar.click();
    }

    setTipoEndereco(texto) { 
        texto = texto || 'Residencial';              
        return this.tipoEndereco.element(by.cssContainingText('option', texto)).click();        
    }
    
    setUf(texto) {
        texto = texto || 'RS';
        this.uf.element(by.cssContainingText('option', texto)).click();
    }

    setSituacaoEndereco(texto) {
        texto = texto || 'Própria';
        this.situacaoEndereco.element(by.cssContainingText('option', texto)).click();
    }

    setCep(texto){
        texto = texto || '90820120';
        this.cep.sendKeys(texto);
    }

    clicaPrincipal(){
        this.enderecoPrincipal.click();
    }

    clicaEmpostamento(){
        this.empostamento.click();
    }

    setLogradouro(texto){
        texto = texto || 'Logradouro';
        this.logradouro.sendKeys(texto);
    }

    preencherCamposObrigatorios() {
        this.setTipoEndereco();
        this.setCep();
        this.numero.sendKeys('123');
        this.bairro.clear();
        this.bairro.sendKeys('BAIRRO');
        this.setSituacaoEndereco();
    }

    getTableRows() {
        return element.all(by.repeater('(index, endereco) in $ctrl.enderecos'));
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
}

module.exports = new EnderecosPj();