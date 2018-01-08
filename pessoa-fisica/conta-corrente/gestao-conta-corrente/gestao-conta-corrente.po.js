class GestaoContaCorrente {
    constructor() {
        this.sessao = element(by.css('[titulo="Gestão de Conta Corrente"]'));

        this.compePropria = this.sessao.element(by.model('$ctrl.contaCorrente.compePropria'));
        this.repetirNrMatricula = this.sessao.element(by.model('$ctrl.contaCorrente.repetirNumeroMatricula'));
        this.numeroConta = this.sessao.element(by.model('$ctrl.contaCorrente.numeroConta'));
        this.tipoConta = this.sessao.element(by.model('$ctrl.contaCorrente.tipo'));
        this.modalidade = this.sessao.element(by.model('$ctrl.contaCorrente.modalidade'));
        this.centralizaSaldos = this.sessao.element(by.model('$ctrl.contaCorrente.centralizaSaldo'));
        this.contatoDudoguinho = this.sessao.element(by.model('$ctrl.contaCorrente.gerenteConta'));
        this.clienteDesde = this.sessao.element(by.model('$ctrl.contaCorrente.clienteDesde'));
        this.assinatura = this.sessao.element(by.model('$ctrl.contaCorrente.assinatura'));
        this.cpmf = this.sessao.element(by.model('$ctrl.contaCorrente.cpmf'));
        this.nomeIdentificador = this.sessao.element(by.model('$ctrl.contaCorrente.nomeIdentificador'));
        this.situacao = this.sessao.element(by.model('$ctrl.contaCorrente.situacao'));
        this.enderecoEmpostamento = this.sessao.element(by.model('$ctrl.contaCorrente.enderecoId'));

        this.btnSalvar = element(by.id('btnSalvar'));

        this.tamanhoDosCampos = {
            nomeIdentificador: 25
        }
    }

    abreSessao(){
        return this.sessao.click();
    }

    clicaSalvar(){
        return this.btnSalvar.click();
    }

    preencheContaCorrente(){
        this.setTipoConta();
        this.setModalidade();
        this.setContatoDudoguinho();
        this.setAssinatura();
        this.setCpmf();
        this.setSituacao();
        this.setEmpostamento();
    }

    setTipoConta(texto) {
        texto = texto || 'Conta Corrente';
        this.tipoConta.element(by.cssContainingText('option', texto)).click();
    }

    setModalidade(texto){
        texto = texto || 'Individual';
        this.modalidade.element(by.cssContainingText('option', texto)).click();
    }

    setContatoDudoguinho(texto){
        texto = texto || 'ADRIANA';
        this.contatoDudoguinho.element(by.cssContainingText('option', texto)).click();
    }

    setAssinatura(texto){
        texto = texto || 'Não Solidária';
        this.assinatura.element(by.cssContainingText('option', texto)).click();
    }

    setCpmf(texto){
        texto = texto || 'Isento';
        this.cpmf.element(by.cssContainingText('option', texto)).click();
    }

    setSituacao(texto){
        texto = texto || 'Livre'
        this.situacao.element(by.cssContainingText('option', texto)).click();
    }

    setEmpostamento(texto){
        texto = texto || 'LOGRADOURO, 123, CASA, BAIRRO, CEP - 96745000';
        this.enderecoEmpostamento.element(by.cssContainingText('option', texto)).click();
    }
}

module.exports = new GestaoContaCorrente();