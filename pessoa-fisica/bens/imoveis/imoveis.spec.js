let Imovel = require('./imoveis.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Modal = require('../../../comum/modal');
let GeraCPF = require('../../../comum/cpfCnpj');
let cpf = '';

describe('Imóveis', () => {
    describe('Formulário', function () {
        beforeEach(() => {
            cpf = GeraCPF.getCPF().replace('.','').replace('.','').replace('-','');
            Imovel.acessaPagina(cpf);
            Imovel.sessao.element(by.css('.step-section')).click();
            Imovel.botaoNovo.click();
        });

        it('deve validar os campos obrigatórios', () => {
            Imovel.botaoSalvar.click();

            expect(Mensagem.obrigatoriedade(Imovel.tipoImovel)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Imovel.situacao)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Imovel.destinacao)).toBeTruthy();
        });

        it('deve validar tamanho máximo dos campos da seção', () => {
            Estresse.estressarCampo(Imovel.localizacao, 100);
            Estresse.estressarCampo(Imovel.valorAtual, 30);
            Estresse.estressarCampo(Imovel.valorHipotecado, 30);
            Estresse.estressarCampo(Imovel.valorAvaliacao, 30);
            Estresse.estressarCampo(Imovel.valorAverbacao, 30);
            Estresse.estressarCampo(Imovel.inscricao, 50);
            Estresse.estressarCampo(Imovel.registro, 50);
            Estresse.estressarCampo(Imovel.numeroMatricula, 30);
            Estresse.estressarCampo(Imovel.numeroLivro, 30);
            Estresse.estressarCampo(Imovel.cartorio, 50);
            Estresse.estressarCampo(Imovel.descricao, 300);
            Estresse.estressarCampo(Imovel.origem, 300);
            Estresse.estressarCampo(Imovel.nome, 100);
            Estresse.estressarCampo(Imovel.area, 50);
            Estresse.estressarCampo(Imovel.areaConstruida, 50);

            Estresse.avaliarLength(Imovel.localizacao, Imovel.tamanhoDosCampos.localizacao, 'localizacao');
            Estresse.avaliarLengthValor(Imovel.valorAtual, 'Valor atual');
            Estresse.avaliarLengthValor(Imovel.valorHipotecado, 'Valor hipotecado');
            Estresse.avaliarLengthValor(Imovel.valorAvaliacao, 'Valor Avaliação');
            Estresse.avaliarLengthValor(Imovel.valorAverbacao, 'Valor Averbação');
            Estresse.avaliarLength(Imovel.inscricao, Imovel.tamanhoDosCampos.inscricao, 'Inscrição');
            Estresse.avaliarLength(Imovel.registro, Imovel.tamanhoDosCampos.registro, 'registro');
            Estresse.avaliarLength(Imovel.numeroMatricula, Imovel.tamanhoDosCampos.numeroMatricula, 'Numero Matricula');
            Estresse.avaliarLength(Imovel.numeroLivro, Imovel.tamanhoDosCampos.numeroLivro, 'Nr Livro');
            Estresse.avaliarLength(Imovel.cartorio, Imovel.tamanhoDosCampos.cartorio, 'Cartorio');
            Estresse.avaliarLength(Imovel.descricao, Imovel.tamanhoDosCampos.descricao, 'descricao');
            Estresse.avaliarLength(Imovel.origem, Imovel.tamanhoDosCampos.origem, 'origem');
            Estresse.avaliarLength(Imovel.nome, Imovel.tamanhoDosCampos.vendedor.nomeCompleto, 'nome completo');
            Estresse.avaliarLength(Imovel.area, Imovel.tamanhoDosCampos.area, 'area');
            Estresse.avaliarLength(Imovel.areaConstruida, Imovel.tamanhoDosCampos.areaConstruida, 'area construida');
        });

        it('Campo "Area (m²)" deve aceitar apenas números', () => {
            let areaInvalida = '*AA%555555'
            let areaValida = '5.555,55';
            Imovel.area.clear();
            Imovel.area.sendKeys(areaInvalida + protractor.Key.TAB);
            expect(Imovel.area.getAttribute('value')).toEqual(areaValida);
        });

        it('Campo "Area (m²)" deve ter conter unidades decimais', () => {
            let area = '5562';
            let areaDecimal = '55,62';
            Imovel.area.clear();
            Imovel.area.sendKeys(area + protractor.Key.TAB);
            expect(Imovel.area.getAttribute('value')).toBe(areaDecimal, 'Falha ao validar campo Area');
        });

        it('Campo "Area Construida" deve aceitar apenas números', () => {
            let areaContrInvalida = '*AA%555555'
            let areaConstrValida = '5.555,55';
            Imovel.areaConstruida.clear();
            Imovel.areaConstruida.sendKeys(areaContrInvalida + protractor.Key.TAB);
            expect(Imovel.areaConstruida.getAttribute('value')).toEqual(areaConstrValida, 'Falha ao validar campo Area Construida');
        });

        it('Campo "Area Construida" deve ter conter unidades decimais', () => {
            let areaConstruida = '5562';
            let areaDecimal = '55,62';
            Imovel.areaConstruida.clear();
            Imovel.areaConstruida.sendKeys(areaConstruida + protractor.Key.TAB);
            expect(Imovel.areaConstruida.getAttribute('value')).toBe(areaDecimal, 'Falha ao validar campo Area Decimal');
        });

        it('Campo "valor Atual" deve aceitar apenas números', () => {
            let valorInvalido = '*AA%555555'
            let valorValido = '5.555,55';
            Imovel.valorAtual.clear();
            Imovel.valorAtual.sendKeys(valorInvalido + protractor.Key.TAB);
            expect(Imovel.valorAtual.getAttribute('value')).toEqual('R$ '+valorValido);
        });

        it('Campo "valor Hipotecado" deve aceitar apenas números', () => {
            let valorInvalido = '*AA%555555'
            let valorValido = '5.555,55';
            Imovel.valorHipotecado.clear();
            Imovel.valorHipotecado.sendKeys(valorInvalido + protractor.Key.TAB);
            expect(Imovel.valorHipotecado.getAttribute('value')).toEqual('R$ '+valorValido);
        });

        it('Campo "Valor Avaliação" deve aceitar apenas números', () => {
            let valorInvalido = '*AA%555555'
            let valorValido = '5.555,55';
            Imovel.valorAvaliacao.clear();
            Imovel.valorAvaliacao.sendKeys(valorInvalido + protractor.Key.TAB);
            expect(Imovel.valorAvaliacao.getAttribute('value')).toEqual('R$ '+valorValido);
        });

        it('Campo "Valor Averbação" deve aceitar apenas números', () => {
            let valorInvalido = '*AA%555555'
            let valorValido = '5.555,55';
            Imovel.valorAverbacao.clear();
            Imovel.valorAverbacao.sendKeys(valorInvalido + protractor.Key.TAB);
            expect(Imovel.valorAverbacao.getAttribute('value')).toEqual('R$ '+valorValido);
        });

        it('Campo "Numero Livro" deve aceitar apenas números', () => {
            let numeroInvalido = '*AA%555555'
            let numeroValido = '555555';
            Imovel.numeroLivro.clear();
            Imovel.numeroLivro.sendKeys(numeroInvalido + protractor.Key.TAB);
            expect(Imovel.numeroLivro.getAttribute('value')).toEqual(numeroValido);
        });

        it('Campo "Número Matrícula" deve aceitar apenas números', () => {
            let numeroInvalido = '*AA%555555'
            let numeroValido = '555555';
            Imovel.numeroMatricula.clear();
            Imovel.numeroMatricula.sendKeys(numeroInvalido + protractor.Key.TAB);
            expect(Imovel.numeroMatricula.getAttribute('value')).toEqual(numeroValido);
        });

        it('deve cancelar', () => {
            let formularioVisivel = element(by.css('dados-imoveis[imovel="$ctrl.imovel"]')).isPresent();
            expect(formularioVisivel).toBeTruthy();

            Imovel.botaoCancelar.click();

            expect(Imovel.botaoNovo.isDisplayed()).toBeTruthy();

            let formulario = element(by.css('dados-imoveis[imovel="$ctrl.imovel"]')).isPresent();
            expect(formulario).not.toBeTruthy();
        });

        it('deve validar se cpf do vendedor é igual do terceiro', () => {            
            //let cpf = '51404821341';            
            Imovel.cpfCnpj.sendKeys(cpf);
            Imovel.cpfCnpj.sendKeys(protractor.Key.TAB);
            expect(Modal.getModal()).not.toBe(null)
            expect(Modal.getModalMsg()).toEqual('O CPF não pode ser igual o do cadastrado');

            Modal.clickModalBtn();

            expect(Imovel.cpfCnpj.evaluate(
                Imovel.cpfCnpj.getAttribute('ng-model'))).toEqual('');
        });

    });

    describe('Listagem', function () {
        beforeEach(() => {
            cpf = GeraCPF.getCPF().replace('.','').replace('.','').replace('-','');
            Imovel.acessaPagina(cpf);
            Imovel.sessao.element(by.css('.step-section')).click();
        });

        it('deve mostrar mensagem de lista vazia inicialmente', () => {
            let tableRows = Imovel.getTableRows();

            expect(Imovel.listaVazia.isDisplayed()).toBeTruthy();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve inserir e apagar', () => {
            let quantidade = 3;

            Imovel.insereMultiplos(quantidade);
            for (var i = 0; i < quantidade; i++) { 
                Imovel.excluir(); 
            }

            let tableRows = Imovel.getTableRows();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve inserir múltiplos', () => {
            let quantidade = 3;

            Imovel.insereMultiplos(quantidade);

            let tableRows = Imovel.getTableRows();
            expect(tableRows.count()).toEqual(quantidade);
        });

        it('deve editar', () => {
            let quantidade = 2,
                novoValor = 'R$ 905.000,60';

            Imovel.insereMultiplos(quantidade);
            Imovel.editar(novoValor);

            let tableRows = Imovel.getTableRows(),
                labelNovoValor = tableRows.all(by.binding('imovel.valorAtual | finance:true')).first();

            expect(tableRows.count()).toEqual(quantidade);
            expect(labelNovoValor.getText()).toEqual(novoValor);
        });

    });
});
