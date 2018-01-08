let PlanoSaude = require('./planos-de-saude.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Data = require('../../../comum/data');

describe('Planos de Saúde', () => {
    describe('Formulário', function () {
        beforeEach(() => {
            PlanoSaude.acessaPagina();
            PlanoSaude.sessao.element(by.css('.step-section')).click();
            PlanoSaude.botaoNovo.click();
        });

        it('deve validar os campos obrigatórios', () => {
            //Given

            //When
            PlanoSaude.botaoSalvar.click();

            //Then
            expect(Mensagem.obrigatoriedade(PlanoSaude.tipoPlanoSaude)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(PlanoSaude.instituicaoSaude)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(PlanoSaude.valorMensal)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(PlanoSaude.tipoCobertura)).toBeTruthy();
        });

        it('não deve aceitar data inválida', () => {
            //Given
            let dataInvalida = '99/99/9999'

            //When
            PlanoSaude.dataVencimento.sendKeys(dataInvalida);
            element(by.css('body')).click();

            //Then
            expect(PlanoSaude.dataVencimento.evaluate(
                   PlanoSaude.dataVencimento.getAttribute('ng-model'))).toBe(true);
        });

        it('Não deve aceitar data passada', () => {
            let dataPassada = '02052002'
            PlanoSaude.dataVencimento.clear();
            PlanoSaude.dataVencimento.sendKeys(dataPassada + protractor.Key.TAB);
            expect(PlanoSaude.dataVencimento.getAttribute('value')).toBe(Data.dataAtual(), 'Falha ao validar campo data');
        });

        it('deve aceitar data válida', () => {
            //Given
            let dataValida = Data.dataAtual();

            //When
            PlanoSaude.dataVencimento.sendKeys(dataValida);
            element(by.css('body')).click();

            //Then
            expect(Data.formataData(PlanoSaude.dataVencimento)).toEqual(dataValida);
        });

        it('Deve validar número máximo de caracteres do campo "Valor do Plano"', () => {
            Estresse.estressarCampo(PlanoSaude.valorMensal, 20);
            Estresse.avaliarLength(PlanoSaude.valorMensal, PlanoSaude.tamanhoDosCampos.vlMensal);
        });

        it('Deve validar que campo "Valor do Plano" não aceita letras e caracteres especiais', () => {
            let valorInvalido = '*AHY#66788'
            let valorValido = '667,88'

            PlanoSaude.valorMensal.clear();
            PlanoSaude.valorMensal.sendKeys(valorInvalido + protractor.Key.TAB);
            expect(PlanoSaude.valorMensal.getAttribute('value')).toBe('R$ '+valorValido, 'Falha ao validar valor do plano')
        });

        it('deve cancelar', () => {
            //Given
            let formularioVisivel = element(by.css('dados-plano-de-saude[plano-de-saude="$ctrl.planoDeSaude"]')).isPresent();
            expect(formularioVisivel).toBeTruthy();

            //When
            PlanoSaude.botaoCancelar.click();

            //Then
            expect(PlanoSaude.botaoNovo.isDisplayed()).toBeTruthy();

            let formulario = element(by.css('dados-plano-de-saude[plano-de-saude="$ctrl.planoDeSaude"]')).isPresent();
            expect(formulario).not.toBeTruthy();
        });
    });

    describe('Listagem', function () {
        beforeEach(() => {
            PlanoSaude.acessaPagina();
            PlanoSaude.sessao.element(by.css('.step-section')).click();
        });

        it('deve mostrar mensagem de lista vazia inicialmente', () => {
            //Given
            let tableRows = PlanoSaude.getTableRows();

            //When

            //Then
            expect(PlanoSaude.listaVazia.isDisplayed()).toBeTruthy();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve inserir múltiplos', () => {
            //Given
            let planos = 3;

            //When
            PlanoSaude.insereMultiplos(planos);

            //Then
            let tableRows = PlanoSaude.getTableRows();
            expect(tableRows.count()).toEqual(planos);
        });

        it('deve inserir e apagar', () => {
            //Given
            let planos = 3;

            //When
            PlanoSaude.insereMultiplos(planos);
            for (var i = 0; i < planos; i++) { PlanoSaude.excluir(); }

            //Then
            let tableRows = PlanoSaude.getTableRows();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve editar', () => {
            //Given
            let planos = 2,
                novoValor= 'R$ 462,20';

            //When
            PlanoSaude.insereMultiplos(planos);
            PlanoSaude.editarReferencia(novoValor);

            //Then
            let tableRows = PlanoSaude.getTableRows(),
                labelNovoValor = tableRows.all(by.binding('plano.valorMensal | finance:true')).first();

            expect(tableRows.count()).toEqual(planos);
            expect(labelNovoValor.getText()).toEqual(novoValor);
        });

    });
});
