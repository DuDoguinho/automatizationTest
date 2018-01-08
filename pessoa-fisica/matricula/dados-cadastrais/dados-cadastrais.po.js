class DadosCadastrais {
  constructor() {    
    this.sessao = element(by.css('nova-sessao[titulo="Dados Cadastrais"] button'));    
    
    this.matriculaProponente = element(by.id('matriculaProponente'));
    this.nomeProponente = element(by.id('nomeProponente'));
    this.situacaoAssociacao = element(by.model('$ctrl.dadosCadastrais.situacaoAssociacao'));
    this.dataAssociacao = element(by.model('$ctrl.dadosCadastrais.dataAssociacao'));

    this.tamanhoDosCampos = {
      matriculaProponente: 10
    }
  }

  abreSessao() {
    return this.sessao.click();
  }  
}

module.exports = new DadosCadastrais();
