let Documentos = require('./documentos.po');
let Mensagem = require('../../../comum/mensagem');
let Data = require('../../../comum/data');
let Estresse = require('../../../comum/estresse');
let ModalMotorista = require('../../../comum/modal');
let Gerador = require('../../../comum/cpfCnpj');

describe('Documentos', () => {
    beforeEach(() => {
        let cpf = Gerador.getCPF().replace('.','').replace('.','').replace('-','');
        Documentos.acessaPagina(cpf);
        Documentos.sessao.element(by.css('.step-section')).click();
    });

    it('campos "Modalidade Representante Legal" e "Nacionalidade" devem vir preenchidos por default', () => {
        
        let modalidadePadrao = Documentos.modalidadeRepresentanteLegal.element(by.css('span.select2-chosen:not(.ng-hide)'));
        let nacionalidadePadrao = Documentos.nacionalidade.element(by.css('span.select2-chosen:not(.ng-hide)'));

        expect(modalidadePadrao.getText()).toEqual("NENHUM");
        expect(nacionalidadePadrao.getText()).toEqual("BRASIL");
    });

    it('não deve mostrar campos "UF" e "Naturalidade" caso Nacionalidade não seja BRASIL', () => {
        
        Documentos.setNacionalidade('argentina');

        expect(Documentos.uf.isDisplayed()).toBe(false);
        expect(Documentos.naturalidade.isDisplayed()).toBe(false);
    });

    it('deve alterar campo "Modalidade Rep. Legal" para "PF Menor de Idade" caso seja menor de idade', () => {
        
        let hoje = Data.dataAtual();

        Documentos.dataNascimento.sendKeys(hoje);
        element(by.css('body')).click();

        let conteudoSelecionado = Documentos.modalidadeRepresentanteLegal.element(by.css('span.select2-chosen:not(.ng-hide)'));
        expect(conteudoSelecionado.getText()).toEqual("PESSOA FÍSICA MENOR DE IDADE");
    });

    it('deve limpar campo "Data Emissão" caso "Data Nascimento" seja maior que a mesma', () => {
       
        let hoje = Data.dataAtual();

        Documentos.dataEmissao.sendKeys('01011993');
        Documentos.dataNascimento.sendKeys(hoje);
        element(by.css('body')).click();

        expect(Documentos.dataEmissao.evaluate(Documentos.dataEmissao.getAttribute('ng-model'))).toEqual(null);
    });

    it('deve aceitar data válida', () => {
       
        let dataValida = Data.dataAtual();

        Documentos.dataEmissao.sendKeys(dataValida);
        Documentos.dataNascimento.sendKeys(dataValida);
        element(by.css('body')).click();

        expect(Data.formataData(Documentos.dataEmissao)).toEqual(dataValida);
        expect(Data.formataData(Documentos.dataNascimento)).toEqual(dataValida);
    });

    it('não deve aceitar data inválida', () => {
       
        let dataInvalida = '99/99/9999'

        Documentos.dataEmissao.sendKeys(dataInvalida);
        Documentos.dataNascimento.sendKeys(dataInvalida);
        element(by.css('body')).click();

        expect(Documentos.dataEmissao.evaluate(
            Documentos.dataEmissao.getAttribute('ng-model'))).toBe(null);
        expect(Documentos.dataNascimento.evaluate(
            Documentos.dataNascimento.getAttribute('ng-model'))).toBe(null);
    });

    it('deve mostrar obrigatoriedade de campo "Naturalidade" se "UF" for selecionado', () => {
       
        Documentos.setUf();

        let labelNaturalidade = element(by.css('label[for="naturalidade"]'));
        let mensagem = labelNaturalidade.element(by.css('label.erroUiSelect'));
        expect(mensagem.isDisplayed()).toBe(true);
    });

    it('deve validar obrigatoriedade dos campos da seção', () => {
    
        Mensagem.ativarCampo(Documentos.numeroIdentificacao);
        Mensagem.ativarCampo(Documentos.dataEmissao);
        Mensagem.ativarCampo(Documentos.dataNascimento);

        expect(Mensagem.obrigatoriedade(Documentos.numeroIdentificacao)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(Documentos.dataEmissao)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(Documentos.dataNascimento)).toBeTruthy();
    });

    it('deve validar tamanho máximo dos campos da seção', () => {
      
        Estresse.estressarCampo(Documentos.numeroIdentificacao, 100);
        Estresse.estressarCampo(Documentos.protocoloBRSafe, 100);

        Estresse.avaliarLength(Documentos.numeroIdentificacao, Documentos.tamanhoDosCampos.numeroIdentificacao);
        Estresse.avaliarLength(Documentos.protocoloBRSafe, Documentos.tamanhoDosCampos.protocoloBRSafe);
    });

    it('deve habilitar a seção Representante Legal se menor de idade', () => {
        
        let hoje = Data.dataAtual();

        Documentos.dataNascimento.sendKeys(hoje);
        Documentos.dataNascimento.sendKeys(protractor.Key.TAB);

        var sessaoRepresentanteLegal = element(by.css('[titulo="Representante Legal"]'));
        expect(sessaoRepresentanteLegal.isDisplayed()).toBe(true);
    });

    it('deve habilitar campo Orgão Expedidor somente depois de selecionado Tipo de Identificação', () => {
        
        expect(Documentos.orgaoExpedidor.isEnabled()).toBe(false);
        Documentos.setTipoIdentificacao();
        expect(Documentos.orgaoExpedidor.isEnabled()).toBe(true);

    });

    it('Validar que campo Número de Identificação aceita apenas números e letras', () => {
        
        Documentos.numeroIdentificacao.sendKeys('999');
        expect(Mensagem.obrigatoriedade(Documentos.numeroIdentificacao)).toBeFalsy();
        Documentos.numeroIdentificacao.clear();

        Documentos.numeroIdentificacao.sendKeys('NNN');
        expect(Mensagem.obrigatoriedade(Documentos.numeroIdentificacao)).toBeFalsy();
        Documentos.numeroIdentificacao.clear();

        Documentos.numeroIdentificacao.sendKeys('!@##$%%¨');
        expect(Mensagem.obrigatoriedade(Documentos.numeroIdentificacao)).toBeTruthy();
        expect(Mensagem.textoMensagem(Documentos.numeroIdentificacao)).toBe('Número inválido');

    });

    it('Validar data de nascimento ao setar Carteira de Motorista para menor de idade', () => {
       
        Documentos.dataNascimento.sendKeys(Data.dataAtual()).then(() => {
            Documentos.setTipoIdentificacao('Cart. Motorista');
            expect(ModalMotorista.getModalMsg()).toBe("Para possuir carteira de motorista o cadastrado deve ser maior de 18 anos.", "Falha ao comparar texto Modal");
            ModalMotorista.clickModalBtn();
        })

        Documentos.setTipoIdentificacao('Cart. Motorista').then(() => {
            Documentos.dataNascimento.sendKeys(Data.dataAtual() + protractor.Key.TAB);
            expect(Documentos.dataNascimento.getAttribute('value')).toBe(Data.data18Anos(), "Falha ao comparar idade Carteira Motorista");
            expect(Documentos.tipoIdentificacao.evaluate(
                Documentos.tipoIdentificacao.getAttribute('ng-model'))).toBe('CARTEIRA_MOTORISTA', 'Falha ao validar Tipo de Identificação');
        })

    });

    it('Validar que Data de Emissão não pode ser setada para o futuro', () => {
        
        Documentos.dataNascimento.clear();
        Documentos.dataEmissao.sendKeys(Data.dataFutura());
        expect(Documentos.dataEmissao.getAttribute('value')).toBe(Data.dataAtual(), 'Falha ao apresentar data atual');

    });

    it('Validar que Data de Nascimento não pode ser setada para o futuro', () => {
        
        Documentos.dataNascimento.clear();
        Documentos.dataNascimento.sendKeys(Data.dataFutura());
        expect(Documentos.dataNascimento.getAttribute('value')).toBe(Data.dataAtual(), 'Falha ao apresentar data atual');

    });

    it('Validar que o campo Protocolo BRSAFE aceita apenas números', () => {
        
        Documentos.protocoloBRSafe.sendKeys('NNN');
        expect(Mensagem.obrigatoriedade(Documentos.protocoloBRSafe)).toBeFalsy;
        Documentos.protocoloBRSafe.clear();

        Documentos.protocoloBRSafe.sendKeys('@##$%&*');
        expect(Mensagem.obrigatoriedade(Documentos.protocoloBRSafe)).toBeFalsy;
        Documentos.protocoloBRSafe.clear();

        Documentos.protocoloBRSafe.sendKeys('12345');
        expect(Mensagem.obrigatoriedade(Documentos.protocoloBRSafe)).toBeTruthy;
        Documentos.protocoloBRSafe.clear();
       
    });

});