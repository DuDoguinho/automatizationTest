class MatriculaVinculada {
    constructor(){
        this.sessao = element(by.css('[titulo="Matrícula Vinculada"]'));
        this.matricula = this.sessao.element(by.id('numeroMatricula'));
        this.nomeAssociado = this.sessao.element(by.model('$ctrl.vinculo.nomeAssociado'));
        this.tipoVinculo = this.sessao.element(by.model('$ctrl.vinculo.tipoVinculo'));

        this.tamanhoDosCampos = {
            matricula: 10
        }
    }
    
    acessaPagina(cpf) {
        cpf = cpf || '51404821341';
        browser.get('#/cadastro/terceiro/' + cpf + '/analise-cadastral');
    }
    
    abreSessao(){
        return this.sessao.click();
    }

    setMatricula(num) {
        this.matricula.sendKeys(num || '53309'); 
    }
    
    preencheVinculo(texto){
        this.tipoVinculo.element(by.cssContainingText('option', texto || 'Pai')).click();
    }
}

module.exports = new MatriculaVinculada();