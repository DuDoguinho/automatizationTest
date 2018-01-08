class ContaTaloes{
    constructor(){
        this.secao = element(by.css('[titulo="Talões"]'));

        this.minTaloes = this.secao.element(by.model('$ctrl.talao.numeroMinimoTaloes'));
        this.minTaloesTB = this.secao.element(by.model('$ctrl.talao.numeroMinimoTaloesTb'));
        this.nrFolhasSolicAuto = this.secao.element(by.model('$ctrl.talao.numeroFolhasSolicitacaoAutomatica'));
    }

    abreSecao(){
        return this.secao.click();
    }

    setMinTaloes(texto){
        texto = texto || '2';
        return this.minTaloes.element(by.cssContainingText('option', texto)).click();
    }

    setMinTaloesTB(texto){
        texto = texto || '3';
        return this.minTaloesTB.element(by.cssContainingText('option', texto)).click();
    }
}

module.exports = new ContaTaloes();