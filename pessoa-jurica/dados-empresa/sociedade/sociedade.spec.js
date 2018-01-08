let CnpjNome = require('../dados-cpf-nome/dados-cnpj-nome.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let DadosCadastro = require('../../../pessoa-fisica/fluxo-cadastro/dados-cadastro');
let Gerador = require('../../../comum/cpfCnpj');
let Sociedade = require('./sociedade.po');
let cnpj = '';

describe('Sociedade PJ', () => {
    beforeEach(() => {
        cnpj = Gerador.getCNPJ();
        CnpjNome.acessaPagina(cnpj);
        Sociedade.abreSecao();
    });

    it('Deve validar dados obrigatórios', () => {
        Sociedade.setTipoSociedade();
        Sociedade.tipoSociedade.sendKeys(protractor.Key.UP + protractor.Key.ENTER + protractor.Key.TAB);
        
        Sociedade.setTipoControle();
        Sociedade.tipoControle.sendKeys(protractor.Key.UP + protractor.Key.ENTER + protractor.Key.TAB);
        
        Sociedade.setTipoTributacao();
        Sociedade.tributacao.sendKeys(protractor.Key.UP + protractor.Key.ENTER + protractor.Key.TAB);
        
        expect(Mensagem.obrigatoriedade(Sociedade.tipoSociedade)).toBeTruthy('Falha ao validar campo Tipo Sociedade');
        expect(Mensagem.obrigatoriedade(Sociedade.tipoControle)).toBeTruthy('Falha ao validar campo Tipo Controle');
        expect(Mensagem.obrigatoriedade(Sociedade.tributacao)).toBeTruthy('Falha ao validar campo Tributação');
    });

    it('Deve validar tamanho máximo do campo "Número Filiais"', () => {
        Estresse.estressarCampo(Sociedade.numeroFiliais, 10);
        Estresse.avaliarLength(Sociedade.numeroFiliais, Sociedade.tamanhoDosCampos.numeroFiliais);
    });

    it('Deve validar comportamento da checkBox "Capital Aberto"', () => {
        Sociedade.clicaCapitalAberto().then(()=>{
            expect(Sociedade.capitalAberto.evaluate(Sociedade.capitalAberto.getAttribute('ng-model'))).toBe(true, 'Falha ao validar "Capital Aberto"');
        });

        Sociedade.clicaCapitalAberto().then(()=>{
            expect(Sociedade.capitalAberto.evaluate(Sociedade.capitalAberto.getAttribute('ng-model'))).toBe(false, 'Falha ao validar "Capital Aberto"');
        });
    });
});