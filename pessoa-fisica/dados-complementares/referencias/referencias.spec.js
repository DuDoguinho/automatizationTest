let Referencia = require('./referencias.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');

describe('Referências', () => {
    describe('Formulário', function () {
        beforeEach(() => {
            Referencia.acessaPagina();
            Referencia.sessao.element(by.css('.step-section')).click();
            Referencia.botaoNovo.click();
        });

        it('deve validar os campos obrigatórios', () => {
            //Given

            //When
            Referencia.botaoSalvar.click();

            //Then
            expect(Mensagem.obrigatoriedade(Referencia.nomeBancoEmpresa)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Referencia.agenciaLoja)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Referencia.tipoTelefone)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Referencia.numero)).toBeTruthy();
        });

        it('deve validar tamanho máximo dos campos da seção', () => {
            //Given

            //When
            Estresse.estressarCampo(Referencia.nomeBancoEmpresa, 100);
            Estresse.estressarCampo(Referencia.agenciaLoja, 100);
            Estresse.estressarCampo(Referencia.observacao, 100);

            //Then
            Estresse.avaliarLength(Referencia.nomeBancoEmpresa, Referencia.tamanhoDosCampos.nomeBancoEmpresa);
            Estresse.avaliarLength(Referencia.agenciaLoja, Referencia.tamanhoDosCampos.agenciaLoja);
            Estresse.avaliarLength(Referencia.observacao, Referencia.tamanhoDosCampos.observacao);
        });

        it('Deve validar que campo "Numero de telefone" deve aceitar apenas numeros', () => {
            let numeroInvalido = '*(%ASDUH5555555555'
            let numeroValido = '(55) 5555-5555'
            Referencia.numero.sendKeys(numeroInvalido + protractor.Key.TAB);
            expect(Referencia.numero.getAttribute('value')).toBe(numeroValido, 'falha ao validar campo Telefone');
        });

        it('deve cancelar', () => {
            //Given
            let formularioVisivel = element(by.css('dados-referencia[referencia="$ctrl.referencia"]')).isPresent();
            expect(formularioVisivel).toBeTruthy();

            //When
            Referencia.botaoCancelar.click();

            //Then
            expect(Referencia.botaoNovo.isDisplayed()).toBeTruthy();

            let formulario = element(by.css('dados-referencia[referencia="$ctrl.referencia"]')).isPresent();
            expect(formulario).not.toBeTruthy();
        });
    });

    describe('Listagem', function () {
        beforeEach(() => {
            Referencia.acessaPagina();
            Referencia.sessao.element(by.css('.step-section')).click();
        });

        it('deve mostrar mensagem de lista vazia inicialmente', () => {
            //Given
            let tableRows = Referencia.getTableRows();

            //When

            //Then
            expect(Referencia.listaVazia.isDisplayed()).toBeTruthy();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve inserir múltiplas referências', () => {
            //Given
            let referencias = 3;

            //When
            Referencia.insereMultiplos(referencias);

            //Then
            let tableRows = Referencia.getTableRows();
            expect(tableRows.count()).toEqual(referencias);
        });

        it('deve inserir e apagar participações societárias', () => {
            //Given
            let referencias = 3;

            //When
            Referencia.insereMultiplos(referencias, false);
            for (var i = 0; i < referencias; i++) { Referencia.excluirContato(); }

            //Then
            let tableRows = Referencia.getTableRows();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve editar participação societária', () => {
            //Given
            let referencias = 2,
                novoBanco= 'DUDOGUINHO';

            //When
            Referencia.insereMultiplos(referencias, false);
            Referencia.editarReferencia(novoBanco);

            //Then
            let tableRows = Referencia.getTableRows(),
                labelNovoBanco = tableRows.all(by.binding('referencia.nomeBancoEmpresa')).first();

            expect(tableRows.count()).toEqual(referencias);
            expect(labelNovoBanco.getText()).toEqual(novoBanco);
        });

    });
});
