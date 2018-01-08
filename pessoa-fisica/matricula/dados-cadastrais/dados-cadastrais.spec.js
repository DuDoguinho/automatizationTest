let Menu = require('../../../menu/menu.po');
let Cadastro = require('../../cadastro/cadastro.po');
let Update = require('../../cadastro/alteracao-cadastral.po');
let GeraCPF = require('../../../comum/cpfCnpj');
let Matricula = require('../matricula/matricula.po');
let MatriculaDC = require('./dados-cadastrais.po');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Header = require('../../../comum/header.po');
let Estresse = require('../../../comum/estresse');
let Data = require('../../../comum/data');

let cpf = '';

describe('Matricula', () => {
  beforeEach(() => {
    Menu.navegaParaCadastroPF();
    if (cpf != null && cpf != "") {
      Cadastro.buscaCpf(cpf);
    } else {
      cpf = Cadastro.cadastraPessoaFisicaSimples(DadosCadastro);
      Menu.navegaParaCadastroPF();
      Cadastro.buscaCpf(cpf);
    }
    Menu.matricula.click();
    MatriculaDC.abreSessao();
  });

  it('Campo "Matrícula do Proponente" deve vir habilitado para preenchimento.', () => {
    expect(MatriculaDC.matriculaProponente.isEnabled()).toBe(true, "Falha ao validar se campo 'Matrícula do Proponente' está habilitado");
  });

  it('Campo "Matrícula do Proponente" só deve aceitar números e tem tamanho máximo de 10 caracteres.', () => {
    let matriculaInvalida = '*AA%19'
    let matriculaValida = '19';
    MatriculaDC.matriculaProponente.clear();
    MatriculaDC.matriculaProponente.sendKeys(matriculaInvalida + protractor.Key.TAB);

    expect(MatriculaDC.matriculaProponente.getAttribute('value')).toBe(matriculaValida, "Falha ao validar tipagem do campo Matricula Proponente.");

    MatriculaDC.matriculaProponente.clear();

    Estresse.estressarCampo(MatriculaDC.matriculaProponente, 50);
    Estresse.avaliarLength(MatriculaDC.matriculaProponente, MatriculaDC.tamanhoDosCampos.matriculaProponente);
  });

  it('Campo "Nome do Proponente" deve estar desabilitado para edições.', () => {
    expect(MatriculaDC.nomeProponente.isEnabled()).toBe(false, "Falha ao validar se campo 'Nome do Proponente' está habilitado");
  });

  it('Nome do Proponente deve ser preenchido automaticamente de acordo com a matrícula.', () => {
    let matriculaValida = '19';
    MatriculaDC.matriculaProponente.clear();
    MatriculaDC.matriculaProponente.sendKeys(matriculaValida + protractor.Key.TAB);

    expect(MatriculaDC.matriculaProponente.getAttribute('value')).toBe(matriculaValida, "Falha ao validar tipagem do campo Matricula Proponente.");
    expect(MatriculaDC.nomeProponente.getAttribute('value')).not.toBe('', "Falha ao validar campo Nome do Proponente.");
    expect(MatriculaDC.nomeProponente.getAttribute('value')).toBe('Cooperado Jose1', "Falha ao validar campo Nome do Proponente.");
  });

  it('Dropdown "Situação da Associação" deve vir com o valor "Ativo" por padrão.', () => {
    expect(MatriculaDC.situacaoAssociacao.getAttribute('value')).toBe('ATIVO', "Falha ao validar valor default do campo Situação da Associação.");
  });

  it('Campo "Data de Associação" não aceita data futura ou inválida.', () => {
    let dataInvalida = '99/99/9999'

    MatriculaDC.dataAssociacao.clear();
    MatriculaDC.dataAssociacao.sendKeys(dataInvalida);

    expect(MatriculaDC.dataAssociacao.getText()).toBe('', "Falha ao validar 'Data de Associação' inválida");

    let dataFutura = Data.dataFutura();

    MatriculaDC.dataAssociacao.clear();
    MatriculaDC.dataAssociacao.sendKeys(dataFutura + protractor.Key.TAB);

    Matricula.clicaBotaoSalvar().then(() => {
      expect(element.all(by.repeater('erro in $ctrl.mensagens')).filter(function (elem) {
        return elem.getText().then(function (text) {
          console.log(text);
          return text.includes('O campo data de associação não pode ter data superior ao dia de hoje.');
        });
      }).count()).toBe(1, "Falha ao validar campo 'Data de Associação' com data Futura.");
    });
  });

});