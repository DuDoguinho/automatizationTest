let Menu = require('../../../menu/menu.po');
let Cadastro = require('../../cadastro/cadastro.po');
let Update = require('../../cadastro/alteracao-cadastral.po');
let GeraCPF = require('../../../comum/cpfCnpj');
let Matricula = require('./matricula.po');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Header = require('../../../comum/header.po');
let cpf = '';

describe('Matricula', () => {
    beforeEach(() => {
        Menu.navegaParaCadastroPF();
        if (cpf != null && cpf != "") {
            Cadastro.buscaCpf(cpf);
        } else {
            cpf = Cadastro.cadastraPessoaFisicaSimples(DadosCadastro);
            Menu.navegaParaCadastroPF();
            Cadastro.buscaCpf(cpf);
        }
        Menu.matricula.click();
        Matricula.abreSessao();
    });

    it('Confirmar se número de cooperativa no campo "Cooperativa" é o mesmo da logada', () => {
        Matricula.cooperativaMatricula.getAttribute('value').then((matricula) => {
            let cpf_coop = "CPF: " + cpf + " COOPERATIVA: " + matricula;
            expect(cpf_coop).toBe(Header.cpf_cooperativa.getText(), "Falha ao validar cooperativa da Matrícula.");
        });
    });

    it('Confirmar se endereço no campo "Endereço Principal"  é o mesmo cadastrado', () => {
        Matricula.enderecoMatricula.getAttribute('value').then((endereco) => {
            let enderecoPrinc = DadosCadastro.cadastro.dadosPessoais.enderecos[0].logradouro + ', ' +
                DadosCadastro.cadastro.dadosPessoais.enderecos[0].numero + ' - CEP: ' + DadosCadastro.cadastro.dadosPessoais.enderecos[0].cep;
            expect(endereco).toBe(enderecoPrinc, "Falha ao validar Endereço Principal.");
        });
    });

    it('Confirmar se todos os campos da seção estão desabilitados', () => {
        expect(Matricula.numeroMatricula.isEnabled()).toBe(false, "Falha ao validar estado do campo Número de Matrícula.");
        expect(Matricula.cooperativaMatricula.isEnabled()).toBe(false, "Falha ao validar estado do campo Cooperativa.");
        expect(Matricula.enderecoMatricula.isEnabled()).toBe(false, "Falha ao validar estado do campo Endereço Principal.");
    });

    it('Confirmar Matrícula e verificar se o número gerado na matrícula é o mesmo que aparece na modal', () => {
        Matricula.botaoSalvar.click().then(() => {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(Cadastro.matriculaGerada), 10000);
            Cadastro.matriculaGerada.getText().then((matricula) => {
                //console.log("Matricula: " + matricula);
                element(by.css('modal-steps')).element(by.css('.uni-modal--close')).click();

                Menu.navegaParaAlteracaoCadastral();
                let update = new Update(cpf);
                update.buscaMatricula(matricula).then(() => cpf = '');
                expect(element(by.css('[ng-if="$ctrl.matriculaAssociado"]')).getText()).toContain(matricula, "Falha ao verificar cadastro de Matrícula.");
            });
        });
    });

});