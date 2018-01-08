let CnpjNome = require('../dados-cpf-nome/dados-cnpj-nome.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Data = require('../../../comum/data');
let DadosCadastro = require('../../../pessoa-fisica/fluxo-cadastro/dados-cadastro');
let Gerador = require('../../../comum/cpfCnpj');
let DadosRegistro = require('./dados-registro-pj.po');
let cnpj = '';

describe('Dados Registro PJ', () => {
    beforeEach(() => {
        cnpj = Gerador.getCNPJ();
        CnpjNome.acessaPagina(cnpj);
        DadosRegistro.abreSecao();
    });

    it('Valida dados obrigatórios', () => {
        DadosRegistro.numeroRegistro.sendKeys(protractor.Key.SPACE + protractor.Key.TAB);
        DadosRegistro.dataRegistro.sendKeys(protractor.Key.SPACE + protractor.Key.TAB);
        DadosRegistro.numeroArquivo.sendKeys(protractor.Key.SPACE + protractor.Key.TAB);
        DadosRegistro.dataArquivo.sendKeys(protractor.Key.SPACE + protractor.Key.TAB);
        DadosRegistro.dataConstituicao.sendKeys(protractor.Key.SPACE + protractor.Key.TAB);
        DadosRegistro.inscricaoMunicipal.sendKeys(protractor.Key.SPACE + protractor.Key.TAB);
        DadosRegistro.inscricaoEstadual.sendKeys(protractor.Key.SPACE + protractor.Key.TAB);
    
        expect(Mensagem.obrigatoriedade(DadosRegistro.numeroRegistro)).toBeTruthy('Falha ao validar campo Nr.Registro');
        expect(Mensagem.obrigatoriedade(DadosRegistro.dataRegistro)).toBeFalsy('Falha ao validar campo Data Registro');
        expect(Mensagem.obrigatoriedade(DadosRegistro.numeroArquivo)).toBeFalsy('Falha ao validar campo Nr.Arquivo');
        expect(Mensagem.obrigatoriedade(DadosRegistro.dataArquivo)).toBeFalsy('Falha ao validar campo Data Arquivo');
        expect(Mensagem.obrigatoriedade(DadosRegistro.dataConstituicao)).toBeTruthy('Falha ao validar campo Data Constituição');
        expect(Mensagem.obrigatoriedade(DadosRegistro.inscricaoMunicipal)).toBeFalsy('Falha ao validar campo Inscr. Municipal');
        expect(Mensagem.obrigatoriedade(DadosRegistro.inscricaoEstadual)).toBeFalsy('Falha ao validar campo Inscr. Estadual');
    });

    it('Valida tamanho máximo dos campos', () => {
        Estresse.estressarCampo(DadosRegistro.numeroRegistro, 30);
        Estresse.estressarCampo(DadosRegistro.numeroArquivo, 30);
        Estresse.estressarCampo(DadosRegistro.inscricaoMunicipal, 30);
        Estresse.estressarCampo(DadosRegistro.inscricaoEstadual, 30);

        Estresse.avaliarLength(DadosRegistro.numeroRegistro, DadosRegistro.tamanhoDosCampos.numeroRegistro, 'Numero Registro');
        Estresse.avaliarLength(DadosRegistro.numeroArquivo, DadosRegistro.tamanhoDosCampos.numeroArquivo, 'Numero Arquivo');
        Estresse.avaliarLength(DadosRegistro.inscricaoMunicipal, DadosRegistro.tamanhoDosCampos.inscricaoMunicipal, 'inscricao Municipal');
        Estresse.avaliarLength(DadosRegistro.inscricaoEstadual, DadosRegistro.tamanhoDosCampos.inscricaoEstadual, 'Inscricao Estadual');
    });

    it('Campo Data Registro não deve aceitar data inválida', () => {
        let dataInvalida = '99/99/9999';

        DadosRegistro.dataRegistro.clear();
        DadosRegistro.dataRegistro.sendKeys(dataInvalida + protractor.Key.TAB);

        expect(DadosRegistro.dataRegistro.getAttribute('value')).toBe('', 'Falha ao validar campo data');
    });

    it('Campo do Data do Registro não deve aceitar data futura', () => {
        let dataValida = Data.dataAtual();

        DadosRegistro.dataRegistro.clear();
        DadosRegistro.dataRegistro.sendKeys(Data.dataFutura() + protractor.Key.TAB);

        expect(DadosRegistro.dataRegistro.getAttribute('value')).toBe(dataValida, 'Falha ao validar campo data');
    });

    it('Campo do Data do Arquivo não deve aceitar data inválida', () => {
        let dataInvalida = '99/99/9999';

        DadosRegistro.dataArquivo.clear();
        DadosRegistro.dataArquivo.sendKeys(dataInvalida + protractor.Key.TAB);

        expect(DadosRegistro.dataArquivo.getAttribute('value')).toBe('', 'Falha ao validar campo data');
    });

    it('Campo do Data do Arquivo não deve aceitar data futura', () => {
        let dataValida = Data.dataAtual();

        DadosRegistro.dataArquivo.clear();
        DadosRegistro.dataArquivo.sendKeys(Data.dataFutura() + protractor.Key.TAB);

        expect(DadosRegistro.dataArquivo.getAttribute('value')).toBe(dataValida, 'Falha ao validar campo data');
    });

    
    it('Campo do Data da Constituição não deve aceitar data inválida', () => {
        let dataInvalida = '99/99/9999';

        DadosRegistro.dataConstituicao.clear();
        DadosRegistro.dataConstituicao.sendKeys(dataInvalida + protractor.Key.TAB);

        expect(DadosRegistro.dataConstituicao.getAttribute('value')).toBe('', 'Falha ao validar campo data');
    });

    it('Campo do Data da Constituição não deve aceitar data futura', () => {
        let dataValida = Data.dataAtual();

        DadosRegistro.dataConstituicao.clear();
        DadosRegistro.dataConstituicao.sendKeys(Data.dataFutura() + protractor.Key.TAB);

        expect(DadosRegistro.dataConstituicao.getAttribute('value')).toBe(dataValida, 'Falha ao validar campo data');
    });

    it('Deve validar que campo Número Registro não aceita caracteres especiais', () => {
        let nrInvalido = '$*AA455';
        let nrValido = '455';

        DadosRegistro.numeroRegistro.clear();
        DadosRegistro.numeroRegistro.sendKeys(nrInvalido + protractor.Key.TAB);
        expect(DadosRegistro.numeroRegistro.getAttribute('value')).toBe(nrValido, 'Falha ao validar campo Nr.Registro');
    });

    it('Deve validar que campo Número Arquivo não aceita caracteres especiais', () => {
        let nrInvalido = '$*AA455';
        let nrValido = '455';

        DadosRegistro.numeroArquivo.clear();
        DadosRegistro.numeroArquivo.sendKeys(nrInvalido + protractor.Key.TAB);
        expect(DadosRegistro.numeroArquivo.getAttribute('value')).toBe(nrValido, 'Falha ao vaidar campo Nr.Arquivo');
    });

    it('Deve validar que campo Inscição Municipal não aceita caracteres especiais', () => {
        let nrInvalido = '$*AA455';

        DadosRegistro.inscricaoMunicipal.clear();
        DadosRegistro.inscricaoMunicipal.sendKeys(nrInvalido + protractor.Key.TAB);
        expect(Mensagem.obrigatoriedade(DadosRegistro.inscricaoMunicipal)).toBeTruthy('Falha ao validar campo Nr.Arquivo');
    });

    it('Deve validar que campo Inscição Estadual não aceita caracteres especiais', () => {
        let nrInvalido = '$*AA455';

        DadosRegistro.inscricaoEstadual.clear();
        DadosRegistro.inscricaoEstadual.sendKeys(nrInvalido + protractor.Key.TAB);
        expect(Mensagem.obrigatoriedade(DadosRegistro.inscricaoEstadual)).toBeTruthy('Falha ao validar campo Nr.Arquivo');
    });
});