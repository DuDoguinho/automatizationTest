let Menu = require('../../../menu/menu.po');
let Cadastro = require('../../cadastro/cadastro.po');
let GestaoContaCorrente = require('../gestao-conta-corrente/gestao-conta-corrente.po');
let GeraCPF = require('../../../comum/cpfCnpj');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let ContaTarifas = require('./conta-tarifas.po');
let Mensagem = require('../../../comum/mensagem')

let cpf = '';

describe('Conta Corrente - Conta Vinculada - Tarifas', () => {
    beforeAll(() => {
        Menu.navegaParaCadastroPF();
        if (!cpf) {
            cpf = Cadastro.cadastraPessoaFisicaSimples(DadosCadastro);
            Menu.navegaParaCadastroPF();
        }
        Cadastro.buscaCpf(cpf);
        if (Menu.verificaSeHabilitado(Menu.matricula)) {
            Cadastro.cadastraMatricula();
            Menu.navegaParaCadastroPF();
            Cadastro.buscaCpf(cpf);
        }
        Menu.navegaParaConta();
        GestaoContaCorrente.abreSessao();
        GestaoContaCorrente.preencheContaCorrente();
        ContaTarifas.abreSecao();
    });

    it('Deve validar que campos "Pacote de Serviços" e "Dia de Cobrança" vêm habilitados para edição por padrão', () => {
        expect(ContaTarifas.pacoteServicos.isEnabled()).toBeTruthy('Falha ao validar campo Pacote de Serviços');
        expect(ContaTarifas.diaCobranca.isEnabled()).toBeTruthy('Falha ao validar campo Dia de Cobrança');
    });

    it('Deve validar que campo "Pacote de Serviços" vem com valor "NENHUM" por padrão', () => {
        expect(ContaTarifas.pacoteServicos.element(by.css('[selected="selected"]')).getText()).toBe('nenhum'.toUpperCase(), 'Falha campo Pcte Servicos');
    });

    it('Deve valiadr que campo "Dia Cobrança" se torna obrigatório ao selecionar um Pacote de Serviços', () => {
        ContaTarifas.setPacoteServicos();
        GestaoContaCorrente.clicaSalvar();
        expect(Mensagem.obrigatoriedade(ContaTarifas.diaCobranca)).toBeTruthy();
    });
});