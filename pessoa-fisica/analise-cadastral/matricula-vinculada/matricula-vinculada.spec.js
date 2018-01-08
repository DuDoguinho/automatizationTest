let MatriculaVinculada = require('./matricula-vinculada.po');
let Estresse = require('../../../comum/estresse');
let Modal = require('../../../comum/modal');

describe('Matricula Vinculada', () => {
    beforeAll(() => {        
        MatriculaVinculada.acessaPagina();
        MatriculaVinculada.abreSessao();
    });

    it('Deve Inserir matricula, selecionar tipo de vinculo e validar nome do Associado conforme matricula', () => {
        MatriculaVinculada.setMatricula();
        MatriculaVinculada.matricula.sendKeys(protractor.Key.TAB);
        MatriculaVinculada.preencheVinculo();

        expect(MatriculaVinculada.nomeAssociado.getAttribute('value')).toEqual('Cooperada Ana32250');
    });

    it('Deve limpar o campo Matrícula e verificar se os outros campos foram limpos.', () => {
        MatriculaVinculada.matricula.clear();
        MatriculaVinculada.matricula.sendKeys(protractor.Key.TAB);

        expect(MatriculaVinculada.nomeAssociado.getText()).toBe('', "Falha ao limpar campo de matrícula, nome do Associado continua sendo apresentado.");
        expect(MatriculaVinculada.tipoVinculo.element(by.css('option[selected="selected"]')).getText()).toBe('', "Falha ao limpar campo de matrícula, tipo de Vínculo continua sendo apresentado.");
    });

    it('Campo "Matricula" deve aceitar apenas números', () => {
        let matriculaInvalida = '*AA%'
        MatriculaVinculada.matricula.clear();
        MatriculaVinculada.matricula.sendKeys(matriculaInvalida + protractor.Key.TAB);
        expect(MatriculaVinculada.matricula.getAttribute('value')).toEqual('');
    });

    it('Deve validar tamanho máximo do campo matricula', () => {
        Estresse.estressarCampo(MatriculaVinculada.matricula, 20);
        expect(Estresse.avaliarLength(MatriculaVinculada.matricula, MatriculaVinculada.tamanhoDosCampos.matricula));
        MatriculaVinculada.matricula.clear();
    });

    it('Deve apresentar modal quando número de matricula for invalido', () => {
        MatriculaVinculada.matricula.clear();
        MatriculaVinculada.matricula.sendKeys('555' + protractor.Key.TAB);
        expect(Modal.getModalMsg()).toEqual('O número de matrícula informado não foi encontrado.');

        Modal.clickModalBtn();
    });
});