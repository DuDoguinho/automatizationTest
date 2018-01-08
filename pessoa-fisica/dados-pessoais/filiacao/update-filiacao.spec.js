let Cadastro = require('../../cadastro/cadastro.po');
let Menu = require('../../../menu/menu.po');
let Data = require('../../../comum/data');
let Mensagem = require('../../../comum/mensagem');
let AlteracaoCadastral = require('../../cadastro/alteracao-cadastral.po');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Filiacao = require('./filiacao.po');
let Estresse = require('../../../comum/estresse');
let cpf = '';
var altera;

describe('Update Filiação', () => {
    beforeEach(() => {
        if (!cpf) {
            Menu.navegaParaCadastroPF();
            cpf = Cadastro.cadastraPessoaFisica(DadosCadastro);
        }
        altera = new AlteracaoCadastral(cpf);
        Menu.navegaParaAlteracaoCadastral();
        altera.buscaCpf(cpf);
        altera.clicaSecao('filiacao', cpf);
    });

    it('Deve validar que campos são desabilitados ao marcar checkbox "Não declarado"', () => {
        expect(Filiacao.nomePai.isEnabled()).toBeTruthy('Falha ao validar campo Nome do Pai');
        expect(Filiacao.nomeMae.isEnabled()).toBeTruthy('Falha ao validar campo Nome da Mãe');

        Filiacao.clickCheckboxes();

        expect(Filiacao.nomePai.isEnabled()).toBeFalsy('Falha ao validar campo Nome do Pai');
        expect(Filiacao.nomeMae.isEnabled()).toBeFalsy('Falha ao validar campo Nome da Mãe');
    });

    it('Deve validar o tamanho máximo dos campos', () => {
        Filiacao.nomePai.clear();
        Estresse.estressarCampo(Filiacao.nomePai, 100);
        Filiacao.nomeMae.clear();
        Estresse.estressarCampo(Filiacao.nomeMae, 100);

        Estresse.avaliarLength(Filiacao.nomePai, Filiacao.tamanhoDosCampos.nomePai, 'Nome Pai');
        Estresse.avaliarLength(Filiacao.nomePai, Filiacao.tamanhoDosCampos.nomePai, 'Nome Mãe');
    });

    it('Deve alterar nomes de Mãe e Pai', () => {
        let nomeDoPai = 'Zé Ramalho';
        let nomeDaMae = 'Marisa Monte';

        Filiacao.nomePai.clear();
        Filiacao.nomePai.sendKeys(nomeDoPai);

        Filiacao.nomeMae.clear();
        Filiacao.nomeMae.sendKeys(nomeDaMae);

        Cadastro.atualizaCadastro();
        Menu.navegaParaAlteracaoCadastral();
        altera.buscaCpf(cpf);
        altera.clicaSecao('filiacao', cpf);

        expect(Filiacao.nomePai.getAttribute('value')).toBe(nomeDoPai.toUpperCase(), 'Falha ao validar nome do Pai');
        expect(Filiacao.nomeMae.getAttribute('value')).toBe(nomeDaMae.toUpperCase(), 'Falha ao validar nome do Pai');
    });
});
