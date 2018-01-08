class ResumoPj{
    constructor(){
        this.dadosEmpresa = element(by.css('sessao-resumo[titulo="Dados da Empresa"]'));

        this.cnpj = element(by.model('$ctrl.cpfCnpjNome.cnpj'));
        this.nomeCompleto = element(by.model('$ctrl.cpfCnpjNome.nomeCompleto'));
        this.nomeSucinto = element(by.model('$ctrl.cpfCnpjNome.nomeSucinto'));
        this.secaoEnderecos = this.dadosEmpresa.element(by.css('nova-sessao[titulo="Endereços"]'));
        this.bySecaoEnderecos = by.css('[titulo="Endereços"]');
        this.secaoContatos = this.dadosEmpresa.element(by.css('nova-sessao[titulo="Contatos"]'));
        this.bySecaoContatos = by.css('[titulo="Contatos"]');
        this.secaoDadosRegistro = this.dadosEmpresa.element(by.css('nova-sessao[titulo="Dados do Registro"]'));
        this.bySecaoDadosRegistro = by.css('["Dados do Registro"]');
    }
}

module.exports = new ResumoPj();