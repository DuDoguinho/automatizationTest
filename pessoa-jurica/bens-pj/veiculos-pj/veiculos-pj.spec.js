let Veiculo = require('./veiculos-pj.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let GeraCnpj = require('../../../comum/cpfCnpj');
let cnpj = '';

xdescribe('Veículos', () => {
    describe('Formulário', ()=> {
        beforeEach(() => {
            cnpj = GeraCnpj.getCNPJ();
            Veiculo.acessaPagina(cnpj);
            Veiculo.abreSecao();
            Veiculo.clicaNovo();
        });

        it('Deve validar a obrigatoriedade dos campos', () => {
            Veiculo.clicaSalvar();
            
            expect(Mensagem.obrigatoriedade(Veiculo.tipoVeiculo)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Veiculo.modelo)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Veiculo.marca)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Veiculo.valor)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Veiculo.situacao)).toBeTruthy();
        });

        it('Deve validar tamanho máximo dos campos', () => {
            Estresse.estressarCampo(Veiculo.modelo, 40);
            Estresse.estressarCampo(Veiculo.marca, 40);
            Estresse.estressarCampo(Veiculo.valor, 30);
            Estresse.estressarCampo(Veiculo.valorAlienado, 30);
            Estresse.estressarCampo(Veiculo.notaFiscal, 40);
            Estresse.estressarCampo(Veiculo.modelo, 40);
            Estresse.estressarCampo(Veiculo.fornecedor, 100);
            Estresse.estressarCampo(Veiculo.placa, 40);
            Estresse.estressarCampo(Veiculo.certificadoNumero, 40);
            Estresse.estressarCampo(Veiculo.chassi, 40);
            Estresse.estressarCampo(Veiculo.renavam, 40);
        
            Estresse.avaliarLength(Veiculo.modelo, Veiculo.tamanhoDosCampos.modelo);
            Estresse.avaliarLength(Veiculo.marca, Veiculo.tamanhoDosCampos.marca);
            Estresse.avaliarLengthValor(Veiculo.valor);
            Estresse.avaliarLengthValor(Veiculo.valorAlienado);
            Estresse.avaliarLength(Veiculo.notaFiscal, Veiculo.tamanhoDosCampos.notaFiscal);
            Estresse.avaliarLength(Veiculo.modelo, Veiculo.tamanhoDosCampos.modelo);
            Estresse.avaliarLength(Veiculo.fornecedor, Veiculo.tamanhoDosCampos.fornecedor);
            Estresse.avaliarLength(Veiculo.placa, Veiculo.tamanhoDosCampos.placa);
            Estresse.avaliarLength(Veiculo.certificadoNumero, Veiculo.tamanhoDosCampos.certificadoNumero);
            Estresse.avaliarLength(Veiculo.chassi, Veiculo.tamanhoDosCampos.chassi);
            Estresse.avaliarLength(Veiculo.renavam, Veiculo.tamanhoDosCampos.renavam);
        });

        it('deve cancelar', () => {
            let formularioVisivel = element(by.css('dados-veiculo[veiculo="$ctrl.veiculo"]')).isPresent();
            expect(formularioVisivel).toBeTruthy();

            Veiculo.btnCancelar.click();

            expect(Veiculo.btnNovo.isDisplayed()).toBeTruthy();

            let formulario = element(by.css('dados-veiculo[veiculo="$ctrl.veiculo"]')).isPresent();
            expect(formulario).not.toBeTruthy();
        });

        it('deve validar caracteres especiais no input PLACA', () => {
            let inputInvalido = '@&*';

            Veiculo.placa.sendKeys(inputInvalido + protractor.Key.TAB);
            expect(Mensagem.textoMensagem(Veiculo.placa)).toEqual('Placa inválida');
        });

        it('deve validar caracteres especiais no input CHASSI', () => {
            let inputInvalido = '@&*';

            Veiculo.chassi.sendKeys(inputInvalido + protractor.Key.TAB);
            expect(Mensagem.textoMensagem(Veiculo.chassi)).toEqual('Chassi inválido');
        });
    });

    describe('Listagem', ()=>{
        beforeEach(()=>{
            cnpj = GeraCnpj.getCNPJ();
            Veiculo.acessaPagina(cnpj);
            Veiculo.abreSecao();
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
            for (var i = 0; i < quantidade; i++){ 
                Veiculo.excluir(); 
            }

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
            Veiculo.clicaNovo();
            
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
            Veiculo.clicaNovo();
            Veiculo.valor.sendKeys('NNN');
            expect(Veiculo.valor.getAttribute('value')).toBe('R$ 0,00', 'Falha ao validar a inserção de letras');
            Veiculo.valor.clear();

            Veiculo.valor.sendKeys('@##$%&*');
            expect(Veiculo.valor.getAttribute('value')).toBe('R$ 0,00', 'Falha ao validar inserção de caractere especial');
            Veiculo.valor.clear();

            Veiculo.valor.sendKeys('12345');
            expect(Veiculo.valor.getAttribute('value')).toBe('R$ 123,45', 'Falha ao validar inserção de números');
            Veiculo.valor.clear();
        });

        it('Validar que campo Valor Alienado aceita apenas números', () => {
            Veiculo.clicaNovo();
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
            Veiculo.clicaNovo();
            Veiculo.notaFiscal.sendKeys('NNN');
            expect(Veiculo.notaFiscal.getAttribute('value')).toBe('0', 'Falha ao validar a inserção de letras');
            Veiculo.notaFiscal.clear();

            Veiculo.notaFiscal.sendKeys('@##$%&*');
            expect(Veiculo.notaFiscal.getAttribute('value')).toBe('0', 'Falha ao validar inserção de caractere especial');
            Veiculo.notaFiscal.clear();

            Veiculo.notaFiscal.sendKeys('12345');
            expect(Veiculo.notaFiscal.getAttribute('value')).toBe('12345', 'Falha ao validar inserção de números');
            Veiculo.notaFiscal.clear();
        });

        it('Validar que campo Certificado Número aceita somente números', () => {
            Veiculo.clicaNovo();
            Veiculo.certificadoNumero.click();
            Veiculo.certificadoNumero.sendKeys('NNN');
            expect(Veiculo.certificadoNumero.getAttribute('value')).toBe('0', 'Falha ao validar a inserção de letras');
            Veiculo.certificadoNumero.clear();

            Veiculo.certificadoNumero.sendKeys('@##$%&*');
            expect(Veiculo.certificadoNumero.getAttribute('value')).toBe('0', 'Falha ao validar inserção de caractere especial');
            Veiculo.certificadoNumero.clear();

            Veiculo.certificadoNumero.sendKeys('12345');
            expect(Veiculo.certificadoNumero.getAttribute('value')).toBe('12345', 'Falha ao validar inserção de números');
            Veiculo.certificadoNumero.clear();
        });

        it('Validar que campo RENAVAM aceita somente números', () => {
            Veiculo.clicaNovo();
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
