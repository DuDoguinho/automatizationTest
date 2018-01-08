class Sociedade{
    constructor(){
        this.secao = element(by.css('nova-sessao[titulo="Sociedade"]'));
        
        this.tipoSociedade = element(by.id('tipo-sociedade'));
        this.tipoControle = element(by.id('tipo-controle'));
        this.tributacao = element(by.id('tipo-tributacao'));
        this.numeroFiliais = element(by.id('numero-filiais'));
        this.capitalAberto = element(by.id('capital-aberto'));
        
        this.tamanhoDosCampos = {
            numeroFiliais: 3
        }
    }

    abreSecao(){
        return this.secao.click();
    }

    setTipoSociedade(texto){
        texto = texto || 'Sociedade Simples';
        this.tipoSociedade.element(by.cssContainingText('option', texto)).click();
    }

    setTipoControle(texto){
        texto = texto || 'Privado';
        this.tipoControle.element(by.cssContainingText('option', texto)).click();
    }

    setTipoTributacao(texto){
        texto = texto || 'Lucro Real';
        this.tributacao.element(by.cssContainingText('option', texto)).click();
    }

    clicaCapitalAberto(){
        return this.capitalAberto.click();
    }
}

module.exports = new Sociedade();
