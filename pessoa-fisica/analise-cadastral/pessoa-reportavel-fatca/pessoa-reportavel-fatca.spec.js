let Reportavel = require('./pessoa-reportavel-fatca.po');

describe('Seção Pessoa Reportavel Fatca', function () {
    beforeAll(() => {
        Reportavel.acessaPagina();
        Reportavel.abreSessao();
    });

    it('Deve selecionar RadioButtons', () => {
        Reportavel.setarPossuiAutorizacaoResidencia('SIM');
        Reportavel.setarPossuiOutroDomicilio('SIM');
        Reportavel.setarPossuiGreencard('SIM');
        Reportavel.setarConsideradoUsPerson('SIM');

        let isSelected = (element) => element.isSelected();

        let elementSelected = (model) => element.all(by.model(model)).filter(isSelected);

        let possuiAutorizacaoResidencia = elementSelected(Reportavel.possuiAutorizacaoResidencia);
        let possuiOutroDomicilio = elementSelected(Reportavel.possuiOutroDomicilio);
        let possuiGreencard = elementSelected(Reportavel.possuiGreencard);
        let consideradoUsPerson = elementSelected(Reportavel.consideradoUsPerson);
        

        possuiAutorizacaoResidencia.getAttribute('value').then((txt)=>{
            expect(txt[0]).toEqual('SIM', 'Falha ao validar RadioButton "Possui autorização de residência em outros países?"!');
        }); 
        possuiOutroDomicilio.getAttribute('value').then((txt)=>{
            expect(txt[0]).toBe('SIM', 'Falha ao validar RadioButton "Possui outro domicílio fiscal além do declarado?"!');
        });
        possuiGreencard.getAttribute('value').then((txt)=>{
            expect(txt[0]).toBe('SIM', 'Falha ao validar RadioButton "Possui Greencard e participa de alguma empresa com mais de 10% do capital?"!');
        });
        consideradoUsPerson.getAttribute('value').then((txt)=>{
            expect(txt[0]).toBe('SIM', 'Falha ao validar RadioButton "É considerado "US PERSON"?"!');
        });
    });
});