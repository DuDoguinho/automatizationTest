let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Modal = require('../../../comum/modal');
let GeraCPF = require('../../../comum/cpfCnpj');
let Cadastro = require('../../cadastro/cadastro.po');
let Menu = require('../../../menu/menu.po');
let AlteracaoCadastral = require('../../cadastro/alteracao-cadastral.po');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Imoveis = require('./imoveis.po');
let altera;
let cpf = '';

describe('Update Imoveis', () => {
  beforeAll(() => {
    cpf = '';
  });

  describe('Formulário', function () {
    beforeEach(() => {
      if (!cpf) {
        Menu.navegaParaCadastroPF();
        cpf = Cadastro.cadastraPessoaFisica(DadosCadastro);
      }
      Menu.navegaParaAlteracaoCadastral();
      altera = new AlteracaoCadastral(cpf);
      altera.buscaCpf(cpf);
      altera.imoveis.click();
      Imoveis.botaoNovo.click();
    });
    
    it('deve validar os campos obrigatórios', () => {
      Imoveis.botaoSalvar.click();

      expect(Mensagem.obrigatoriedade(Imoveis.tipoImovel)).toBeTruthy();
      expect(Mensagem.obrigatoriedade(Imoveis.situacao)).toBeTruthy();
      expect(Mensagem.obrigatoriedade(Imoveis.destinacao)).toBeTruthy();
    });

    it('deve validar tamanho máximo dos campos da seção', () => {
      Estresse.estressarCampo(Imoveis.localizacao, 100);
      Estresse.estressarCampo(Imoveis.area, 50);
      Estresse.estressarCampo(Imoveis.areaConstruida, 50);
      Estresse.estressarCampo(Imoveis.valorAtual, 30);
      Estresse.estressarCampo(Imoveis.valorHipotecado, 30);
      Estresse.estressarCampo(Imoveis.valorAvaliacao, 30);
      Estresse.estressarCampo(Imoveis.valorAverbacao, 30);
      Estresse.estressarCampo(Imoveis.inscricao, 50);
      Estresse.estressarCampo(Imoveis.registro, 50);
      Estresse.estressarCampo(Imoveis.numeroMatricula, 30);
      Estresse.estressarCampo(Imoveis.numeroLivro, 30);
      Estresse.estressarCampo(Imoveis.cartorio, 50);
      Estresse.estressarCampo(Imoveis.descricao, 252);
      Estresse.estressarCampo(Imoveis.origem, 252);
      Estresse.estressarCampo(Imoveis.nome, 100);

      Estresse.avaliarLength(Imoveis.localizacao, Imoveis.tamanhoDosCampos.localizacao, 'Localização');
      Estresse.avaliarLengthValor(Imoveis.valorAtual);
      Estresse.avaliarLengthValor(Imoveis.valorHipotecado);
      Estresse.avaliarLengthValor(Imoveis.valorAvaliacao);
      Estresse.avaliarLengthValor(Imoveis.valorAverbacao);
      Estresse.avaliarLength(Imoveis.inscricao, Imoveis.tamanhoDosCampos.inscricao, 'Inscrição');
      Estresse.avaliarLength(Imoveis.registro, Imoveis.tamanhoDosCampos.registro, 'Registro');
      Estresse.avaliarLength(Imoveis.numeroMatricula, Imoveis.tamanhoDosCampos.numeroMatricula, 'Número Matrícula');
      Estresse.avaliarLength(Imoveis.numeroLivro, Imoveis.tamanhoDosCampos.numeroLivro, 'Número Livro');
      Estresse.avaliarLength(Imoveis.cartorio, Imoveis.tamanhoDosCampos.cartorio, 'Cartório');
      Estresse.avaliarLength(Imoveis.nome, Imoveis.tamanhoDosCampos.vendedor.nomeCompleto, 'Nome Completo');
      Estresse.avaliarLength(Imoveis.area, Imoveis.tamanhoDosCampos.area, 'Área');
      Estresse.avaliarLength(Imoveis.areaConstruida, Imoveis.tamanhoDosCampos.areaConstruida, 'Área Construída');
      Estresse.avaliarLength(Imoveis.descricao, Imoveis.tamanhoDosCampos.descricao, 'Descrição');
      Estresse.avaliarLength(Imoveis.origem, Imoveis.tamanhoDosCampos.origem, 'Origem');
    });

    it('Campo "Area (m²)" deve aceitar apenas números', () => {
      let areaInvalida = '*AA%555555'
      let areaValida = '555.555';
      Imoveis.area.clear();
      Imoveis.area.sendKeys(areaInvalida + protractor.Key.TAB);
      expect(Imoveis.area.getAttribute('value')).toEqual(areaValida);
    });

    it('Campo "Area (m²)" deve ter conter unidades decimais', () => {
      let area = '5562';
      let areaDecimal = '55,62';
      Imoveis.area.clear();
      Imoveis.area.sendKeys(area + protractor.Key.TAB);
      expect(Imoveis.area.getAttribute('value')).toBe(areaDecimal, 'Falha ao validar campo Area');
    });

    it('Campo "Area Construida" deve aceitar apenas números', () => {
      let areaContrInvalida = '*AA%555555'
      let areaConstrValida = '555.555';
      Imoveis.areaConstruida.clear();
      Imoveis.areaConstruida.sendKeys(areaContrInvalida + protractor.Key.TAB);
      expect(Imoveis.areaConstruida.getAttribute('value')).toEqual(areaConstrValida);
    });

    it('Campo "Area Construida" deve ter conter unidades decimais', () => {
      let areaConstruida = '5562';
      let areaDecimal = '55,62';
      Imoveis.areaConstruida.clear();
      Imoveis.areaConstruida.sendKeys(areaConstruida + protractor.Key.TAB);
      expect(Imoveis.areaConstruida.getAttribute('value')).toBe(areaDecimal, 'Falha ao validar campo Area Decimal');
    });

    it('Campo "valor Atual" deve aceitar apenas números', () => {
      let valorInvalido = '*AA%555555'
      let valorValido = '5.555,55';
      Imoveis.valorAtual.clear();
      Imoveis.valorAtual.sendKeys(valorInvalido + protractor.Key.TAB);
      expect(Imoveis.valorAtual.getAttribute('value')).toEqual('R$ ' + valorValido);
    });

    it('Campo "valor Hipotecado" deve aceitar apenas números', () => {
      let valorInvalido = '*AA%555555'
      let valorValido = '5.555,55';
      Imoveis.valorHipotecado.clear();
      Imoveis.valorHipotecado.sendKeys(valorInvalido + protractor.Key.TAB);
      expect(Imoveis.valorHipotecado.getAttribute('value')).toEqual('R$ ' + valorValido);
    });

    it('Campo "Valor Avaliação" deve aceitar apenas números', () => {
      let valorInvalido = '*AA%555555'
      let valorValido = '5.555,55';
      Imoveis.valorAvaliacao.clear();
      Imoveis.valorAvaliacao.sendKeys(valorInvalido + protractor.Key.TAB);
      expect(Imoveis.valorAvaliacao.getAttribute('value')).toEqual('R$ ' + valorValido);
    });

    it('Campo "Valor Averbação" deve aceitar apenas números', () => {
      let valorInvalido = '*AA%555555'
      let valorValido = '5.555,55';
      Imoveis.valorAverbacao.clear();
      Imoveis.valorAverbacao.sendKeys(valorInvalido + protractor.Key.TAB);
      expect(Imoveis.valorAverbacao.getAttribute('value')).toEqual('R$ ' + valorValido);
    });

    it('Campo "Numero Livro" deve aceitar apenas números', () => {
      let numeroInvalido = '*AA%555555'
      let numeroValido = '555555';
      Imoveis.numeroLivro.clear();
      Imoveis.numeroLivro.sendKeys(numeroInvalido + protractor.Key.TAB);
      expect(Imoveis.numeroLivro.getAttribute('value')).toEqual(numeroValido);
    });

    it('Campo "Número Matrícula" deve aceitar apenas números', () => {
      let numeroInvalido = '*AA%555555'
      let numeroValido = '555555';
      Imoveis.numeroMatricula.clear();
      Imoveis.numeroMatricula.sendKeys(numeroInvalido + protractor.Key.TAB);
      expect(Imoveis.numeroMatricula.getAttribute('value')).toEqual(numeroValido);
    });

    it('deve validar se cpf do vendedor é igual do terceiro', () => {
      Imoveis.cpfCnpj.sendKeys(cpf);
      Imoveis.cpfCnpj.sendKeys(protractor.Key.TAB);
      expect(Modal.getModal()).not.toBe(null)
      expect(Modal.getModalMsg()).toEqual('O CPF não pode ser igual o do cadastrado');

      Modal.clickModalBtn();

      expect(Imoveis.cpfCnpj.evaluate(Imoveis.cpfCnpj.getAttribute('ng-model'))).toEqual('');
    });

    it('Atualizar Cadastro - Editando imovel', () => {
      Imoveis.botaoCancelar.click();
      Imoveis.editarUpdate();
      Imoveis.setTipoImovel('Apartamento');
      Imoveis.setSituacao('Hipotecado');
      Imoveis.setDestinacao('Comercial');

      let cpfVendedor = GeraCPF.getCPF();
      Imoveis.cpfCnpj.clear();
      Imoveis.setCpfCnpjVendedor(cpfVendedor);
      Imoveis.nome.clear();
      Imoveis.setNomeVendedor("Forrest Gump");
      Imoveis.salvar();

      let imoveis = Imoveis.getTableRows();

      expect(imoveis.first().element(Imoveis.byColunaTipoImovel).getText()).toBe('Apartamento'.toUpperCase(), "Falha ao comparar Tipo de Imóvel - Bens");
      expect(imoveis.first().element(Imoveis.byColunaSituacao).getText()).toBe('Hipotecado'.toUpperCase(), "Falha ao comparar Situação de Imóvel - Bens");
      expect(imoveis.first().element(Imoveis.byColunaDestinacao).getText()).toBe('Comercial'.toUpperCase(), "Falha ao comparar Destinação de Imóvel - Bens");
      expect(imoveis.first().element(Imoveis.byColunaValorAtual).getText()).toBe('R$ ' + '8.888,88', "Falha ao comparar Valor Atual de Imóvel - Bens");

      Cadastro.atualizaCadastro();

      Menu.navegaParaAlteracaoCadastral();
      altera.buscaCpf(cpf);
      altera.imoveis.click();

      Imoveis.editarUpdate();

      expect(Imoveis.cpfCnpj.getAttribute('value')).toBe(cpfVendedor, "Falha ao comparar CPF/CNPJ do Vendedor");
      expect(Imoveis.nome.getAttribute('value')).toBe("Forrest Gump", "Falha ao comparar Nome do Vendedor");
    });
  });

  describe('Listagem', function () {
    beforeEach(() => {
      if (!cpf) {
        Menu.navegaParaCadastroPF();
        cpf = Cadastro.cadastraPessoaFisicaSimples(DadosCadastro);
      }
      Menu.navegaParaAlteracaoCadastral();
      altera = new AlteracaoCadastral(cpf);
      altera.buscaCpf(cpf);
      altera.imoveis.click();
    });

    it('deve inserir múltiplos', () => {
      Imoveis.getTableRows().count().then((numOfRows) => {
        let quantidade = 3;

        Imoveis.insereMultiplos(quantidade);
        let tableRowsAfter = Imoveis.getTableRows();
        expect(tableRowsAfter.count()).toEqual(quantidade + numOfRows);
      });
    });

    it('deve inserir e apagar', () => {
      Imoveis.getTableRows().count().then((numOfRows) => {
        let quantidade = 3;

        Imoveis.insereMultiplos(quantidade);        
        for (var i = quantidade + numOfRows; i > quantidade + numOfRows; i--) {
          Imoveis.excluir();          
        }

        let tableRows = Imoveis.getTableRows();
        expect(tableRows.count()).toEqual(0);
      });
    });

    it('deve editar', () => {
      Imoveis.getTableRows().count().then((numOfRows) => {
        let quantidade = 2,
          novoValor = 'R$ 905.000,60';

        Imoveis.insereMultiplos(quantidade);
        Imoveis.editar(novoValor);

        //Then
        let tableRows = Imoveis.getTableRows(),
          labelNovoValor = tableRows.all(by.binding('imovel.valorAtual | finance:true')).first();

        expect(tableRows.count()).toEqual(quantidade + numOfRows);
        expect(labelNovoValor.getText()).toEqual(novoValor);
      });
    });
  });
});