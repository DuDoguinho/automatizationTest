class ContaVinculadaDomicilio {
    constructor(){
        this.sessao = element(by.css('[titulo="Conta Vinculada - Domicílio"]'));

        this.travarDomicilioBancario = this.sessao.element(by.model('$ctrl.contaVinculadaDomicilio.tipoTravaDomicilioBancario'));
        this.transfAutomatica = this.sessao.element(by.model('$ctrl.contaVinculadaDomicilio.transferenciaAutomaticaCcCv'));
        this.percentAntecipacao = this.sessao.element(by.model('$ctrl.contaVinculadaDomicilio.percentualAntecipacao'));
        this.dataVigenciaVisa = this.sessao.element(by.model('$ctrl.contaVinculadaDomicilio.dataVigenciaTravaVisa'));
        this.dataVigenciaMaster = this.sessao.element(by.model('$ctrl.contaVinculadaDomicilio.dataVigenciaTravaMaster'));
    
        this.tamanhoDosCampos = {
            percentualAntecipacao: 4
        }
    }

    abreSessao(){
        return this.sessao.click();
    }

    setTravarDomicilio(texto){
        texto = texto || 'Não';
        this.travarDomicilioBancario.element(by.cssContainingText('option', texto)).click();
    }

    setTravarVisa(texto){
        texto = texto || 'Visa';
        this.travarDomicilioBancario.element(by.cssContainingText('option', texto)).click();
    }

    setTravarMaster(texto){
        texto = texto || 'Master';
        this.travarDomicilioBancario.element(by.cssContainingText('option', texto)).click();
    }

    setTravarAmbas(texto){
        texto = texto || 'Ambas';
        this.travarDomicilioBancario.element(by.cssContainingText('option', texto)).click();
    }

    clicaTransfAutomatica(){
        this.transfAutomatica.click();
    }

    preenchePercentAntecipacao(){
        this.percentAntecipacao.sendKeys('23');
    }
}

module.exports = new ContaVinculadaDomicilio();