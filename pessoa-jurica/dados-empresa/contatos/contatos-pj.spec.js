let CnpjNome = require('../dados-cpf-nome/dados-cnpj-nome.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let DadosCadastro = require('../../../pessoa-fisica/fluxo-cadastro/dados-cadastro');
let Gerador = require('../../../comum/cpfCnpj');
let Contatos = require('./contatos-pj.po');
let cnpj = '';

describe('Contatos PJ', () => {
    beforeEach(() => {
        cnpj = Gerador.getCNPJ();
        CnpjNome.acessaPagina(cnpj);
        Contatos.abreSecao();
        Contatos.clicaNovo();
    });

    it('Deve validar obrigatoriedade dos campos de Telefone', () => {
        Contatos.clicaSalvar();
        expect(Mensagem.obrigatoriedade(Contatos.tipoTelefone)).toBeTruthy('Falha ao validar campo Tipo Telefone');
        expect(Mensagem.obrigatoriedade(Contatos.numeroTelefone)).toBeTruthy('Falha ao validar campo Nr.Telefone');
        
        Contatos.setTipoContato();
        Contatos.clicaSalvar();
        expect(Mensagem.obrigatoriedade(Contatos.tipoEmail)).toBeTruthy('Falha ao validar campo Tipo email');
        expect(Mensagem.obrigatoriedade(Contatos.email)).toBeTruthy('Falha ao validar campo email');
    });

    it('deve mostrar mensagem de lista vazia inicialmente', () => {
        let tableRows = Contatos.getTableRowsTelefone();

        expect(Contatos.listaVazia.isDisplayed()).toBeTruthy();
        expect(tableRows.count()).toEqual(0);
    });

    it('Valida tamanho dos campos', () => {
        Estresse.estressarCampo(Contatos.observacoesTelefone, 100);
        Estresse.avaliarLength(Contatos.observacoesTelefone, Contatos.tamanhoDosCampos.observacoesTelefone);
        
        Contatos.setTipoContato();
        Estresse.estressarCampo(Contatos.observacoesEmail, 300);
        Estresse.avaliarLength(Contatos.observacoesEmail, Contatos.tamanhoDosCampos.observacoesEmail);
    });

    it('deve validar telefone', () => {
        Contatos.numeroTelefone.sendKeys('0' + protractor.Key.TAB);

        expect(Mensagem.obrigatoriedade(Contatos.numeroTelefone)).toBeTruthy();
        expect(Mensagem.textoMensagem(Contatos.numeroTelefone)).toEqual('Telefone inválido');
    });


    xit('Deve validar tamanho do campo email', ()=>{
        Estresse.estressarCampo(Contatos.email, 100);
        Estresse.avaliarLength(Contatos.email, Contatos.tamanhoDosCampos.email);
    });
    
    it('Deve preencher campos obrigatorios de Telefone e salvar', () => {
        let foneFormatado = '(51) 9999-9999';
        let linha = Contatos.getTableRowsTelefone().first();
        
        Contatos.preencheCamposObrigatoriosTelefone();
        Contatos.clicaSalvar();           
    
        expect(linha.element(Contatos.byColunaTipoTelefone).getText()).toBe('residencial'.toUpperCase(), 'Falha ao validar campo Tipo Telefone');
        expect(linha.element(Contatos.byColunaContatoTelefone).getText()).toBe(foneFormatado, 'Falha ao validar campo Contato');
        expect(linha.element(Contatos.byColunaObservacoes).getText()).toBe('obs telefone'.toUpperCase(), 'Falha ao validar campo Observacoes');
    });

    it('Deve preencher campos obrigatorios de Email e salvar', () => {
        let linha = Contatos.getTableRowsEmail().first();
        
        Contatos.preencheCamposObrigatoriosEmail();
        Contatos.clicaSalvar();           
    
        expect(linha.element(Contatos.byColunaTipoEmail).getText()).toBe('pessoal'.toUpperCase(), 'Falha ao validar campo Tipo Telefone');
        expect(linha.element(Contatos.byColunaContatoEmail).getText()).toBe('teste@gmail.com'.toUpperCase(), 'Falha ao validar campo Contato');
        expect(linha.element(Contatos.byColunaObservacoes).getText()).toBe('obs email'.toUpperCase(), 'Falha ao validar campo Observacoes');
    });
});