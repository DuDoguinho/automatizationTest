let DadosProfissionais = require('./dados-profissionais.po');
let Estresse = require('../../../comum/estresse');
let Data = require('../../../comum/data');
let Menu = require('../../../menu/menu.po');
let AlteracaoCadastral = require('../../cadastro/alteracao-cadastral.po');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Cadastro = require('../../cadastro/cadastro.po');
var altera;
let cpf = '';


describe('Update Dados Profissionais', () => {
    beforeAll(() => {
    cpf = '';
    });

    beforeEach(() => {        
        if (!cpf) {
            Menu.navegaParaCadastroPF();
            cpf = Cadastro.cadastraPessoaFisicaSimples(DadosCadastro);
        }
        Menu.navegaParaAlteracaoCadastral();
        altera = new AlteracaoCadastral(cpf);
        altera.buscaCpf(cpf);
        altera.dadosProfissionais.click();
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

    it('deve realizar Update das informações', () => {
        DadosProfissionais.setGrauInstrucao('Mestrado');
        DadosProfissionais.setProfissao('VICE REITOR');
        DadosProfissionais.setCategoria('NEUROLOGISTA');
        DadosProfissionais.preenchenrRegistroProfissional('8888');
        DadosProfissionais.setcdOrgaoResponsavel('CRTR');
        DadosProfissionais.setufRegistro('RJ');
        Cadastro.botaoAtualizarCadastro.click();
        Menu.navegaParaHome();
        Menu.navegaParaAlteracaoCadastral();
        altera.buscaCpf(cpf);
        altera.dadosProfissionais.click();


        expect(DadosProfissionais.grauInstrucao.element(by.css('option[selected="selected"]')).getText()).toBe('Mestrado', "Falha ao comparar Grau de Instrução");
        expect(DadosProfissionais.profissao.getText()).toBe('VICE REITOR', "Falha ao comparar Profissão");
        expect(DadosProfissionais.categoria.getText()).toBe('NEUROLOGISTA', "Falha ao comparar Categoria");
        expect(DadosProfissionais.nrRegistroProfissional.getAttribute('value')).toBe('8888', "Falha ao preencher Número Registro Profissional");
        expect(DadosProfissionais.cdOrgaoResponsavel.getText()).toBe('CRTR', "Falha ao comparar cd Orgão Responsável");
        expect(DadosProfissionais.ufRegistro.element(by.css('option[selected="selected"]')).getText()).toBe('RJ', "Falha ao comparar UF Registro");
    });

});
