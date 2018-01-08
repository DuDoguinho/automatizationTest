let Modal = require('../../../comum/modal');
let CpfCnpj = require('../../../comum/cpfCnpj');

class Imovel {
    constructor() {
        this.sessao = element(by.css('[titulo="Imóveis"]'));

        this.tipoImovel = this.sessao.element(by.id('tipoImovel'));
        this.situacao = element(by.model('$ctrl.imovel.situacao'));
        this.destinacao = element(by.model('$ctrl.imovel.destinacao'));
        this.localizacao = element(by.model('$ctrl.imovel.localizacao'));
        this.area = element(by.model('$ctrl.imovel.area'));
        this.areaConstruida = element(by.model('$ctrl.imovel.areaConstruida'));
        this.valorAtual = element(by.model('$ctrl.imovel.valorAtual'));
        this.valorHipotecado = element(by.model('$ctrl.imovel.valorHipotecado'));
        this.valorAvaliacao = element(by.model('$ctrl.imovel.valorAvaliacao'));
        this.valorAverbacao = element(by.model('$ctrl.imovel.valorAverbacao'));
        this.inscricao = element(by.model('$ctrl.imovel.inscricao'));
        this.registro = element(by.model('$ctrl.imovel.registro'));
        this.numeroMatricula = element(by.model('$ctrl.imovel.numeroMatricula'));
        this.numeroLivro = element(by.model('$ctrl.imovel.numeroLivro'));
        this.cartorio = element(by.model('$ctrl.imovel.cartorio'));
        this.descricao = element(by.model('$ctrl.imovel.descricao'));
        this.origem = element(by.model('$ctrl.imovel.origem'));
        this.cpfCnpj = element(by.model('$ctrl.imovel.vendedor.cpfCnpj'));
        this.nome = element(by.model('$ctrl.imovel.vendedor.nome'));

        this.botaoSalvar = element(by.id('adicionarImovel'));
        this.botaoCancelar = element(by.id('cancelarImovel'));
        this.botaoNovo = element(by.id('novoImovel'));
        this.listaVazia = element(by.css('lista-imoveis>div.listaVazia'));

        this.byColunaTipoImovel = by.binding("imovel.descricaoTipoDeImovel");
        this.byColunaSituacao = by.binding("imovel.situacao");
        this.byColunaDestinacao = by.binding("imovel.destinacao");
        this.byColunaValorAtual = by.binding("imovel.valorAtual | finance:true");

        this.tamanhoDosCampos = {
            localizacao: 60,
            inscricao: 15,
            registro: 10,
            numeroMatricula: 10,
            numeroLivro: 10,
            cartorio: 20,
            descricao: 250,
            origem: 250,
            area: 14,
            areaConstruida: 14,
            vendedor: {
                nomeCompleto: 65,
                cpfCnpj: 18
            }
        }
    }

    acessaPagina(cpf) {
        cpf = cpf || '51404821341';
        browser.get('#/cadastro/terceiro/' + cpf.replace('.','').replace('.','').replace('-','') + '/bens');
    }

    abreSessao(){
        return this.sessao.click();
    }

    setTipoImovel(texto) {
        texto = texto || 'Casa';
        this.tipoImovel.element(by.cssContainingText('option', texto)).click();
    }

    setSituacao(texto) {
        texto = texto || 'Livre';
        this.situacao.element(by.cssContainingText('option', texto)).click();
    }

    setDestinacao(texto) {
        texto = texto || 'Residencial';
        this.destinacao.element(by.cssContainingText('option', texto)).click();
    }

    setCpfCnpjVendedor(texto){
        this.cpfCnpj.sendKeys(texto);
    }

    setNomeVendedor(texto){
        this.nome.sendKeys(texto);
    }

    preencherCamposObrigatorios(id) {
        id = id || "";
        this.setTipoImovel();
        this.setSituacao();
        this.setDestinacao();
        this.localizacao.sendKeys('Avenida Primeiro de Maio ' + id);
        this.area.sendKeys('15345');
        this.areaConstruida.sendKeys('5345');
        this.valorAtual.sendKeys('888888');
        this.valorHipotecado.sendKeys('888888');
        this.valorAvaliacao.sendKeys('777777');
        this.valorAverbacao.sendKeys('666666');
        this.inscricao.sendKeys('AS8468A4');
        this.registro.sendKeys('Registro ' + id);
        this.numeroMatricula.sendKeys('87');
        this.numeroLivro.sendKeys('989');
        this.cartorio.sendKeys('Cartório ' + id);
        this.descricao.sendKeys('Descrição ' + id);
        this.origem.sendKeys('Origem ' + id);

        this.cpfCnpj.sendKeys(CpfCnpj.getCPF());
        this.nome.sendKeys('Vendedor ' + id);
    }

    insereMultiplos(total){
        for (var i = 0; i < total; i++) {
            this.botaoNovo.click();
            this.preencherCamposObrigatorios(i);
            this.botaoSalvar.click();
        }
    }

    getTableRows(){
        return element.all(by.repeater('(index, imovel) in $ctrl.imoveis'));
    }

    excluir(){
        let tableRows = this.getTableRows();

        let botaoExcluir = tableRows.all(by.css('button[title="Remover"]')).first();
            botaoExcluir.click().then(()=>{
                let btnConfirma = Modal.getModalBtn();
                    btnConfirma.click();
            });
    }

    editar(valorAtual){
        let tableRows = this.getTableRows(),
            botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();

        botaoEditar.click();
        this.valorAtual.clear();
        this.valorAtual.sendKeys(valorAtual);
        this.botaoSalvar.click();
    }

    editarUpdate(){
        let tableRows = this.getTableRows(),
            botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();
            botaoEditar.click();
    }

    salvar(){
        this.botaoSalvar.click();
    }

}
module.exports = new Imovel();
