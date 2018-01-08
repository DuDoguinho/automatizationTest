class DadosRegistroPj{
    constructor(){
        this.secao = element(by.css('nova-sessao[titulo="Dados do Registro"]'));
        this.numeroRegistro = element(by.model('$ctrl.dadosRegistro.numeroRegistro'));
        this.dataRegistro = element(by.model('$ctrl.dadosRegistro.dataRegistro'));
        this.numeroArquivo = element(by.model('$ctrl.dadosRegistro.numeroArquivo'));
        this.dataArquivo = element(by.model('$ctrl.dadosRegistro.dataArquivo'));
        this.dataConstituicao = element(by.model('$ctrl.dadosRegistro.dataConstituicao'));
        this.inscricaoMunicipal = element(by.model('$ctrl.dadosRegistro.inscricaoMunicipal'));
        this.inscricaoEstadual = element(by.model('$ctrl.dadosRegistro.inscricaoEstadual'));
    
        this.tamanhoDosCampos = {
            numeroRegistro: 15,
            numeroArquivo: 20,
            inscricaoMunicipal: 12,
            inscricaoEstadual: 12
        }
    }

    abreSecao(){
        return this.secao.click();
    }
}

module.exports = new DadosRegistroPj();