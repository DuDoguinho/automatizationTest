let LimiteChequeEspecial = require('./limite-cheque-especial.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Menu = require('../../../menu/menu.po');
let Cadastro = require('../../cadastro/cadastro.po');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Data = require('../../../comum/data');
let cpf = '';

describe('Produtos e Serviços', () => {
    describe('Limite Cheque Especial', () => {
        beforeEach(() => {
            Menu.navegaParaHome();
            Menu.navegaParaCadastroPF();
            if (!cpf) {
                cpf = Cadastro.cadastraPessoaFisicaSimples(DadosCadastro);
                Menu.navegaParaCadastroPF();
                Cadastro.buscaCpf(cpf);
                Cadastro.cadastraMatricula();
                Menu.navegaParaCadastroPF();
                Cadastro.buscaCpf(cpf);
                Menu.navegaParaConta();
                Cadastro.cadastraConta(cpf);
                Menu.navegaParaCadastroPF();
            }
            Cadastro.buscaCpf(cpf);
            Menu.navegaParaProdutosServicos();
            LimiteChequeEspecial.abreSecao();
        });

        it('Deve validar tamanho máximo dos campos', () => {
            LimiteChequeEspecial.setLinhaCredito('abertura conta');
            Estresse.estressarCampo(LimiteChequeEspecial.finalidade, 200);
            Estresse.estressarCampo(LimiteChequeEspecial.valor, 30);

            Estresse.avaliarLength(LimiteChequeEspecial.finalidade, LimiteChequeEspecial.tamanhoDosCampos.finalidade);
            Estresse.avaliarLengthValor(LimiteChequeEspecial.valor);
        });

        it('Deve validar campos obrigatórios', () => {
            LimiteChequeEspecial.setLinhaCredito('abertura conta');
            LimiteChequeEspecial.clicaSalvar();

            expect(Mensagem.obrigatoriedade(LimiteChequeEspecial.valor)).toBeTruthy('Falha ao validar campo valor');
            expect(Mensagem.obrigatoriedade(LimiteChequeEspecial.tipoVencimento)).toBeTruthy('Falha ao validar campo Tipo Vencimento');
            expect(Mensagem.obrigatoriedade(LimiteChequeEspecial.finalidade)).toBeTruthy('Falha ao validar campo Finalidade');
        });

        it('Deve validar que todos os campos, exceto "Linha de Crédito", vêm desabilitados por padrão', () => {
            expect(LimiteChequeEspecial.linhaCredito.isEnabled()).toBeTruthy('Falha ao validar campo Linha Crédito');
            expect(LimiteChequeEspecial.taxaAm.isEnabled()).toBeFalsy('Falha ao validar campo Taxa');
            expect(LimiteChequeEspecial.valor.isEnabled()).toBeFalsy('Falha ao validar campo Valor');
            expect(LimiteChequeEspecial.tipoVencimento.isEnabled()).toBeFalsy('Falha ao validar campo Tipo Vencimento');
            expect(LimiteChequeEspecial.finalidade.isEnabled()).toBeFalsy('Falha ao validar campo Finalidade');
        });

        it('Deve validar que campo "Valor não aceita letras e caracteres especiais"', () => {
            let valorInvalido = '*%AB25000';
            let valorValido = 'R$ 250,00';
            
            LimiteChequeEspecial.setLinhaCredito('abertura conta');
            LimiteChequeEspecial.valor.clear();
            LimiteChequeEspecial.valor.sendKeys(valorInvalido + protractor.Key.TAB);
            expect(LimiteChequeEspecial.valor.getAttribute('value')).toBe(valorValido, 'Falha ao validar campo valor');
        });

        it('Deve validar que campo "Taxa a.m" só aceita números', () => {
            let taxaInvalida = '*%AB8000';
            let taxaValida = '80,00%';

            LimiteChequeEspecial.setLinhaCredito('abertura conta');
            LimiteChequeEspecial.taxaAm.clear();
            LimiteChequeEspecial.taxaAm.sendKeys(taxaInvalida + protractor.Key.TAB);
            expect(LimiteChequeEspecial.taxaAm.getAttribute('value')).toBe(taxaValida, 'Falha ao validar campo valor');
        });

        it('Deve validar que valor máximo do campo "Taxa a.m" é de 100%', () => {
            let taxaInvalida = '25000';

            LimiteChequeEspecial.setLinhaCredito('abertura conta');
            LimiteChequeEspecial.taxaAm.clear();
            LimiteChequeEspecial.taxaAm.sendKeys(taxaInvalida + protractor.Key.TAB);
            expect(Mensagem.textoMensagem(LimiteChequeEspecial.taxaAm)).toBe('Valor máximo é 100 %', 'Falha ao validar taxa máxima do campo "Taxa A.M"');
        });

        it('Deve validar "Taxa.am" conforme Linha de Crédito', () => {
            let taxa = '7,50 %';

            LimiteChequeEspecial.setLinhaCredito('CHEQUE ESPECIAL PF C507');
            expect(LimiteChequeEspecial.taxaAm.isEnabled()).toBeTruthy('Falha ao validar campo Taxa');
            expect(LimiteChequeEspecial.taxaAm.getAttribute('value')).toBe(taxa, 'Falha ao validar campo taxa');

            LimiteChequeEspecial.setLinhaCredito('CHEQUE ESPECIAL PJ');
            expect(LimiteChequeEspecial.taxaAm.isEnabled()).toBeTruthy('Falha ao validar campo Taxa');
            expect(LimiteChequeEspecial.taxaAm.getAttribute('value')).toBe(taxa, 'Falha ao validar campo taxa');

            LimiteChequeEspecial.setLinhaCredito('CHEQUE ESPECIAL PF ABERTURA CONTA');
            expect(LimiteChequeEspecial.taxaAm.isEnabled()).toBeTruthy('Falha ao validar campo Taxa');
            expect(LimiteChequeEspecial.taxaAm.getAttribute('value')).toBe(taxa, 'Falha ao validar campo taxa');
        });

        it('Deve Cadastrar Limite para Cartão de Crédito', () => {
            LimiteChequeEspecial.preencheCampos('abertura conta');
            LimiteChequeEspecial.clicaSalvar().then(()=>{
                expect(LimiteChequeEspecial.mensagemSucesso.isPresent()).toBeTruthy('Falha ai validar mensagem de sucesso');
            });
        });
    });
});