let Dependente = require('./dependentes.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Modal = require('../../../comum/modal');
let DadosCpfNome = require('../dados-cpf-nome/dados-cpf-nome.po');
let Data = require('../../../comum/data');

describe('Dependentes', () => {
    describe('Formulário', function () {
        beforeEach(() => {
            Dependente.acessaPagina();
            Dependente.sessao.element(by.css('.step-section')).click();
            Dependente.botaoNovo.click();
        });

        it('deve validar os campos obrigatórios', () => {
            Dependente.botaoSalvar.click();

            expect(Mensagem.obrigatoriedade(Dependente.cpf)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Dependente.nomeCompleto)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Dependente.dataNascimento)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Dependente.tipoDependencia)).toBeTruthy();
        });

        it('deve validar tamanho máximo dos campos da seção', () => {
            Estresse.estressarCampo(Dependente.nomeCompleto, 100);
            Estresse.estressarCampo(Dependente.valorRenda, 100);
            Estresse.estressarCampo(Dependente.valorPensao, 100);

            Estresse.avaliarLength(Dependente.nomeCompleto, Dependente.tamanhoDosCampos.nomeCompleto);
            Estresse.avaliarLengthValor(Dependente.valorRenda);
            Estresse.avaliarLengthValor(Dependente.valorPensao);
        });

        it('Validar comportamento ao setar CPF do ‘Terceiro’ como cpf do Dependente', () => {
            Dependente.cpf.clear();            
            DadosCpfNome.cpf.getAttribute('value').then((txt) => {
                Dependente.cpf.sendKeys(txt);
                Dependente.cpf.sendKeys(protractor.Key.TAB);
                  
                expect(Modal.getModalMsg()).toEqual('O CPF não pode ser o mesmo do cadastrado.');
                Modal.clickModalBtn('close');
            });            
        });

        it('Campo Data Nascimento não devem aceitar data futura', () => {
            let dataFutura = '12/05/2055'
            Dependente.dataNascimento.clear();
            Dependente.dataNascimento.sendKeys(dataFutura + protractor.Key.TAB);
           
            expect(Dependente.dataNascimento.getAttribute('value')).toEqual(Data.dataAtual());
        });

        it('Campo Data Nascimento não deve aceitar data inválida', () => {
            let dataInvalida = '99/99/9999'

            Dependente.dataNascimento.sendKeys(dataInvalida + protractor.Key.TAB);
            expect(Dependente.dataNascimento.evaluate(
                   Dependente.dataNascimento.getAttribute('ng-model'))).toBe(null);
        });

        it('Deve validar número máximo de caracteres no Valor da Renda', () => {
            Estresse.estressarCampo(Dependente.valorRenda, 20);
            Estresse.avaliarLength(Dependente.valorRenda, Dependente.tamanhoDosCampos.vlRenda);
        });

        it('Campo Valor da Renda deve aceitar apenas números', () => {
            let postalInvalido = '*A%5555'
            let postalValido = '55,55'
    
            Dependente.valorRenda.clear();
            Dependente.valorRenda.sendKeys(postalInvalido);
            expect(Dependente.valorRenda.getAttribute('value')).toEqual('R$ '+postalValido);
        });

        it('Deve validar número máximo de caracteres no Valor da Pensão', () => {
            Estresse.estressarCampo(Dependente.valorPensao, 20);
            Estresse.avaliarLength(Dependente.valorPensao, Dependente.tamanhoDosCampos.vlPensao);
        });

        it('Campo Valor da Pensão deve aceitar apenas números', () => {
            let pensaoInvalida = '*A%5555'
            let pensaoValida = '55,55'
    
            Dependente.valorPensao.clear();
            Dependente.valorPensao.sendKeys(pensaoInvalida);
            expect(Dependente.valorPensao.getAttribute('value')).toEqual('R$ '+pensaoValida);
        });

        it('deve cancelar', () => {
            expect(Dependente.form.isPresent()).toBeTruthy();

            Dependente.botaoCancelar.click();

            expect(Dependente.botaoNovo.isDisplayed()).toBeTruthy();
            expect(Dependente.form.isPresent()).not.toBeTruthy();
        });

    });

    describe('Listagem', function () {
        beforeEach(() => {
            Dependente.acessaPagina();
            Dependente.sessao.element(by.css('.step-section')).click();
        });

        it('deve mostrar mensagem de lista vazia inicialmente', () => {
            let tableRows = Dependente.getTableRows();

            expect(Dependente.listaVazia.isDisplayed()).toBeTruthy();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve inserir múltiplos', () => {
            let dependentes = DadosCadastro.cadastro.dadosPessoais.dependentes;

            Dependente.insereMultiplos(dependentes);

            let tableRows = Dependente.getTableRows();
            expect(tableRows.count()).toEqual(dependentes.length);
        });

        it('deve inserir e apagar', () => {
            let dependentes = DadosCadastro.cadastro.dadosPessoais.dependentes;

            Dependente.insereMultiplos(dependentes);
            for (var i = 0; i < dependentes.length; i++) { Dependente.excluir(); }

            let tableRows = Dependente.getTableRows();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve editar', () => {
            let dependentes = DadosCadastro.cadastro.dadosPessoais.dependentes,
                novoCpf= '975.554.134-93';
            
            Dependente.insereMultiplos(dependentes);
            dependentes[0].cpf = novoCpf;
            Dependente.editar(dependentes[0]);

            let tableRows = Dependente.getTableRows(),
                labelNovoCpf = tableRows.all(by.binding('dependente.cpf | brCpf')).first();

            expect(tableRows.count()).toEqual(dependentes.length);
            expect(labelNovoCpf.getText()).toEqual(novoCpf);
        });

    });
});
