let Modal = require('../../../comum/modal');
let CpfCnpj = require('../../../comum/cpfCnpj');

class VeiculoPJ{
    constructor(){
        this.secao = element(by.css('nova-sessao[titulo="Veículos"]'));
        
        this.tipoVeiculo = element(by.model('$ctrl.veiculo.tipoVeiculo'));
        this.modelo = element(by.model('$ctrl.veiculo.modelo'));
        this.marca = element(by.model('$ctrl.veiculo.marca'));
        this.anoFabricacao = element(by.model('$ctrl.veiculo.anoFabricacao'));
        this.anoModelo = element(by.model('$ctrl.veiculo.anoModelo'));
        this.valor = element(by.model('$ctrl.veiculo.valorVeiculo'));
        this.valorAlienado = element(by.model('$ctrl.veiculo.valorAlienado'));
        this.situacao = element(by.model('$ctrl.veiculo.situacaoVeiculo'));
        this.notaFiscal = element(by.model('$ctrl.veiculo.numeroNotaFiscal'));
        this.fornecedor = element(by.model('$ctrl.veiculo.nomeFornecedor'));
        this.placa = element(by.model('$ctrl.veiculo.placa'));
        this.certificadoNumero = element(by.model('$ctrl.veiculo.numeroCertificado'));
        this.chassi = element(by.model('$ctrl.veiculo.chassis'));
        this.renavam = element(by.model('$ctrl.veiculo.renavam'));
        
        this.btnNovo = element(by.id('novoveiculo'));
        this.btnSalvar = element(by.id('adicionarVeiculo'));
        this.btnCancelar = element(by.id('cancelarVeiculo'))

        this.byColunaTipo = by.binding('veiculo.descricaoTipoDeVeiculo');
        this.byColunaModelo = by.binding('veiculo.modelo');
        this.byColunaAnoFabricacao = by.binding('veiculo.anoFabricacao.format("YYYY")');
        this.byColunaValor = by.binding('veiculo.valorVeiculo | finance:true');
        
        this.listaVazia = element(by.css('lista-veiculos>div.listaVazia'));

        this.tamanhoDosCampos = {
            modelo: 12,
            marca: 30,
            notaFiscal: 8,
            fornecedor: 60,
            placa: 7, 
            certificadoNumero: 12, 
            chassi: 20,
            renavam: 15
        }
    }

    acessaPagina(cnpj) {
        browser.get('#/cadastro/pessoa-juridica/' + cnpj.replace('.','').replace('.','').replace('/', '').replace('-','') + '/bens');
    }

    abreSecao(){
        return this.secao.click()
    }

    setTipoVeiculo(texto){
        texto = texto || 'Automotivo';
        return element(by.cssContainingText('option', texto)).click();
    }

    setSituacao(texto){
        texto = texto || 'Livre';
        return element(by.cssContainingText('option', texto)).click();
    }

    preencherCamposObrigatorios(id) {
        id = id || "";
        this.setTipoVeiculo();
        this.modelo.sendKeys('Modelo ' + id);
        this.marca.sendKeys('Marca ' + id);
        this.anoFabricacao.sendKeys('2015');
        this.anoModelo.sendKeys('2015');
        this.valor.sendKeys('25000');
        this.valorAlienado.sendKeys('8000');
        this.setSituacao();
        this.notaFiscal.sendKeys('8888' + id);
        this.fornecedor.sendKeys('Fornecedor ' + id);
        this.placa.sendKeys('IJL0011');
        this.certificadoNumero.sendKeys('123456' + id);
        this.chassi.sendKeys('321654' + id);
        this.renavam.sendKeys('765432' + id);
    }

    clicaNovo(){
        return this.btnNovo.click();
    }

    clicaSalvar(){
        return this.btnSalvar.click();
    }

    getTableRows(){
        return element.all(by.repeater('(index, veiculo) in $ctrl.veiculos'));
    }

    excluir(){
        let tableRows = this.getTableRows();

        let botaoExcluir = tableRows.all(by.css('button[title="Remover"]')).first();
            botaoExcluir.click().then(()=>{
                let btnConfirma = Modal.getModalBtn();
                    btnConfirma.click();
            });
    }

    editar(valor){
        let tableRows = this.getTableRows(),
            botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();

        botaoEditar.click();
        this.valor.clear();
        this.valor.sendKeys(valor);
        this.btnSalvar.click();
    }

    insereMultiplos(total){
        for (var i = 0; i < total; i++) {
            this.btnNovo.click();
            this.preencherCamposObrigatorios(i);
            this.btnSalvar.click();
        }
    }
}

module.exports = new VeiculoPJ();