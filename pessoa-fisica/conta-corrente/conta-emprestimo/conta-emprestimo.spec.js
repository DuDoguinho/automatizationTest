let Menu = require('../../../menu/menu.po');
let Cadastro = require('../../cadastro/cadastro.po');
let GestaoContaCorrente = require('../gestao-conta-corrente/gestao-conta-corrente.po');
let GeraCPF = require('../../../comum/cpfCnpj');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let ContaEmprestimo = require('./conta-emprestimo.po');

let cpf = '';

describe('Conta Corrente - Conta Vinculada - Empréstimo', () => {
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
        ContaEmprestimo.abreSessao();
    });

    it('Deve validar que checkbox "Amortização Automatica", "Liberação Automática" e "Contrato Pré-Aprovado" não vêm marcados por padrão', () => {
        expect(ContaEmprestimo.amortizacaoAutomatica.evaluate(ContaEmprestimo.amortizacaoAutomatica.getAttribute('ng-model'))).toBe(false, "Falha ao verificar se checkbox 'Amortizacao' está marcado");
        expect(ContaEmprestimo.liberacaoAutomatica.evaluate(ContaEmprestimo.liberacaoAutomatica.getAttribute('ng-model'))).toBe(false, "Falha ao verificar se checkbox 'Liberacao' está marcado");
        expect(ContaEmprestimo.contratoPreAprovado.evaluate(ContaEmprestimo.contratoPreAprovado.getAttribute('ng-model'))).toBe(false, "Falha ao verificar se checkbox 'Contrato' está marcado");
    });

    it('Deve validar comportamento dos checkbox "Amortização Automatica", "Liberação Automática" e "Contrato Pré-Aprovado"', () => {
        ContaEmprestimo.clicaAmortizacao().then(() => {
            expect(ContaEmprestimo.amortizacaoAutomatica.evaluate(ContaEmprestimo.amortizacaoAutomatica.getAttribute('ng-model'))).toBe(true, 'Falha ao validar amortização automática');
        });
        ContaEmprestimo.clicaAmortizacao().then(() => {
            expect(ContaEmprestimo.amortizacaoAutomatica.evaluate(ContaEmprestimo.amortizacaoAutomatica.getAttribute('ng-model'))).toBe(false, 'Falha ao validar amortização automática');
        });

        ContaEmprestimo.clicaLiberacaoAutomatica().then(() => {
            expect(ContaEmprestimo.liberacaoAutomatica.evaluate(ContaEmprestimo.liberacaoAutomatica.getAttribute('ng-model'))).toBe(true, 'Falha ao validar liberacao automatica');
        });
        ContaEmprestimo.clicaLiberacaoAutomatica().then(() => {
            expect(ContaEmprestimo.liberacaoAutomatica.evaluate(ContaEmprestimo.liberacaoAutomatica.getAttribute('ng-model'))).toBe(false, 'Falha ao validar liberacao automatica');
        });

        ContaEmprestimo.clicaPreAprovado().then(() => {
            expect(ContaEmprestimo.contratoPreAprovado.evaluate(ContaEmprestimo.contratoPreAprovado.getAttribute('ng-model'))).toBe(true, 'Falha ao validar Pre Aprovado');
        });
        ContaEmprestimo.clicaPreAprovado().then(() => {
            expect(ContaEmprestimo.contratoPreAprovado.evaluate(ContaEmprestimo.contratoPreAprovado.getAttribute('ng-model'))).toBe(false, 'Falha ao validar Pre Aprovado');
        });
    });
});