let Cadastro = require('../../cadastro/cadastro.po');
let Menu = require('../../../menu/menu.po');
let Data = require('../../../comum/data');
let Mensagem = require('../../../comum/mensagem');
let AlteracaoCadastral = require('../../cadastro/alteracao-cadastral.po');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Documentos = require('./documentos.po');
let Estresse = require('../../../comum/estresse');
let cpf = '';
var altera;

describe('Update Documentos', () => {
    describe('Formulário Documentos', () => {
        beforeEach(() => {
            if (!cpf) {
                Menu.navegaParaCadastroPF();                
                cpf = Cadastro.cadastraPessoaFisica(DadosCadastro);
            }
            altera = new AlteracaoCadastral(cpf);
            Menu.navegaParaAlteracaoCadastral();
            altera.buscaCpf(cpf);
            altera.clicaSecao('documento', cpf);
        });

        it('Deve validar obrigatoriedade dos campos', () => {
            Documentos.setTipoIdentificacao('');
            Documentos.numeroIdentificacao.clear();
            Documentos.setOrgaoExpedidor('');
            Documentos.setUfExpedidor('');
            Documentos.dataEmissao.clear();
            Documentos.dataNascimento.clear();
            Documentos.setSexo('');

            expect(Mensagem.obrigatoriedade(Documentos.tipoIdentificacao)).toBeTruthy('Falha ao validar campo Mensagem');
            expect(Mensagem.obrigatoriedade(Documentos.numeroIdentificacao)).toBeTruthy('Falha ao validar campo Nr.Identificação');
            expect(Mensagem.obrigatoriedade(Documentos.orgaoExpedidor)).toBeTruthy('Falha ao validar campo Órgão Expedidor');
            expect(Mensagem.obrigatoriedade(Documentos.ufExpedidor)).toBeTruthy('Falha ao validar campo Uf Expedidor');
            expect(Mensagem.obrigatoriedade(Documentos.dataEmissao)).toBeTruthy('Falha ao validar campo Data Emissão');
            expect(Mensagem.obrigatoriedade(Documentos.dataNascimento)).toBeTruthy('Falha ao validar campo Data Nascimento');
            expect(Mensagem.obrigatoriedade(Documentos.sexo)).toBeTruthy('Falha ao validar campo Sexo');
        });

        it('Deve validar o tamanho máximo dos campos', () => {
            Documentos.numeroIdentificacao.clear();
            Documentos.protocoloBRSafe.clear();

            Estresse.estressarCampo(Documentos.numeroIdentificacao, 20);
            Estresse.estressarCampo(Documentos.protocoloBRSafe, 20);

            Estresse.avaliarLength(Documentos.numeroIdentificacao, Documentos.tamanhoDosCampos.numeroIdentificacao, 'Falha ao validar campo Nr Identificação');
            Estresse.avaliarLength(Documentos.protocoloBRSafe, Documentos.tamanhoDosCampos.protocoloBRSafe, 'Falha ao validar campo Protocolo BRSafe');
        });

        it('Não deve mostrar campos "UF" e "Naturalidade" caso Nacionalidade não seja BRASIL', () => { 
            Documentos.setNacionalidade('argentina');
    
            expect(Documentos.uf.isDisplayed()).toBe(false);
            expect(Documentos.naturalidade.isDisplayed()).toBe(false);
        });

        it('Campos "Data Emissão" e "Data Nascimento" não devem aceitar data inválida', () => {
            let dataInvalida = '99/99/9999'
            
            Documentos.dataEmissao.clear();
            Documentos.dataEmissao.sendKeys(dataInvalida + protractor.Key.TAB);
            expect(Documentos.dataEmissao.evaluate(Documentos.dataEmissao.getAttribute('ng-model'))).toBe(null, 'Falha ao validar campo Data Emissão');
            
            Documentos.dataNascimento.clear();
            Documentos.dataNascimento.sendKeys(dataInvalida + protractor.Key.TAB);
            expect(Documentos.dataNascimento.evaluate(Documentos.dataNascimento.getAttribute('ng-model'))).toBe(null, 'Falha ao validar campo Data Nascimento');
        });

        it('Campo "Data Emissão" deve retornar data atual se for preenchida com data futura', () => {
            Documentos.dataEmissao.clear();
            Documentos.dataEmissao.sendKeys(Data.dataFutura() + protractor.Key.TAB);
            expect(Documentos.dataEmissao.getAttribute('value')).toBe(Data.dataAtual(), 'Falha ao validar campo data emissão');
        });

        it('Campo "Data Nascimento" deve retornar data de 18 anos atrás se for preenchida com data futura', () => {
            Documentos.dataNascimento.clear(); 
            Documentos.dataNascimento.sendKeys(Data.dataFutura() + protractor.Key.TAB);
            expect(Documentos.dataNascimento.getAttribute('value')).toBe(Data.dataAtual(), 'Falha ao validar campo Data Nascimento');
        });

        it('Deve validar que ao preencher "Data de Nascimento" com pessoa menor de idade, campor "Modalidade Repres.Legal" deve setar valor "Pessoa Física Menor de Idade"', () => {
            Documentos.dataNascimento.clear(); 
            Documentos.dataNascimento.sendKeys(Data.dataPassada() + protractor.Key.TAB);
            expect(Documentos.modalidadeRepresentanteLegal.getText()).toBe('Pessoa Física Menor de Idade'.toUpperCase(), 'Falha ao validar campo "Data Nascimento"');
        });

        it('Altera dados  e atualiza cadastro', () => {
            Documentos.setTipoIdentificacao('Cart. Motorista');
            Documentos.numeroIdentificacao.clear();
            Documentos.numeroIdentificacao.sendKeys('12356549');
            Documentos.setOrgaoExpedidor('DETRAN');
            Documentos.dataEmissao.clear();
            Documentos.dataEmissao.sendKeys(Data.dataPassada());
            Documentos.dataNascimento.clear();
            Documentos.dataNascimento.sendKeys('01061996');
            Documentos.setSexo('Feminino')
            Documentos.setNacionalidade('brasil');
            
            Cadastro.atualizaCadastro();
            Menu.navegaParaAlteracaoCadastral();
            altera.buscaCpf(cpf);
            altera.clicaSecao('documento', cpf);

            expect(Documentos.tipoIdentificacao.getAttribute('value')).toBe('Carteira_Motorista'.toUpperCase(), 'Falha ao validar campos Tipo de Identificação');
            expect(Documentos.numeroIdentificacao.getAttribute('value')).toBe('12356549', 'Falha ao validar campo Nr Identificação');
            expect(Documentos.orgaoExpedidor.getAttribute('value')).toBe('Detran'.toUpperCase(), 'Falha ao validar campo Orgao Expedidor');
            expect(Documentos.ufExpedidor.getAttribute('value')).toBe('RS', 'Falh ao validar campo UF Expedidor');
            expect(Documentos.dataEmissao.getAttribute('value')).toBe(Data.dataPassada(), 'Falha ao validar campo data Emissão');
            expect(Documentos.dataNascimento.getAttribute('value')).toBe('01/06/1996', 'Falha ao validar campo Data Nascimento');
            expect(Documentos.sexo.getAttribute('value')).toBe('Feminino'.toUpperCase(), 'Falha ao validar campo sexo');
            expect(Documentos.modalidadeRepresentanteLegal.getText()).toBe('nenhum'.toUpperCase(), 'Falha ao validar campo Representante Legal');
            expect(Documentos.nacionalidade.getText()).toBe('brasil'.toUpperCase(), 'Falha ao validar campo Nacionalidade');
            expect(Documentos.uf.getAttribute('value')).toBe('RS', 'Falha ao validar campo UF');
            expect(Documentos.naturalidade.getText()).toBe('Porto Alegre'.toUpperCase(), 'Falha ao validar campo Naturalidade');
        });
    });
});