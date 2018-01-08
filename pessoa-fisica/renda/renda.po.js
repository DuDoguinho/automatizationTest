let UISelect = require('../../comum/ui-select');
let Modal = require('../../comum/modal');
let Cadastro = require('../cadastro/cadastro.po');
let Menu = require('../../menu/menu.po');
let AlteracaoCadastral = require('../cadastro/alteracao-cadastral.po');
let Data = require('../../comum/data.js')


class Renda {
    constructor() {
        this.sessao = element(by.css('[titulo="Renda"]'));

        this.tiposDeFontePagadora = '$ctrl.fontePagadora.tipo';

        this.cpf = element(by.model('$ctrl.fontePagadora.cpf'));
        this.cnpj = element(by.model('$ctrl.fontePagadora.cnpj'));
        this.nome = element(by.model('$ctrl.fontePagadora.nome'));
        this.folhaLayout = element(by.model('$ctrl.fontePagadora.folhaLayout'));
        this.creditoConsignado = element(by.model('$ctrl.fontePagadora.creditoConsignado'));
        this.tipoControle = element(by.model('$ctrl.fontePagadora.tipoControle'));
        this.ramo = element(by.model('$ctrl.fontePagadora.ramo'));
        this.entidadeCooperativa = element(by.model('$ctrl.fontePagadora.entidadeCooperativa'));

        this.dataAdmissao = element(by.model('$ctrl.renda.dataAdmissao'));
        this.remuneracao = element(by.model('$ctrl.renda.remuneracao'));
        this.dataRenda = element(by.model('$ctrl.renda.data'));
        this.tipo = element(by.model('$ctrl.renda.tipo'));
        this.comprovacao = element(by.model('$ctrl.renda.comprovacao'));

        this.botaoSalvar = element(by.id('adicionarRenda'));
        this.botaoNovo = element(by.id('novaRenda'));

        this.byColunaNome = by.binding('renda.fontePagadora.nome');
        this.byColunaCpfCnpj = by.binding('renda.fontePagadora.cpfCnpj | brCpfCnpj');
        this.byValor = by.binding('renda.remuneracao | finance:true');
        this.byTipo = by.binding('renda.descricaoTipoDeRenda');
        this.byPercentTotal = by.binding('(renda.remuneracao / $ctrl.totalRendas) | percentage');      
        this.botaoAtualizarCadastro = element(by.css('button[ng-click="$ctrl.update($ctrl.model)"]'));    
        this.dataAtualizacao = element(by.model('$ctrl.rendasObj.dataAtualizacaoRenda'));
        
        this.msgErro = element(by.css('mensagem-erro[mensagens="ctrl.erros"]'));

        this.tamanhoDosCampos = {
            nome: 40,
            remuneracao: 9
        }
    }

    clicaTiposDeFontePagadora(value){
        let tipo = function(value){
            if (value == 0){
                return "cnpj";
            }
            else if(value == 1){
                return "cpf";
            }
            else if(value == 2){
                return "semCnpj";
            }
            else {
                return "semCnpj";         
            }
        }

        this.sessao.element(by.css('input[value="'+tipo(value)+'"][ng-model="'+this.tiposDeFontePagadora+'"] ~ div')).click();
    }

    pesquisaHistoricoRenda(){
        return this.pesquisa.sendKeys('Empresa10711' + protractor.Key.TAB);
    }

    fontePagadora(texto) {
        return UISelect.seleciona('$ctrl.fontePagadora', texto);
    }

    abreSessao(){
        return this.sessao.click();
    }

    acessaPagina(cpf) {
        cpf = cpf || '51404821341';        
        browser.get('#/cadastro/terceiro/' + cpf + '/renda');
    }

    acessaUpdate(cpf){
        cpf = cpf || '81220011657';
        //Menu.navegaParaAlteracaoCadastral();
        browser.get('/#/alteracao/pessoa-fisica/' + cpf + '/renda');
    }

    setFolhaLayout(texto) {
        texto = texto || 'Unimed';
        this.folhaLayout.element(by.cssContainingText('option', texto)).click();
    }

    setTipoControle(texto) {
        texto = texto || 'INSS';
        this.tipoControle.element(by.cssContainingText('option', texto)).click();
    }

    setRamo(texto) {
        texto = texto || 'Outros';
        this.ramo.element(by.cssContainingText('option', texto)).click();
    }

    preencheRemuneracao(valor){
        valor = valor || '89996222'
        this.remuneracao.sendKeys(valor);
    }

    setTipoRenda(texto) {
        texto = texto || 'Declarada';
        this.tipo.element(by.cssContainingText('option', texto)).click();
    }

    setComprovacao(texto) {
        texto = texto || 'DECORE';
        this.comprovacao.element(by.cssContainingText('option', texto)).click();
    }

    getTableRows() {
        return element.all(by.repeater('renda in $ctrl.rendas'));
    }

    editar(valorAtual){
        valorAtual = valorAtual || '55555555';
        let tableRows = this.getTableRows(),
        botaoEditar = tableRows.all(by.css('button[title="Editar"]')).first();

        botaoEditar.click();
        this.remuneracao.clear();
        this.valorAtual.sendKeys(valorAtual);
        this.botaoSalvar.click();
    }

    excluir(){
        let tableRows = this.getTableRows(),
        botaoExcluir = tableRows.all(by.css('button[title="Remover"]')).first();
        botaoExcluir.click().then(()=>{
            let btnConfirma = Modal.getModalBtn();
            btnConfirma.click();
        });
    }

    confirmaAtualizacaoCadastral(){
        this.botaoAtualizarCadastro.click().then(()=>{            
            let btnConfirma = Modal.getModalBtn();
            btnConfirma.click();
        });
    }

    setDataRenda(data) {
        data = data || '';
        this.dataRenda.sendKeys(data);
    }

    setDataAtualizacao(data) {
        data = data || Data.dataAtualMesAno();
        this.dataAtualizacao.sendKeys(data);
    }
}

module.exports = new Renda();
