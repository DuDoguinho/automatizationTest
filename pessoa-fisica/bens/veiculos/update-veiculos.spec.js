let Cadastro = require('../../cadastro/cadastro.po');
let Menu = require('../../../menu/menu.po');
let AlteracaoCadastral = require('../../cadastro/alteracao-cadastral.po');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let cpf = '';
let Veiculos = require('./veiculos.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');

describe('Update Veiculos', () => {
  beforeEach(() => {    
    if (!cpf) {
      Menu.navegaParaCadastroPF();      
      cpf = Cadastro.cadastraPessoaFisica(DadosCadastro);
    }
    Menu.navegaParaAlteracaoCadastral();    
    let altera = new AlteracaoCadastral(cpf);
    altera.buscaCpf(cpf);   
    altera.veiculos.click();
  });

  it('Deve validar obrigatoriedade dos campos', () => {
    Veiculos.clicaNovo();
    Veiculos.clicaSalvar();
    
    expect(Mensagem.obrigatoriedade(Veiculos.tipoVeiculo)).toBeTruthy("Falha ao validar obrigatoriedade do campo Tipo de Veículo");
    expect(Mensagem.obrigatoriedade(Veiculos.modelo)).toBeTruthy("Falha ao validar obrigatoriedade do campo Modelo");
    expect(Mensagem.obrigatoriedade(Veiculos.marca)).toBeTruthy("Falha ao validar obrigatoriedade do campo Marca");
    expect(Mensagem.obrigatoriedade(Veiculos.valorVeiculo)).toBeTruthy("Falha ao validar obrigatoriedade do campo Valor do Veículo");
    expect(Mensagem.obrigatoriedade(Veiculos.situacaoVeiculo)).toBeTruthy("Falha ao validar obrigatoriedade do campo Situação do Veículo");
  });

  it('deve validar tamanho máximo dos campos da seção', () => {
    Veiculos.clicaNovo();

    Estresse.estressarCampo(Veiculos.modelo, 50);
    Estresse.estressarCampo(Veiculos.marca, 50);
    Estresse.estressarCampo(Veiculos.valorVeiculo, 50);
    Estresse.estressarCampo(Veiculos.valorAlienado, 50);
    Estresse.estressarCampo(Veiculos.numeroNotaFiscal, 50);
    Estresse.estressarCampo(Veiculos.nomeFornecedor, 80);
    Estresse.estressarCampo(Veiculos.placa, 20);
    Estresse.estressarCampo(Veiculos.numeroCertificado, 20);
    Estresse.estressarCampo(Veiculos.chassis, 40);
    Estresse.estressarCampo(Veiculos.renavam, 30);

    Estresse.avaliarLength(Veiculos.modelo, Veiculos.tamanhoDosCampos.modelo);
    Estresse.avaliarLength(Veiculos.marca, Veiculos.tamanhoDosCampos.marca);
    Estresse.avaliarLengthValor(Veiculos.valorVeiculo);
    Estresse.avaliarLengthValor(Veiculos.valorAlienado);
    Estresse.avaliarLength(Veiculos.numeroNotaFiscal, Veiculos.tamanhoDosCampos.nf);
    Estresse.avaliarLength(Veiculos.nomeFornecedor, Veiculos.tamanhoDosCampos.fornecedor);
    Estresse.avaliarLength(Veiculos.placa, Veiculos.tamanhoDosCampos.placa);
    Estresse.avaliarLength(Veiculos.numeroCertificado, Veiculos.tamanhoDosCampos.numeroCertificado);
    Estresse.avaliarLength(Veiculos.chassis, Veiculos.tamanhoDosCampos.chassis);
    Estresse.avaliarLength(Veiculos.renavam, Veiculos.tamanhoDosCampos.renavam);
  });

  it('deve validar caracteres especiais no input PLACA', () => {
    Veiculos.clicaNovo();

    let inputInvalido = '@&*';

    Veiculos.placa.sendKeys(inputInvalido);
    Veiculos.placa.sendKeys(protractor.Key.TAB);

    expect(Mensagem.textoMensagem(Veiculos.placa)).toEqual('Placa inválida');
  });

  it('deve validar caracteres especiais no input CHASSI', () => {
    Veiculos.clicaNovo();

    let inputInvalido = '@&*';

    Veiculos.chassis.sendKeys(inputInvalido);
    Veiculos.chassis.sendKeys(protractor.Key.TAB);

    expect(Mensagem.textoMensagem(Veiculos.chassis)).toEqual('Chassi inválido');
  });

  it('Atualizar Cadastro - Editando e Validando Veiculos', () => {
    let altera = new AlteracaoCadastral(cpf);

    Veiculos.editarUpdate();
    Veiculos.limpaCampos();
    Veiculos.salvar();
    
    expect(Mensagem.obrigatoriedade(Veiculos.modelo)).toBeTruthy();
    expect(Mensagem.obrigatoriedade(Veiculos.marca)).toBeTruthy();
    expect(Mensagem.obrigatoriedade(Veiculos.valorVeiculo)).toBeTruthy();
    
    Veiculos.preencheUpdate();
    Veiculos.salvar();
    let veiculos = Veiculos.getTableRows();
    
    expect(veiculos.first().element(Veiculos.byColunaTipo).getText()).toBe('Náutico'.toUpperCase(), "Falha ao comparar Tipo de Veiculo - Update");
    expect(veiculos.first().element(Veiculos.byColunaModelo).getText()).toBe('Modelos'.toUpperCase(), "Falha ao comparar Modelo do Veiculo - Update");
    expect(veiculos.first().element(Veiculos.byColunaAnoFab).getText()).toBe('2015'.toUpperCase(), "Falha ao comparar Ano Fab. do Veiculo - Update");
    expect(veiculos.first().element(Veiculos.byColunaValor).getText()).toBe('R$ ' + '700,00'.toUpperCase(), "Falha ao comparar Valor do Veiculo - Update");

    Cadastro.atualizaCadastro();    
    Menu.navegaParaAlteracaoCadastral();
    altera.buscaCpf(cpf);
    altera.veiculos.click();

    expect(veiculos.first().element(Veiculos.byColunaTipo).getText()).toBe('Automotivo'.toUpperCase(), "Falha ao comparar Tipo de Veiculo - Update");
    expect(veiculos.first().element(Veiculos.byColunaModelo).getText()).toBe('Modelos'.toUpperCase(), "Falha ao comparar Modelo do Veiculo - Update");
    expect(veiculos.first().element(Veiculos.byColunaAnoFab).getText()).toBe('2015'.toUpperCase(), "Falha ao comparar Ano Fab. do Veiculo - Update");
    expect(veiculos.first().element(Veiculos.byColunaValor).getText()).toBe('R$ ' + '700,00'.toUpperCase(), "Falha ao comparar Valor do Veiculo - Update");

    Menu.navegaParaHome();
  });


});