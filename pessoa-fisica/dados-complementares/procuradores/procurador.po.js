let Documento = require('../../dados-pessoais/documentos/documentos.po');
let Modal = require('../../../comum/modal');
let CpfCnpj = require('../../../comum/cpfCnpj');
let Data = require('../../../comum/data');



class Procurador {
    constructor() {
        this.sessao = element(by.css('[titulo="Procuradores"]'));
        this.form = element(by.css('dados-procurador[procurador="$ctrl.procurador"]'));
        this.novo = element(by.id('novoProcurador'));
        this.cpf = element(by.model('$ctrl.cpf'));
        this.nomeCompleto = element(by.model('$ctrl.procurador.nomeCompleto'));
        this.cargo = element(by.model('$ctrl.procurador.cargo'));
        this.tipoIdentificacao = element(by.model('$ctrl.documento.tipoIdentificacao'));

        this.documento = Documento;

        this.tipoProcuracao = element(by.model('$ctrl.procurador.procuracao.tipoProcuracao'));
        this.prazo = element(by.model('$ctrl.procurador.procuracao.prazo'));
        this.vigencia = element(by.model('$ctrl.procurador.procuracao.vigencia'));
        this.dataProcuracao = element(by.model('$ctrl.procurador.procuracao.dataProcuracao'));
        this.registro = element(by.model('$ctrl.procurador.procuracao.registro'));
        this.livro = element(by.model('$ctrl.procurador.procuracao.livro'));
        this.folha = element(by.model('$ctrl.procurador.procuracao.folha'));
        this.tabelionato = element(by.model('$ctrl.procurador.procuracao.tabelionato'));
        this.dataEntradaFormatada = element(by.model('$ctrl.dataEntradaFormatada'));

        this.revogado = element(by.model('$ctrl.procurador.procuracao.revogado'));
        this.observacoes = element(by.model('$ctrl.procurador.procuracao.observacoes'));

        this.botaoSalvar = element(by.id('adicionarProcurador'));
        this.botaoCancelar = element(by.id('cancelarProcurador'));
        this.botaoNovo = element(by.id('novoProcurador'));
        this.botaoSalvarRascunho = element(by.id('btnSalvarRascunho'));
        this.listaVazia = element(by.css('lista-procuradores>div.listaVazia'));

        this.tamanhoDosCampos = {
            nomeCompleto: 40,
            cargo: 20,
            registro: 10,
            livro: 10,
            folha: 10,
            tabelionato: 20,
            observacoes: 100
        }
    }

    acessaPagina(cpf) {
        cpf = cpf || '51404821341';
        browser.get('#/cadastro/terceiro/' + cpf.replace('.', '').replace('.', '').replace('-', '') + '/dados-complementares');
    }

    abreSessao() {
        return this.sessao.element(by.css('button')).click();
    }

    setTipoProcuracao(texto) {
        this.tipoProcuracao.element(by.cssContainingText('option', texto)).click();
    }

    setTipoIdentificacao(texto) {
        texto = texto !== undefined ? texto : 'Cart. Identidade';
        return this.tipoIdentificacao.element(by.cssContainingText('option', texto)).click();
    }

    setPrazo(texto) {
        this.prazo.element(by.cssContainingText('option', texto)).click();
    }

    getTableRows() {
        return element.all(by.repeater('(index, procurador) in $ctrl.procuradores | filter:{ procuracao: { revogado: $ctrl.filtro }}'));
    }

    preencherCamposObrigatorios(procurador, id) {
        id = id || "";
        let cpf = CpfCnpj.getCPF();
        this.cpf.sendKeys(cpf + protractor.Key.TAB);
        procurador.cpf = cpf;
        this.nomeCompleto.sendKeys(procurador.nome || ('João da Silva ' + id));
        this.cargo.sendKeys(procurador.cargo || ('Médico ' + id));
        this.documento.setTipoIdentificacao(procurador.tipoId);
        this.documento.numeroIdentificacao.sendKeys((procurador.numId || '102030405') + id);
        this.documento.setOrgaoExpedidor(procurador.orgExp);
        this.documento.setUfExpedidor(procurador.ufExp);
        this.documento.dataEmissao.sendKeys(procurador.dataEmissao || '01051997');
        this.documento.dataNascimento.sendKeys(procurador.dataNasc || '03121985');

        this.setTipoProcuracao(procurador.tipoProcuracao || 'Particular');
        this.setPrazo(procurador.prazoProcuracao || 'Determinado');

        this.vigencia.sendKeys(procurador.vigencia || Data.dataAtual());
        this.dataProcuracao.sendKeys((procurador.dataProcuracao || Data.dataAtual()) + protractor.Key.TAB);
        return cpf;
    }

    excluir() {
        let tableRows = this.getTableRows();

        let botaoExcluir = tableRows.all(by.css('button[title="Remover"]')).last();
        botaoExcluir.click().then(() => {
            let btnConfirma = Modal.getModalBtn();
            btnConfirma.click();
        });
    }

    insereMultiplos(procuradores) {
        let cpfs = []
        let size = procuradores.length
        for (var i = 0; i < size; i++) {
            this.botaoNovo.click();
            let cpf = this.preencherCamposObrigatorios(procuradores[i], i);
            this.botaoSalvar.click();
            cpfs.push(cpf);
        }
        return cpfs
    }

    editar(novoCPF) {
        let tableRows = this.getTableRows(),
            botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();

        botaoEditar.click();
        this.cpf.clear();
        this.cpf.sendKeys(novoCPF);
        this.botaoSalvar.click();
    }

    insereProcuradorParaCartaoAutografo(procurador, cpf) {
        this.acessaPagina(cpf);
        this.sessao.element(by.css('.step-section')).click();
        this.novo.click();
        this.preencherCamposObrigatorios(procurador);
        this.botaoSalvar.click().then(() => {
            this.botaoSalvarRascunho.click();
        });
    }

    insereProcuradoresParaCartaoAutografo(procuradores, cpf) {
        this.acessaPagina(cpf);
        this.sessao.element(by.css('.step-section')).click();
        for (let i = 0; i < procuradores.length; i++) {
            this.novo.click();
            this.preencherCamposObrigatorios(procuradores[i]);
            this.botaoSalvar.click()
        }
        this.botaoSalvarRascunho.click();
    }

    removeProcuradorParaCartaoAutografo(procurador, cpf) {
        this.acessaPagina(cpf);
        this.sessao.element(by.css('.step-section')).click();
        this.excluir();
        this.botaoSalvarRascunho.click();
    }
}


module.exports = new Procurador();