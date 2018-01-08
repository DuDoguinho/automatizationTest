let Seguro = require('./seguros.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Data = require('../../../comum/data');

describe('Seguros', () => {
    describe('Formulário', function () {
        beforeEach(() => {
            Seguro.acessaPagina();
            Seguro.sessao.element(by.css('.step-section')).click();
            Seguro.botaoNovo.click();
        });

        it('deve validar os campos obrigatórios', () => {
            Seguro.botaoSalvar.click();

            expect(Mensagem.obrigatoriedade(Seguro.tipoSeguro)).toBeTruthy("Falha ao validar obrigatoriedade do campo Tipo Seguro");
            expect(Mensagem.obrigatoriedade(Seguro.seguradora)).toBeTruthy("Falha ao validar obrigatoriedade do campo Seguradora");
            expect(Mensagem.obrigatoriedade(Seguro.vencimento)).toBeTruthy("Falha ao validar obrigatoriedade do campo Vencimento");
            expect(Mensagem.obrigatoriedade(Seguro.valorSegurado)).toBeTruthy("Falha ao validar obrigatoriedade do campo Tipo Segurado");
        });

        it('deve validar tamanho máximo dos campos da seção', () => {
            Estresse.estressarCampo(Seguro.valorSeguro, 100);
            Estresse.estressarCampo(Seguro.valorSegurado, 100);
            Estresse.estressarCampo(Seguro.apolice, 100);
            Estresse.estressarCampo(Seguro.corretora, 100);

            Estresse.avaliarLength(Seguro.valorSeguro, Seguro.tamanhoDosCampos.valorSeguro, "Valor Seguro");
            Estresse.avaliarLength(Seguro.valorSegurado, Seguro.tamanhoDosCampos.valorSegurado, "Valor Segurado");
            Estresse.avaliarLength(Seguro.apolice, Seguro.tamanhoDosCampos.apolice, "Apólice");
            Estresse.avaliarLength(Seguro.corretora, Seguro.tamanhoDosCampos.corretora, "Corretora");
        });

        it('Deve validar comportamento da combobox "Seguradora"', () => {
            expect(Seguro.seguradora.isEnabled()).toBe(false);
            Seguro.setTipoSeguro();
            expect(Seguro.seguradora.isEnabled()).toBe(true);
            Seguro.botaoCancelar.click();
        });

        it('Campo "Data de Vencimento" não deve aceitar data inválida', () => {
            let dataInvalida = '99/99/9999'
    
            Seguro.vencimento.sendKeys(dataInvalida);
            Seguro.vencimento.sendKeys(protractor.Key.TAB);
    
            expect(Seguro.vencimento.getAttribute('value')).toBe('');
        });

        it('Campo "Data de Vencimento" não deve aceitar data passada', () => {
            let dataPassada = '12/05/1990'
            Seguro.vencimento.clear();
            Seguro.vencimento.sendKeys(dataPassada + protractor.Key.TAB);
            
            expect(Seguro.vencimento.getAttribute('value')).toEqual(Data.dataAtual());
        });

        it('Campo "Apolice" deve aceitar apenas números', () => {
            let apoliceInvalido = '*AA%555555'
            let apoliceValido = '555555';
            Seguro.apolice.clear();
            Seguro.apolice.sendKeys(apoliceInvalido);
            expect(Seguro.apolice.getAttribute('value')).toEqual(apoliceValido);
        });
       
        it('deve cancelar', () => {
            let formularioVisivel = Seguro.formulario.isPresent();
            expect(formularioVisivel).toBeTruthy();

            Seguro.botaoCancelar.click();

            //Then
            expect(Seguro.botaoNovo.isDisplayed()).toBeTruthy();

            let formulario = element(by.css('dados-seguro[seguro="$ctrl.seguro"]')).isPresent();
            expect(formulario).not.toBeTruthy();
        });
    });

    describe('Listagem', function () {
        beforeEach(() => {
            Seguro.acessaPagina();
            Seguro.sessao.element(by.css('.step-section')).click();
        });

        it('deve mostrar mensagem de lista vazia inicialmente', () => {
            let tableRows = Seguro.getTableRows();

            expect(Seguro.listaVazia.isDisplayed()).toBeTruthy();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve inserir múltiplos seguros', () => {
            let seguros = 3;

            Seguro.insereMultiplos(seguros);

            let tableRows = Seguro.getTableRows();
            expect(tableRows.count()).toEqual(seguros);
        });

        it('deve inserir e apagar seguros', () => {
            let seguros = 3;

            Seguro.insereMultiplos(seguros);
            for (var i = 0; i < seguros; i++) { Seguro.excluir(); }

            let tableRows = Seguro.getTableRows();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve editar seguros', () => {
            let seguros = 2,
                novoValor= 'R$ 85.462,20';

            Seguro.insereMultiplos(seguros);
            Seguro.editarReferencia(novoValor);

            let tableRows = Seguro.getTableRows(),
                labelNovoValor = tableRows.all(by.binding('seguro.valorSegurado | finance:true')).first();

            expect(tableRows.count()).toEqual(seguros);
            expect(labelNovoValor.getText()).toEqual(novoValor);
        });

    });
});
