let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Cadastro = require('../../cadastro/cadastro.po');
let Menu = require('../../../menu/menu.po');
let AlteracaoCadastral = require('../../cadastro/alteracao-cadastral.po');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Contatos = require('./contatos.po');

let cpf = '';
let secao = 'contatos';

describe('Contatos', () => {
  describe('Formulário Telefone', function () {
    beforeEach(() => {
      if (!cpf) {
        Menu.navegaParaCadastroPF();
        cpf = Cadastro.cadastraPessoaFisicaSimples(DadosCadastro);
      }
      altera = new AlteracaoCadastral(cpf);
      Menu.navegaParaAlteracaoCadastral();
      altera.buscaCpf(cpf);
      altera.clicaSecao(secao, cpf);
      Contatos.editaContato('telefone');
    });

    it('deve validar tamanho máximo dos campos de telefone', () => {
      Estresse.estressarCampo(Contatos.obsTelefone, 100);
      Estresse.estressarCampo(Contatos.numeroTelefone, 100);

      Estresse.avaliarLength(Contatos.obsTelefone, Contatos.tamanhoDosCampos.obsTelefone);
      Estresse.avaliarLength(Contatos.numeroTelefone, Contatos.tamanhoDosCampos.numeroTelefone);
    });

    it('deve validar telefone', () => {
      Contatos.numeroTelefone.clear();
      Contatos.numeroTelefone.sendKeys('0');
      Contatos.numeroTelefone.sendKeys(protractor.Key.TAB);

      expect(Mensagem.obrigatoriedade(Contatos.numeroTelefone)).toBeTruthy();
      expect(Mensagem.textoMensagem(Contatos.numeroTelefone)).toEqual('Telefone inválido');
    });

    it('deve editar dados de telefone e salvar cadastro', () => {
      let tipo = 'CELULAR';
      let fone = '(51) 96666-6669';
      let obs = 'Observação atualizada automação';
      let sms = 'SIM';

      Contatos.setTipoTelefone(tipo).then(() => {
        Contatos.numeroTelefone.clear();
        Contatos.numeroTelefone.sendKeys(fone);
        Contatos.obsTelefone.clear();
        Contatos.obsTelefone.sendKeys(obs);
        Contatos.sms.click();
        Contatos.salvar();
      });

      let tableRows = Contatos.getTableRowsTelefones();
      let colTelefone = tableRows.all(by.binding('contato.ddd + contato.numero | brPhoneNumber')).first();
      let colTipo = tableRows.all(by.binding('contato.tipoTelefone')).first();
      let colObs = tableRows.all(by.binding('contato.observacao')).first();
      let colSms = tableRows.all(by.binding("contato.podeEnviarSMS ? 'SIM' : 'NÃO'")).first();

      expect(Contatos.form.isPresent()).toBe(false);
      expect(colTelefone.getText()).toEqual(fone);
      expect(colTipo.getText()).toEqual(tipo);
      expect(colObs.getText()).toEqual(obs.toUpperCase());
      expect(colSms.getText()).toEqual(sms);

      Cadastro.atualizaCadastro();
      Menu.navegaParaAlteracaoCadastral();
      altera.buscaCpf(cpf);
      altera.clicaSecao(secao, cpf).then(() => {
        expect(colTelefone.getText()).toEqual(fone);
        expect(colTipo.getText()).toEqual(tipo);
        expect(colObs.getText()).toEqual(obs.toUpperCase());
        expect(colSms.getText()).toEqual(sms);
      });
    });
  });

  describe('Formulário E-mail', function () {
    beforeEach(() => {
      if (!cpf) {
        Menu.navegaParaCadastroPF();
        cpf = Cadastro.cadastraPessoaFisicaSimples(DadosCadastro);
      }
      altera = new AlteracaoCadastral(cpf);
      Menu.navegaParaAlteracaoCadastral();
      altera.buscaCpf(cpf);
      altera.clicaSecao(secao, cpf);
      Contatos.editaContato();
    });

    it('deve editar dados de e-mail e salvar cadastro', () => {
      let tipo = 'COMERCIAL';
      let email = 'emaildobeltrano@automacao-corebanking.com';
      let obs = 'Observação atualizada by automação CoreBanking';      
      Contatos.setTipoEmail(tipo).then(() => {
        Contatos.enderecoEmail.clear();
        Contatos.enderecoEmail.sendKeys(email);
        Contatos.obsEmail.clear();
        Contatos.obsEmail.sendKeys(obs);
        Contatos.salvar();
      });

      let tableRows = Contatos.getTableRowsEmails();
      let colTipo = tableRows.all(by.binding('contato.tipoEmail')).first();
      let colEmail = tableRows.all(by.binding('contato.endereco')).first();
      let colObs = tableRows.all(by.binding('contato.observacao')).first();

      expect(Contatos.form.isPresent()).toBe(false);
      expect(colTipo.getText()).toEqual(tipo.toUpperCase(),'Falha ao validar atualização de tipo de email.');
      expect(colEmail.getText()).toEqual(email.toUpperCase(), "Falha ao validar atualização de endereço de email");
      expect(colObs.getText()).toEqual(obs.toUpperCase(), "Falha ao validar atualização de observação de e-mail");

      Cadastro.atualizaCadastro();
      Menu.navegaParaAlteracaoCadastral();
      altera.buscaCpf(cpf);
      altera.clicaSecao(secao, cpf).then(() => {
        expect(colTipo.getText()).toEqual('PESSOAL','Falha ao validar atualização de tipo de email após atualizar cadastro.');
        expect(colEmail.getText()).toEqual(email.toUpperCase(), "Falha ao validar atualização de endereço de email após atualizar cadastro.");
        expect(colObs.getText()).toEqual('', "Falha ao validar atualização de observação de e-mail após atualizar cadastro.");
      });
    });
  });
});