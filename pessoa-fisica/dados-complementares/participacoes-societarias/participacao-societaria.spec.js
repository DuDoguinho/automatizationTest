let ParticipacaoSocietaria = require('./participacao-societaria.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Modal = require('../../../comum/modal');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');

describe('Participações Societárias', () => {
    describe('Formulário', function () {
        beforeEach(() => {
            ParticipacaoSocietaria.acessaPagina();
            ParticipacaoSocietaria.sessao.element(by.css('.step-section')).click();
            ParticipacaoSocietaria.botaoNovo.click();
        });

        it('deve validar os campos obrigatórios', () => {
            //Given

            //When
            ParticipacaoSocietaria.botaoSalvar.click();

            //Then
            expect(Mensagem.obrigatoriedade(ParticipacaoSocietaria.cnpj)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(ParticipacaoSocietaria.nome)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(ParticipacaoSocietaria.percentualParticipacao)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(ParticipacaoSocietaria.funcaoCargo)).toBeTruthy();
        });

        it('deve validar tamanho máximo dos campos da seção', () => {
            //Given

            //When
            Estresse.estressarCampo(ParticipacaoSocietaria.nome, 100);

            //Then
            Estresse.avaliarLength(ParticipacaoSocietaria.nome, ParticipacaoSocietaria.tamanhoDosCampos.nome);
        });

        it('Campo "% Participação" não deve aceitar mais de 100%', () => {
            ParticipacaoSocietaria.percentualParticipacao.sendKeys('10500' + protractor.Key.TAB);
            expect(Mensagem.obrigatoriedade(ParticipacaoSocietaria.percentualParticipacao)).toBeTruthy();
        });

        it('deve cancelar', () => {
            //Given
            let formularioVisivel = element(by.css('dados-participacao-societaria[participacao-societaria="$ctrl.participacaoSocietaria"]')).isPresent();
            expect(formularioVisivel).toBeTruthy();

            //When
            ParticipacaoSocietaria.botaoCancelar.click();

            //Then
            expect(ParticipacaoSocietaria.botaoNovo.isDisplayed()).toBeTruthy();

            let formulario = element(by.css('dados-participacao-societaria[participacao-societaria="$ctrl.participacaoSocietaria"]')).isPresent();
            expect(formulario).not.toBeTruthy();
        });

        it('deve validar se CNPJ já foi inserido', () => {
            //Given
            let cnpj= '88.078.746/0001-69';

            //When
            ParticipacaoSocietaria.preencherCamposObrigatorios(cnpj);
            ParticipacaoSocietaria.botaoSalvar.click();
            ParticipacaoSocietaria.botaoNovo.click();
            ParticipacaoSocietaria.preencherCamposObrigatorios(cnpj);
            ParticipacaoSocietaria.botaoSalvar.click();

            //Then
            expect(Modal.getModalMsg()).toEqual('Esse CNPJ já foi inserido.');
        });
    });

    describe('Listagem', function () {
        beforeEach(() => {
            ParticipacaoSocietaria.acessaPagina();
            ParticipacaoSocietaria.sessao.element(by.css('.step-section')).click();
        });

        it('deve mostrar mensagem de lista vazia inicialmente', () => {
            //Given
            let tableRows = ParticipacaoSocietaria.getTableRows();

            //When

            //Then
            expect(ParticipacaoSocietaria.listaVazia.isDisplayed()).toBeTruthy();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve inserir múltiplas participações societárias', () => {
            //Given
            let participacoesSocietarias = DadosCadastro.cadastro.dadosComplementares.participacoesSocietarias;

            //When
            ParticipacaoSocietaria.insereMultiplos(participacoesSocietarias);

            //Then
            let tableRows = ParticipacaoSocietaria.getTableRows();
            expect(tableRows.count()).toEqual(participacoesSocietarias.length);
        });

        it('deve inserir e apagar participações societárias', () => {
            //Given
            let participacoesSocietarias = DadosCadastro.cadastro.dadosComplementares.participacoesSocietarias;

            //When
            ParticipacaoSocietaria.insereMultiplos(participacoesSocietarias);
            for (var i = 0; i < participacoesSocietarias.length; i++) { ParticipacaoSocietaria.excluirContato(); }

            //Then
            let tableRows = ParticipacaoSocietaria.getTableRows();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve editar participação societária', () => {
            //Given
            let participacoesSocietarias = DadosCadastro.cadastro.dadosComplementares.participacoesSocietarias,
                novoCnpj= '88.078.746/0001-69';

            //When
            ParticipacaoSocietaria.insereMultiplos(DadosCadastro.cadastro.dadosComplementares.participacoesSocietarias);
            ParticipacaoSocietaria.editarParticipacaoSocietaria(novoCnpj);

            //Then
            let tableRows = ParticipacaoSocietaria.getTableRows(),
                labelNovoCnpj = tableRows.all(by.binding('participacaoSocietaria.cnpj | brCnpj')).first();

            expect(tableRows.count()).toEqual(participacoesSocietarias.length);
            expect(labelNovoCnpj.getText()).toEqual(novoCnpj);
        });

    });
});
