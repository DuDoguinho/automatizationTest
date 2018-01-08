let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Cadastro = require('../../cadastro/cadastro.po');
let Menu = require('../../../menu/menu.po');
let AlteracaoCadastral = require('../../cadastro/alteracao-cadastral.po');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let DomicilioFiscal = require('./domicilio-fiscal.po');
let cpf = '';
var altera;
let secao = 'domicilios-fiscais';

describe('Update Documentos', () => {
  describe('Formulário Domicílios Fiscais', () => {
    beforeEach(() => {
      if (!cpf) {
        Menu.navegaParaCadastroPF();
        cpf = Cadastro.cadastraPessoaFisicaSimples(DadosCadastro);
      }
      altera = new AlteracaoCadastral(cpf);
      Menu.navegaParaAlteracaoCadastral();
      altera.buscaCpf(cpf);
      altera.clicaSecao(secao, cpf);
      DomicilioFiscal.editar();
    });

    it('Deve validar estado dos campos', () => {
      expect(DomicilioFiscal.pais.isEnabled()).toBeTruthy('Falha ao validar campo país');
      expect(DomicilioFiscal.nrIdentificacao.isEnabled()).toBeTruthy('Falha ao validar campo Identificação');
      expect(DomicilioFiscal.observacoes.isEnabled()).toBeTruthy('Falha ao validar campo observações');
    });

    it('Deve validar tamanho maximo dos campos', () => {
      Estresse.estressarCampo(DomicilioFiscal.nrIdentificacao, 20);
      Estresse.avaliarLength(DomicilioFiscal.nrIdentificacao, DomicilioFiscal.tamanoDosCampos.nrIdentificacao, 'Falha ao validar campo Nr Identificação');

      Estresse.estressarCampo(DomicilioFiscal.observacoes, 250);
      Estresse.avaliarLength(DomicilioFiscal.observacoes, DomicilioFiscal.tamanoDosCampos.observacoes, 'Falha ao validar campo Observações');
    });

    it('Deve validar que campo "Nr Identificação" não aceita caracteres especiais', () => {
      let matriculaInvalida = '*#$DSDASDS#*';
      DomicilioFiscal.nrIdentificacao.clear();
      DomicilioFiscal.nrIdentificacao.sendKeys(matriculaInvalida + protractor.Key.TAB);
      expect(Mensagem.obrigatoriedade(DomicilioFiscal.nrIdentificacao)).toBeTruthy('Falha ao validar campo Nr.Identificação');
    });

    it('Altera dados e atualiza cadastro', () => {
      let pais = 'nicarágua';
      let id = '15948726398';
      let obs = 'Observação TESTE auto update';

      DomicilioFiscal.setPais(pais);
      DomicilioFiscal.nrIdentificacao.clear();
      DomicilioFiscal.preencheIdentificacao(id);
      DomicilioFiscal.observacoes.clear();
      DomicilioFiscal.preencheObservacao(obs);
      DomicilioFiscal.clicaSalvar().then(() => {
        let linha = DomicilioFiscal.getTableRows().first();
        expect(linha.element(DomicilioFiscal.byColunaPais).getText()).toBe(pais.toUpperCase(), 'Falha ao validar coluna País');
        expect(linha.element(DomicilioFiscal.byColunaNrIdentificacao).getText()).toBe(id, 'Falha ao validar coluna Nr Identificação');
        expect(linha.element(DomicilioFiscal.byColunaObservacoes).getText()).toBe(obs.toUpperCase(), 'Falha ao validar coluna Observações');
      });

      Cadastro.atualizaCadastro();
      Menu.navegaParaAlteracaoCadastral();
      altera.buscaCpf(cpf);
      altera.clicaSecao(secao, cpf).then(() => {
        let linha = DomicilioFiscal.getTableRows().first();
        expect(linha.element(DomicilioFiscal.byColunaPais).getText()).toBe(pais.toUpperCase(), 'Falha ao validar coluna País');
        expect(linha.element(DomicilioFiscal.byColunaNrIdentificacao).getText()).toBe(id, 'Falha ao validar coluna Nr Identificação');
        expect(linha.element(DomicilioFiscal.byColunaObservacoes).getText()).toBe('', 'Falha ao validar coluna Observações');
      });
    });

    it('deve verificar se o sistema bloqueia inserção de duplo domicílio para o mesmo país.', () => {
      let pais = 'nicarágua';
      let id = '15948726398';
      let obs = 'Observação TESTE auto update';

      DomicilioFiscal.setPais(pais);
      DomicilioFiscal.nrIdentificacao.clear();
      DomicilioFiscal.preencheIdentificacao(id);
      DomicilioFiscal.observacoes.clear();
      DomicilioFiscal.preencheObservacao(obs);
      DomicilioFiscal.clicaSalvar().then(() => {
        let linha = DomicilioFiscal.getTableRows().first();
        expect(linha.element(DomicilioFiscal.byColunaPais).getText()).toBe(pais.toUpperCase(), 'Falha ao validar coluna País');
        expect(linha.element(DomicilioFiscal.byColunaNrIdentificacao).getText()).toBe(id, 'Falha ao validar coluna Nr Identificação');
        expect(linha.element(DomicilioFiscal.byColunaObservacoes).getText()).toBe(obs.toUpperCase(), 'Falha ao validar coluna Observações');
      });

      Cadastro.atualizaCadastro();
      Menu.navegaParaAlteracaoCadastral();
      altera.buscaCpf(cpf);
      altera.clicaSecao(secao, cpf);

      DomicilioFiscal.btnNovo.click();
      DomicilioFiscal.setPais(pais);
      DomicilioFiscal.preencheIdentificacao(id);
      DomicilioFiscal.preencheObservacao(obs);
      DomicilioFiscal.clicaSalvar().then(()=>{
        let linha = DomicilioFiscal.getTableRows().last();
        expect(linha.element(DomicilioFiscal.byColunaPais).getText()).toBe(pais.toUpperCase(), 'Falha ao validar coluna País');
        expect(linha.element(DomicilioFiscal.byColunaNrIdentificacao).getText()).toBe(id, 'Falha ao validar coluna Nr Identificação');
        expect(linha.element(DomicilioFiscal.byColunaObservacoes).getText()).toBe(obs.toUpperCase(), 'Falha ao validar coluna Observações');        
      });

      Cadastro.atualizaCadastro().then(()=>{
        expect(Cadastro.msgs_erro.isDisplayed()).toBeTruthy('Falha ao validar duplo Domicílio para o mesmo País.');
      });
    });

  });
});