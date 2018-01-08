let Previdencia = require('./previdencias.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Data = require('../../../comum/data');

describe('Previdências', () => {
    describe('Formulário', function () {
        beforeEach(() => {
            Previdencia.acessaPagina();
            Previdencia.sessao.element(by.css('.step-section')).click();
            Previdencia.botaoNovo.click();
        });

        it('deve validar os campos obrigatórios', () => {
            //Given

            //When
            Previdencia.botaoSalvar.click();

            //Then
            expect(Mensagem.obrigatoriedade(Previdencia.tipoPrevidencia)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Previdencia.instituicao)).toBeTruthy();
            
        });

        it('deve validar tamanho máximo dos campos da seção', () => {
            //Given

            //When
            Estresse.estressarCampo(Previdencia.valorContribuicao, 100);
            Estresse.estressarCampo(Previdencia.valorMontante, 100);
            Estresse.estressarCampo(Previdencia.numeroDependentesSemPlano, 50);
            Estresse.estressarCampo(Previdencia.numeroProposta, 100);
            

            //Then
            Estresse.avaliarLength(Previdencia.valorContribuicao, Previdencia.tamanhoDosCampos.valorContribuicao);
            Estresse.avaliarLength(Previdencia.valorMontante, Previdencia.tamanhoDosCampos.valorMontante);
            Estresse.avaliarLength(Previdencia.numeroDependentesSemPlano, Previdencia.tamanhoDosCampos.numeroDependentesSemPlano);
            Estresse.avaliarLength(Previdencia.numeroProposta, Previdencia.tamanhoDosCampos.numeroProposta);
        });

        it('não deve aceitar data inválida', () => {
            //Given
            let dataInvalida = '99/99/9999'

            //When
            Previdencia.dataInicioContribuicao.sendKeys(dataInvalida);
            element(by.css('body')).click();

            //Then
            expect(Previdencia.dataInicioContribuicao.evaluate(
                   Previdencia.dataInicioContribuicao.getAttribute('ng-model'))).toBe(true);
        });

        it('deve aceitar data válida e calcular "Meses de Contribuição"', () => {
            //Given
            let dataValida = Data.dataAtual();

            //When
            Previdencia.dataInicioContribuicao.sendKeys(dataValida);
            element(by.css('body')).click();

            //Then
            expect(Data.formataData(Previdencia.dataInicioContribuicao)).toEqual(dataValida);
            expect(Previdencia.mesesContribuicao.evaluate(
                   Previdencia.mesesContribuicao.getAttribute('ng-model'))).toEqual(0);
        });

        it('Campo "Valor da Contriubuição" deve aceitar apenas números', () => {
            let contribuicaoInvalida = '*A%5555'
            let contribuicaoValida = '55,55'
    
            Previdencia.valorContribuicao.clear();
            Previdencia.valorContribuicao.sendKeys(contribuicaoInvalida);
            expect(Previdencia.valorContribuicao.getAttribute('value')).toEqual('R$ '+ contribuicaoValida);
        });

        it('Campo "Valor do Montante" deve aceitar apenas números', () => {
            let montanteInvalido = '*A%5555'
            let montanteValido = '55,55'
    
            Previdencia.valorMontante.clear();
            Previdencia.valorMontante.sendKeys(montanteInvalido);
            expect(Previdencia.valorMontante.getAttribute('value')).toEqual('R$ '+ montanteValido);
        });

        it('Campo "Dependentes sem Plano" deve aceitar apenas números', () => {
            let depententeInvalido = '*A%555'
            let depententeValido = '555'
    
            Previdencia.numeroDependentesSemPlano.clear();
            Previdencia.numeroDependentesSemPlano.sendKeys(depententeInvalido);
            expect(Previdencia.numeroDependentesSemPlano.getAttribute('value')).toEqual(depententeValido);
        });

        it('Campo "Número proposta" deve aceitar apenas números', () => {
            let propostaInvalida = '*A%5555'
            let propostaValida = '5555'
    
            Previdencia.numeroProposta.clear();
            Previdencia.numeroProposta.sendKeys(propostaInvalida + protractor.Key.TAB);
            expect(Previdencia.numeroProposta.getAttribute('value')).toEqual(propostaValida);
        });

        it('deve cancelar', () => {
            //Given
            let formularioVisivel = element(by.css('dados-previdencia[previdencia="$ctrl.previdencia"]')).isPresent();
            expect(formularioVisivel).toBeTruthy();

            //When
            Previdencia.botaoCancelar.click();

            //Then
            expect(Previdencia.botaoNovo.isDisplayed()).toBeTruthy();

            let formulario = element(by.css('dados-previdencia[previdencia="$ctrl.previdencia"]')).isPresent();
            expect(formulario).not.toBeTruthy();
        });
    });

    describe('Listagem', function () {
        beforeEach(() => {
            Previdencia.acessaPagina();
            Previdencia.sessao.element(by.css('.step-section')).click();
        });

        it('deve mostrar mensagem de lista vazia inicialmente', () => {
            //Given
            let tableRows = Previdencia.getTableRows();

            //When

            //Then
            expect(Previdencia.listaVazia.isDisplayed()).toBeTruthy();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve inserir múltiplos', () => {
            //Given
            let quantidade = 3;

            //When
            Previdencia.insereMultiplos(quantidade);

            //Then
            let tableRows = Previdencia.getTableRows();
            expect(tableRows.count()).toEqual(quantidade);
        });

        it('deve inserir e apagar', () => {
            //Given
            let quantidade = 3;

            //When
            Previdencia.insereMultiplos(quantidade);
            for (var i = 0; i < quantidade; i++) { Previdencia.excluir(); }

            //Then
            let tableRows = Previdencia.getTableRows();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve editar', () => {
            //Given
            let quantidade = 2,
                novoValor= 'R$ 462,20';

            //When
            Previdencia.insereMultiplos(quantidade);
            Previdencia.editar(novoValor);

            //Then
            let tableRows = Previdencia.getTableRows(),
                labelNovoValor = tableRows.all(by.binding('previdencia.valorContribuicao | finance:true')).first();

            expect(tableRows.count()).toEqual(quantidade);
            expect(labelNovoValor.getText()).toEqual(novoValor);
        });

    });
});
