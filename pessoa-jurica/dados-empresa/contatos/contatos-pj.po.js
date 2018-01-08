class ContatosPj{
    constructor(){
        this.secao = element(by.css('nova-sessao[titulo="Contatos"]'));
        this.tipoContato = element(by.model('$ctrl.tipoSelecionado'));
        
        this.tipoTelefone = element(by.model('$ctrl.telefone.tipoTelefone'));
        this.numeroTelefone = element(by.model('$ctrl.telefone.numero'));
        this.observacoesTelefone = element(by.model('$ctrl.telefone.observacao'));
        this.tipoEmail = element(by.model('$ctrl.contato.tipoEmail'));
        this.email = element(by.model('$ctrl.contato.endereco'));
        this.observacoesEmail = element(by.model('$ctrl.contato.observacao'));

        this.botaoNovo = element(by.id('empresanovoContato'));
        this.botaoSalvar = element(by.id('empresasalvarContato'));
        this.botaoCancelar = element(by.id('empresacancelarContato'));
        
        this.byColunaTipoTelefone = by.binding('contato.tipoTelefone');
        this.byColunaContatoTelefone = by.binding('contato.ddd + contato.numero | brPhoneNumber');
        this.byColunaTipoEmail = by.binding('contato.tipoEmail');
        this.byColunaContatoEmail = by.binding('contato.endereco');
        this.byColunaObservacoes = by.binding('contato.observacao');

        this.listaVazia = element(by.css('lista-contato>div.listaVazia'));

        this.tamanhoDosCampos = {
            email: 60,
            observacoesTelefone: 40,
            observacoesEmail: 255
        }
    }

    acessaPagina(cnpj){
        browser.get('#/cadastro/pessoa-juridica/'+cnpj.replace('.','').replace('.','').replace('/','').replace('-','')+'/dados-empresa/');
    }
    
    abreSecao(){
        this.secao.click();
    }

    clicaNovo(){
        this.botaoNovo.click();
    }

    clicaSalvar(){
        this.botaoSalvar.click();
    }

    setTipoContato(texto){
        texto = texto || 'E-mail';
        return element(by.cssContainingText('option', texto)).click();
    }
    
    setTipoTelefone(texto){
        texto = texto || 'RESIDENCIAL';
        return element(by.cssContainingText('option', texto)).click();
    }

    setTipoEmail(texto){
        texto = texto || 'PESSOAL';
        return element(by.cssContainingText('option', texto)).click();
    }

    preencheCamposObrigatoriosTelefone(){
        this.setTipoContato('Telefone');
        this.setTipoTelefone();
        this.numeroTelefone.sendKeys('5199999999');
        this.observacoesTelefone.sendKeys('obs telefone');
    }

    preencheCamposObrigatoriosEmail(){
        this.setTipoContato();
        this.setTipoEmail();
        this.email.sendKeys('teste@gmail.com');
        this.observacoesEmail.sendKeys('obs email');
    }

    getTableRowsTelefone() {
        return element.all(by.repeater('(index, contato) in $ctrl.contatos.telefones'));
    }

    getTableRowsEmail() {
        return element.all(by.repeater('(index, contato) in $ctrl.contatos.emails'));
    }
}

module.exports = new ContatosPj();