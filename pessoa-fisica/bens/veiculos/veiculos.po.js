let Modal = require('../../../comum/modal');
let CpfCnpj = require('../../../comum/cpfCnpj');

class Veiculo {
    constructor() {
        this.sessao = element(by.css('[titulo="Veículos"]'));

        this.tipoVeiculo = this.sessao.element(by.id('tipoVeiculo'));
        this.modelo = element(by.model('$ctrl.veiculo.modelo'));
        this.marca = element(by.model('$ctrl.veiculo.marca'));
        this.anoFabricacao = element(by.model('$ctrl.veiculo.anoFabricacao'));
        this.anoModelo = element(by.model('$ctrl.veiculo.anoModelo'));
        this.valorVeiculo = element(by.model('$ctrl.veiculo.valorVeiculo'));
        this.valorAlienado = element(by.model('$ctrl.veiculo.valorAlienado'));
        this.situacaoVeiculo = element(by.model('$ctrl.veiculo.situacaoVeiculo'));
        this.numeroNotaFiscal = element(by.model('$ctrl.veiculo.numeroNotaFiscal'));
        this.nomeFornecedor = element(by.model('$ctrl.veiculo.nomeFornecedor'));
        this.placa = element(by.model('$ctrl.veiculo.placa'));
        this.numeroCertificado = element(by.model('$ctrl.veiculo.numeroCertificado'));
        this.chassis = element(by.model('$ctrl.veiculo.chassis'));
        this.renavam = element(by.model('$ctrl.veiculo.renavam'));
        

        this.botaoSalvar = element(by.id('adicionarVeiculo'));
        this.botaoCancelar = element(by.id('cancelarVeiculo'));
        this.botaoNovo = element(by.id('novoveiculo'));
        this.listaVazia = element(by.css('lista-veiculos>div.listaVazia'));

        this.byColunaTipo = by.binding("veiculo.descricaoTipoDeVeiculo");
        this.byColunaModelo = by.binding("veiculo.modelo");
        this.byColunaAnoFab = by.binding("veiculo.anoFabricacao.format('YYYY')");
        this.byColunaValor = by.binding("veiculo.valorVeiculo | finance:true");

        this.tamanhoDosCampos = {
            modelo: 12,
            marca: 30,
            nf: 8,
            fornecedor: 60,
            placa: 7,
            numeroCertificado: 12,
            chassis: 20,
            renavam: 15
        }
    }

    acessaPagina(cpf) {
        cpf = cpf || '51404821341';
        browser.get('#/cadastro/terceiro/' + cpf.replace('.','').replace('.','').replace('-','') + '/bens');
    }

    abreSessao(){
        return this.sessao.click();
    }

    clicaNovo(){
        return this.botaoNovo.click();
    }

    clicaSalvar(){
        return this.botaoSalvar.click();
    }

    setTipoVeiculo(texto) {
        texto = texto || 'Náutico';
        this.tipoVeiculo.element(by.cssContainingText('option', texto)).click();
    }

    setSituacao(texto) {
        texto = texto || 'Alienado';
        this.situacaoVeiculo.element(by.cssContainingText('option', texto)).click();
    }

    preencherCamposObrigatorios(id) {
        id = id || "";
        this.setTipoVeiculo();
        this.modelo.sendKeys('Modelo ' + id);
        this.marca.sendKeys('Marca ' + id);
        this.anoFabricacao.sendKeys('2015');
        this.anoModelo.sendKeys('2015');
        this.valorVeiculo.sendKeys('25000');
        this.valorAlienado.sendKeys('8000');
        this.setSituacao();
        this.numeroNotaFiscal.sendKeys('8888' + id);
        this.nomeFornecedor.sendKeys('Fornecedor ' + id);
        this.placa.sendKeys('IJL0011');
        this.numeroCertificado.sendKeys('123456' + id);
        this.chassis.sendKeys('321654' + id);
        this.renavam.sendKeys('765432' + id);
    }

    limpaCampos(){
        this.modelo.clear();
        this.marca.clear();
        this.valorVeiculo.clear();
        this.valorAlienado.clear();
        this.numeroNotaFiscal.clear();
        this.nomeFornecedor.clear();
        this.placa.clear();
        this.numeroCertificado.clear();
        this.chassis.clear();
        this.renavam.clear();
    }

    preencheUpdate(id){
        id = id || "";
        this.setTipoVeiculo();
        this.modelo.sendKeys('Modelos' + id);
        this.marca.sendKeys('Marca Veiculo' + id);
        this.anoFabricacao.sendKeys('1989' + id);
        this.anoModelo.sendKeys('1989' +  id);
        this.valorVeiculo.sendKeys('70000' + id);
        this.valorAlienado.sendKeys('2222' + id);
        this.setSituacao();
        this.numeroNotaFiscal.sendKeys('245632' + id);
        this.nomeFornecedor.sendKeys('Fornecedor Veiculo' + id);
        this.placa.sendKeys('IJK7945' + id);
        this.numeroCertificado.sendKeys('123456' + id);
        this.chassis.sendKeys('321654' + id);
        this.renavam.sendKeys('765432' + id);
    }

    insereMultiplos(total){
        for (var i = 0; i < total; i++) {
            this.botaoNovo.click();
            this.preencherCamposObrigatorios(i);
            this.botaoSalvar.click();
        }
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
        this.valorVeiculo.clear();
        this.valorVeiculo.sendKeys(valor);
        this.botaoSalvar.click();
    }

    salvar(){
        this.botaoSalvar.click();
    }

    editarUpdate(){
        let tableRows = this.getTableRows(),
            botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();
            botaoEditar.click();
    }
}
module.exports = new Veiculo();
