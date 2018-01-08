let Renda = require('./renda.po');
let Mensagem = require('../../comum/mensagem');
let Estresse = require('../../comum/estresse');
let Menu = require('../../menu/menu.po');
let Cadastro = require('../cadastro/cadastro.po');
let Data = require('../../comum/data');
let DadosCadastro = require('../fluxo-cadastro/dados-cadastro');
let RadioButton = require('../../widgets/radio-button');
let GeraCPF = require('../../comum/cpfCnpj');

describe('Renda', () => {
    describe('Formulário', () => {
        beforeEach(() => {
            Renda.acessaPagina();
            Renda.botaoNovo.click();
        });

        it('Validar que Campo "Tipo Controle" vem com valor "Privado" por padrão', () => {
            expect(Renda.tipoControle.getAttribute('value')).toBe('PRIVADO', 'Falha ao validar Tipo Controle');           
        });

        it('deve validar os campos obrigatórios', () => {
            Renda.setFolhaLayout();

            Renda.botaoSalvar.click();

            expect(Mensagem.obrigatoriedade(Renda.cnpj)).toBeTruthy('Falha ao validar obrigatoriedade do campo cpnj');
            expect(Mensagem.obrigatoriedade(Renda.nome)).toBeTruthy('Falha ao validar obrigatoriedade do campo nome');
            expect(Renda.tipoControle.evaluate(Renda.tipoControle.getAttribute('ng-model'))).toBe("PRIVADO", 'Falha ao validar Tipo Controle');
            expect(Mensagem.obrigatoriedade(Renda.remuneracao)).toBeTruthy('Falha ao validar obrigatoriedade do campo remuneração');
            expect(Mensagem.obrigatoriedade(Renda.dataRenda)).toBeTruthy('Falha ao validar obrigatoriedade do campo data renda');
            expect(Mensagem.obrigatoriedade(Renda.tipo)).toBeTruthy('Falha ao validar obrigatoriedade do campo tipo');
        });

        it('deve validar tamanho máximo dos campos "Nome", "Renda" da seção', () => {
            Estresse.estressarCampo(Renda.nome, 100);
            Estresse.estressarCampo(Renda.remuneracao, 20);

            Estresse.avaliarLength(Renda.nome, Renda.tamanhoDosCampos.nome, 'Nome');
            Estresse.avaliarLength(Renda.remuneracao, Renda.tamanhoDosCampos.remuneracao, 'Remuneração');
        });

        it('Deve clicar nos radios e validar respectivos campos', () => {
            RadioButton.clicaRadio('$ctrl.fontePagadora.tipo', 'cpf');
            expect(Renda.cpf.isDisplayed()).toBe(true, 'Falha ao validar campo cpf');
            expect(Renda.cpf.isEnabled()).toBe(true, 'Falha ao validar campor cpf');

            expect(Renda.nome.isDisplayed()).toBe(true, 'Falha ao validar campo nome');
            expect(Renda.nome.isEnabled()).toBe(true, 'Falha ao validar campo nome');

            RadioButton.clicaRadio('$ctrl.fontePagadora.tipo', 'semCnpj');
            expect(Renda.nome.isDisplayed()).toBe(true, 'Falha ao validar campo nome');
            expect(Renda.nome.isEnabled()).toBe(true, 'Falha ao validar campo nome');

            RadioButton.clicaRadio('$ctrl.fontePagadora.tipo', 'cnpj');
            expect(Renda.cnpj.isDisplayed()).toBe(true, 'Falha ao validar campo cnpj');
            expect(Renda.cnpj.isEnabled()).toBe(true, 'Falha ao validar campo cnpj');

            expect(Renda.nome.isDisplayed()).toBe(true, 'Falha ao validar campo nome');
            expect(Renda.nome.isEnabled()).toBe(true, 'Falha ao validar campo nome');        
        });
        
        it('Campo "Renda" deve aceitar apenas números', () => {
            let rendaInvalida = '*%5555'
            let rendaValida = '55,55'

            Renda.remuneracao.clear();
            Renda.remuneracao.sendKeys(rendaInvalida);
            expect(Renda.remuneracao.getAttribute('value')).toBe('R$ '+ rendaValida, 'Falha ao validar remuneração');
        });

        it('Campo "Data Admissão" não deve aceitar data futura nem inválida', () => {
            let dataInvalida = '99/99/9999'

            Renda.dataAdmissao.clear();
            Renda.dataAdmissao.sendKeys(Data.dataFutura());
            expect(Renda.dataAdmissao.getAttribute('value')).toBe(Data.dataAtual(), 'Falha ao apresentar data atual');
            
            Renda.dataAdmissao.clear();
            Renda.dataAdmissao.sendKeys(dataInvalida + protractor.Key.TAB);
            expect(Renda.dataAdmissao.getAttribute('value')).toBe('', 'Falha ao validar data inválida');
        });

        it('Campo "Data Renda" não deve aceitar data futura nem inválida', () => {
            let dataInvalida = '99/99/9999'

            Renda.dataRenda.clear();
            Renda.dataRenda.sendKeys(Data.dataFutura());
            expect(Renda.dataRenda.getAttribute('value')).toBe(Data.dataAtual(), 'Falha ao apresentar data atual');
            
            Renda.dataRenda.clear();
            Renda.dataRenda.sendKeys(dataInvalida + protractor.Key.TAB);
            expect(Renda.dataRenda.getAttribute('value')).toBe('', 'Falha ao validar data inválida');
        });

        it('Campo "Data Atualização" deve aceitar apenas mês e ano', () => {
            let dataInvalida = '99/99/9999'
            
            Renda.dataAtualizacao.clear();
            Renda.dataAtualizacao.sendKeys(dataInvalida + protractor.Key.TAB);
            expect(Renda.dataAtualizacao.getAttribute('value')).toBe('', 'Falha ao validar data invalida');
        });

        it('Campo "Data Atualização" não deve aceitar data futura', () => {
            let dataFutura = '122066';
        
            Renda.dataAtualizacao.clear();
            Renda.dataAtualizacao.sendKeys(dataFutura + protractor.Key.TAB);
            expect(Renda.dataAtualizacao.getAttribute('value')).toBe(Data.dataAtualMesAno(), 'Falha ao validar data futura');
        });

        it('Campo "Data Atualização" deve aceitar apenas mês e ano', () => {
            let dataInvalida = '12122017';
            let dataValida = '12/1220';
        
            Renda.dataAtualizacao.clear();
            Renda.dataAtualizacao.sendKeys(dataInvalida + protractor.Key.TAB);
            expect(Renda.dataAtualizacao.getAttribute('value')).toBe(dataValida, 'Falha ao validar data futura');
        });
            
        it('deve validar CNPJ inválido', () => {
            let cnpjInvalido = '00000000000000';
            Renda.cnpj.sendKeys(cnpjInvalido + protractor.Key.TAB);

            expect(Mensagem.textoMensagem(Renda.cnpj)).toBe('CNPJ inválido', 'Falha ao validar CNPJ');
        });

        it('deve validar CNPJ valido', () => {
            let cnpjValido = '44334673000153';
            Renda.cnpj.sendKeys(cnpjValido + protractor.Key.TAB);

            expect(Mensagem.visivel(Renda.cnpj)).toBeFalsy('Falha ao validar cnpj');
        });

        it('deve validar CPF inválido', () => {
            let cpfIndex = 1;
            Renda.clicaTiposDeFontePagadora(cpfIndex);

            let cpfInvalido = '00000000000';
            Renda.cpf.sendKeys(cpfInvalido + protractor.Key.TAB);

            expect(Mensagem.textoMensagem(Renda.cpf)).toBe('CPF inválido', 'Falha ao validar CPF');
        });

        it('deve validar CPF valido', () => {
            let cpfIndex = 1;
            Renda.clicaTiposDeFontePagadora(cpfIndex);

            let cpfValido = '03283855145';
            Renda.cpf.sendKeys(cpfValido + protractor.Key.TAB);

            expect(Mensagem.visivel(Renda.cpf)).toBeFalsy('Falha ao validar cpf');
        });

        it('deve validar fonte SEM CNPJ', () => {
            var semCnpjIndex = 2;
            Renda.clicaTiposDeFontePagadora(semCnpjIndex);

            expect(Renda.cnpj.isPresent()).toBeFalsy('Falha ao validar campo cnpj');
            expect(Renda.cpf.isDisplayed()).toBeFalsy('Falha ao validar campo cnpj');
        });

        it('Deve validar que o histórico de rendas cadastradas é retornado a partir da pesquisa', () => {
            Renda.fontePagadora('Empresa1' + protractor.Key.ENTER);    
        
            expect(Renda.cnpj.getAttribute('value')).toBe('80.429.012/0001-75', 'Falha ao validar CNPJ');
            expect(Renda.nome.getAttribute('value')).toBe('Empresa1', 'Falha ao validar nome');
            expect(Renda.ramo.getAttribute('value')).toBe('PRESTACAO_SERVICOS', 'Falha ao validar ramo');
            expect(Renda.tipoControle.isEnabled()).toBe(false, 'Falha ao validar tipo Controle');
        });

        it('deve desabilitar os campos da fonte pagadora, COM CNPJ cadastrado no SAU', () => {
            Renda.fontePagadora('Empresa');
            
            expect(Renda.cnpj.isDisplayed()).toBeTruthy('Falha ao validar campo cpnj');
            expect(Renda.nome.isDisplayed()).toBeTruthy('Falha ao validar campo nome');
            expect(Renda.folhaLayout.isDisplayed()).toBeTruthy('Falha ao validar campo layout');
            expect(Renda.creditoConsignado.isDisplayed()).toBeTruthy('Falha ao validar campo credito consignado');
            expect(Renda.tipoControle.isDisplayed()).toBeTruthy('Falha ao validar campo controle');
            expect(Renda.ramo.isDisplayed()).toBeTruthy('Falha ao validar campo ramo');
            expect(Renda.entidadeCooperativa.isDisplayed()).toBeTruthy('Falha ao validar campo entidade cooperativa');
        });
    });
});
