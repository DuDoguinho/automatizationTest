let CartaoAutografo = require('./cartao-autografo.po');
let Procurador = require('../dados-complementares/procuradores/procurador.po');
let DadosCadastro = require('../fluxo-cadastro/dados-cadastro');
let Mensagem = require('../../comum/mensagem');
let Estresse = require('../../comum/estresse');
let Modal = require('../../comum/modal');
let GeraCPF = require('../../comum/cpfCnpj');
let Menu = require('../../menu/menu.po');
let Cadastro = require('../cadastro/cadastro.po');

let cpf = GeraCPF.getCPF().replace('.', '').replace('.', '').replace('-', '');

describe('Cartão Autógrafo', () => {
    beforeAll(() => {
        Procurador.insereProcuradoresParaCartaoAutografo(DadosCadastro.cadastro.dadosComplementares.procuradores, cpf);
    });

    afterAll(() => {
        Procurador.removeProcuradorParaCartaoAutografo(DadosCadastro.cadastro.dadosComplementares.procuradores[0], cpf);
        Procurador.removeProcuradorParaCartaoAutografo(DadosCadastro.cadastro.dadosComplementares.procuradores[1], cpf);
    });

    describe('Formulário', function () {
        beforeEach(() => {
            CartaoAutografo.acessaPagina(cpf);

            CartaoAutografo.botaoNovo.click();
        });

        it('deve validar os campos obrigatórios', () => {
            CartaoAutografo.botaoSalvar.click();

            expect(Mensagem.obrigatoriedade(CartaoAutografo.nome)).toBeTruthy('Falha ao validar obrigatoriedade do Campo Nome.');
        });

        it('deve cancelar', () => {
            let formularioVisivel = element(by.css('dados-cartao-autografo[cartao-autografo="$ctrl.cartaoAutografo"]')).isPresent();
            expect(formularioVisivel).toBeTruthy('Falha ao validar se formulário está visível.');

            CartaoAutografo.botaoCancelar.click();

            expect(CartaoAutografo.botaoNovo.isDisplayed()).toBeTruthy('Falha ao validar que botão Novo está sendo mostrado.');

            let formulario = element(by.css('dados-cartao-autografo[cartao-autografo="$ctrl.cartaoAutografo"]')).isPresent();
            expect(formulario).toBeFalsy('Falha ao validar se formulário está fechado.');
        });

        it('Deve fazer upload da imagem', function () {
            CartaoAutografo.carregarAssinatura();
            expect(CartaoAutografo.assinatura.isDisplayed()).toBeTruthy('Falha ao validar se Assinatura está sendo mostrada.');
        });

        it('Deve validar upload de outros formatos imagem', function () {
            CartaoAutografo.preencherCamposObrigatorios(DadosCadastro.cadastro.cartaoAutografo[0]);
            CartaoAutografo.carregarAssinatura('assinatura.bmp');
            expect(CartaoAutografo.assinatura.isDisplayed()).toBeTruthy('Falha ao validar se Assinatura está sendo mostrada.');
            CartaoAutografo.botaoSalvar.click().then(() => {
                CartaoAutografo.botaoNovo.click();
                CartaoAutografo.preencherCamposObrigatorios(DadosCadastro.cadastro.cartaoAutografo[1]);
                CartaoAutografo.carregarAssinatura('assinatura.gif');
                expect(CartaoAutografo.assinatura.isDisplayed()).toBeTruthy('Falha ao validar se Assinatura está sendo mostrada.');
                CartaoAutografo.botaoSalvar.click();
            });            
            pending('É preciso finalizar a implementação da validação de formato de imagem.');
        });

        it('valida que na listagem aparece o nome da pessoa e seu respectivo tipo', () => {
            let _cpf = GeraCPF.getCPF();
            let titular = DadosCadastro.cadastro.dadosPessoais.nomeCompleto.toUpperCase();
            let representante = DadosCadastro.cadastro.dadosPessoais.representanteLegal.nomeCompleto.toUpperCase();

            Cadastro.insereRepresentanteLegal(DadosCadastro, _cpf);
            Cadastro.salvarRascunho();
            Procurador.insereProcuradoresParaCartaoAutografo(DadosCadastro.cadastro.dadosComplementares.procuradores, _cpf);
            Menu.navegaParaCadastroPF();
            CartaoAutografo.acessaPagina(_cpf);
            CartaoAutografo.botaoNovo.click();

            CartaoAutografo.setNome(titular).then(() => {
                expect(CartaoAutografo.nome.getAttribute('value')).toBe('Titular - ' + titular.toUpperCase(), "Falha ao comparar Tipo e Nome do Titular na lista de seleção.");
            });
            CartaoAutografo.setNome(representante).then(() => {
                expect(CartaoAutografo.nome.getAttribute('value')).toBe('Representante Legal - ' + representante.toUpperCase(), "Falha ao comparar Tipo e Nome do Representante Legal na lista de seleção.");
            });
            let procuradores = DadosCadastro.cadastro.dadosComplementares.procuradores;
            for (let count = 0; count < procuradores.length; count++) {
                CartaoAutografo.setNome(procuradores[count].nome.toUpperCase());
                expect(CartaoAutografo.nome.getAttribute('value')).toBe('Procurador - ' + procuradores[count].nome.toUpperCase(), "Falha ao comparar Tipo e Nome do procurador na lista de seleção.");
            }
        });
    });

    describe('Listagem', function () {
        beforeEach(() => {
            CartaoAutografo.acessaPagina(cpf);
        });

        it('deve mostrar mensagem de lista vazia inicialmente', () => {
            let tableRows = CartaoAutografo.getTableRows();

            expect(CartaoAutografo.listaVazia.isDisplayed()).toBeTruthy('Falha ao validar que lista está vazia.');
            expect(tableRows.count()).toEqual(0, 'Falha ao validar que a tabela está vazia.');
        });

        it('deve inserir e apagar', () => {
            CartaoAutografo.botaoNovo.click();

            CartaoAutografo.preencherTodosOsCampos(DadosCadastro.cadastro.cartaoAutografo[0]);
            CartaoAutografo.botaoSalvar.click().then(() => {
                expect(CartaoAutografo.mensagemSucesso.isDisplayed()).toBeTruthy('Falha ao verificar mensagem de Sucesso.');
            });

            expect(CartaoAutografo.getTableRows().count()).toEqual(1, 'Falha ao validar que item foi inserido.');

            CartaoAutografo.excluir();
            expect(CartaoAutografo.listaVazia.isDisplayed()).toBeTruthy('Falha ao validar que item foi excluído');
            expect(CartaoAutografo.getTableRows().count()).toEqual(0, 'Falha ao validar quantidade de itens na lista.');
        });

    });
});