let RadioButton = require('../../../widgets/radio-button')

class PessoaReportavelFatca{
    constructor(){
        this.sessao = element(by.css('[titulo="Pessoa Reportável FATCA"]'));
        this.possuiAutorizacaoResidencia = '$ctrl.pessoaResponsavel.possuiAutorizacaoResidenciaValidaExterior';
        this.possuiOutroDomicilio = '$ctrl.pessoaResponsavel.possuiDomicilioFiscalAlemDeclarado';
        this.possuiGreencard = '$ctrl.pessoaResponsavel.possuiGreenCardEParticipaEmpresaCapitalSuperior10PorCento';
        this.consideradoUsPerson = '$ctrl.pessoaResponsavel.usPerson';
    }

    acessaPagina(cpf) {
        cpf = cpf || '51404821341';
        browser.get('#/cadastro/terceiro/' + cpf + '/analise-cadastral');
    }
    
    abreSessao(){
       return this.sessao.click();
    }
    
    getRadioSelected(ngModel){
        let radio = this.sessao.element(by.model(ngModel));
        return father.element(by.css('.ng-valid-parse'));
    }

    setarPossuiAutorizacaoResidencia(value){
        return RadioButton.clicaRadio(this.possuiAutorizacaoResidencia,value);
    }

    setarPossuiOutroDomicilio(value){
        return RadioButton.clicaRadio(this.possuiOutroDomicilio,value);
    }

    setarPossuiGreencard(value){
        return RadioButton.clicaRadio(this.possuiGreencard,value);
    }

    setarConsideradoUsPerson(value){
        return RadioButton.clicaRadio(this.consideradoUsPerson,value);
    }

    getPossuiAutorizacaoResidencia(){
        let radio = this.getRadioSelected(this.possuiAutorizacaoResidencia);
        radio.getText().then((txt)=>{
            console.log(txt);
        });
    }
}

module.exports = new PessoaReportavelFatca();
