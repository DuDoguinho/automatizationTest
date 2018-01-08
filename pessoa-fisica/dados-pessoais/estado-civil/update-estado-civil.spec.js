let Cadastro = require('../../cadastro/cadastro.po');
let Menu = require('../../../menu/menu.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Modal = require('../../../comum/modal');
let AlteracaoCadastral = require('../../cadastro/alteracao-cadastral.po');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let DadosCpfNome = require('../dados-cpf-nome/dados-cpf-nome.po');
let EstadoCivil = require('./estado-civil.po');
let Gerador = require('../../../comum/cpfCnpj');
let Data = require('../../../comum/data');
let altera;
let cpf = '';

describe('Update Estado Civil', () => {
  beforeEach(() => {
    if (!cpf) {
      Menu.navegaParaCadastroPF()
      cpf = Cadastro.cadastraPessoaFisica(DadosCadastro);
    }
    Menu.navegaParaAlteracaoCadastral();
    altera = new AlteracaoCadastral(cpf);
    altera.buscaCpf(cpf);
    altera.estadoCivil.click();
  });

  it('Atualizar Cadastro - Inserindo novo Estado Civil - Insere contato, valida e exclui', () => {
    EstadoCivil.preencheUpdate();
    EstadoCivil.preencheContatoUpdate();

    let contato = EstadoCivil.getTableRowsContato();

    expect(contato.first().element(EstadoCivil.byColunaTipoContato).getText()).toBe('RESIDENCIAL', "Falha ao comparar Tipo de Contato - Estado Civil");
    expect(contato.first().element(EstadoCivil.byColunaNrContao).getText()).toBe('(51) ' + '9999-9999', "Falha ao comparar Numero de Contato - Estado Civil");
    expect(contato.first().element(EstadoCivil.byColunaObservacao).getText()).toBe('OBSERVACAO TELEFONE', "Falha ao comparar observacao contato - Estado Civil");

    EstadoCivil.excluirContato();

    expect(EstadoCivil.listaVazia.isDisplayed()).toBe(true);

    Menu.navegaParaAlteracaoCadastral();
    altera.buscaCpf(cpf);
    altera.estadoCivil.click();

    expect(EstadoCivil.estadoCivil.element(by.css('option[selected="selected"]')).getText()).toBe('Casado', "Falha ao comparar Estado Civil");
    expect(EstadoCivil.regimeCasamento.element(by.css('option[selected="selected"]')).getText()).toBe('Comunhão de Bens', "Falha ao comparar comunhao de bens - Estado Civil");
    expect(EstadoCivil.cpfConjuge.getAttribute('value')).toEqual('427.325.514-65', "Falha ao comparar cpf conjuge - Estado Civil");
    expect(EstadoCivil.nomeCompleto.getAttribute('value')).toEqual('NOME CONJUGE', "Falha ao comparar nome conjuge - Estado Civil");
    expect(EstadoCivil.dataNascimento.getAttribute('value')).toEqual('02/05/1989', "Falha ao comparar data de nascimento - Estado Civil");
    expect(EstadoCivil.numeroIdentificacao.getAttribute('value')).toEqual('7777777', "Falha ao comparar RG conjuge - Estado Civil");
    expect(EstadoCivil.dataEmissao.getAttribute('value')).toEqual('02/05/2007', "Falha ao comparar data emissao rg - Estado Civil");
    expect(EstadoCivil.profissao.element(by.css('option[selected="selected"]')).getText()).toBe('AERONAUTA', "Falha ao comparar profissao - Estado Civil");
    expect(EstadoCivil.empresa.getAttribute('value')).toEqual('VARIG', "Falha ao comparar empresa - Estado Civil");
    expect(EstadoCivil.valorRenda.getAttribute('value')).toEqual('R$ ' + '7.000,00', "Falha ao comparar valor - Estado Civil");
    expect(EstadoCivil.nomePai.getAttribute('value')).toEqual('NOME PAI', "Falha ao comparar nome do Pai - Estado Civil");
    expect(EstadoCivil.nomeMae.getAttribute('value')).toEqual('NOME MAE', "Falha ao comparar nome do Pai - Estado Civil");
  });

  it('não deve mostrar formulário caso estado civil não seja "CASADO" ou "UNIAO ESTAVEL"', () => {
    EstadoCivil.setEstadoCivil('Solteiro');
    EstadoCivil.checkFormDisplay(false);

    EstadoCivil.setEstadoCivil('Divorciado');
    EstadoCivil.checkFormDisplay(false);

    EstadoCivil.setEstadoCivil('Separado');
    EstadoCivil.checkFormDisplay(false);

    EstadoCivil.setEstadoCivil('Viúvo');
    EstadoCivil.checkFormDisplay(false);
  });

  it('deve mostrar formulário caso estado civil seja "CASADO" ou "UNIAO ESTAVEL"', () => {
    EstadoCivil.setEstadoCivil('Casado');
    EstadoCivil.checkFormDisplay(true);

    EstadoCivil.setEstadoCivil('União Estável');
    EstadoCivil.checkFormDisplay(true);
  });

  it('deve mostrar mensagem caso conjuge seja menor de 16 anos', () => {
    let hoje = Data.dataAtual();

    EstadoCivil.preencheUpdate();

    EstadoCivil.dataNascimento.clear();
    EstadoCivil.dataNascimento.sendKeys(hoje + protractor.Key.TAB);
    expect(Modal.getModal().isDisplayed()).toBe(true);
    expect(Modal.getModalMsg()).toBe('O conjuge tem que ser maior de 16 anos.', "Falha ao validar cônjuge menor de 16 anos.");

    Modal.clickModalBtn().then(() => {
      Modal.getModal().isPresent().then((val) => {
        if (val) {
          expect(Modal.getModal().isDisplayed()).toBe(false);
        } else {
          expect(Modal.getModal().isPresent()).toBe(false);
        }
      })

      expect(EstadoCivil.dataNascimento
          .evaluate(EstadoCivil.dataNascimento.getAttribute('ng-model')))
        .toEqual(null);
    });
  });

  it('deve habilitar ORGAO EXPEDIDOR apenas se TIPO DE IDENTIFICACAO for selecionado', () => {
    expect(EstadoCivil.orgaoExpedidor.isEnabled()).toBe(false);
    EstadoCivil.setTipoIdentificacao();
    expect(EstadoCivil.orgaoExpedidor.isEnabled()).toBe(true);
  });

  it('deve validar campos obrigatórios', () => {

    EstadoCivil.preencherCamposObrigatorios();
    EstadoCivil.limparCamposObrigatorios();

    expect(Mensagem.obrigatoriedade(EstadoCivil.regimeCasamento)).toBeTruthy();
    expect(Mensagem.obrigatoriedade(EstadoCivil.nomeCompleto)).toBeTruthy();
    expect(Mensagem.obrigatoriedade(EstadoCivil.dataNascimento)).toBeTruthy();
    expect(Mensagem.obrigatoriedade(EstadoCivil.tipoIdentificacao)).not.toBeTruthy();
    expect(Mensagem.obrigatoriedade(EstadoCivil.numeroIdentificacao)).not.toBeTruthy();
    expect(Mensagem.obrigatoriedade(EstadoCivil.orgaoExpedidor)).not.toBeTruthy();
    expect(Mensagem.obrigatoriedade(EstadoCivil.ufExpedidor)).not.toBeTruthy();
    expect(Mensagem.obrigatoriedade(EstadoCivil.dataEmissao)).not.toBeTruthy();
    expect(Mensagem.obrigatoriedade(EstadoCivil.nomePai)).toBeTruthy();
    expect(Mensagem.obrigatoriedade(EstadoCivil.nomeMae)).toBeTruthy();

  });

  it('deve validar tamanho máximo dos campos', () => {
    Estresse.estressarCampo(EstadoCivil.nomeCompleto, 100);
    Estresse.estressarCampo(EstadoCivil.numeroIdentificacao, 100);
    Estresse.estressarCampo(EstadoCivil.empresa, 100);
    Estresse.estressarCampo(EstadoCivil.valorRenda, 100);
    Estresse.estressarCampo(EstadoCivil.nomePai, 100);
    Estresse.estressarCampo(EstadoCivil.nomeMae, 100);

    Estresse.avaliarLength(EstadoCivil.nomeCompleto, EstadoCivil.tamanhoDosCampos.nomeCompleto);
    Estresse.avaliarLength(EstadoCivil.numeroIdentificacao, EstadoCivil.tamanhoDosCampos.numeroIdentificacao);
    Estresse.avaliarLength(EstadoCivil.empresa, EstadoCivil.tamanhoDosCampos.empresa);
    Estresse.avaliarLengthValor(EstadoCivil.valorRenda);
    Estresse.avaliarLength(EstadoCivil.nomePai, EstadoCivil.tamanhoDosCampos.filiacao.nomePai);
    Estresse.avaliarLength(EstadoCivil.nomeMae, EstadoCivil.tamanhoDosCampos.filiacao.nomeMae);

  });


  //Contatos
  describe('Contatos Cônjuge', () => {

    describe('Formulário', function () {

      describe('Telefone', function () {
        beforeEach(() => {
          if (!cpf) {
            Menu.navegaParaCadastroPF()
            cpf = Cadastro.cadastraPessoaFisica(DadosCadastro);
          }
          Menu.navegaParaAlteracaoCadastral();
          let altera = new AlteracaoCadastral(cpf);
          altera.buscaCpf(cpf);
          altera.estadoCivil.click();
          EstadoCivil.setEstadoCivil('Casado');
          EstadoCivil.botaoNovo.click();
        });

        it('deve validar os campos obrigatórios de telefone', () => {
          EstadoCivil.botaoSalvar.click();

          expect(Mensagem.obrigatoriedade(EstadoCivil.tipoTelefone)).toBeTruthy();
          expect(Mensagem.obrigatoriedade(EstadoCivil.numeroTelefone)).toBeTruthy();
        });

        it('deve validar telefone', () => {
          EstadoCivil.numeroTelefone.sendKeys('00000');
          EstadoCivil.numeroTelefone.sendKeys(protractor.Key.TAB);

          expect(Mensagem.obrigatoriedade(EstadoCivil.numeroTelefone)).toBeTruthy();
          expect(Mensagem.textoMensagem(EstadoCivil.numeroTelefone)).toEqual('Telefone inválido');
        });

        it('Deve validar número máximo de caracteres no campo de Observação', () => {
          Estresse.estressarCampo(EstadoCivil.obsTelefone, 50);
          Estresse.avaliarLength(EstadoCivil.obsTelefone, EstadoCivil.tamanhoDosCampos.observacaoTelefone);
        });

        it('deve cancelar', () => {
          expect(EstadoCivil.form.isDisplayed()).toBeTruthy();

          EstadoCivil.botaoCancelar.click();
          expect(EstadoCivil.form.isPresent()).not.toBeTruthy();
        });
      });

      describe('E-mail', function () {
        beforeEach(() => {
          if (!cpf) {
            Menu.navegaParaCadastroPF()
            cpf = Cadastro.cadastraPessoaFisica(DadosCadastro);
          }
          Menu.navegaParaAlteracaoCadastral();
          let altera = new AlteracaoCadastral(cpf);
          altera.buscaCpf(cpf);
          altera.estadoCivil.click();
          EstadoCivil.setEstadoCivil('Casado');
          EstadoCivil.botaoNovo.click();
          EstadoCivil.setTipoContato('E-mail');
          EstadoCivil.setEstadoCivil('Casado');
        });

        it('deve validar os campos obrigatórios de email', () => {
          EstadoCivil.botaoSalvar.click();

          expect(Mensagem.obrigatoriedade(EstadoCivil.tipoEmail)).toBeTruthy();
          expect(Mensagem.obrigatoriedade(EstadoCivil.enderecoEmail)).toBeTruthy();
        });

        xit('Deve validar número máximo de caracteres no campo Email', () => {
          Estresse.estressarCampo(EstadoCivil.enderecoEmail, 60);
          Estresse.avaliarLength(EstadoCivil.enderecoEmail, EstadoCivil.tamanhoDosCampos.campoEmail);
        });

        it('Deve validar número máximo de caracteres no campo de Observação', () => {
          Estresse.estressarCampo(EstadoCivil.obsEmail, 300);
          Estresse.avaliarLength(EstadoCivil.obsEmail, EstadoCivil.tamanhoDosCampos.observacaoEmail);
        });

        it('deve validar email', () => {
          EstadoCivil.enderecoEmail.sendKeys('00000');
          element(by.css('body')).click();

          expect(Mensagem.obrigatoriedade(EstadoCivil.enderecoEmail)).toBeTruthy();
          expect(Mensagem.textoMensagem(EstadoCivil.enderecoEmail)).toEqual('E-mail inválido');
        });

        it('deve cancelar', () => {
          expect(EstadoCivil.form.isDisplayed()).toBeTruthy();

          EstadoCivil.botaoCancelar.click();
          expect(EstadoCivil.form.isPresent()).not.toBeTruthy();
        });

      });
    });

    describe('Validações Complementares', function () {
      beforeEach(() => {
        if (!cpf) {
          Menu.navegaParaCadastroPF()
          cpf = Cadastro.cadastraPessoaFisica(DadosCadastro);
        }
        Menu.navegaParaAlteracaoCadastral();
        let altera = new AlteracaoCadastral(cpf);
        altera.buscaCpf(cpf);
        altera.estadoCivil.click();
        EstadoCivil.setEstadoCivil('Casado');
        EstadoCivil.botaoNovo.click();
      });

      it('Validar comportamento ao setar CPF do ‘Terceiro’ como cpf do cônjuge', () => {

        EstadoCivil.cpfConjuge.clear();
        EstadoCivil.cpfConjuge.sendKeys(cpf + protractor.Key.TAB);

        expect(Modal.getModalMsg()).toEqual('O CPF não pode ser o mesmo do cadastrado.');
        Modal.clickModalBtn('close');

      });

      it('Número de identificação deve aceitar caracteres especias', () => {
        let docValido = "*8A%A"

        EstadoCivil.cpfConjuge.sendKeys(Gerador.getCPF());
        EstadoCivil.setTipoIdentificacao();
        EstadoCivil.numeroIdentificacao.clear();
        EstadoCivil.numeroIdentificacao.sendKeys(docValido + protractor.Key.TAB);
        expect(EstadoCivil.numeroIdentificacao.getAttribute('value')).toBe(docValido, 'Falha ao validar campo Nr.Identificação');
      });

      it('Deve apresentar modal quando for menor de idade e Doc. de identificação for Cart. Motorista e cancelar', () => {
        let MenorIdade = '11052011';

        EstadoCivil.setCartMotorista();
        EstadoCivil.numeroIdentificacao.clear();
        EstadoCivil.numeroIdentificacao.sendKeys('123456');
        EstadoCivil.setOrgaoCartMotorista();
        EstadoCivil.dataEmissao.clear();
        EstadoCivil.dataEmissao.sendKeys(Data.dataAtual());
        EstadoCivil.dataNascimento.clear();
        EstadoCivil.dataNascimento.sendKeys(MenorIdade + protractor.Key.TAB);

        expect(Modal.getModalMsg()).toEqual('O conjuge tem que ser maior de 16 anos.', "Falha ao validar mensagem de menor idade do modal.");
        Modal.clickModalBtn('close');
      });

      it('Campos Data Emissão e Data Nascimento não devem aceitar data futura', () => {
        let dataFutura = '12/05/2055'
        EstadoCivil.dataEmissao.clear();
        EstadoCivil.dataEmissao.sendKeys(dataFutura + protractor.Key.TAB);
        EstadoCivil.dataNascimento.clear();
        EstadoCivil.dataNascimento.sendKeys(dataFutura + protractor.Key.TAB);
        Modal.clickModalBtn('close');

        expect(EstadoCivil.dataEmissao.getAttribute('value')).toEqual(Data.dataAtual(), "Falha ao validar data futura no campo 'Data Emissão'.");
        expect(EstadoCivil.dataNascimento.getAttribute('value')).toEqual('__/__/____', "Falha ao validar data futura no campo 'Data Nascimento'.");
      });

      it('Campo Valor Renda deve aceitar apenas números', () => {
        let postalInvalido = '*AA%555555'

        EstadoCivil.valorRenda.clear();
        EstadoCivil.valorRenda.sendKeys(postalInvalido);
        expect(EstadoCivil.valorRenda.getAttribute('value')).toEqual('R$ ' + '5.555,55');
      });

      it('Deve validar Comportamento ao selecionar Checkbox "Nome pai e nome mae não declarado"', () => {
        EstadoCivil.nomePaiNaoDeclarado.click();
        expect(EstadoCivil.nomePai.isEnabled()).toBe(false);
        EstadoCivil.nomeMaeNaoDeclarado.click();
        expect(EstadoCivil.nomeMae.isEnabled()).toBe(false);

        EstadoCivil.nomePaiNaoDeclarado.click();
        expect(EstadoCivil.nomePai.isEnabled()).toBe(true);
        EstadoCivil.nomeMaeNaoDeclarado.click();
        expect(EstadoCivil.nomeMae.isEnabled()).toBe(true);
      });

    });

    describe('Listagem', function () {
      beforeAll(()=>{ cpf = '' });
      beforeEach(() => {
        if (!cpf) {
          Menu.navegaParaCadastroPF()
          cpf = Cadastro.cadastraPessoaFisica(DadosCadastro);
        }
        Menu.navegaParaAlteracaoCadastral();
        let altera = new AlteracaoCadastral(cpf);
        altera.buscaCpf(cpf);
        altera.estadoCivil.click();
        EstadoCivil.setEstadoCivil('Casado');
      });

      describe('Telefone', function () {
        it('deve adicionar múltiplos telefones', () => {
          let quantidade = 3;          
          EstadoCivil.insereTelefones(quantidade);

          let tableRows = EstadoCivil.getTableRowsTelefones();
          expect(tableRows.count()).toEqual(quantidade);
          expect(EstadoCivil.form.isPresent()).toBe(false);
        });

        it('deve remover telefone', () => {
          let quantidade = 2;

          EstadoCivil.insereTelefones(quantidade);
          EstadoCivil.excluiContato('telefone');

          let rowsTelefones = EstadoCivil.getTableRowsTelefones();
          expect(rowsTelefones.count()).toEqual(quantidade - 1);
          expect(EstadoCivil.form.isPresent()).toBe(false);
        });

        it('deve editar telefone', () => {
          let quantidade = 2;
          let novoNumero = "(51) 99999-9999";
          let novoTipo = "CELULAR";

          EstadoCivil.insereTelefones(quantidade);
          EstadoCivil.editaContato('telefone');
          expect(EstadoCivil.form.isDisplayed()).toBe(true);

          EstadoCivil.numeroTelefone.clear();
          EstadoCivil.numeroTelefone.sendKeys(novoNumero);
          EstadoCivil.setTipoTelefone(novoTipo);
          EstadoCivil.botaoSalvar.click();

          let tableRows = EstadoCivil.getTableRowsTelefones();
          let labelNovoTelefone = tableRows.all(by.binding('contato.ddd + contato.numero | brPhoneNumber')).first();
          let labelNovoTipo = tableRows.all(by.binding('contato.tipoTelefone')).first();

          expect(labelNovoTelefone.getText()).toEqual(novoNumero);
          expect(labelNovoTipo.getText()).toEqual(novoTipo);
          expect(tableRows.count()).toBe(quantidade);
          expect(EstadoCivil.form.isPresent()).toBe(false);
        });
      });

      describe('E-mail', function () {

        it('deve adicionar múltiplos e-mails', () => {
          let quantidade = 3;

          EstadoCivil.insereEmails(quantidade);

          let numeroDeEmails = (EstadoCivil.getTableRowsEmails()).count();
          expect(numeroDeEmails).toBe(quantidade);
          expect(EstadoCivil.form.isPresent()).toBe(false);
        });

        it('deve remover e-mail', () => {
          let quantidade = 2;

          EstadoCivil.insereEmails(quantidade);
          EstadoCivil.excluiContato('email');

          let rowsEmails = EstadoCivil.getTableRowsEmails();
          expect(rowsEmails.count()).toBe(quantidade - 1);
          expect(EstadoCivil.form.isPresent()).toBe(false);
        });

        it('deve editar e-mail', () => {
          let quantidade = 2;
          let emailNovo = "NOVOEMAIL@TESTE.COM";
          let novoTipo = "COMERCIAL";

          EstadoCivil.insereEmails(quantidade);
          EstadoCivil.editaContato('email');
          expect(EstadoCivil.form.isDisplayed()).toBe(true);

          EstadoCivil.enderecoEmail.clear();
          EstadoCivil.enderecoEmail.sendKeys(emailNovo);
          EstadoCivil.setTipoEmail(novoTipo);
          EstadoCivil.botaoSalvar.click();

          let tableRows = EstadoCivil.getTableRowsEmails();
          let labelNovoEmail = tableRows.all(by.binding('contato.endereco')).first();
          let labelNovoTipo = tableRows.all(by.binding('contato.tipoEmail')).first();

          expect(labelNovoEmail.getText()).toEqual(emailNovo);
          expect(labelNovoTipo.getText()).toEqual(novoTipo);
          expect(tableRows.count()).toBe(quantidade);
          expect(EstadoCivil.form.isPresent()).toBe(false);
        });
      });

      describe('Geral', function () {

        it('deve mostrar mensagem de lista vazia inicialmente', () => {
          let tableRowsTelefones = EstadoCivil.getTableRowsTelefones();
          let tableRowsEmails = EstadoCivil.getTableRowsEmails();

          expect(EstadoCivil.listaVazia.isDisplayed()).toBe(true);
          expect(tableRowsTelefones.count()).toEqual(0);
          expect(tableRowsEmails.count()).toEqual(0);
        });

        it('deve remover todos os contatos', () => {
          let telefones = 2,
            emails = 2;

          EstadoCivil.insereTelefones(telefones);
          EstadoCivil.insereEmails(emails);

          for (let i = 0; i < telefones; i++) EstadoCivil.excluiContato('telefone');
          for (let i = 0; i < emails; i++) EstadoCivil.excluiContato('email');

          let contatos = 0;
          EstadoCivil.getTableRowsTelefones().count().then((count) => {
            contatos += count;
          });
          EstadoCivil.getTableRowsEmails().count().then((count) => {
            contatos += count;
          });

          expect(contatos).toBe(0);
          expect(EstadoCivil.form.isPresent()).toBe(false);
          expect(EstadoCivil.listaVazia.isDisplayed()).toBe(true);
        });
      });
    });
  });
});