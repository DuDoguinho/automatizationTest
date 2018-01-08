let Menu = require('../../../menu/menu.po');
let Cadastro = require('../../cadastro/cadastro.po');
let Update = require('../../cadastro/alteracao-cadastral.po');
let GestaoContaCorrente = require('../gestao-conta-corrente/gestao-conta-corrente.po');
let ContaVinculadaDomicilio = require('./conta-vinculada-domicilio.po');
let GeraCPF = require('../../../comum/cpfCnpj');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Mensagem = require('../../../comum/mensagem');
let Data = require('../../../comum/data');
let Estresse = require('../../../comum/estresse');

let cpf = '';

describe('Conta Corrente - Conta Vinculada - Domicilio', () => {
    beforeAll(() => {
        Menu.navegaParaCadastroPF();
        if (!cpf) {
            cpf = Cadastro.cadastraPessoaFisicaSimples(DadosCadastro);
            Menu.navegaParaCadastroPF();
        }
        Cadastro.buscaCpf(cpf);
        if (Menu.verificaSeHabilitado(Menu.matricula)) {
            Cadastro.cadastraMatricula();
            Menu.navegaParaCadastroPF();
            Cadastro.buscaCpf(cpf);
        }
        Menu.navegaParaConta();
        GestaoContaCorrente.abreSessao();
        GestaoContaCorrente.preencheContaCorrente();
        ContaVinculadaDomicilio.abreSessao();
    });

    it('Deve validar que campo "Travar Domicílio" deve vir com valor "Não" por padrão', () => {
        expect(ContaVinculadaDomicilio.travarDomicilioBancario.getAttribute('value')).toBe('NAO', 'Falha ao validar campo Travar Domicílio');
    });

    it('Deve trazer campo "Data Vigência Visa" ao setar valor "Visa" para campo "Travar Domicilio"', () => {
        ContaVinculadaDomicilio.setTravarVisa();
        expect(ContaVinculadaDomicilio.dataVigenciaVisa.isPresent()).toBe(true, 'Falha ao validar campo Data Vigência Visa');
    });

    it('Deve trazer campo "Data Vigência Master" ao setar valor "Master" para campo "Travar Domicilio"', () => {
        ContaVinculadaDomicilio.setTravarMaster();
        expect(ContaVinculadaDomicilio.dataVigenciaMaster.isPresent()).toBe(true, 'Falha ao validar campo Data Vigência Visa');
    });

    it('Campoa "Data Vigência Trava Visa" e "Data Vigência Trava Visa" não devem aceitar data inválida', () => {
        let dataInvalida = '99/99/9999'

        ContaVinculadaDomicilio.setTravarAmbas();

        ContaVinculadaDomicilio.dataVigenciaVisa.clear();
        ContaVinculadaDomicilio.dataVigenciaVisa.sendKeys(dataInvalida + protractor.Key.TAB);
        expect(ContaVinculadaDomicilio.dataVigenciaVisa.getAttribute('value')).toBe('', 'Falha ao validar data vigência Master');

        ContaVinculadaDomicilio.dataVigenciaMaster.clear();
        ContaVinculadaDomicilio.dataVigenciaMaster.sendKeys(dataInvalida + protractor.Key.TAB);
        expect(ContaVinculadaDomicilio.dataVigenciaMaster.getAttribute('value')).toBe('', 'Falha ao validar data vigência Master');
    });

    it('Campo "%  Percentual de Antecipação" não deve aceitar mais de 100%', () => {
        ContaVinculadaDomicilio.percentAntecipacao.sendKeys('10500' + protractor.Key.TAB);
        expect(Mensagem.obrigatoriedade(ContaVinculadaDomicilio.percentAntecipacao)).toBeTruthy();
    });
});