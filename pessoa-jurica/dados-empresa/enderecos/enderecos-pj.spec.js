let CnpjNome = require('../dados-cpf-nome/dados-cnpj-nome.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Data = require('../../../comum/data');
let DadosCadastro = require('../../../pessoa-fisica/fluxo-cadastro/dados-cadastro');
let Gerador = require('../../../comum/cpfCnpj');
let Enderecos = require('./enderecos-pj.po');
let cnpj = '';

describe('Endereços PJ', () => {
    beforeEach(() => {
        cnpj = Gerador.getCNPJ();
        CnpjNome.acessaPagina(cnpj);
        Enderecos.abreSecao();
        Enderecos.clicaNovo();
    });

    it('Deve validar obrigatoriedade dos campos', () => {
        Enderecos.clicaSalvar();

        expect(Mensagem.obrigatoriedade(Enderecos.logradouro)).toBeTruthy('Falha ao validar campo logradouro');
        expect(Mensagem.obrigatoriedade(Enderecos.numero)).toBeTruthy('Falha ao validar campo Numero');
        expect(Mensagem.obrigatoriedade(Enderecos.bairro)).toBeTruthy('Falha ao validar campo Bairro');
        expect(Mensagem.obrigatoriedade(Enderecos.uf)).toBeTruthy('Falha ao validar campo UF');
        expect(Mensagem.obrigatoriedade(Enderecos.cidade)).toBeTruthy('Falha ao validar campo Cidade');
        expect(Mensagem.obrigatoriedade(Enderecos.situacaoEndereco)).toBeTruthy('Falha ao validar campo Sit.Endereco');
    });

    it('Deve Validar tamanho dos campos', () => {
        Estresse.estressarCampo(Enderecos.logradouro, 60);
        Estresse.estressarCampo(Enderecos.numero, 20);
        Estresse.estressarCampo(Enderecos.caixaPostal, 20);
        Estresse.estressarCampo(Enderecos.complemento, 40);
        Estresse.estressarCampo(Enderecos.bairro, 30);

        Estresse.avaliarLength(Enderecos.logradouro, Enderecos.tamanahoDosCampos.logradouro);
        Estresse.avaliarLength(Enderecos.numero, Enderecos.tamanahoDosCampos.numero);
        Estresse.avaliarLength(Enderecos.caixaPostal, Enderecos.tamanahoDosCampos.caixaPostal);
        Estresse.avaliarLength(Enderecos.complemento, Enderecos.tamanahoDosCampos.complemento);
        Estresse.avaliarLength(Enderecos.bairro, Enderecos.tamanahoDosCampos.bairro);
    });

    it('deve mostrar mensagem de lista vazia inicialmente', () => {
        let tableRows = Enderecos.getTableRows();

        expect(Enderecos.listaVazia.isDisplayed()).toBeTruthy();
        expect(tableRows.count()).toEqual(0);
    });

    it('Campo "Meses de Rediências" deve ser coerente com "Reside Desde"', () => {
        let numeroMeses = 15;
        Enderecos.resideDesde.sendKeys(Data.dataMesAno(numeroMeses, '-') + protractor.Key.TAB);
        expect(Enderecos.mesesResidencia.getAttribute('value')).toEqual(numeroMeses.toString());
    });

    it('Deve validar que campo Número não aceita letras e caracteres especiais', () => {
        let numeroInvalido = '%$A*G555';
        let numeroValido = '555';

        Enderecos.numero.clear();
        Enderecos.numero.sendKeys(numeroInvalido + protractor.Key.TAB);
        expect(Enderecos.numero.getAttribute('value')).toBe(numeroValido, 'Falha ao validar campo Numero');
    });

    it('Deve validar comportamento do Checkbox "Sem Numero"', () => {
        expect(Enderecos.numero.isEnabled()).toBeTruthy('Falha ao validar campo numero');
        
        Enderecos.semNumero.click();
        expect(Enderecos.numero.isEnabled()).toBeFalsy('Falha ao validar campo numero');
    });

    it('Deve validar comportamento do campo "Valor Aluguel/Financiamento" quando Situacao Enderco vem com valores Alguel e Finciamento', () => {
        expect(Enderecos.valorAluguel.isDisplayed()).toBeFalsy('Falha ao validar campo Vl.Aluguel');

        Enderecos.setSituacaoEndereco('Alugada');
        expect(Enderecos.valorAluguel.isDisplayed()).toBeTruthy('Falha ao validar campo Vl.Aluguel');
        expect(Enderecos.valorAluguel.isEnabled()).toBeTruthy('Falha ao validar campo Vl.Aluguel');
        
        Enderecos.setSituacaoEndereco();
        expect(Enderecos.valorAluguel.isDisplayed()).toBeFalsy('Falha ao validar campo Vl.Aluguel');

        Enderecos.setSituacaoEndereco('Financiada');
        expect(Enderecos.valorAluguel.isDisplayed()).toBeTruthy('Falha ao validar campo Vl.Aluguel');
        expect(Enderecos.valorAluguel.isEnabled()).toBeTruthy('Falha ao validar campo Vl.Aluguel');
    });

    it('Deve inserir um endereço e validar lista', () => {
        let cep = '90820-120';
        let logradouro = 'Rua Itapitocaí';
        let numero = '123';
        let cidade = 'Porto Alegre';
        let tableRows = Enderecos.getTableRows();                        
        let primeiraLinha = Enderecos.getTableRows().first();                        
 
        Enderecos.preencherCamposObrigatorios();
        Enderecos.clicaSalvar();

        expect(tableRows.count()).toEqual(1);
        expect(primeiraLinha.element(Enderecos.byColunaCep).getText()).toBe(cep, 'Falha ao validar campo CEP');
        expect(primeiraLinha.element(Enderecos.byColunaLogradouro).getText()).toBe(logradouro.toUpperCase(), 'Falha ao validar campo Logradouro');
        expect(primeiraLinha.element(Enderecos.byColunaNumero).getText()).toBe(numero, 'Falha ao validar campo Numero');
        expect(primeiraLinha.element(Enderecos.byColunaCidade).getText()).toBe(cidade.toUpperCase(), 'Falha ao validar campo Cidade');
    });

    it('Deve validar que campo "Meses de Residência" vem desabilitado para edição', () => {
        expect(Enderecos.mesesResidencia.isEnabled()).toBeFalsy('Falha ao validar campo Meses Residência');        
    });

    it('Deve validar que campos "Sit.Endereço" e "Resde Desde" são desabilitados ao desmarcar checkbox "Principal"', () => {
        expect(Enderecos.situacaoEndereco.isEnabled()).toBeTruthy('Falha ao validar campo Sit.Endereco');
        expect(Enderecos.resideDesde.isEnabled()).toBeTruthy('Falha ao validar campo Reside Desde');
        
        Enderecos.clicaPrincipal();

        expect(Enderecos.situacaoEndereco.isEnabled()).toBeFalsy('Falha ao validar campo Sit.Endereco');
        expect(Enderecos.resideDesde.isEnabled()).toBeFalsy('Falha ao validar campo Reside Desde');
    });

    describe('Listagem', function () {
        beforeAll(() => {
            cnpj = Gerador.getCNPJ().replace('.', '').replace('.', '').replace('-', '');
        })
        beforeEach(() => {
            Enderecos.acessaPagina(cnpj);
            Enderecos.secao.element(by.css('.step-section')).click();
        });

        it('deve inserir múltiplos', () => {
            let enderecos = DadosCadastro.cadastro.dadosPessoais.enderecos;

            Enderecos.insereMultiplos(enderecos);

            let tableRows = Enderecos.getTableRows();
            expect(tableRows.count()).toEqual(enderecos.length);
        });

        it('deve inserir e apagar', () => {
            let enderecos = DadosCadastro.cadastro.dadosPessoais.enderecos;

            Enderecos.insereMultiplos(enderecos);
            for (var i = 0; i < enderecos.length; i++) {
                Enderecos.excluir();
            }

            let tableRows = Enderecos.getTableRows();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve editar', () => {
            let enderecos = DadosCadastro.cadastro.dadosPessoais.enderecos,
                novoCep = '90520-060';

            Enderecos.insereMultiplos(enderecos);
            Enderecos.editar(novoCep);

            let tableRows = Enderecos.getTableRows(),
                labelNovoCep = tableRows.all(by.binding('endereco.cep | brCep')).first();

            expect(tableRows.count()).toEqual(enderecos.length);
            expect(labelNovoCep.getText()).toEqual(novoCep);
        });
    });
});