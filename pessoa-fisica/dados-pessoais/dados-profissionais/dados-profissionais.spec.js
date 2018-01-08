let DadosProfissionais = require('./dados-profissionais.po');
let Estresse = require('../../../comum/estresse');
let Data = require('../../../comum/data');

describe('Dados Profissionais', () => {
    beforeEach(() => {
        DadosProfissionais.acessaPagina();
        DadosProfissionais.sessao.element(by.css('.step-section')).click();
    });

    it('deve validar tamanho máximo dos campos da seção', () => {
        Estresse.estressarCampo(DadosProfissionais.nrRegistroProfissional, 50);

        Estresse.avaliarLength(DadosProfissionais.nrRegistroProfissional, DadosProfissionais.tamanhoDosCampos.nrRegistroProfissional);
    });

    it('deve calcular meses de profissão', () => {
        let meses = Data.calcularMeses('31/12/1992');
        DadosProfissionais.inicioProfissional.sendKeys('31/12/1992');
        DadosProfissionais.inicioProfissional.sendKeys(protractor.Key.TAB);

        DadosProfissionais.mesesProfissao.evaluate(DadosProfissionais.mesesProfissao.getAttribute('ng-model'))
            .then((item) => {
                expect(item).toEqual(meses);
            }
            );
    });

    it('Verificar se Número Reg Profissional aceita somente números', () => {

        DadosProfissionais.nrRegistroProfissional.sendKeys('NNN');
        expect(DadosProfissionais.nrRegistroProfissional.getAttribute('value')).toBe('0', 'Falha ao validar a inserção de letras');
        DadosProfissionais.nrRegistroProfissional.clear();

        DadosProfissionais.nrRegistroProfissional.sendKeys('@##$%&*');
        expect(DadosProfissionais.nrRegistroProfissional.getAttribute('value')).toBe('0', 'Falha ao validar inserção de caractere especial');
        DadosProfissionais.nrRegistroProfissional.clear();

        DadosProfissionais.nrRegistroProfissional.sendKeys('12345');
        expect(DadosProfissionais.nrRegistroProfissional.getAttribute('value')).toBe('12345', 'Falha ao validar inserção de números');
        DadosProfissionais.nrRegistroProfissional.clear();

    });

    it('Verificar se Início Profissional não aceita data futura', () => {

        DadosProfissionais.inicioProfissional.clear();
        DadosProfissionais.inicioProfissional.sendKeys(Data.dataFutura());
        expect(DadosProfissionais.inicioProfissional.getAttribute('value')).toBe(Data.dataAtual(), 'Falha ao apresentar data atual');
    });

    it('Verificar se Início Profissional não aceita data inválida', () => {

        let dataInvalida = '99/99/9999'

        DadosProfissionais.inicioProfissional.sendKeys(dataInvalida);
        element(by.css('body')).click();

        expect(DadosProfissionais.inicioProfissional.getAttribute('value')).toBe('', 'Falha ao validar data inválida');
    });
});
