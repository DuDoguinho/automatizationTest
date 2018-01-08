class Menu {
  constructor() {
    this.home = element(by.id('menu_home'));    
    this.cadastroPF = element(by.id('menu_cadastro_PF'));
    this.cadastroPJ = element(by.id('menu_cadastro_PJ'));
    this.alteracaoCadastral = element(by.id('menu_alteracao_cadastral'));

    this.matricula = element.all(by.css('div[title="Matrícula"]')).first();
    this.conta = element.all(by.css('div[title="Conta Corrente"]')).first();
    this.agendamentoCapital = element.all(by.css('div[title="Agendamento de Capital"]')).first();
    this.prodServicos = element.all(by.css('div[title="Produtos e Serviços"]')).first();

    this.terceiro = element.all(by.css('.add-terceiro')).first();
  }

  navegaParaHome() {
    return this.home.click();
  }

  navegaParaCadastroPJ() {
    return this.cadastroPJ.click();
  }

  navegaParaAlteracaoCadastral() {
    return this.alteracaoCadastral.click();
  }

  navegaParaCadastroPF() {
    return this.cadastroPF.click();
  }

  navegaParaConta() {
    return this.conta.click();
  }

  navegaParaAgendamentoCapital(){
    return this.agendamentoCapital.click();
  }

  navegaParaProdutosServicos(){
    return this.prodServicos.click();
  }

  verificaSeHabilitado(elem){
    if(elem.isPresent() && elem.isEnabled()){
      return true;
    }
    return false;
  }
}

module.exports = new Menu();