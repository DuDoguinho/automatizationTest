let Menu = require('../../../menu/menu.po');
let Cadastro = require('../../cadastro/cadastro.po');
let GestaoContaCorrente = require('../gestao-conta-corrente/gestao-conta-corrente.po');
let GeraCPF = require('../../../comum/cpfCnpj');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let ContaTaloes = require('./conta-taloes.po');
let Update = require('../../cadastro/alteracao-cadastral.po');
let Mensagem = require('../../../comum/mensagem')

let cpf = '';

describe('Conta Corrente - Conta Vinculada - Talões', () => {
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
        ContaTaloes.abreSecao();
    });

    it('Deve validar que campos "Min.Taloes" e "Min.Taloes TB" vêm com valor 0 por padrãoo', () => {
        expect(ContaTaloes.minTaloes.getAttribute('value')).toBe('0', 'Falha ao validar campo Min.Taloes');
        expect(ContaTaloes.minTaloesTB.getAttribute('value')).toBe('0', 'Falha ao validar campo Min.Taloes');
    });

    it('Deve validar que campo "Nr.Folhas Solic. Autom." vem com valor 10 por padrão', () => {
        expect(ContaTaloes.nrFolhasSolicAuto.getAttribute('value')).toBe('10', 'Falha ao validar campo Nr Folhas Solic Autom.');
    });

    it('Cadastra Conta com Talões', () => {
        ContaTaloes.setMinTaloes();
        ContaTaloes.setMinTaloesTB();

        GestaoContaCorrente.clicaSalvar().then(() => {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(Cadastro.contaGerada), 10000);
            Cadastro.contaGerada.getText().then((conta) => {
                console.log("Conta: " + conta);
                element(by.css('modal-steps')).element(by.css('.uni-modal--close')).click();

                Menu.navegaParaAlteracaoCadastral();
                let update = new Update(cpf);
                update.buscaConta(conta).then(() => cpf = '');
                expect(element(by.css('[ng-if="$ctrl.contaCorrentista"]')).isPresent()).toBe(true, "Falha ao verificar cadastro de Conta Corrente com Taloes.");
                expect(element(by.css('[ng-if="$ctrl.contaCorrentista"]')).getText()).toContain(conta, "Falha ao verificar cadastro de Conta Corrente com Taloes.");
            });
        });
    });
});