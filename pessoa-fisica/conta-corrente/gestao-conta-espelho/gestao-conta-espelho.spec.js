let GestaoContaEspelho = require('./gestao-conta-espelho.po');
let GestaoContaCorrente = require('../gestao-conta-corrente/gestao-conta-corrente.po');
let Menu = require('../../../menu/menu.po');
let Cadastro = require('../../cadastro/cadastro.po');
let Mensagem = require('../../../comum/mensagem');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Update = require('../../cadastro/alteracao-cadastral.po');
let GeraCPF = require('../../../comum/cpfCnpj');

let cpf = '';

describe('Conta Corrente - Gestão de Conta Espelho', () => {
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
        GestaoContaCorrente.compePropria.click();
        GestaoContaCorrente.preencheContaCorrente();
        GestaoContaEspelho.abreSessao();
    });

    it('Deve validar obrigatoriedade dos campos', () => {
        GestaoContaCorrente.clicaSalvar();

        expect(Mensagem.obrigatoriedade(GestaoContaEspelho.situacao)).toBeTruthy('Falha ao validar campo situação');
        expect(Mensagem.obrigatoriedade(GestaoContaEspelho.pacoteTarifasBB)).toBeTruthy('Falha ao validar campo pacote tarifas BB');
        expect(Mensagem.obrigatoriedade(GestaoContaEspelho.tpCalcDefLimite)).toBeTruthy('Falha ao validar campo Tp.Calc.Def.Limite');
    });

    it('Deve validar que campo "Valor Limite" vem desabilitado para edição', () => {
        expect(GestaoContaEspelho.valorLimite.isEnabled()).toBeFalsy('Falha ao validar campo valor limite');
    });

    it('Deve validar que campos da seção vêm sem valor setado, exceto o campo "End. Corresp."', () => {
        let dadosPessoais = DadosCadastro.cadastro.dadosPessoais;
        let endCorrespondencia = dadosPessoais.enderecos[0].logradouro +', '+ dadosPessoais.enderecos[0].numero +', '+ dadosPessoais.enderecos[0].complemento;

        expect(GestaoContaEspelho.situacao.getAttribute('value')).toBe('', 'Falha ao validar campo situação');
        expect(GestaoContaEspelho.pacoteTarifasBB.getAttribute('value')).toBe('', 'Falha ao validar Pacote de Tarifas BB');
        expect(GestaoContaEspelho.tpCalcDefLimite.getAttribute('value')).toBe('', 'Falha ao validar campo tpCalcDefLimite');
        expect(GestaoContaEspelho.valorLimite.getAttribute('value')).toBe('', 'Falha ao validar campo valorLimite');
        expect(GestaoContaEspelho.saldoMinimo.getAttribute('value')).toBe('', 'Falha ao validar campo saldoMinimo');
        expect(GestaoContaEspelho.saldoMaximo.getAttribute('value')).toBe('', 'Falha ao validar campo saldoMaximo');
        expect(GestaoContaEspelho.endCorrespContaIntBB.getAttribute('value')).toBe(endCorrespondencia.toUpperCase(), 'Falha ao validar campo endCorrespContaIntBB');
    });

    it('Deve validar que campo "Valor Limite" fica disponível para edição após definir o valor "Padrao" p/ campo "Tp. Cálc. Def. Limite"', () => {
        expect(GestaoContaEspelho.valorLimite.isEnabled()).toBeFalsy('Falha ao validar campo valor limite');

        GestaoContaEspelho.setTpCalculoDefLimite();
        GestaoContaEspelho.tpCalcDefLimite.sendKeys(protractor.Key.TAB);
        expect(GestaoContaEspelho.valorLimite.isEnabled()).toBeTruthy('Falha ao validar campo valor limite');
    });

    it('Campo "Valor Limite" deve aceitar apenas números', () => {
        let valorInvalido = '*AA%5555'
        let valorValido = '55,55'

        GestaoContaEspelho.setTpCalculoDefLimite();
        GestaoContaEspelho.tpCalcDefLimite.sendKeys(protractor.Key.TAB);
        GestaoContaEspelho.valorLimite.clear();
        GestaoContaEspelho.valorLimite.sendKeys(valorInvalido);
        expect(GestaoContaEspelho.valorLimite.getAttribute('value')).toEqual('R$ ' + valorValido);
    });

    it('Campo "Saldo Mínimo" deve aceitar apenas números', () => {
        let valorInvalido = '*AA%5555'
        let valorValido = '55,55'

        GestaoContaEspelho.saldoMaximo.clear();
        GestaoContaEspelho.saldoMaximo.sendKeys(valorInvalido);
        expect(GestaoContaEspelho.saldoMaximo.getAttribute('value')).toEqual('R$ ' + valorValido);
    });

    it('Campo "Saldo Máximo" deve aceitar apenas números', () => {
        let valorInvalido = '*AA%5555'
        let valorValido = '55,55'

        GestaoContaEspelho.saldoMinimo.clear();
        GestaoContaEspelho.saldoMinimo.sendKeys(valorInvalido);
        expect(GestaoContaEspelho.saldoMinimo.getAttribute('value')).toEqual('R$ ' + valorValido);
    });

    it('Cadastra Conta Espelho', () => {
        GestaoContaEspelho.setSituacao();
        GestaoContaEspelho.setPacoteTarifas();
        GestaoContaEspelho.setTpCalculoDefLimite();

        GestaoContaCorrente.clicaSalvar().then(() => {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(Cadastro.contaGerada), 10000);
            Cadastro.contaGerada.getText().then((conta) => {
                console.log("Conta: " + conta);
                element(by.css('modal-steps')).element(by.css('.uni-modal--close')).click();

                Menu.navegaParaAlteracaoCadastral();
                let update = new Update(cpf);
                update.buscaConta(conta).then(() => cpf = '');
                expect(element(by.css('[ng-if="$ctrl.contaCorrentista"]')).isPresent()).toBe(true, "Falha ao verificar cadastro de Conta Corrente com Conta Espelho.");
                expect(element(by.css('[ng-if="$ctrl.contaCorrentista"]')).getText()).toContain(conta, "Falha ao verificar cadastro de Conta Corrente com Conta Espelho.");
            });
        });
    });
});