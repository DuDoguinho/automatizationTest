class CpfNome {
    constructor() {
        this.sessao = element(by.css('dados-cpf-nome[cpf-nome="dadosPessoais"]'));
        this.cpf = element(by.model('$ctrl.cpfCnpjNome.cpf'));
        this.nomeCompleto = element(by.model('$ctrl.cpfCnpjNome.nomeCompleto'));
        this.nomeSucinto = element(by.model('$ctrl.cpfCnpjNome.nomeSucinto'));

        this.tamanhoDosCampos = {
            nomeCompleto: 65,
            nomeSucinto: 26
        }
    }

    acessaPagina() {
        browser.get('#/cadastro/terceiro/51404821341/dados-pessoais/');
    }

    preencherCamposObrigatorios(nomeCompleto){
        nomeCompleto = nomeCompleto || 'Carlos Antunes';
        this.nomeCompleto.sendKeys(nomeCompleto);
        element(by.css('body')).click();
    }

    limparCamposObrigatorios(){
        this.nomeCompleto.clear();
        this.nomeSucinto.clear();
    }
}
module.exports = new CpfNome();
