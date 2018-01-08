let Menu = require('../../../menu/menu.po');
let Cadastro = require('../../cadastro/cadastro.po');
let Update = require('../../cadastro/alteracao-cadastral.po');
let GestaoContaCorrente = require('./gestao-conta-corrente.po');
let GestaoContaEspelho = require('../gestao-conta-espelho/gestao-conta-espelho.po');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Mensagem = require('../../../comum/mensagem');
let Data = require('../../../comum/data');
let Estresse = require('../../../comum/estresse');

let cpf = '';

describe('Conta Corrente - Gestão de Conta Corrente', () => {
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
    });

    it('Valida obrigatoriedade dos campos', () => {
        GestaoContaCorrente.clicaSalvar();
        expect(Mensagem.obrigatoriedade(GestaoContaCorrente.contatoDudoguinho)).toBeTruthy();
    });

    it('Deve validar que campos vêm preenchidos', () => {
        let tipoConta = 'Conta Corrente'
        let modalidade = 'Individual'
        let assinatura = 'Solidária'
        let cpmf = 'Alíquota Normal'
        let nomeIdentificador = 'Juarez Auto'
        let situacao = 'Livre'
        let dadosPessoais = DadosCadastro.cadastro.dadosPessoais;
        let endEmpostamento = dadosPessoais.enderecos[0].logradouro +', '+ dadosPessoais.enderecos[0].numero +', '+ dadosPessoais.enderecos[0].complemento +', '+ dadosPessoais.enderecos[0].bairro+', CEP - '+ dadosPessoais.enderecos[0].cep.replace('-', '');

        expect(GestaoContaCorrente.tipoConta.element(by.css('[selected="selected"]')).getText()).toBe(tipoConta, 'Falha campo Pcte Servicos');
        expect(GestaoContaCorrente.modalidade.element(by.css('[selected="selected"]')).getText()).toBe(modalidade, 'Falha campo Pcte Servicos');
        expect(GestaoContaCorrente.assinatura.element(by.css('[selected="selected"]')).getText()).toBe(assinatura, 'Falha campo Pcte Servicos');
        expect(GestaoContaCorrente.cpmf.element(by.css('[selected="selected"]')).getText()).toBe(cpmf, 'Falha campo Pcte Servicos');
        expect(GestaoContaCorrente.nomeIdentificador.getAttribute('value')).toBe(nomeIdentificador.toUpperCase(), 'Falha campo Pcte Servicos');
        expect(GestaoContaCorrente.situacao.element(by.css('[selected="selected"]')).getText()).toBe(situacao, 'Falha campo Pcte Servicos');
        expect(GestaoContaCorrente.enderecoEmpostamento.element(by.css('[selected="selected"]')).getText()).toBe(endEmpostamento.toUpperCase(), 'Falha campo Pcte Servicos');
    });

    it('Checkbox Compe Pópria: Quando estiver desmarcada deve habilitar seção "Gestão de Conta Espelho".', () => {
        GestaoContaCorrente.compePropria.click().then(()=>{
            expect(GestaoContaEspelho.sessao.isDisplayed()).toBe(true, "Falha ao validar se seção Gestão de Conta Espelho foi mostrada.");
        });
    });

    it('Dropdown "Contato na Dudoguinho" deve vir sem valor setado por padrão.', () => {
        expect(GestaoContaCorrente.contatoDudoguinho.evaluate(GestaoContaCorrente.contatoDudoguinho.getAttribute('value'))).toBe(null, "Falha ao validar valor default do campo Contato na Dudoguinho.");
    });

    it('Campo "Cliente desde" não deve aceitar data futura ou inválida, apenas atual e passada.', () => {
        GestaoContaCorrente.clienteDesde.sendKeys('99/99/9999' + protractor.Key.TAB);
        expect(GestaoContaCorrente.clienteDesde.getAttribute('value')).toBe('', "Falha ao validar 'Cliente desde' com data inválida.");

        GestaoContaCorrente.clienteDesde.clear();
        GestaoContaCorrente.clienteDesde.sendKeys(Data.dataFutura() + protractor.Key.TAB);
        expect(GestaoContaCorrente.clienteDesde.getAttribute('value')).toBe(Data.dataAtual(), "Falha ao validar 'Cliente desde' com data futura.");

        GestaoContaCorrente.clienteDesde.clear();
        GestaoContaCorrente.clienteDesde.sendKeys(Data.dataAtual() + protractor.Key.TAB);
        expect(GestaoContaCorrente.clienteDesde.getAttribute('value')).toBe(Data.dataAtual(), "Falha ao validar 'Cliente desde' com data atual.");

        GestaoContaCorrente.clienteDesde.clear();
        GestaoContaCorrente.clienteDesde.sendKeys(Data.dataPassada() + protractor.Key.TAB);
        expect(GestaoContaCorrente.clienteDesde.getAttribute('value')).toBe(Data.dataPassada(), "Falha ao validar 'Cliente desde' com data passada.");
    });

    it('Campo "Nome do Identificador" aceita letras, números, caracteres especiais e aceita o máximo de 25 caracteres.', () => {
        let text = "!@#$%*(32154687SKJAHDKJHA";
        GestaoContaCorrente.nomeIdentificador.clear();
        GestaoContaCorrente.nomeIdentificador.sendKeys(text);
        expect(GestaoContaCorrente.nomeIdentificador.getAttribute('value')).toBe(text, "Falha ao validar inserção de letras, números, caracteres especiais no campo 'Nome do Identificador'.");

        GestaoContaCorrente.nomeIdentificador.clear();
        Estresse.estressarCampo(GestaoContaCorrente.nomeIdentificador, 50);
        Estresse.avaliarLength(GestaoContaCorrente.nomeIdentificador, GestaoContaCorrente.tamanhoDosCampos.nomeIdentificador, "Nome do Identificador");
    });

    it('Campo "Número da Conta" é desabilitado.', () => {
        expect(GestaoContaCorrente.numeroConta.isEnabled()).toBe(false, "Falha ao validar se campo 'Número da Conta' está desabilitado.");
    });

    it('Cadastra Conta Corrente', () => {
        GestaoContaCorrente.setTipoConta();
        GestaoContaCorrente.setModalidade();
        GestaoContaCorrente.setContatoDudoguinho();
        GestaoContaCorrente.setAssinatura();
        GestaoContaCorrente.setCpmf();
        GestaoContaCorrente.setSituacao();
        GestaoContaCorrente.setEmpostamento();

        GestaoContaCorrente.clicaSalvar().then(() => {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(Cadastro.contaGerada), 10000);
            Cadastro.contaGerada.getText().then((conta) => {
                console.log("Conta: " + conta);
                element(by.css('modal-steps')).element(by.css('.uni-modal--close')).click();

                Menu.navegaParaAlteracaoCadastral();
                let update = new Update(cpf);
                //update.buscaCpf(cpf).then(() => cpf = '');
                update.buscaConta(conta).then(() => cpf = '');
                expect(element(by.css('[ng-if="$ctrl.contaCorrentista"]')).isPresent()).toBe(true, "Falha ao verificar cadastro de Conta Corrente.");
                expect(element(by.css('[ng-if="$ctrl.contaCorrentista"]')).getText()).toContain(conta, "Falha ao verificar cadastro de Conta Corrente.");
            });
        });
    });
});
