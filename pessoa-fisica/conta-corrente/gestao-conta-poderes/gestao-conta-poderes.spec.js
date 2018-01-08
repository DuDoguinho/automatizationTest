let Menu = require('../../../menu/menu.po');
let Cadastro = require('../../cadastro/cadastro.po');
let GestaoContaCorrente = require('../gestao-conta-corrente/gestao-conta-corrente.po');
let GeraCPF = require('../../../comum/cpfCnpj');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Poderes = require('./gestao-conta-poderes.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');

let cpf = '';

describe('Conta Corrente - Poderes Cartão Autógrafo', () => {
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
        Poderes.abreSecao();
    });

    it('Deve confirmar lista vazia', () => {
        expect(Poderes.listaVazia.isDisplayed()).toBeTruthy();
    });

    it('Deve confirmar obrigatoriedade do campo nome', () => {
        Poderes.clicaNovo();
        Poderes.salvaPoderes();

        expect(Mensagem.obrigatoriedade(Poderes.nome)).toBeTruthy('Falha ao validar campo nome');
        Poderes.cancela();
    });

    it('Deve validar tamanho máximo do capo Observações', () => {
        Poderes.clicaNovo();
        Poderes.abreSubSecao();
        Estresse.estressarCampo(Poderes.observacoes, 250);
        Estresse.avaliarLength(Poderes.observacoes, Poderes.tamanhoDosCampos.observacoes);
        Poderes.cancela();
    });
    
    it('Deve validar que campo CPF vem desabilitado para edição', () => { 
        Poderes.clicaNovo();
        
        expect(Poderes.cpf.isEnabled()).toBeFalsy('Falha ao validar campo Cpf');
        Poderes.cancela();
    });

    it('Deve validar que Cpf é o mesmo cadastrado para o titular', () => {  
        Poderes.clicaNovo();
        Poderes.setPessoa();
        
        expect(Poderes.cpf.getAttribute('value')).toBe(cpf, 'falha ao validar campo cpf');
        Poderes.cancela();
    });

    it('Deve salvar poderes', () => {
        Poderes.clicaNovo();
        Poderes.setPessoa();
        Poderes.salvaPoderes();

        Poderes.btnSalvar.click().then(()=>{
            expect(Poderes.msgSucesso.isPresent()).toBeTruthy();    
        });
    });
});