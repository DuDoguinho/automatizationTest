let Cadastro = require('../../cadastro/cadastro.po');
let Menu = require('../../../menu/menu.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Modal = require('../../../comum/modal');
let AlteracaoCadastral = require('../../cadastro/alteracao-cadastral.po');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let DadosCpfNome = require('../dados-cpf-nome/dados-cpf-nome.po');
let Endereco = require('./enderecos.po');
let Gerador = require('../../../comum/cpfCnpj');
let Data = require('../../../comum/data');
let altera;
let cpf = '';

describe('Update Endereco', () => {
    beforeEach(() => {
        if (!cpf) {
            Menu.navegaParaCadastroPF()
            cpf = Cadastro.cadastraPessoaFisica(DadosCadastro);
        }
        Menu.navegaParaAlteracaoCadastral();
        altera = new AlteracaoCadastral(cpf);
        altera.buscaCpf(cpf);
        altera.endereco.click();
    });

    it('deve validar os campos obrigatórios', () => {
        Endereco.botaoNovo.click();
        Endereco.tipoEndereco.click();
        Endereco.tipoEndereco.sendKeys(protractor.Key.UP);
        Endereco.tipoEndereco.sendKeys(protractor.Key.TAB);
        Endereco.cep.sendKeys(protractor.Key.TAB);

        Endereco.botaoSalvar.click().then(() => {

            expect(Mensagem.obrigatoriedade(Endereco.tipoEndereco)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Endereco.cep)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Endereco.logradouro)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Endereco.numero)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Endereco.bairro)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Endereco.estado)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Endereco.codigoCidade)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Endereco.situacaoEndereco)).toBeTruthy();
        });
    });

    it('deve validar tamanho máximo dos campos da seção', () => {
        Endereco.botaoNovo.click();
        Estresse.estressarCampo(Endereco.logradouro, 100);
        Estresse.estressarCampo(Endereco.numero, 100);
        Estresse.estressarCampo(Endereco.caixaPostal, 100);
        Estresse.estressarCampo(Endereco.complemento, 100);
        Estresse.estressarCampo(Endereco.bairro, 100);

        Estresse.avaliarLength(Endereco.logradouro, Endereco.tamanhoDosCampos.logradouro);
        Estresse.avaliarLength(Endereco.numero, Endereco.tamanhoDosCampos.numero);
        Estresse.avaliarLength(Endereco.caixaPostal, Endereco.tamanhoDosCampos.caixaPostal);
        Estresse.avaliarLength(Endereco.complemento, Endereco.tamanhoDosCampos.complemento);
        Estresse.avaliarLength(Endereco.bairro, Endereco.tamanhoDosCampos.bairro);
    });

    it('deve limpar e desabilitar campo NUMERO se checkbox for marcado', () => {
        Endereco.botaoNovo.click();
        Endereco.numero.sendKeys('888');
        Endereco.enderecoSemNumero.click();

        expect(Endereco.numero.isEnabled()).toBe(false);
        expect(Endereco.numero.evaluate(Endereco.numero.getAttribute('ng-model'))).toEqual(null);
    });

    it('deve carregar UF e CIDADE através do CEP', () => {
        let cep = '96745-000';

        Endereco.botaoNovo.click();
        Endereco.cep.sendKeys(cep);
        element(by.css('body')).click();

        expect(Endereco.estado.element(by.css('option:checked')).getText()).toEqual('RS');
        expect(Endereco.logradouro.evaluate(Endereco.logradouro.getAttribute('ng-model'))).toEqual(null);
        expect(Endereco.codigoCidade.element(by.css('option:checked')).getText()).toEqual('Charqueadas');
    });

    it('deve carregar UF, CIDADE, BAIRRO e LOGRADOURO através do CEP', () => {
        let cep = '90560-000';

        Endereco.botaoNovo.click();
        Endereco.cep.sendKeys(cep);
        element(by.css('body')).click();

        expect(Endereco.estado.element(by.css('option:checked')).getText()).toEqual('RS');
        expect(Endereco.logradouro.evaluate(Endereco.logradouro.getAttribute('ng-model'))).toEqual('Avenida Cristóvão Colombo');
        expect(Endereco.bairro.evaluate(Endereco.bairro.getAttribute('ng-model'))).toEqual('Floresta');
        expect(Endereco.codigoCidade.element(by.css('option:checked')).getText()).toEqual('Porto Alegre');
    });

    it('Campo caixa postal deve aceitar apenas números', () => {
        let postalInvalido = '*A%5555'
        let postalValido = '5555'

        Endereco.botaoNovo.click();
        Endereco.caixaPostal.clear();
        Endereco.caixaPostal.sendKeys(postalInvalido);
        expect(Endereco.caixaPostal.getAttribute('value')).toEqual(postalValido);
    });

    it('Deve aparecer mensagem de Obrigatoriedade do campo "Situação Endereço" quando checkbox "Principal" estiver marcado', () => {
        Endereco.botaoNovo.click();
        Endereco.marcaPrincipal();
        Endereco.botaoSalvar.click();
        Endereco.marcaPrincipal();
        expect(Mensagem.obrigatoriedade(Endereco.situacaoEndereco)).toBeTruthy();
    });

    it('Deve verificar comportamento dos campos "Situação Endereço", "Reside Desde" e "Meses de Residência" ao marcar/desmarcar checkbox "Principal" ', () => {            
        Endereco.botaoNovo.click();
        Endereco.marcaPrincipal().then(() => {
            expect(Endereco.situacaoEndereco.isEnabled()).toBe(false, "Falha ao validar se campo Situação Endereço está desabilitado");
            expect(Endereco.resideDesde.isEnabled()).toBe(false, "Falha ao validar se campo Reside Desde está desabilitado");
            expect(Endereco.mesesDeResidencia.isEnabled()).toBe(false, "Falha ao validar se campo Meses de Residência está desabilitado");
        })
        Endereco.marcaPrincipal().then(() => {
            expect(Endereco.situacaoEndereco.isEnabled()).toBe(true, "Falha ao validar se campo Situação Endereço está habilitado");
            expect(Endereco.resideDesde.isEnabled()).toBe(true, "Falha ao validar se campo Reside Desde está habilitado");
            expect(Endereco.mesesDeResidencia.isEnabled()).toBe(false, "Falha ao validar se campo Meses de Residência está habilitado");
        });
    });

    it('Campo "Meses de Rediências" deve ser coerente com "Reside Desde"', () => {
        let numeroMeses = 15;
        Endereco.botaoNovo.click();
        Endereco.resideDesde.sendKeys(Data.dataMesAno(numeroMeses, '-') + protractor.Key.TAB);
        expect(Endereco.mesesDeResidencia.getAttribute('value')).toEqual(numeroMeses.toString());
    });

    it('Deve editar imovel, salvar alteração e validar dados', () => {
        Endereco.editaPrimeiro();
        Endereco.cep.clear();
        Endereco.cep.sendKeys('90035090' + protractor.Key.TAB);
        Endereco.empostamento.click();
        Endereco.numero.clear();
        Endereco.numero.sendKeys('555');
        Endereco.setSituacaoEndereco();

        expect(Endereco.logradouro.getAttribute('value')).toBe('Rua Fernandes Vieira', 'Falha ao validar campo logradouro');
        expect(Endereco.bairro.getAttribute('value')).toBe('Bom Fim', 'Falha ao validar campo Bairro');
        expect(Endereco.codigoCidade.element(by.css('option:checked')).getText()).toEqual('Porto Alegre', 'Falha ao validar campo cidade');

        Endereco.botaoSalvar.click().then(()=>{
            let primeiroEndereco = Endereco.getTableRows().first();

            expect(primeiroEndereco.element(Endereco.byColunaCep).getText()).toBe('90035-090', 'Falha ao validar campo Cep');
            expect(primeiroEndereco.element(Endereco.byColunaLogradouro).getText()).toBe('Rua Fernandes Vieira'.toUpperCase(), 'Falha ao validar campo Logradouro');
            expect(primeiroEndereco.element(Endereco.byColunaNumero).getText()).toBe('555', 'Falha ao validar campo numero');
            expect(primeiroEndereco.element(Endereco.byColunaCidade).getText()).toBe('Porto Alegre'.toUpperCase(), 'Falha ao valiar campo Cidade');
            
            Cadastro.atualizaCadastro();
            expect(Endereco.msgSucesso.isPresent()).toBeTruthy('Falha ao validar mensagem de sucesso');

            Menu.navegaParaAlteracaoCadastral();
            altera.buscaCpf(cpf);
            altera.endereco.click();
            
            Endereco.editaPrimeiro();
            expect(Endereco.cep.getAttribute('value')).toBe('90035-090', 'Falha ao validar campo cep');
        });
    });
});