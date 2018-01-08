class ContaTarifas{
    constructor(){
        this.secao = element(by.css('[titulo="Tarifas"]'));
        
        this.isento = this.secao.element(by.model('$ctrl.tarifas.isento'));
        this.pacoteServicos = element(by.model('$ctrl.tarifas.codigoPacote'));
        this.diaCobranca = this.secao.element(by.model('$ctrl.tarifas.diaCobranca'));
    
        this.tamanhoDosCampos = {
            diaCobranca: 2
        }
    }

    abreSecao(){
        return this.secao.click();
    }

    clicaIsento(){
        this.isento.click();
    }

    setPacoteServicos(texto){
        texto = texto || 'CESTA PF Prática';
        this.pacoteServicos.element(by.cssContainingText('option', texto)).click();
    }
}

module.exports = new ContaTarifas();