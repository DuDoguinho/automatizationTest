class CnpjNome {
    constructor() {
        this.sessao = element(by.css('dados-cpf-nome[cpf-nome="dadosPessoais"]'));
        this.cnpj = element(by.model('$ctrl.cpfCnpjNome.cnpj'));
        this.nomeCompleto = element(by.model('$ctrl.cpfCnpjNome.nomeCompleto'));
        this.nomeSucinto = element(by.model('$ctrl.cpfCnpjNome.nomeSucinto'));

        this.tamanhoDosCampos = {
            nomeCompleto: 65,
            nomeSucinto: 26
        }
    }

    acessaPagina(cnpj) {
        browser.get('#/cadastro/pessoa-juridica/'+cnpj.replace('.','').replace('.','').replace('/','').replace('-','')+'/dados-empresa/');
    }

    preencherCamposObrigatorios(cnpj,nomeCompleto){
        nomeCompleto = nomeCompleto || 'EmpresaFantasia para fins de teste '+cnpj;
        this.nomeCompleto.sendKeys(nomeCompleto);
        element(by.css('body')).click();
    }

    limparCamposObrigatorios(){
        this.nomeCompleto.clear();
        this.nomeSucinto.clear();
    }
}
module.exports = new CnpjNome();
