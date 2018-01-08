class GestaoContaEspelho {
  constructor() {
    this.sessao = element(by.css('[titulo="Gestão de Conta Espelho"]'));
    
    this.situacao = this.sessao.element(by.model('$ctrl.contaEspelho.situacao'));
    this.pacoteTarifasBB = this.sessao.element(by.model('$ctrl.contaEspelho.pacoteTarifas'));
    this.tpCalcDefLimite = this.sessao.element(by.model('$ctrl.contaEspelho.tipoCalculoLimite'));
    this.valorLimite = this.sessao.element(by.model('$ctrl.contaEspelho.valorLimite'));
    this.saldoMinimo = this.sessao.element(by.model('$ctrl.contaEspelho.saldoMinimo'));
    this.saldoMaximo = this.sessao.element(by.model('$ctrl.contaEspelho.saldoMaximo'));
    this.endCorrespContaIntBB = this.sessao.element(by.model('$ctrl.contaEspelho.enderecoCorrespondencia'));
  }

  abreSessao(){
    return this.sessao.click();
  }
  
  setSituacao(texto){
    texto = texto || 'Livre';
    return this.situacao.element(by.cssContainingText('option', texto)).click();
  }

  setPacoteTarifas(texto){
    texto = texto || 'Modalidade 110';
    return this.pacoteTarifasBB.element(by.cssContainingText('option', texto)).click();
  }

  setTpCalculoDefLimite(texto){
    texto = texto || 'Padrao';
    return this.tpCalcDefLimite.element(by.cssContainingText('option', texto)).click();
  }

}

module.exports = new GestaoContaEspelho();