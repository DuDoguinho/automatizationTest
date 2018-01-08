let CnpjNome = require('./dados-cnpj-nome.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Gerador = require('../../../comum/cpfCnpj');
let cnpj = '';

describe('Dados Cnpj/Nome', () => {
    beforeEach(() => {
        cnpj = Gerador.getCNPJ();
        CnpjNome.acessaPagina(cnpj);
    });

    it('deve validar os campos obrigatórios', () => {
        //Given

        //When
        CnpjNome.preencherCamposObrigatorios(cnpj);
        CnpjNome.limparCamposObrigatorios();

        //Then
        expect(Mensagem.obrigatoriedade(CnpjNome.nomeCompleto)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(CnpjNome.nomeSucinto)).toBeTruthy();
    });

    it('deve validar tamanho máximo dos campos da seção', () => {
        //Given

        //When
        Estresse.estressarCampo(CnpjNome.nomeCompleto, 100);
        Estresse.estressarCampo(CnpjNome.nomeSucinto, 100);

        //Then
        Estresse.avaliarLength(CnpjNome.nomeCompleto, CnpjNome.tamanhoDosCampos.nomeCompleto);
        Estresse.avaliarLength(CnpjNome.nomeSucinto, CnpjNome.tamanhoDosCampos.nomeSucinto);
    });

    it('deve sugerir nome sucinto', () => {
        //Given

        //When
        CnpjNome.nomeCompleto.sendKeys('Carlos Mario Antunes');
        element(by.css('body')).click();

        //Then
        expect(CnpjNome.nomeSucinto.evaluate(CnpjNome.nomeSucinto.getAttribute('ng-model'))).toEqual('Carlos Antunes'.toUpperCase());
    });

    it('não deve duplicar nome sucinto caso apenas um nome seja inserido', () => {
        //Given

        //When
        CnpjNome.nomeCompleto.sendKeys('Carlos');
        element(by.css('body')).click();

        //Then
        expect(CnpjNome.nomeSucinto.evaluate(CnpjNome.nomeSucinto.getAttribute('ng-model'))).toEqual('Carlos'.toUpperCase());
    });

    it('deve poder alterar nome sucinto caso queira', () => {
        //Given

        //When
        CnpjNome.preencherCamposObrigatorios(cnpj,'Carlos Mario Antunes');
        CnpjNome.nomeSucinto.clear();
        CnpjNome.nomeSucinto.sendKeys('Carlinhos')
        element(by.css('body')).click();

        //Then
        expect(CnpjNome.nomeSucinto.evaluate(CnpjNome.nomeSucinto.getAttribute('ng-model'))).toEqual('Carlinhos'.toUpperCase());
    });
});
