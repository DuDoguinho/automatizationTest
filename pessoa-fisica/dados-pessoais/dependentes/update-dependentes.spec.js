let Cadastro = require('../../cadastro/cadastro.po');
let Dependente = require('./dependentes.po')
let Menu = require('../../../menu/menu.po');
let AlteracaoCadastral = require('../../cadastro/alteracao-cadastral.po');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Gerador = require('../../../comum/cpfCnpj');
let DadosCpfNome = require('../dados-cpf-nome/dados-cpf-nome.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Modal = require('../../../comum/modal');
let Data = require('../../../comum/data');

let cpf = '';
var altera;

let dependentes = [{
  cpf: Gerador.getCPF(),
  nome: "Dependente Novo Update Mequetrefe 1",
  dataNasc: "10/10/2010",
  tipo: "21/22 - Filho(a)",
  valorRenda: "10.000,00",
  valorPensao: "3.100,00"
}];

let dependentesToUpdate = [{
  cpf: Gerador.getCPF(),
  nome: "Dependente Editado Mequetrefe",
  dataNasc: "07/07/2015",
  tipo: "41 - Menor Pobre",
  valorRenda: "5.555,55",
  valorPensao: "3.333,00"
}];

describe('Update Dependentes', () => {
  beforeAll(() => {
    cpf = '';
    if (!cpf) {
      Menu.navegaParaCadastroPF();
      cpf = Cadastro.cadastraPessoaFisica(DadosCadastro);      
    }
    altera = new AlteracaoCadastral(cpf);    
  });

  beforeEach(() => {
    Menu.navegaParaHome();
    Menu.navegaParaAlteracaoCadastral();
    altera.buscaCpf(cpf);
    altera.dependentes.click();
  });

  it('Valida obrigatoriedade dos campos em Update', () => {
    Dependente.clicaNovo();
    Dependente.clicaSalvar();

    expect(Mensagem.obrigatoriedade(Dependente.cpf)).toBeTruthy('Falha ao validar campo cpf');
    expect(Mensagem.obrigatoriedade(Dependente.nomeCompleto)).toBeTruthy('Falha ao validar campo Nome Completo');
    expect(Mensagem.obrigatoriedade(Dependente.dataNascimento)).toBeTruthy('Falha ao validar campo Data Nascimento');
    expect(Mensagem.obrigatoriedade(Dependente.tipoDependencia)).toBeTruthy('Falha ao validar campo Tipo Dependêcia');
  });

  it('Deve validar tamanho máximo dos campos da seção de Update', () => {
    Dependente.clicaNovo();

    Estresse.estressarCampo(Dependente.nomeCompleto, 100);
    Estresse.estressarCampo(Dependente.valorRenda, 100);
    Estresse.estressarCampo(Dependente.valorPensao, 100);

    Estresse.avaliarLength(Dependente.nomeCompleto, Dependente.tamanhoDosCampos.nomeCompleto);
    Estresse.avaliarLengthValor(Dependente.valorRenda);
    Estresse.avaliarLengthValor(Dependente.valorPensao);  
  });

  it('Campo "Data Nascimento" não deve aceitar data inválida nem futura', () => {
    let dataInvalida = '99/99/9999';
    Dependente.clicaNovo();

    Dependente.dataNascimento.clear();
    Dependente.dataNascimento.sendKeys(dataInvalida + protractor.Key.TAB);
    expect(Mensagem.obrigatoriedade(Dependente.dataNascimento)).toBeTruthy('Falha ao validar campo Data Nascimento');

    Dependente.dataNascimento.clear();
    Dependente.dataNascimento.sendKeys(Data.dataFutura() + protractor.Key.TAB);
    expect(Dependente.dataNascimento.getAttribute('value')).toBe(Data.dataAtual(), 'Falha ao validar campo data');
  });

  it('Insere novo dependente e verifica se consiste após atualizar cadastro.', () => {
    Cadastro.insereDependentes(dependentes);

    expect(element.all(Dependente.byColunaCpf).last().getText()).toBe(dependentes[0].cpf, "Falha ao comparar CPF de Dependentes");
    expect(element.all(Dependente.byColunaNome).last().getText()).toBe(dependentes[0].nome.toUpperCase(), "Falha ao comparar Nome de Dependentes");
    expect(element.all(Dependente.byColunaNascimento).last().getText()).toBe(dependentes[0].dataNasc, "Falha ao comparar Nascimento de Dependentes");

    Cadastro.botaoAtualizarCadastro.click();

    expect(Cadastro.msgs_sucesso.isDisplayed()).toBe(true, "Falha ao verificar mensagem de sucesso ao Atualizar Cadastro.");

    Menu.navegaParaHome();
    Menu.navegaParaAlteracaoCadastral();
    altera.buscaCpf(cpf);
    altera.dependentes.click();

    expect(element.all(Dependente.byColunaCpf).last().getText()).toBe(dependentes[0].cpf, "Falha ao comparar CPF de Dependentes");
    expect(element.all(Dependente.byColunaNome).last().getText()).toBe(dependentes[0].nome.toUpperCase(), "Falha ao comparar Nome de Dependentes");
    expect(element.all(Dependente.byColunaNascimento).last().getText()).toBe(dependentes[0].dataNasc, "Falha ao comparar Nascimento de Dependentes");
  });

  it('Remove dependente e verifica se foi removido após atualizar cadastro.', () => {
    Dependente.getTableRows().then((elems) => {
      let total = elems.length;
      Dependente.excluir();
      Dependente.getTableRows().then((elems2) => {
        expect(elems2.length).toBe(total - 1, "Falha ao validar exclusão de Dependente.");
        let finalTotal = elems2.length;
        Cadastro.botaoAtualizarCadastro.click();
        expect(Cadastro.msgs_sucesso.isDisplayed()).toBe(true, "Falha ao verificar mensagem de sucesso ao Atualizar Cadastro.");

        Menu.navegaParaHome();
        Menu.navegaParaAlteracaoCadastral();
        altera.buscaCpf(cpf);
        altera.dependentes.click();

        Dependente.getTableRows().then((elems3) => {
          expect(elems3.length).toBe(finalTotal, "Falha ao validar exclusão de Dependente.");
        });
      });
    });
  });

  it('Edita dependente cadastrado e verifica se os dados atualizados persistem após Atualizar Cadastro.', () => {
    Dependente.editar(dependentesToUpdate[0]);
    Cadastro.atualizaCadastro();
    expect(Cadastro.msgs_sucesso.isDisplayed()).toBe(true, "Falha ao verificar mensagem de sucesso ao Atualizar Cadastro.");

    Menu.navegaParaHome();
    Menu.navegaParaAlteracaoCadastral();
    altera.buscaCpf(cpf);
    altera.dependentes.click();

    expect(element.all(Dependente.byColunaCpf).first().getText()).toBe(dependentesToUpdate[0].cpf, "Falha ao verificar CPF de dependente editado na atualização cadastral.");
    expect(element.all(Dependente.byColunaNome).first().getText()).toBe(dependentesToUpdate[0].nome.toUpperCase(), "Falha ao verificar Nome de dependente editado na atualização cadastral.");
    expect(element.all(Dependente.byColunaNascimento).first().getText()).toBe(dependentesToUpdate[0].dataNasc, "Falha ao verificar Data de Nascimento de dependente editado na atualização cadastral.");

    let tableRows = Dependente.getTableRows(),
      botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();

    botaoEditar.click();

    expect(Dependente.cpf.getAttribute('value')).toBe(dependentesToUpdate[0].cpf, "Falha ao verificar CPF de dependente editado na atualização cadastral.");
    expect(Dependente.nomeCompleto.getAttribute('value')).toBe(dependentesToUpdate[0].nome.toUpperCase(), "Falha ao verificar Nome de dependente editado na atualização cadastral.");
    expect(Dependente.dataNascimento.getAttribute('value')).toBe(dependentesToUpdate[0].dataNasc, "Falha ao verificar Data de Nascimento de dependente editado na atualização cadastral.");
    expect(Dependente.tipoDependencia.element(by.css('[selected="selected"]')).getText()).toBe(dependentesToUpdate[0].tipo, "Falha ao verificar Tipo de Dependência de dependente editado na atualização cadastral.");
    expect(Dependente.valorRenda.getAttribute('value')).toBe("R$ "+dependentesToUpdate[0].valorRenda, "Falha ao verificar Valor Renda de dependente editado na atualização cadastral.");
    expect(Dependente.valorPensao.getAttribute('value')).toBe('', "Falha ao verificar Valor Pensão de dependente editado na atualização cadastral.");
  });
});