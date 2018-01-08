let Menu = require('../../../menu/menu.po');
let Cadastro = require('../../cadastro/cadastro.po');
let GestaoContaCorrente = require('../gestao-conta-corrente/gestao-conta-corrente.po');
let GeraCPF = require('../../../comum/cpfCnpj');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let ContaSegundoTitular = require('./conta-segundo-titular.po');
let Update = require('../../cadastro/alteracao-cadastral.po');
let Mensagem = require('../../../comum/mensagem');

let cpf = '';

describe('Conta Corrente - Conta Vinculada - Vincular Segundo Titular', () => {
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
        ContaSegundoTitular.abreSecao();
    });

    it('Deve validar que campos "Cpf" e "Nome Completo" vêm desabilitados para edição por padrão', () => {
        ContaSegundoTitular.clicaNovo();

        expect(ContaSegundoTitular.cpfSegundoTitular.isEnabled()).toBeFalsy('Falha ao validar campo Cpf');
        expect(ContaSegundoTitular.nomeCompleto.isEnabled()).toBeFalsy('Falha ao validar campo Nome Completo');
    });

    it('Deve validar obrigatoriedade do campo matrícula', () => {
        ContaSegundoTitular.clicaSalvar();

        expect(Mensagem.obrigatoriedade(ContaSegundoTitular.matricula)).toBeTruthy();
    });
});