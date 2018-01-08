let LimiteCartao = require('./limite-cartao.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Menu = require('../../../menu/menu.po');
let Cadastro = require('../../cadastro/cadastro.po');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Data = require('../../../comum/data');
let cpf = '';

describe('Produtos e Serviços', () => {
    describe('Limite Cartão de Crédito', () => {
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
            LimiteCartao.abreSecao();
        });

        it('Deve validar tamanho máximo dos campos', () => {
            LimiteCartao.setLinhaCredito('debito');
            Estresse.estressarCampo(LimiteCartao.finalidade, 200);
            Estresse.estressarCampo(LimiteCartao.valor, 30);

            Estresse.avaliarLength(LimiteCartao.finalidade, LimiteCartao.tamanhoDosCampos.finalidade);
            Estresse.avaliarLengthValor(LimiteCartao.valor);
        });

        it('Deve validar campos obrigatórios', () => {
            LimiteCartao.setLinhaCredito('debito');
            LimiteCartao.clicaSalvar();

            expect(Mensagem.obrigatoriedade(LimiteCartao.valor)).toBeTruthy('Falha ao validar campo valor');
            expect(Mensagem.obrigatoriedade(LimiteCartao.tipoVencimento)).toBeTruthy('Falha ao validar campo Tipo Vencimento');
            expect(Mensagem.obrigatoriedade(LimiteCartao.finalidade)).toBeTruthy('Falha ao validar campo Finalidade');
        });

        it('Deve validar que todos os campos, exceto "Linha de Crédito", vêm desabilitados por padrão', () => {
            expect(LimiteCartao.linhaCredito.isEnabled()).toBeTruthy('Falha ao validar campo Linha Crédito');
            expect(LimiteCartao.taxaAm.isEnabled()).toBeFalsy('Falha ao validar campo Taxa');
            expect(LimiteCartao.valor.isEnabled()).toBeFalsy('Falha ao validar campo Valor');
            expect(LimiteCartao.tipoVencimento.isEnabled()).toBeFalsy('Falha ao validar campo Tipo Vencimento');
            expect(LimiteCartao.finalidade.isEnabled()).toBeFalsy('Falha ao validar campo Finalidade');
        });

        it('Deve validar que campo "Valor não aceita letras e caracteres especiais"', () => {
            let valorInvalido = '*%AB25000';
            let valorValido = 'R$ 250,00';
            
            LimiteCartao.setLinhaCredito('debito');
            LimiteCartao.valor.clear();
            LimiteCartao.valor.sendKeys(valorInvalido + protractor.Key.TAB);
            expect(LimiteCartao.valor.getAttribute('value')).toBe(valorValido, 'Falha ao validar campo valor');
        });

        it('Deve validar que campo "Taxa a.m" só aceita números', () => {
            let taxaInvalida = '*%AB8000';
            let taxaValida = '80,00%';

            LimiteCartao.setLinhaCredito('debito');
            LimiteCartao.taxaAm.clear();
            LimiteCartao.taxaAm.sendKeys(taxaInvalida + protractor.Key.TAB);
            expect(LimiteCartao.taxaAm.getAttribute('value')).toBe(taxaValida, 'Falha ao validar campo valor');
        });

        it('Deve validar que valor máximo do campo "Taxa a.m" é de 100%', () => {
            let taxaInvalida = '25000';

            LimiteCartao.setLinhaCredito('debito');
            LimiteCartao.taxaAm.clear();
            LimiteCartao.taxaAm.sendKeys(taxaInvalida + protractor.Key.TAB);
            expect(Mensagem.textoMensagem(LimiteCartao.taxaAm)).toBe('Valor máximo é 100 %', 'Falha ao validar taxa máxima do campo "Taxa A.M"');
        });

        it('Deve validar "Taxa.am" conforme Linha de Crédito', () => {
            let taxaZeroUm = '0,01 %';
            let taxaZero = '0,00 %';

            LimiteCartao.setLinhaCredito('CARTAO MASTER-PF C507');
            expect(LimiteCartao.taxaAm.isEnabled()).toBeTruthy('Falha ao validar campo Taxa');
            expect(LimiteCartao.taxaAm.getAttribute('value')).toBe(taxaZeroUm, 'Falha ao validar campo taxa');

            LimiteCartao.setLinhaCredito('CARTAO MASTER-PJ');
            expect(LimiteCartao.taxaAm.isEnabled()).toBeTruthy('Falha ao validar campo Taxa');
            expect(LimiteCartao.taxaAm.getAttribute('value')).toBe(taxaZeroUm, 'Falha ao validar campo taxa');

            LimiteCartao.setLinhaCredito('CARTAO MASTERCARD BLACK');
            expect(LimiteCartao.taxaAm.isEnabled()).toBeTruthy('Falha ao validar campo Taxa');
            expect(LimiteCartao.taxaAm.getAttribute('value')).toBe(taxaZero, 'Falha ao validar campo taxa');

            LimiteCartao.setLinhaCredito('CARTAO DE DEBITO');
            expect(LimiteCartao.taxaAm.isEnabled()).toBeTruthy('Falha ao validar campo Taxa');
            expect(LimiteCartao.taxaAm.getAttribute('value')).toBe(taxaZero, 'Falha ao validar campo taxa');

            LimiteCartao.setLinhaCredito('CARTAO DE CREDITO E DEBITO CONTA ABERTA');
            expect(LimiteCartao.taxaAm.isEnabled()).toBeTruthy('Falha ao validar campo Taxa');
            expect(LimiteCartao.taxaAm.getAttribute('value')).toBe(taxaZero, 'Falha ao validar campo taxa');

            LimiteCartao.setLinhaCredito('CARTAO DE CREDITO - ALTERACAO  C/ UPGRADE');
            expect(LimiteCartao.taxaAm.isEnabled()).toBeTruthy('Falha ao validar campo Taxa');
            expect(LimiteCartao.taxaAm.getAttribute('value')).toBe(taxaZero, 'Falha ao validar campo taxa');

            LimiteCartao.setLinhaCredito('CARTAO DE CREDITO - ALTERACAO  C/ DOWNGRADE');
            expect(LimiteCartao.taxaAm.isEnabled()).toBeTruthy('Falha ao validar campo Taxa');
            expect(LimiteCartao.taxaAm.getAttribute('value')).toBe(taxaZero, 'Falha ao validar campo taxa');

            LimiteCartao.setLinhaCredito('CARTAO DE CREDITO - ALTERACAO DE LIMITE');
            expect(LimiteCartao.taxaAm.isEnabled()).toBeTruthy('Falha ao validar campo Taxa');
            expect(LimiteCartao.taxaAm.getAttribute('value')).toBe(taxaZero, 'Falha ao validar campo taxa');

            LimiteCartao.setLinhaCredito('CARTAO ADICIONAL MASTERCARD');
            expect(LimiteCartao.taxaAm.isEnabled()).toBeTruthy('Falha ao validar campo Taxa');
            expect(LimiteCartao.taxaAm.getAttribute('value')).toBe(taxaZero, 'Falha ao validar campo taxa');

            LimiteCartao.setLinhaCredito('CARTAO DE DÉBITO E CRÉDITO - CTA ANTIGA');
            expect(LimiteCartao.taxaAm.isEnabled()).toBeTruthy('Falha ao validar campo Taxa');
            expect(LimiteCartao.taxaAm.getAttribute('value')).toBe(taxaZero, 'Falha ao validar campo taxa');
        });

        it('Deve Cadastrar Limite para Cartão de Crédito', () => {
            LimiteCartao.preencheCampos();
            LimiteCartao.clicaSalvar().then(()=>{
                expect(LimiteCartao.mensagemSucesso.isPresent()).toBeTruthy('Falha ai validar mensagem de sucesso');
            });
        });
    });
});

