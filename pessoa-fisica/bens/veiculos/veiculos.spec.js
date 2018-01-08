let Veiculo = require('./veiculos.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let GeraCPF = require('../../../comum/cpfCnpj');
let cpf = '';

describe('Veículos', () => {
    describe('Formulário', function () {
        beforeEach(() => {
            cpf = GeraCPF.getCPF();
            Veiculo.acessaPagina(cpf);
            Veiculo.sessao.element(by.css('.step-section')).click();
            Veiculo.botaoNovo.click();
        });

        it('deve validar os campos obrigatórios', () => {
            Veiculo.botaoSalvar.click();
            
            expect(Mensagem.obrigatoriedade(Veiculo.tipoVeiculo)).toBeTruthy("Falha ao validar obrigatoriedade do campo Tipo de Veículo");
            expect(Mensagem.obrigatoriedade(Veiculo.modelo)).toBeTruthy("Falha ao validar obrigatoriedade do campo Modelo");
            expect(Mensagem.obrigatoriedade(Veiculo.marca)).toBeTruthy("Falha ao validar obrigatoriedade do campo Marca");
            expect(Mensagem.obrigatoriedade(Veiculo.valorVeiculo)).toBeTruthy("Falha ao validar obrigatoriedade do campo Valor do Veículo");
            expect(Mensagem.obrigatoriedade(Veiculo.situacaoVeiculo)).toBeTruthy("Falha ao validar obrigatoriedade do campo Situação do Veículo");

            expect(Mensagem.obrigatoriedade(Veiculo.anoFabricacao)).toBeFalsy("Falha ao validar obrigatoriedade do campo Ano de Fabricação");            
        });

        it('deve validar tamanho máximo dos campos da seção', () => {
            Estresse.estressarCampo(Veiculo.modelo, 50);
            Estresse.estressarCampo(Veiculo.marca, 50);
            Estresse.estressarCampo(Veiculo.valorVeiculo, 50);
            Estresse.estressarCampo(Veiculo.valorAlienado, 50);
            Estresse.estressarCampo(Veiculo.numeroNotaFiscal, 50);
            Estresse.estressarCampo(Veiculo.nomeFornecedor, 80);
            Estresse.estressarCampo(Veiculo.placa, 20);
            Estresse.estressarCampo(Veiculo.numeroCertificado, 20);
            Estresse.estressarCampo(Veiculo.chassis, 40);
            Estresse.estressarCampo(Veiculo.renavam, 30);

            Estresse.avaliarLength(Veiculo.modelo, Veiculo.tamanhoDosCampos.modelo);
            Estresse.avaliarLength(Veiculo.marca, Veiculo.tamanhoDosCampos.marca);
            Estresse.avaliarLengthValor(Veiculo.valorVeiculo);
            Estresse.avaliarLengthValor(Veiculo.valorAlienado);
            Estresse.avaliarLength(Veiculo.numeroNotaFiscal, Veiculo.tamanhoDosCampos.nf);
            Estresse.avaliarLength(Veiculo.nomeFornecedor, Veiculo.tamanhoDosCampos.fornecedor);
            Estresse.avaliarLength(Veiculo.placa, Veiculo.tamanhoDosCampos.placa);
            Estresse.avaliarLength(Veiculo.numeroCertificado, Veiculo.tamanhoDosCampos.numeroCertificado);
            Estresse.avaliarLength(Veiculo.chassis, Veiculo.tamanhoDosCampos.chassis);
            Estresse.avaliarLength(Veiculo.renavam, Veiculo.tamanhoDosCampos.renavam);
        });

        it('deve cancelar', () => {
            let formularioVisivel = element(by.css('dados-veiculo[veiculo="$ctrl.veiculo"]')).isPresent();
            expect(formularioVisivel).toBeTruthy();

            Veiculo.botaoCancelar.click();

            expect(Veiculo.botaoNovo.isDisplayed()).toBeTruthy();

            let formulario = element(by.css('dados-veiculo[veiculo="$ctrl.veiculo"]')).isPresent();
            expect(formulario).not.toBeTruthy();
        });

        it('deve validar caracteres especiais no input PLACA', () => {
            let inputInvalido = '@&*';

            Veiculo.placa.sendKeys(inputInvalido);
            Veiculo.placa.sendKeys(protractor.Key.TAB);

            expect(Mensagem.textoMensagem(Veiculo.placa)).toEqual('Placa inválida');
        });

        it('deve validar caracteres especiais no input CHASSI', () => {
            let inputInvalido = '@&*';

            Veiculo.chassis.sendKeys(inputInvalido);
            Veiculo.chassis.sendKeys(protractor.Key.TAB);

            expect(Mensagem.textoMensagem(Veiculo.chassis)).toEqual('Chassi inválido');
        });

    });

    describe('Listagem', function () {
        beforeEach(() => {
            Veiculo.acessaPagina();
            Veiculo.sessao.element(by.css('.step-section')).click();
        });

        it('deve mostrar mensagem de lista vazia inicialmente', () => {
            let tableRows = Veiculo.getTableRows();

            expect(Veiculo.listaVazia.isDisplayed()).toBeTruthy();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve inserir múltiplos', () => {
            let quantidade = 3;
            Veiculo.insereMultiplos(quantidade);

            let tableRows = Veiculo.getTableRows();
            expect(tableRows.count()).toEqual(quantidade);
        });

        it('deve inserir e apagar', () => {
            let quantidade = 3;

            Veiculo.insereMultiplos(quantidade);
            for (var i = 0; i < quantidade; i++) { Veiculo.excluir(); }

            let tableRows = Veiculo.getTableRows();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve editar', () => {
            let quantidade = 2,
                novoValor = 'R$ 905.000,60';

            Veiculo.insereMultiplos(quantidade);
            Veiculo.editar(novoValor);

            let tableRows = Veiculo.getTableRows(),
                labelNovoValor = tableRows.all(by.binding('veiculo.valorVeiculo | finance:true')).first();

            expect(tableRows.count()).toEqual(quantidade);
            expect(labelNovoValor.getText()).toEqual(novoValor);
        });

        it('Validar Ano do Modelo deve ser igual ou dois anos após Data de Fabricação', () => {

            Veiculo.botaoNovo.click();
            Veiculo.anoFabricacao.sendKeys('2015');
            Veiculo.anoModelo.sendKeys('2014' + protractor.Key.TAB);
            Veiculo.anoModelo.evaluate(Veiculo.anoModelo.getAttribute('value')).then((item)=>{
              expect(item).toBe(2015);
              Veiculo.anoModelo.clear();
            });
            Veiculo.anoFabricacao.sendKeys('2015');
            Veiculo.anoModelo.sendKeys('2015' + protractor.Key.TAB);
            Veiculo.anoModelo.evaluate(Veiculo.anoModelo.getAttribute('value')).then((item)=>{
              expect(item).toBe(2015);
              Veiculo.anoModelo.clear();
            });
            Veiculo.anoFabricacao.sendKeys('2015');
            Veiculo.anoModelo.sendKeys('2016' + protractor.Key.TAB);
            Veiculo.anoModelo.evaluate(Veiculo.anoModelo.getAttribute('value')).then((item)=>{
              expect(item).toBe(2016);
              Veiculo.anoModelo.clear();
            });
            Veiculo.anoFabricacao.sendKeys('2015');
            Veiculo.anoModelo.sendKeys('2017' + protractor.Key.TAB);
            Veiculo.anoModelo.evaluate(Veiculo.anoModelo.getAttribute('value')).then((item)=>{
              expect(item).toBe(2017);
              Veiculo.anoModelo.clear();
            });
            Veiculo.anoFabricacao.sendKeys('2015');
            Veiculo.anoModelo.sendKeys('2018' + protractor.Key.TAB);
            Veiculo.anoModelo.evaluate(Veiculo.anoModelo.getAttribute('value')).then((item)=>{
              expect(item).toBe(2017);
              Veiculo.anoModelo.clear();
            });
           
        });

        it('Validar que campo Valor aceita apenas números', () => {
            Veiculo.botaoNovo.click();
            Veiculo.valorVeiculo.sendKeys('NNN');
            expect(Veiculo.valorVeiculo.getAttribute('value')).toBe('R$ 0,00', 'Falha ao validar a inserção de letras');
            Veiculo.valorVeiculo.clear();

            Veiculo.valorVeiculo.sendKeys('@##$%&*');
            expect(Veiculo.valorVeiculo.getAttribute('value')).toBe('R$ 0,00', 'Falha ao validar inserção de caractere especial');
            Veiculo.valorVeiculo.clear();

            Veiculo.valorVeiculo.sendKeys('12345');
            expect(Veiculo.valorVeiculo.getAttribute('value')).toBe('R$ 123,45', 'Falha ao validar inserção de números');
            Veiculo.valorVeiculo.clear();
        });

        it('Validar que campo Valor Alienado aceita apenas números', () => {
            Veiculo.botaoNovo.click();
            Veiculo.valorAlienado.sendKeys('NNN');
            expect(Veiculo.valorAlienado.getAttribute('value')).toBe('R$ 0,00', 'Falha ao validar a inserção de letras');
            Veiculo.valorAlienado.clear();

            Veiculo.valorAlienado.sendKeys('@##$%&*');
            expect(Veiculo.valorAlienado.getAttribute('value')).toBe('R$ 0,00', 'Falha ao validar inserção de caractere especial');
            Veiculo.valorAlienado.clear();

            Veiculo.valorAlienado.sendKeys('12345');
            expect(Veiculo.valorAlienado.getAttribute('value')).toBe('R$ 123,45', 'Falha ao validar inserção de números');
            Veiculo.valorAlienado.clear();
        });

        it('Validar que campo NF aceita apenas números', () => {
            Veiculo.botaoNovo.click();
            Veiculo.numeroNotaFiscal.sendKeys('NNN');
            expect(Veiculo.numeroNotaFiscal.getAttribute('value')).toBe('0', 'Falha ao validar a inserção de letras');
            Veiculo.numeroNotaFiscal.clear();

            Veiculo.numeroNotaFiscal.sendKeys('@##$%&*');
            expect(Veiculo.numeroNotaFiscal.getAttribute('value')).toBe('0', 'Falha ao validar inserção de caractere especial');
            Veiculo.numeroNotaFiscal.clear();

            Veiculo.numeroNotaFiscal.sendKeys('12345');
            expect(Veiculo.numeroNotaFiscal.getAttribute('value')).toBe('12345', 'Falha ao validar inserção de números');
            Veiculo.numeroNotaFiscal.clear();
        });

        it('Validar que campo Certificado Número aceita somente números', () => {
            Veiculo.botaoNovo.click();
            Veiculo.numeroCertificado.click();
            Veiculo.numeroCertificado.sendKeys('NNN');
            expect(Veiculo.numeroCertificado.getAttribute('value')).toBe('0', 'Falha ao validar a inserção de letras');
            Veiculo.numeroCertificado.clear();

            Veiculo.numeroCertificado.sendKeys('@##$%&*');
            expect(Veiculo.numeroCertificado.getAttribute('value')).toBe('0', 'Falha ao validar inserção de caractere especial');
            Veiculo.numeroCertificado.clear();

            Veiculo.numeroCertificado.sendKeys('12345');
            expect(Veiculo.numeroCertificado.getAttribute('value')).toBe('12345', 'Falha ao validar inserção de números');
            Veiculo.numeroCertificado.clear();
        });

        it('Validar que campo RENAVAM aceita somente números', () => {
            Veiculo.botaoNovo.click();
            Veiculo.renavam.click();
            Veiculo.renavam.sendKeys('NNN');
            expect(Veiculo.renavam.getAttribute('value')).toBe('0', 'Falha ao validar a inserção de letras');
            Veiculo.renavam.clear();

            Veiculo.renavam.sendKeys('@##$%&*');
            expect(Veiculo.renavam.getAttribute('value')).toBe('0', 'Falha ao validar inserção de caractere especial');
            Veiculo.renavam.clear();

            Veiculo.renavam.sendKeys('12345');
            expect(Veiculo.renavam.getAttribute('value')).toBe('12345', 'Falha ao validar inserção de números');
            Veiculo.renavam.clear();
        });

    });
});
