let InfoComplementares = require('./info-complementares.po');
let Data = require('../../../comum/data');
let Estresse = require('../../../comum/estresse');

describe('Informações Complementares', () => {
    beforeEach(() => {
        InfoComplementares.acessaPagina();
        InfoComplementares.sessao.element(by.css('.step-section')).click();
    });
    it('Deve preencher Informacoes complementares', () => {
        InfoComplementares.setTipoPessoa();
        InfoComplementares.setDataAnalise(Data.dataAtual());
        InfoComplementares.setPosto();
        InfoComplementares.setAvaliacaoGerente();
        InfoComplementares.preencheObservacao();
        InfoComplementares.preencheObservacaoContrato();

        InfoComplementares.observacao.clear();
        InfoComplementares.observacaoContrato.clear();
        InfoComplementares.preencheNovaObservacao();
        InfoComplementares.preencheNovaObservacaoContrato();

        expect(InfoComplementares.observacao.getAttribute('value')).toEqual('Preenchendo novamente o campo observacao');
        expect(InfoComplementares.observacaoContrato.getAttribute('value')).toEqual('Preenchendo novamente o campo observacao contrato');

        expect(InfoComplementares.posto.isEnabled()).toBe(true);
        expect(InfoComplementares.avaliacaoGerente.isEnabled()).toBe(true);
        expect(InfoComplementares.observacao.isEnabled()).toBe(true);
        expect(InfoComplementares.observacaoContrato.isEnabled()).toBe(true);
    });

    it('Deve validar número máximo de caracteres nos campos de Observacao', () => {
        Estresse.estressarCampo(InfoComplementares.observacao, 300);
        Estresse.estressarCampo(InfoComplementares.observacaoContrato, 300);

        Estresse.avaliarLength(InfoComplementares.observacao, InfoComplementares.tamanhoDosCampos.observacao);
        Estresse.avaliarLength(InfoComplementares.observacaoContrato, InfoComplementares.tamanhoDosCampos.observacaoContrato);
    });

    it('Campo "Data Análise" não deve aceitar data futura', () => {
        let dataFutura = '12/05/2055'
        InfoComplementares.dataAnalise.clear();
        InfoComplementares.dataAnalise.sendKeys(dataFutura + protractor.Key.TAB);
        
        expect(InfoComplementares.dataAnalise.getAttribute('value')).toBe(Data.dataAtual(), 'Nao foi possivel validar data futura do campo "Data Analise - Info.Complementares"');
    });

    it('Campo "Data Análise" não deve aceitar data inválida', () => {
        let dataInvalida = '99/99/9999'
        InfoComplementares.dataAnalise.clear();
        InfoComplementares.dataAnalise.sendKeys(dataInvalida + protractor.Key.TAB);
        expect(InfoComplementares.dataAnalise.getAttribute('value')).toBe('', 'Nao foi possivel validar data invalida do campo "Data Analise - Info.Complementares"');
    });
});