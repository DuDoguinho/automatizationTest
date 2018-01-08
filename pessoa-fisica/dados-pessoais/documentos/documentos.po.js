class Documentos {
    constructor() {
        this.sessao = element(by.css('[titulo="Documentos"]'));
        
        this.numeroIdentificacao = element(by.model('$ctrl.documento.numeroIdentificacao'));
        this.dataEmissao = element(by.model('$ctrl.documento.dataEmissao'));
        this.dataNascimento = element(by.model('$ctrl.documento.dataNascimento'));
        this.protocoloBRSafe = element(by.model('$ctrl.documento.protocoloBRSafe'));
        

        this.tipoIdentificacao = element(by.model('$ctrl.documento.tipoIdentificacao'));
        this.ufExpedidor = element(by.model('$ctrl.documento.ufExpedidor'));
        this.orgaoExpedidor = element(by.model('$ctrl.documento.orgaoExpedidor'));
        this.sexo = element(by.model('$ctrl.documento.sexo'));
        this.uf = element(by.model('$ctrl.documento.uf'));

        this.modalidadeRepresentanteLegal = element(by.model('$ctrl.documento.modalidadeRepresentanteLegal.selected'));
        this.naturalidade = element(by.model('$ctrl.documento.naturalidade.selected'));
        this.nacionalidade = element(by.model('$ctrl.documento.nacionalidade'));

        this.tamanhoDosCampos = {
            numeroIdentificacao: 15,
            protocoloBRSafe: 12
        }        
    }

    acessaPagina(cpf) {        
        let _cpf = cpf || '51404821341'
        browser.get('#/cadastro/terceiro/'+_cpf.replace('.','').replace('.','').replace('-','')+'/dados-pessoais/');
    }

    abreSessao(){
        return this.sessao.click();
    }

    setUf(texto) {
        texto = texto !== undefined ? texto: 'RS';
        this.uf.element(by.cssContainingText('option', texto)).click();
    }

    setSexo(texto) {
        texto = texto !== undefined ? texto: 'Masculino'
        this.sexo.element(by.cssContainingText('option', texto)).click();
    }

    setUfExpedidor(texto) {
        texto = texto !== undefined ? texto: 'RS';
        this.ufExpedidor.element(by.cssContainingText('option', texto)).click();
    }

    setOrgaoExpedidor(texto) {
        texto = texto !== undefined ? texto: 'SSP';
        this.orgaoExpedidor.element(by.cssContainingText('option', texto)).click();
    }

    setTipoIdentificacao(texto) {
        texto = texto !== undefined ? texto: 'Cart. Identidade';
        return this.tipoIdentificacao.element(by.cssContainingText('option', texto)).click();
    }

    setModalidadeRepresentanteLegal(texto) {
        var modalidadeSelecionada = this.modalidadeRepresentanteLegal.element(by.css('.ui-select-search'));
        this.modalidadeRepresentanteLegal.click();
        modalidadeSelecionada.sendKeys(texto);
        element.all(by.css('.ui-select-choices-row-inner span')).first().click();
    }

    setNacionalidade(texto) {
        var nacionalidadeSelecionada = this.nacionalidade.element(by.css('.ui-select-search'));
        this.nacionalidade.click();
        nacionalidadeSelecionada.sendKeys(texto);        
        element.all(by.css('.ui-select-choices-row-inner span')).first().click();
    }

    setNaturalidade(texto) {
        var naturalidadeSelecionada = this.naturalidade.element(by.css('.ui-select-search'));
        this.naturalidade.click();
        naturalidadeSelecionada.sendKeys(texto);
        element.all(by.repeater('naturalidade in $select.items')).first().click();
    }


    preencheDocumentos(tipoId, numId, orgExp, ufExp, dataEmissao, dataNasc, protocoloBRSAFE, uf, sexo, modRepresentanteLegal, nacionalidade, naturalidade){
        this.setTipoIdentificacao(tipoId || "Cart. Identidade");
        this.numeroIdentificacao.sendKeys(numId || "1020304050");        
        this.setSexo(sexo || "M");
        this.setOrgaoExpedidor(orgExp || "SSP");
        this.setUfExpedidor(ufExp || "RS");
        this.dataEmissao.sendKeys(dataEmissao || "10/10/2010");
        this.dataNascimento.sendKeys(dataNasc || "03/12/1985");
        this.protocoloBRSafe.sendKeys(protocoloBRSAFE || "55555");        
        this.setModalidadeRepresentanteLegal(modRepresentanteLegal || "Nenhum");
        this.setNacionalidade(nacionalidade || "brasil");
        this.setUf(uf || "RS");
        this.setNaturalidade(naturalidade || "porto alegre");
    }


}


module.exports = new Documentos();
