let Filiacao = require('./filiacao.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');

describe('Filiacao', () => {
    beforeEach(() => {
        Filiacao.acessaPagina();
        Filiacao.sessao.element(by.css('.step-section')).click();
    });

    it('deve validar campos obrigatórios', () => {
        //Given

        //When
        Filiacao.preencherCamposObrigatorios();
        Filiacao.limparCamposObrigatorios();

        //Then
        expect(Mensagem.obrigatoriedade(Filiacao.nomeMae)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(Filiacao.nomePai)).toBeTruthy();
    });

    it('deve validar tamanho máximo dos campos da seção', () => {
        //Given

        //When
        Estresse.estressarCampo(Filiacao.nomePai, 100);
        Estresse.estressarCampo(Filiacao.nomeMae, 100);

        //Then
        Estresse.avaliarLength(Filiacao.nomePai, Filiacao.tamanhoDosCampos.nomePai);
        Estresse.avaliarLength(Filiacao.nomeMae, Filiacao.tamanhoDosCampos.nomeMae);
    });

    it('deve limpar e desabilitar campos Nome do Pai e Nome da Mãe se checkbox for marcado', () => {
        //Given

        //When
        Filiacao.preencherCamposObrigatorios();
        Filiacao.clickCheckboxes();

        //Then
        expect(Filiacao.nomeMae.isEnabled()).toBe(false);
        expect(Filiacao.nomePai.isEnabled()).toBe(false);
        expect(Filiacao.nomeMae.evaluate(Filiacao.nomeMae.getAttribute('ng-model'))).toEqual('');
        expect(Filiacao.nomePai.evaluate(Filiacao.nomePai.getAttribute('ng-model'))).toEqual('');
    });
});
