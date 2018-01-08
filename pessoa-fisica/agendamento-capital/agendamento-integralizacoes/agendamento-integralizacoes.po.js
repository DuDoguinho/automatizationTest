class AgendamentoIntegralizacoes {
  constructor() {
    this.contaDebito = element(by.model('$ctrl.agendamentoIntegralizacoes.contaDebito'));
    this.nomeCorrentista = element(by.css('span.nome-do-correntista'));
    this.renovacaoAutomatica = element(by.model('$ctrl.agendamentoIntegralizacoes.renovacaoAutomatica'));
    this.lancIntegralizacao = element(by.model('$ctrl.agendamentoIntegralizacoes.tipoLancamentoCapital'));
    this.capitalIntegralizar = element(by.model('$ctrl.agendamentoIntegralizacoes.capitalAIntegralizar'));
    this.valorEntrada = element(by.model('$ctrl.agendamentoIntegralizacoes.valorEntrada'));
    this.qtdParcelas = element(by.model('$ctrl.agendamentoIntegralizacoes.quantidadeParcelas'));
    this.valorParcelaMensal = element(by.model('$ctrl.agendamentoIntegralizacoes.valorParcela'));
    this.dataEntrada = element(by.model('$ctrl.agendamentoIntegralizacoes.dataEntrada'));
    this.tipoAgendamento = element(by.model('$ctrl.agendamentoIntegralizacoes.tipoAgendamento'));
    this.vencParcelaAnoMes = element(by.model('$ctrl.agendamentoIntegralizacoes.anoMesPrimeiroVencimento'));
    this.vencParcelaDia = element(by.model('$ctrl.agendamentoIntegralizacoes.diaPrimeiroVencimento'));
    this.tipoCobranca = element(by.model('$ctrl.agendamentoIntegralizacoes.formaRecebimento'));
    this.verificarSaldo = element(by.model('$ctrl.agendamentoIntegralizacoes.verificaSaldo'));

    this.msgs_sucesso = element(by.css('mensagem-sucesso'));

    this.btnSalvar = element(by.id('btnSalvar'));

    this.tamanhoDosCampos = {
      contaDebito: 10,
      capitalIntegralizar: 13,
      valorEntrada: 13,
      qtdParcelas: 3,
      valorParcelaMensal: 13
    }
  }

  setLancIntegralizacao(texto){
    texto = texto || 'IMPLANTAÇÃO DE SALDO';
    return this.setComboValue(this.lancIntegralizacao, texto);
  }

  setTipoAgendamento(texto){
    texto = texto || 'fixo';
    return this.setComboValue(this.tipoAgendamento, texto);
  }

  setTipoCobranca(texto){
    texto = texto || 'Débito em Conta';
    return this.setComboValue(this.tipoCobranca, texto);
  }

  setComboValue(elem,texto){    
    return elem.all(by.cssContainingText('option', texto)).first().click();
  }
}

module.exports = new AgendamentoIntegralizacoes();