let RepresentanteLegal = require('./representante-legal.po');
let Data = require('../../../comum/data');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Modal = require('../../../comum/modal');
let CpfCnpj = require('../../../comum/cpfCnpj');
let cpf = ''

describe('Representante Legal', () => {
    beforeAll(() => {
        cpf = CpfCnpj.getCPF().replace('.', '').replace('.', '').replace('-', '');
    })

    beforeEach(() => {
        RepresentanteLegal.acessaPagina(cpf);
        RepresentanteLegal.documentos.sessao.element(by.css('.step-section')).click();
        RepresentanteLegal.documentos.dataNascimento.sendKeys(Data.dataAtual());
        RepresentanteLegal.documentos.dataNascimento.sendKeys(protractor.Key.TAB);
        expect(RepresentanteLegal.sessao.isDisplayed()).toBe(true, "Falha ao localizar seção de Representante Legal");
        RepresentanteLegal.abreSessao();
    });

    it('deve validar os campos obrigatórios', () => {
        RepresentanteLegal.preencherCamposObrigatorios();
        RepresentanteLegal.limparCamposObrigatorios();
        
        expect(Mensagem.obrigatoriedade(RepresentanteLegal.cpf)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(RepresentanteLegal.nomeCompleto)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(RepresentanteLegal.tipoIdentificacao)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(RepresentanteLegal.numeroIdentificacao)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(RepresentanteLegal.orgaoExpedidor)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(RepresentanteLegal.ufExpedidor)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(RepresentanteLegal.dataEmissao)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(RepresentanteLegal.dataNascimento)).toBeTruthy();

        expect(Mensagem.obrigatoriedade(RepresentanteLegal.tipoEndereco)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(RepresentanteLegal.cep)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(RepresentanteLegal.logradouro)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(RepresentanteLegal.numero)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(RepresentanteLegal.bairro)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(RepresentanteLegal.estado)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(RepresentanteLegal.codigoCidade)).toBeTruthy();        
    });

    it('deve validar tamanho máximo dos campos da seção', () => {
        Estresse.estressarCampo(RepresentanteLegal.nomeCompleto, 100);
        Estresse.estressarCampo(RepresentanteLegal.numeroIdentificacao, 100);
        Estresse.estressarCampo(RepresentanteLegal.logradouro, 100);
        Estresse.estressarCampo(RepresentanteLegal.numero, 100);
        Estresse.estressarCampo(RepresentanteLegal.caixaPostal, 100);
        Estresse.estressarCampo(RepresentanteLegal.complemento, 100);
        Estresse.estressarCampo(RepresentanteLegal.bairro, 100);

        Estresse.avaliarLength(RepresentanteLegal.nomeCompleto, RepresentanteLegal.tamanhoDosCampos.nomeCompleto);
        Estresse.avaliarLength(RepresentanteLegal.numeroIdentificacao, RepresentanteLegal.tamanhoDosCampos.numeroIdentificacao);
        Estresse.avaliarLength(RepresentanteLegal.logradouro, RepresentanteLegal.tamanhoDosCampos.logradouro);
        Estresse.avaliarLength(RepresentanteLegal.numero, RepresentanteLegal.tamanhoDosCampos.numero);
        Estresse.avaliarLength(RepresentanteLegal.caixaPostal, RepresentanteLegal.tamanhoDosCampos.caixaPostal);
        Estresse.avaliarLength(RepresentanteLegal.complemento, RepresentanteLegal.tamanhoDosCampos.complemento);
        Estresse.avaliarLength(RepresentanteLegal.bairro, RepresentanteLegal.tamanhoDosCampos.bairro);
    });

    it('deve validar se é menor de idade e limpar Data de Nascimento se não confirmado', () => {
        let dataNascimento = Data.dataAtual();

        RepresentanteLegal.dataNascimento.sendKeys(dataNascimento);
        RepresentanteLegal.dataNascimento.sendKeys(protractor.Key.TAB);
        expect(Modal.getModalMsg()).toEqual('Confirma a menor idade do representante legal?');

        Modal.clickModalBtn('no');
        RepresentanteLegal.dataNascimento.sendKeys(protractor.Key.TAB);
        expect(RepresentanteLegal.dataNascimento.evaluate(
            RepresentanteLegal.dataNascimento.getAttribute('ng-model'))).toEqual(null);
    });

    it('deve validar se é menor de idade e não limpar Data de Nascimento se confirmado', () => {
        let dataNascimento = Data.dataAtual();

        RepresentanteLegal.dataNascimento.sendKeys(dataNascimento);
        RepresentanteLegal.dataNascimento.sendKeys(protractor.Key.TAB);
        expect(Modal.getModalMsg()).toEqual('Confirma a menor idade do representante legal?');

        Modal.clickModalBtn('yes');

        expect(Data.formataData(RepresentanteLegal.dataNascimento)).toEqual(dataNascimento);
    });

    it('deve limpar campo "Data Emissão" caso "Data Nascimento" seja maior que a mesma', () => {
        let hoje = Data.dataAtual();

        RepresentanteLegal.dataEmissao.sendKeys('01011993');
        RepresentanteLegal.dataNascimento.sendKeys(hoje);
        RepresentanteLegal.dataNascimento.sendKeys(protractor.Key.TAB);

        expect(RepresentanteLegal.dataEmissao.evaluate(
            RepresentanteLegal.dataEmissao.getAttribute('ng-model'))).toEqual({});
    });

    it('deve aceitar data válida', () => {
        let dataValida = Data.dataAtual();

        RepresentanteLegal.dataEmissao.sendKeys(dataValida);
        RepresentanteLegal.dataNascimento.sendKeys(dataValida);
        RepresentanteLegal.dataNascimento.sendKeys(protractor.Key.TAB);

        expect(Data.formataData(RepresentanteLegal.dataEmissao)).toEqual(dataValida);
        expect(Data.formataData(RepresentanteLegal.dataNascimento)).toEqual(dataValida);
    });

    it('não deve aceitar data inválida', () => {
        let dataInvalida = '99/99/9999'

        RepresentanteLegal.dataEmissao.sendKeys(dataInvalida);
        RepresentanteLegal.dataNascimento.sendKeys(dataInvalida);
        RepresentanteLegal.dataNascimento.sendKeys(protractor.Key.TAB);

        expect(RepresentanteLegal.dataEmissao.evaluate(
            RepresentanteLegal.dataEmissao.getAttribute('ng-model'))).toBe(null);
        expect(RepresentanteLegal.dataNascimento.evaluate(
            RepresentanteLegal.dataNascimento.getAttribute('ng-model'))).toBe(null);
    });

    it('Data de Emissao e data de Nascimento não devem aceitar data futura', () => {
        let dataFutura = '12/05/2055'
        RepresentanteLegal.dataEmissao.clear();
        RepresentanteLegal.dataEmissao.sendKeys(dataFutura + protractor.Key.TAB);
        RepresentanteLegal.dataNascimento.clear();
        RepresentanteLegal.dataNascimento.sendKeys(dataFutura + protractor.Key.TAB);

        expect(RepresentanteLegal.dataEmissao.getAttribute('value')).toEqual(Data.dataAtual());
        expect(RepresentanteLegal.dataNascimento.getAttribute('value')).toEqual(Data.dataAtual());
    });

    it('Deve apresentar modal quando for menor de idade e Doc. de identificação for Cart. Motorista e cancelar', () => {
        let MenorIdade = '11052011';
        RepresentanteLegal.setCartMotorista();
        RepresentanteLegal.numeroIdentificacao.clear();
        RepresentanteLegal.numeroIdentificacao.sendKeys('123456');
        RepresentanteLegal.setOrgaoCartMotorista();
        RepresentanteLegal.dataEmissao.clear();
        RepresentanteLegal.dataEmissao.sendKeys(Data.dataAtual());
        RepresentanteLegal.dataNascimento.clear();
        RepresentanteLegal.dataNascimento.sendKeys(MenorIdade + protractor.Key.TAB);

        expect(Modal.getModalMsg()).toEqual('Confirma a menor idade do representante legal?');

        Modal.clickModalBtn('no');
    });

    it('Número de identificação deve aceitar caracteres especias', () => {
        let docValido = "*8A%A"

        RepresentanteLegal.cpf.sendKeys(CpfCnpj.getCPF());
        RepresentanteLegal.setTipoIdentificacao();
        RepresentanteLegal.numeroIdentificacao.sendKeys(docValido);
        RepresentanteLegal.numeroIdentificacao.sendKeys(protractor.Key.TAB);
        expect(RepresentanteLegal.numeroIdentificacao.getAttribute('value')).toBe(docValido, 'Falha ao validar campo Nr.Identificação');
        RepresentanteLegal.numeroIdentificacao.clear();
    });

    it('Deve validar Comportamento ao selecionar Checkbox "Sem Número"', () => {
        RepresentanteLegal.enderecoSemNumero.click();
        expect(RepresentanteLegal.numero.isEnabled()).toBe(false);

        RepresentanteLegal.enderecoSemNumero.click();
        expect(RepresentanteLegal.numero.isEnabled()).toBe(true);
    });

    it('Campo caixa postal deve aceitar apenas números', () => {
        let postalInvalido = '*%5555'
        let postalValido = '5555'

        RepresentanteLegal.caixaPostal.clear();
        RepresentanteLegal.caixaPostal.sendKeys(postalInvalido);
        expect(RepresentanteLegal.caixaPostal.getAttribute('value')).toEqual(postalValido);
    });

    it('Busca por CEP deve validar campos', () => {
        let setCep = '90820120'

        RepresentanteLegal.setTipoEndereco();
        RepresentanteLegal.cep.clear();
        RepresentanteLegal.cep.sendKeys(setCep + protractor.Key.TAB);

        expect(RepresentanteLegal.logradouro.getAttribute('value')).toEqual('Rua Itapitocaí');
        expect(RepresentanteLegal.bairro.getAttribute('value')).toEqual('Cristal');
    });
});