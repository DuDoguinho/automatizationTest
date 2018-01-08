let Restricoes = require('./restricoes-acatadas.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let Data = require('../../../comum/data');

describe('Sessao Restricoes Acatadas', () => {
    beforeAll(() => {
        Restricoes.acessaPagina();
        Restricoes.abreSessao();
    });

    it('Deve validar campos obrigatórios, cancela e valida lista vazia', () => {
        Restricoes.clicaNovo();
        Restricoes.clicaSalvar();

        expect(Mensagem.obrigatoriedade(Restricoes.dataRestricao)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(Restricoes.observacao)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(Restricoes.valor)).toBeTruthy();
        expect(Mensagem.obrigatoriedade(Restricoes.tipoRestricao)).toBeTruthy();

        Restricoes.clicaCancelar();
        expect(Restricoes.listaVazia.isDisplayed()).toBe(true, 'Falha ao validar lista vazia');
    });

    it('Deve preencher e Salvar Restricoes Acatadas', () => {
        let obs = 'Preenchendo campo observacao'
        let valor = '1.300,00';
        let respons = 'Bilbo Baggins'
        let tipo = 'Acatado'

        Restricoes.clicaNovo();
        Restricoes.setDataRestricao(Data.dataAtual());
        Restricoes.preencheObservacao(obs);
        Restricoes.preencheValor(valor);
        Restricoes.preencheResponsavel(respons);
        Restricoes.setTipoRestricao(tipo);

        Restricoes.clicaSalvar().then(() => {
            expect(Restricoes.getTableRows().count()).toBe(1, "Falha ao validar inserção de Restrições Acatadas");
            let linha = Restricoes.getTableRows().first();
            expect(linha.element(Restricoes.byColunaData).getText()).toBe(Data.dataAtual(), "Falha ao validar Data na linha inserida de Restrições Acatadas.");
            expect(linha.element(Restricoes.byColunaObservacao).getText()).toBe(obs.toUpperCase(), "Falha ao validar Observação na linha inserida de Restrições Acatadas.");
            expect(linha.element(Restricoes.byColunaValor).getText()).toBe("R$ " + valor, "Falha ao validar Valor na linha inserida de Restrições Acatadas.");
            expect(linha.element(Restricoes.byColunaResponsavel).getText()).toBe(respons.toUpperCase(), "Falha ao validar Responsável na linha inserida de Restrições Acatadas.");
            expect(linha.element(Restricoes.byCOlunaTipo).getText()).toBe(tipo.toUpperCase(), "Falha ao validar Tipo na linha inserida de Restrições Acatadas.");
        });
    });

    it('Deve editar, limpar campos, preencher novos dados e salvar novamente', () => {
        let obs = 'Editando campo de observação'
        let valor = '5.000,00';
        let respons = 'Frodo Baggins'
        let tipo = 'Desacatado'

        Restricoes.editar();

        Restricoes.setDataRestricao(Data.dataAtual());
        Restricoes.observacao.clear();
        Restricoes.preencheObservacao(obs);
        Restricoes.valor.clear();
        Restricoes.preencheValor(valor);
        Restricoes.responsavel.clear();
        Restricoes.preencheResponsavel(respons);
        Restricoes.setTipoRestricao(tipo);

        Restricoes.clicaSalvar().then(() => {
            expect(Restricoes.getTableRows().count()).toBe(1, "Falha ao validar edição de Restrições Acatadas");
            let linha = Restricoes.getTableRows().first();
            expect(linha.element(Restricoes.byColunaData).getText()).toBe(Data.dataAtual(), "Falha ao validar Data na linha inserida de Restrições Acatadas.");
            expect(linha.element(Restricoes.byColunaObservacao).getText()).toBe(obs.toUpperCase(), "Falha ao validar Observação na linha inserida de Restrições Acatadas.");
            expect(linha.element(Restricoes.byColunaValor).getText()).toBe("R$ " + valor, "Falha ao validar Valor na linha inserida de Restrições Acatadas.");
            expect(linha.element(Restricoes.byColunaResponsavel).getText()).toBe(respons.toUpperCase(), "Falha ao validar Responsável na linha inserida de Restrições Acatadas.");
            expect(linha.element(Restricoes.byCOlunaTipo).getText()).toBe(tipo.toUpperCase(), "Falha ao validar Tipo na linha inserida de Restrições Acatadas.");
        });
    });

    it('Deve validar número máximo de caracteres nos campos de "Observacao", "Valor" e Responsável', () => {
        Restricoes.clicaNovo();
        Estresse.estressarCampo(Restricoes.observacao, 100);
        Estresse.estressarCampo(Restricoes.valor, 30);
        Estresse.estressarCampo(Restricoes.responsavel, 30);

        Estresse.avaliarLength(Restricoes.observacao, Restricoes.tamanhoDosCampos.observacao);
        Estresse.avaliarLength(Restricoes.valor, Restricoes.tamanhoDosCampos.valor);
        Estresse.avaliarLength(Restricoes.responsavel, Restricoes.tamanhoDosCampos.responsavel);
        Restricoes.clicaCancelar();
    });

    it('Campo valor deve aceitar apenas números', () => {
        nrInvalido = '*A37589'
        nrValido = '375,89'

        Restricoes.clicaNovo();
        Restricoes.valor.clear();
        Restricoes.valor.sendKeys(nrInvalido + protractor.Key.TAB);
        expect(Restricoes.valor.getAttribute('value')).toBe('R$ '+nrValido);
        Restricoes.clicaCancelar();
    });

    it('Campo "Data Análise" não devem aceitar data futura', () => {
        Restricoes.clicaNovo();
        let dataFutura = '12/05/2055'
        Restricoes.dataRestricao.clear();
        Restricoes.dataRestricao.sendKeys(dataFutura + protractor.Key.TAB);
        expect(Restricoes.dataRestricao.getAttribute('value')).toBe(Data.dataAtual(), 'Nao foi possivel validar data futura do campo "Data Analise - Info.Complementares"');
        Restricoes.clicaCancelar();
    });

    it('Campo "Data Análise" não deve aceitar data inválida', () => {
        Restricoes.clicaNovo();
        let dataInvalida = '99/99/9999'
        Restricoes.dataRestricao.clear();
        Restricoes.dataRestricao.sendKeys(dataInvalida + protractor.Key.TAB);
        expect(Restricoes.dataRestricao.getAttribute('value')).toBe('', 'Nao foi possivel validar data invalida do campo "Data Analise - Info.Complementares"');
        Restricoes.clicaCancelar();
    });
});