let CpfNome = require('./dados-cpf-nome.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');

describe('Dados Cpf/Nome', () => {
    beforeEach(() => {
        CpfNome.acessaPagina();
    });

    it('deve validar os campos obrigatórios', () => {
        //Given

        //When
        CpfNome.preencherCamposObrigatorios();
        CpfNome.limparCamposObrigatorios();

        //Then
        expect(Mensagem.obrigatoriedade(CpfNome.nomeCompleto)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(CpfNome.nomeSucinto)).toBeTruthy();
    });

    it('deve validar tamanho máximo dos campos da seção', () => {
        //Given

        //When
        Estresse.estressarCampo(CpfNome.nomeCompleto, 100);
        Estresse.estressarCampo(CpfNome.nomeSucinto, 100);

        //Then
        Estresse.avaliarLength(CpfNome.nomeCompleto, CpfNome.tamanhoDosCampos.nomeCompleto);
        Estresse.avaliarLength(CpfNome.nomeSucinto, CpfNome.tamanhoDosCampos.nomeSucinto);
    });

    it('deve sugerir nome sucinto', () => {
        //Given

        //When
        CpfNome.nomeCompleto.sendKeys('Carlos Mario Antunes');
        element(by.css('body')).click();

        //Then
        expect(CpfNome.nomeSucinto.evaluate(CpfNome.nomeSucinto.getAttribute('ng-model'))).toEqual('Carlos Antunes'.toUpperCase());
    });

    it('não deve duplicar nome sucinto caso apenas um nome seja inserido', () => {
        //Given

        //When
        CpfNome.nomeCompleto.sendKeys('Carlos');
        element(by.css('body')).click();

        //Then
        expect(CpfNome.nomeSucinto.evaluate(CpfNome.nomeSucinto.getAttribute('ng-model'))).toEqual('Carlos'.toUpperCase());
    });

    it('deve poder alterar nome sucinto caso queira', () => {
        //Given

        //When
        CpfNome.preencherCamposObrigatorios('Carlos Mario Antunes');
        CpfNome.nomeSucinto.clear();
        CpfNome.nomeSucinto.sendKeys('Carlinhos')
        element(by.css('body')).click();

        //Then
        expect(CpfNome.nomeSucinto.evaluate(CpfNome.nomeSucinto.getAttribute('ng-model'))).toEqual('Carlinhos'.toUpperCase());
    });
});
