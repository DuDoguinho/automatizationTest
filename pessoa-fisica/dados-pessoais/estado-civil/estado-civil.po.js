let Modal = require('../../../comum/modal');
let Data = require('../../../comum/data');
let Gerador = require('../../../comum/cpfCnpj');

class EstadoCivil {
    constructor() {
        this.sessao = element(by.css('[titulo="Estado civil"]'));

        this.estadoCivil = this.sessao.element(by.model('$ctrl.estadoCivil'));
        this.regimeCasamento = this.sessao.element(by.model('$ctrl.regimeCasamento'));
        this.fieldset = this.sessao.element(by.css('fieldset.ng-scope'));
        this.cpfConjuge = this.sessao.element(by.css('dados-cpf[cpf="$ctrl.conjuge.cpf"]')).element(by.model('$ctrl.cpf'));

        this.nomeCompleto = element(by.model('$ctrl.conjuge.nomeCompleto'));
        this.dataNascimento = element(by.model('$ctrl.conjuge.dataNascimento'));
        this.tipoIdentificacao = element(by.model('$ctrl.conjuge.tipoIdentificacao'));
        this.numeroIdentificacao = element(by.model('$ctrl.conjuge.numeroIdentificacao'));
        this.orgaoExpedidor = element(by.model('$ctrl.conjuge.orgaoExpedidor'));
        this.ufExpedidor = element(by.model('$ctrl.conjuge.ufExpedidor'));
        this.dataEmissao = element(by.model('$ctrl.conjuge.dataEmissao'));
        this.profissao = element(by.model('$ctrl.conjuge.profissao'));
        this.empresa = element(by.model('$ctrl.conjuge.empresa'));
        this.valorRenda = element(by.model('$ctrl.conjuge.valorRenda'));

        // Filiação
        this.nomePai = this.sessao.element(by.model('$ctrl.filiacao.nomePai'));
        this.nomeMae = this.sessao.element(by.model('$ctrl.filiacao.nomeMae'));
        this.nomePaiNaoDeclarado = this.sessao.element(by.model('$ctrl.filiacao.nomePaiNaoDeclarado'));
        this.nomeMaeNaoDeclarado = this.sessao.element(by.model('$ctrl.filiacao.nomeMaeNaoDeclarado'));

        // Contatos
        this.form = this.sessao.element(by.css('form[name="formContatos"]'));
        this.tipoSelecionado = element(by.id('estadoCivilTipoContato'));

        this.tipoTelefone = this.sessao.element(by.model('$ctrl.telefone.tipoTelefone'));
        this.numeroTelefone = this.sessao.element(by.model('$ctrl.telefone.numero'));
        this.obsTelefone = this.sessao.element(by.model('$ctrl.telefone.observacao'));

        this.tipoEmail = this.sessao.element(by.model('$ctrl.contato.tipoEmail'));
        this.enderecoEmail = this.sessao.element(by.model('$ctrl.contato.endereco'));
        this.obsEmail = this.sessao.element(by.model('$ctrl.contato.observacao'));

        this.botaoNovo = element(by.id('estadoCivilnovoContato'));
        this.botaoSalvar = this.sessao.element(by.id('estadoCivilsalvarContato'));
        this.botaoCancelar = this.sessao.element(by.id('estadoCivilcancelarContato'));
        this.listaVazia = this.sessao.element(by.css('lista-contato>div.listaVazia'));
        this.botaoAtualizarCadastro = element(by.css('button[ng-click="$ctrl.update($ctrl.model)"]'));

        this.byColunaTipoContato = by.binding('contato.tipoTelefone');
        this.byColunaNrContao = by.binding('contato.ddd + contato.numero | brPhoneNumber');
        this.byColunaObservacao = by.binding('contato.observacao');

        this.tamanhoDosCampos = {
            nomeCompleto: 65,
            numeroIdentificacao: 12,
            empresa: 30,
            valorRenda: 21,
            observacaoTelefone: 40,
            campoEmail: 60,
            observacaoEmail: 255,
            tamanhoEmail: 60,
            filiacao: {
                nomePai: 65,
                nomeMae: 65
            }
        }
    }

    acessaPagina(cpf_) {
        let cpf = cpf_ || '51404821341';
        browser.get('#/cadastro/terceiro/'+cpf.replace('.','').replace('.','').replace('-','')+'/dados-pessoais/');
    }

    abreSessao(){
        return this.sessao.click();
    }

    setCartMotorista(texto) {
        texto = texto || 'Cart. Motorista';
        this.tipoIdentificacao.element(by.cssContainingText('option', texto)).click();
    }

    setOrgaoCartMotorista(texto){
        texto = texto || 'DETRAN';
        this.orgaoExpedidor.element(by.cssContainingText('option', texto)).click();
    }

    setEstadoCivil(texto) {
        texto = texto || 'Casado';
        this.estadoCivil.element(by.cssContainingText('option', texto)).click();
    }

    setRegimeCasamento(texto) {
        texto = texto || 'Comunhão de Bens';
        this.regimeCasamento.element(by.cssContainingText('option', texto)).click();
    }

    checkFormDisplay(bool){
        //expect(this.fieldset.isPresent()).toBe(bool, "Falha ao localizar element Fieldset");
        if (bool){
            expect(this.regimeCasamento.isEnabled()).toBe(bool, "Falha ao localizar elemento Regime de Casamento");
            expect(this.cpfConjuge.isEnabled()).toBe(bool, "Falha ao localizar elemento CPF do cônjuge");
            expect(this.nomeCompleto.isEnabled()).toBe(bool, "Falha ao localizar elemento Nome completo do cônjuge");
            expect(this.dataNascimento.isEnabled()).toBe(bool, "Falha ao localizar elemento Data de Nascimento do cônjuge");
            expect(this.tipoIdentificacao.isEnabled()).toBe(bool, "Falha ao localizar elemento Tipo de Identificação do cônjuge");
            expect(this.numeroIdentificacao.isEnabled()).toBe(bool, "Falha ao localizar elemento Número de Identificação do cônjuge");
            expect(this.orgaoExpedidor.isDisplayed()).toBe(bool, "Falha ao localizar elemento Órgão Expedidor do cônjuge");
            expect(this.ufExpedidor.isEnabled()).toBe(bool, "Falha ao localizar elemento UF Expedidor do cônjuge");
            expect(this.dataEmissao.isEnabled()).toBe(bool, "Falha ao localizar elemento Data de Emissão do cônjuge");
            expect(this.profissao.isEnabled()).toBe(bool, "Falha ao localizar elemento Profissão do cônjuge");
            expect(this.empresa.isEnabled()).toBe(bool, "Falha ao localizar elemento Empresa do cônjuge");
            expect(this.valorRenda.isEnabled()).toBe(bool, "Falha ao localizar elemento Valor da Renda do cônjuge");
            expect(this.nomePai.isEnabled()).toBe(bool, "Falha ao localizar elemento Nome do Pai do cônjuge");
            expect(this.nomePaiNaoDeclarado.isEnabled()).toBe(bool, "Falha ao localizar checkbox Nome do Pai não declarado do cônjuge");
            expect(this.nomeMae.isEnabled()).toBe(bool, "Falha ao localizar elemento Nome da Mãe do cônjuge");
            expect(this.nomeMaeNaoDeclarado.isEnabled()).toBe(bool, "Falha ao localizar checkbox Nome da Mãe não declarado do cônjuge");
        }
        else{
            expect(this.regimeCasamento.isEnabled()).toBe(bool, "Falha ao localizar elemento Regime de Casamento");
            expect(this.cpfConjuge.isPresent()).toBe(bool, "Falha ao localizar elemento CPF do cônjuge");
            expect(this.nomeCompleto.isPresent()).toBe(bool, "Falha ao localizar elemento Nome completo do cônjuge");
            expect(this.dataNascimento.isPresent()).toBe(bool, "Falha ao localizar elemento Data de Nascimento do cônjuge");
            expect(this.tipoIdentificacao.isPresent()).toBe(bool, "Falha ao localizar elemento Tipo de Identificação do cônjuge");
            expect(this.numeroIdentificacao.isPresent()).toBe(bool, "Falha ao localizar elemento Número de Identificação do cônjuge");
            expect(this.orgaoExpedidor.isPresent()).toBe(bool, "Falha ao localizar elemento Órgão Expedidor do cônjuge");
            expect(this.ufExpedidor.isPresent()).toBe(bool, "Falha ao localizar elemento UF Expedidor do cônjuge");
            expect(this.dataEmissao.isPresent()).toBe(bool, "Falha ao localizar elemento Data de Emissão do cônjuge");
            expect(this.profissao.isPresent()).toBe(bool, "Falha ao localizar elemento Profissão do cônjuge");
            expect(this.empresa.isPresent()).toBe(bool, "Falha ao localizar elemento Empresa do cônjuge");
            expect(this.valorRenda.isPresent()).toBe(bool, "Falha ao localizar elemento Valor da Renda do cônjuge");
            expect(this.nomePai.isPresent()).toBe(bool, "Falha ao localizar elemento Nome do Pai do cônjuge");
            expect(this.nomePaiNaoDeclarado.isPresent()).toBe(bool, "Falha ao localizar checkbox Nome do Pai não declarado do cônjuge");
            expect(this.nomeMae.isPresent()).toBe(bool, "Falha ao localizar elemento Nome da Mãe do cônjuge");
            expect(this.nomeMaeNaoDeclarado.isPresent()).toBe(bool, "Falha ao localizar checkbox Nome da Mãe não declarado do cônjuge");
        }
    }

    setEstadoCivilUpdate(texto){
        texto = texto || 'Casado';
        this.estadoCivil.element(by.cssContainingText('option', texto)).click();
    }

    setRegimeCasamentoUpdate(texto) {
        texto = texto || 'Comunhão de Bens';
        this.regimeCasamento.element(by.cssContainingText('option', texto)).click();
    }

    setProfissaoUpdate(texto){
        texto = texto || 'AERONAUTA'
        this.profissao.element(by.cssContainingText('option', texto)).click();
    }

    preencheUpdate(){
        this.setEstadoCivilUpdate();
        this.setRegimeCasamentoUpdate();
        this.cpfConjuge.clear();
        this.cpfConjuge.sendKeys('427.325.514-65');
        this.nomeCompleto.clear();
        this.nomeCompleto.sendKeys('Nome Conjuge');
        this.dataNascimento.clear();
        this.dataNascimento.sendKeys('02051989');
        this.setTipoIdentificacao();
        this.numeroIdentificacao.clear();
        this.numeroIdentificacao.sendKeys('7777777');
        this.setOrgaoExpedidor();
        this.setUfExpedidor();
        this.dataEmissao.sendKeys('02052007');
        this.setProfissaoUpdate();
        this.empresa.clear();
        this.empresa.sendKeys('Varig');
        this.valorRenda.clear();
        this.valorRenda.sendKeys('700000');
        this.nomePai.clear();
        this.nomeMae.clear();
        this.nomePai.sendKeys('Nome Pai');
        this.nomeMae.sendKeys('Nome Mae');
    }

    preencheContatoUpdate(){
        this.botaoNovo.click();
        this.setTipoContato();
        this.setTipoTelefone();
        this.numeroTelefone.sendKeys('5199999999');
        this.obsTelefone.sendKeys('Observacao Telefone');
        this.botaoSalvar.click();
    }

    setTipoIdentificacao(texto) {
        texto = texto || 'Cart. Identidade';
        this.tipoIdentificacao.element(by.cssContainingText('option', texto)).click();
    }

    setUfExpedidor(texto) {
        texto = texto || 'RS';
        this.ufExpedidor.element(by.cssContainingText('option', texto)).click();
    }

    setOrgaoExpedidor(texto) {
        texto = texto || 'SSP';
        this.orgaoExpedidor.element(by.cssContainingText('option', texto)).click();
    }

    preencherCamposObrigatorios() {
        this.setRegimeCasamento();
        this.cpfConjuge.sendKeys(Gerador.getCPF());
        this.nomeCompleto.sendKeys('MARIA ANTONIETA DE LAS NIEVES');
        this.dataNascimento.sendKeys('03/12/1990');
        this.setTipoIdentificacao();
        this.numeroIdentificacao.sendKeys('8791466');
        this.setOrgaoExpedidor();
        this.setUfExpedidor();
        this.dataEmissao.sendKeys(Data.dataAtual());
        this.nomePai.sendKeys('NOME COMPLETO DO PAI');
        this.nomeMae.sendKeys('NOME COMPLETO DA MAE');
    }

    limparCamposObrigatorios() {
        this.clearSelect(this.regimeCasamento);
        this.cpfConjuge.clear();
        this.nomeCompleto.clear();
        this.dataNascimento.clear();
        this.clearSelect(this.tipoIdentificacao);
        this.numeroIdentificacao.clear();
        this.clearSelect(this.orgaoExpedidor);
        this.clearSelect(this.ufExpedidor);
        this.dataEmissao.clear();
        this.nomePai.clear();
        this.nomeMae.clear();
    }

    clearSelect(item){
        item.all(by.tagName('option')).get(0).click();
    }

    // Contatos
    setTipoContato(texto) {
        texto = texto || 'Telefone';
        this.tipoSelecionado.element(by.cssContainingText('option', texto)).click();
    }

    setTipoTelefone(texto) {
        texto = texto || 'RESIDENCIAL';
        this.tipoTelefone.element(by.cssContainingText('option', texto)).click();
    }

    setTipoEmail(texto) {
        texto = texto || 'PESSOAL';
        this.tipoEmail.element(by.cssContainingText('option', texto)).click();
    }

    getTableRowsTelefones(){
        return element.all(by.repeater('(index, contato) in $ctrl.contatos.telefones'));
    }

    getTableRowsEmails(){
        return element.all(by.repeater('(index, contato) in $ctrl.contatos.emails'));
    }

    preencherTodosTelefone(id){
        id = id || '';
        this.setTipoContato();
        this.setTipoTelefone();
        this.numeroTelefone.sendKeys('5198789999');
        this.obsTelefone.sendKeys('Observação telefone ' + id);
    }

    preencherTodosEmail(id){
        id = id || '';
        this.setTipoContato('E-mail');
        this.setTipoEmail();
        this.enderecoEmail.sendKeys('emailDoFulano@a.com');
        this.obsEmail.sendKeys('Observação e-mail ' + id);
    }

    insereTelefones(num){
        for (let i = 0; i < num; i++) {
            this.botaoNovo.click();
            this.preencherTodosTelefone(i);
            this.botaoSalvar.click();
        }
    }

    insereEmails(num){
        for (let i = 0; i < num; i++) {
            this.botaoNovo.click();
            this.preencherTodosEmail(i);
            this.botaoSalvar.click();
        }
    }

    excluiContato(tipo){
        let tableRows = (tipo == 'telefone') ? this.getTableRowsTelefones() : this.getTableRowsEmails();

        let botaoExcluir = tableRows.all(by.css('button[title="Remover"]')).first();
            botaoExcluir.click().then(()=>{
                let btnConfirma = Modal.getModalBtn();
                    btnConfirma.click();
            });
    }

    editaContato(tipo){
        let tableRows = (tipo == 'telefone') ? this.getTableRowsTelefones() : this.getTableRowsEmails();

        let botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();
            botaoEditar.click();
    }

    confirmaAtualizacaoCadastral(){
        this.botaoAtualizarCadastro.click().then(()=>{            
            let btnConfirma = Modal.getModalBtn();
            btnConfirma.click();
        });
    }

    getTableRowsContato() {
        return element.all(by.repeater('(index, contato) in $ctrl.contatos.telefones'));
    }

    excluirContato() {
        let tableRows = this.getTableRowsContato();
        let botaoExcluir = tableRows.all(by.css('button[title="Remover"]')).first();
        botaoExcluir.click().then(()=>{
            let btnConfirma = Modal.getModalBtn();
                btnConfirma.click();
        });
    }
}

module.exports = new EstadoCivil();
