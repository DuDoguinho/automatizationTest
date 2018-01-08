let Menu = require('../../../menu/menu.po');
let Cadastro = require('../../cadastro/cadastro.po');
let GestaoContaCorrente = require('../gestao-conta-corrente/gestao-conta-corrente.po');
let ContaAplicacao = require('./conta-corrente-aplicacao.po');
let GeraCPF = require('../../../comum/cpfCnpj');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');

let cpf = '';

describe('Conta Corrente - Conta Vinculada - Aplicação', () => {
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
        ContaAplicacao.abreSessao();
    });

    it('Deve validar que checkbox "Resgate Automático" e "Considera Carência do Cheque Especial" não vêm marcados por padrão', () => {
        expect(ContaAplicacao.resgateAutomatico.evaluate(ContaAplicacao.resgateAutomatico.getAttribute('ng-model'))).toBe(false, "Falha ao verificar valor default do checkbox 'Resgate Automático'.");
        expect(ContaAplicacao.carenciaChequeEspecial.evaluate(ContaAplicacao.carenciaChequeEspecial.getAttribute('ng-model'))).toBe(false, "Falha ao verificar  valor default do 'Carência Cheque Especial'.");
    });

    it('Deve validar comportamento do checkbox "Resgate Automático".', () => {
        ContaAplicacao.clicaResgateAutomatico().then(() => {
            expect(ContaAplicacao.resgateAutomatico.evaluate(ContaAplicacao.resgateAutomatico.getAttribute('ng-model'))).toBe(true, 'Falha ao validar Resgate Automático');

            ContaAplicacao.clicaResgateAutomatico().then(() => {
                expect(ContaAplicacao.resgateAutomatico.evaluate(ContaAplicacao.resgateAutomatico.getAttribute('ng-model'))).toBe(false, 'Falha ao validar Resgate automática');
            });
        });
    });

    it('Deve validar comportamento do checkbox "Considera Carência do Cheque Especial"', () => {
        ContaAplicacao.clicaCarenciaChequeEspecial().then(() => {
            expect(ContaAplicacao.carenciaChequeEspecial.evaluate(ContaAplicacao.carenciaChequeEspecial.getAttribute('ng-model'))).toBe(true, 'Falha ao validar Carência do Cheque Especial');

            ContaAplicacao.clicaCarenciaChequeEspecial().then(() => {
                expect(ContaAplicacao.carenciaChequeEspecial.evaluate(ContaAplicacao.carenciaChequeEspecial.getAttribute('ng-model'))).toBe(false, 'Falha ao validar Carência do Cheque Especial');
            });
        });
    });
});