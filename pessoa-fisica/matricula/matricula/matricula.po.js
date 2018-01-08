class Matricula {
  constructor() {
    this.sessao = element(by.css('nova-sessao[titulo="Matrícula"] button'));
    this.numeroMatricula = element(by.model('$ctrl.matricula.numero'));
    this.cooperativaMatricula = element(by.model('$ctrl.matricula.cooperativa'));
    this.enderecoMatricula = element(by.model('$ctrl.matricula.enderecoPrincipal'));
    this.empostamentoMatricula = element(by.model('$ctrl.matricula.enderecoEmpostamento'));
    this.botaoSalvar = element(by.id('btnSalvar'));
  }

  abreSessao() {
    return this.sessao.click();
  }

  clicaBotaoSalvar() {
    return this.botaoSalvar.click();
  }

}

module.exports = new Matricula();
