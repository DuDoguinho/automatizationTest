let Data = require('../../../comum/data');
let Modal = require('../../../comum/modal');
let CpfCnpj = require('../../../comum/cpfCnpj');
let Documentos = require('../documentos/documentos.po');

class RepresentanteLegal {
    constructor() {
        this.sessao = element(by.css('[titulo="Representante Legal"]'));

        this.documentos = Documentos;

        // Documentos
        this.cpf = this.sessao.element(by.css('dados-cpf[cpf="$ctrl.representante.cpf"]')).element(by.model('$ctrl.cpf'));
        this.nomeCompleto = element(by.model('$ctrl.representante.nomeCompleto'));
        this.tipoIdentificacao = element(by.model('$ctrl.representante.tipoIdentificacao'));
        this.numeroIdentificacao = element(by.model('$ctrl.representante.numeroIdentificacao'));
        this.orgaoExpedidor = element(by.model('$ctrl.representante.orgaoExpedidor'));
        this.ufExpedidor = element(by.model('$ctrl.representante.ufExpedidor'));
        this.dataEmissao = element(by.model('$ctrl.representante.dataEmissao'));
        this.dataNascimento = element(by.model('$ctrl.representante.dataNascimento'));

        // Endereço
        this.tipoEndereco = element(by.id('TipoEndereco'));
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

        this.tamanhoDosCampos = {
            nomeCompleto: 65,
            numeroIdentificacao: 12,
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

    abreSessao(){
        return this.sessao.click();
    }

    preencherCamposObrigatorios() {
        this.cpf.sendKeys(CpfCnpj.getCPF());
        this.nomeCompleto.sendKeys('NOME COMPLETO REPRESENTANTE LEGAL');
        this.setTipoIdentificacao();
        this.numeroIdentificacao.sendKeys('1231561');
        this.setOrgaoExpedidor();
        this.setUfExpedidor();
        this.dataEmissao.sendKeys(Data.dataPassada());
        this.dataNascimento.sendKeys(Data.data18Anos());

        this.setTipoEndereco();
        this.cep.sendKeys('96745000');
        this.logradouro.sendKeys('Logradouro Representante Legal');
        this.numero.sendKeys('124563');
        this.caixaPostal.sendKeys('321');
        this.complemento.sendKeys('Casa Amarela');
        this.bairro.sendKeys('Bairro Laranja');
        this.setUf();
        this.setCidade();
    }

    limparCamposObrigatorios() {
        this.cpf.clear();
        this.nomeCompleto.clear();
        this.clearSelect(this.tipoIdentificacao);
        this.numeroIdentificacao.clear();
        this.clearSelect(this.orgaoExpedidor);
        this.clearSelect(this.ufExpedidor);
        this.dataEmissao.clear();
        this.dataNascimento.clear();

        this.clearSelect(this.tipoEndereco);
        this.cep.clear();
        this.logradouro.clear();
        this.numero.clear();
        this.caixaPostal.clear();
        this.complemento.clear();
        this.bairro.clear();
        this.clearSelect(this.codigoCidade);
        this.clearSelect(this.estado);
    }

    clearSelect(item){
        item.all(by.tagName('option')).get(0).click();
    }

    // Documentos
    setUfExpedidor(texto) {
        texto = texto !== undefined ? texto: 'RS';
        this.ufExpedidor.element(by.cssContainingText('option', texto)).click();
    }

    setOrgaoExpedidor(texto) {
        texto = texto !== undefined ? texto: 'SSP';
        this.orgaoExpedidor.element(by.cssContainingText('option', texto)).click();
    }

    setTipoIdentificacao(texto) {
        texto = texto !== undefined ? texto: 'Cart. Identidade';
        this.tipoIdentificacao.element(by.cssContainingText('option', texto)).click();
    }

    setCartMotorista(texto) {
        texto = texto || 'Cart. Motorista';
        this.tipoIdentificacao.element(by.cssContainingText('option', texto)).click();
    }

    setOrgaoCartMotorista(texto){
        texto = texto || 'DETRAN';
        this.orgaoExpedidor.element(by.cssContainingText('option', texto)).click();
    }

    // Endereços
    setTipoEndereco(texto) {
        texto = texto || 'Residencial';
        this.tipoEndereco.element(by.cssContainingText('option', texto)).click();
    }   

    setUf(texto) {
        texto = texto || 'RS';
        this.estado.element(by.cssContainingText('option', texto)).click();

    }

    setCidade(texto) {
        texto = texto || 'Charqueadas';
        this.codigoCidade.element(by.cssContainingText('option', texto)).click();        
    }

    setSituacaoEndereco(texto) {
        texto = texto || 'Própria';
        this.situacaoEndereco.element(by.cssContainingText('option', texto)).click();
    }

}
module.exports = new RepresentanteLegal();
