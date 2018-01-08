let DomicilioFiscal = require('./domicilio-fiscal.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Gerador = require('../../../comum/cpfCnpj');

let cpf = '';

describe('Domicilio Fiscal', () => {    
    describe('Formulário', ()=> {
        beforeEach(() => {
            cpf = Gerador.getCPF().replace('.','').replace('.','').replace('-','');
            DomicilioFiscal.acessaPagina(cpf);
            DomicilioFiscal.abreSecao();
            DomicilioFiscal.clicaNovo();
        });

        it('Deve validar obrigatoriedade dos campos', () => {
            DomicilioFiscal.clicaSalvar();

            expect(Mensagem.obrigatoriedade(DomicilioFiscal.pais)).toBeTruthy('Falha ao validar campo país');
            expect(Mensagem.obrigatoriedade(DomicilioFiscal.nrIdentificacao)).toBeTruthy('Falha ao validar campo nrIdentificacao');
        });

        it('Deve validar estado dos campos', () => {
            expect(DomicilioFiscal.pais.isEnabled()).toBeTruthy('Falha ao validar campo país');
            expect(DomicilioFiscal.nrIdentificacao.isEnabled()).toBeTruthy('Falha ao validar campo Identificação');
            expect(DomicilioFiscal.observacoes.isEnabled()).toBeTruthy('Falha ao validar campo observações');
        });
        
        it('Deve validar tamanho maximo dos campos', () => {
            Estresse.estressarCampo(DomicilioFiscal.nrIdentificacao, 20);
            Estresse.avaliarLength(DomicilioFiscal.nrIdentificacao, DomicilioFiscal.tamanoDosCampos.nrIdentificacao, 'Falha ao validar campo Nr Identificação');

            Estresse.estressarCampo(DomicilioFiscal.observacoes, 250);
            Estresse.avaliarLength(DomicilioFiscal.observacoes, DomicilioFiscal.tamanoDosCampos.observacoes, 'Falha ao validar campo Observações');
        });

        it('Deve validar que campo "Nr Identificação" não aceita caracteres especiais', () => {
            let matriculaInvalida = '*#$DSDASDS#*';
            DomicilioFiscal.nrIdentificacao.clear();
            DomicilioFiscal.nrIdentificacao.sendKeys(matriculaInvalida + protractor.Key.TAB);
            expect(Mensagem.obrigatoriedade(DomicilioFiscal.nrIdentificacao)).toBeTruthy('Falha ao validar campo Nr.Identificação');
        });
    });
    
    describe('Listagem', ()=> {
        beforeEach(() => {
            cpf = Gerador.getCPF().replace('.','').replace('.','').replace('-','');
            DomicilioFiscal.acessaPagina(cpf);
            DomicilioFiscal.abreSecao();
        });
    
        it('Deve validar que lista vem preenchida com o cpf do titular, pais "Brasil" e "CPF" em observacoes', () => {
            let linha = DomicilioFiscal.getTableRows().first();
            expect(linha.element(DomicilioFiscal.byColunaPais).getText()).toBe('brasil'.toUpperCase(), 'Falha ao validar coluna País');
            expect(linha.element(DomicilioFiscal.byColunaNrIdentificacao).getText()).toBe(cpf, 'Falha ao validar coluna Nr Identificação');
            expect(linha.element(DomicilioFiscal.byColunaObservacoes).getText()).toBe('cpf'.toUpperCase(), 'Falha ao validar coluna Observações');
        });

        it('Deve inserir novo Domicilio e validar lista', () => {
            let primeiraLinha = DomicilioFiscal.getTableRows().first();
            let ultimaLinha = DomicilioFiscal.getTableRows().last();

            DomicilioFiscal.clicaNovo();

            DomicilioFiscal.setPais('argentina');

            DomicilioFiscal.nrIdentificacao.clear();
            DomicilioFiscal.preencheIdentificacao();

            DomicilioFiscal.observacoes.clear();
            DomicilioFiscal.preencheObservacao();

            DomicilioFiscal.clicaSalvar();

            expect(primeiraLinha.element(DomicilioFiscal.byColunaPais).getText()).toBe('brasil'.toUpperCase(), 'Falha ao validar coluna País');
            expect(primeiraLinha.element(DomicilioFiscal.byColunaNrIdentificacao).getText()).toBe(cpf, 'Falha ao validar coluna Nr Identificação');
            expect(primeiraLinha.element(DomicilioFiscal.byColunaObservacoes).getText()).toBe('cpf'.toUpperCase(), 'Falha ao validar coluna Observações');

            expect(ultimaLinha.element(DomicilioFiscal.byColunaPais).getText()).toBe('argentina'.toUpperCase(), 'Falha ao validar coluna País');
            expect(ultimaLinha.element(DomicilioFiscal.byColunaNrIdentificacao).getText()).toBe('22222222', 'Falha ao validar coluna Nr Identificação');
            expect(ultimaLinha.element(DomicilioFiscal.byColunaObservacoes).getText()).toBe('Observacao Identificacao'.toUpperCase(), 'Falha ao validar coluna Observações');
        });
        
        it('Deve alterar os dados da lista e salvar', () => {
            let linha = DomicilioFiscal.getTableRows().first();
            
            DomicilioFiscal.editar();
            DomicilioFiscal.setPais('argentina');
            
            DomicilioFiscal.nrIdentificacao.clear();
            DomicilioFiscal.preencheIdentificacao();
            
            DomicilioFiscal.observacoes.clear();
            DomicilioFiscal.preencheObservacao();
            
            DomicilioFiscal.clicaSalvar();

            expect(linha.element(DomicilioFiscal.byColunaPais).getText()).toBe('argentina'.toUpperCase(), 'Falha ao validar campo pais');
            expect(linha.element(DomicilioFiscal.byColunaNrIdentificacao).getText()).toBe('22222222', 'Falha ao validar campo pais');
            expect(linha.element(DomicilioFiscal.byColunaObservacoes).getText()).toBe('Observacao Identificacao'.toUpperCase(), 'Falha ao validar campo pais');
        });

        it('Deve remover lista e validar lista vazia', () => {
            DomicilioFiscal.excluir();
            expect(DomicilioFiscal.listaVazia.isDisplayed()).toBe(true, 'Falha ao validar lista vazia');
        });

        it('Deve validar dados originais da lista', () => {
            let linha = DomicilioFiscal.getTableRows().first();

            expect(linha.element(DomicilioFiscal.byColunaPais).getText()).toBe('brasil'.toUpperCase(), 'Falha ao validar campo pais');
            expect(linha.element(DomicilioFiscal.byColunaNrIdentificacao).getText()).toBe(cpf, 'Falha ao validar campo pais');
            expect(linha.element(DomicilioFiscal.byColunaObservacoes).getText()).toBe('cpf'.toUpperCase(), 'Falha ao validar campo pais'); 
        });
    });
});


