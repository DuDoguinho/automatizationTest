let Procurador = require('./procurador.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Data = require('../../../comum/data');
let Modal = require('../../../comum/modal');


describe('Procuradores', () => {
    describe('Formulário', function () {
        beforeEach(() => {
            Procurador.acessaPagina();
            Procurador.sessao.element(by.css('.step-section')).click();
            Procurador.novo.click();
        });

        it('deve validar os campos obrigatórios', () => {
            Procurador.botaoSalvar.click();

            expect(Mensagem.obrigatoriedade(Procurador.cpf)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Procurador.cargo)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Procurador.documento.tipoIdentificacao)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Procurador.documento.numeroIdentificacao)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Procurador.documento.orgaoExpedidor)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Procurador.documento.ufExpedidor)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Procurador.documento.dataEmissao)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Procurador.documento.dataNascimento)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Procurador.tipoProcuracao)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Procurador.prazo)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Procurador.vigencia)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Procurador.dataProcuracao)).toBeTruthy();
        });

        it('deve validar tamanho máximo dos campos da seção', () => {
            Estresse.estressarCampo(Procurador.nomeCompleto, 100);
            Estresse.estressarCampo(Procurador.cargo, 50);
            Estresse.estressarCampo(Procurador.registro, 50);
            Estresse.estressarCampo(Procurador.livro, 50);
            Estresse.estressarCampo(Procurador.folha, 50);
            Estresse.estressarCampo(Procurador.tabelionato, 50);
            Estresse.estressarCampo(Procurador.observacoes, 150);

            Estresse.avaliarLength(Procurador.nomeCompleto, Procurador.tamanhoDosCampos.nomeCompleto);
            Estresse.avaliarLength(Procurador.cargo, Procurador.tamanhoDosCampos.cargo);
            Estresse.avaliarLength(Procurador.registro, Procurador.tamanhoDosCampos.registro);
            Estresse.avaliarLength(Procurador.livro, Procurador.tamanhoDosCampos.livro);
            Estresse.avaliarLength(Procurador.folha, Procurador.tamanhoDosCampos.folha);
            Estresse.avaliarLength(Procurador.tabelionato, Procurador.tamanhoDosCampos.tabelionato);
            Estresse.avaliarLength(Procurador.observacoes, Procurador.tamanhoDosCampos.observacoes);
        });

        it('deve validar o revogar', () => {
            //Given
            Procurador.revogado.click();

            //When
            Procurador.botaoSalvar.click();

            //Then
            expect(Mensagem.obrigatoriedade(Procurador.observacoes)).toBeTruthy();

            expect(Procurador.cpf.isEnabled()).not.toBeTruthy();
            expect(Procurador.cargo.isEnabled()).not.toBeTruthy();
            expect(Procurador.documento.tipoIdentificacao.isEnabled()).not.toBeTruthy();
            expect(Procurador.documento.numeroIdentificacao.isEnabled()).not.toBeTruthy();
            expect(Procurador.documento.orgaoExpedidor.isEnabled()).not.toBeTruthy();
            expect(Procurador.documento.ufExpedidor.isEnabled()).not.toBeTruthy();
            expect(Procurador.documento.dataEmissao.isEnabled()).not.toBeTruthy();
            expect(Procurador.documento.dataNascimento.isEnabled()).not.toBeTruthy();
            expect(Procurador.tipoProcuracao.isEnabled()).not.toBeTruthy();
            expect(Procurador.prazo.isEnabled()).not.toBeTruthy();
            expect(Procurador.vigencia.isEnabled()).not.toBeTruthy();
            expect(Procurador.dataProcuracao.isEnabled()).not.toBeTruthy();
            expect(Procurador.registro.isEnabled()).not.toBeTruthy();
            expect(Procurador.livro.isEnabled()).not.toBeTruthy();
            expect(Procurador.folha.isEnabled()).not.toBeTruthy();
            expect(Procurador.tabelionato.isEnabled()).not.toBeTruthy();
            expect(Procurador.dataEntradaFormatada.isEnabled()).not.toBeTruthy();
        });

        it('deve cancelar', () => {
            expect(Procurador.form.isPresent()).toBeTruthy();

            Procurador.botaoCancelar.click();

            expect(Procurador.botaoNovo.isDisplayed()).toBeTruthy();
            expect(Procurador.form.isPresent()).not.toBeTruthy();
        });

        it('Validar data de nascimento ao setar Carteira de Motorista para menor de idade', () => {
            Procurador.documento.dataNascimento.sendKeys(Data.dataAtual()).then(() => {
                Procurador.documento.setTipoIdentificacao('Cart. Motorista');
                expect(Modal.getModalMsg()).toBe("Para possuir carteira de motorista o cadastrado deve ser maior de 18 anos.", "Falha ao comparar texto Modal");
                Modal.clickModalBtn();
            })

            Procurador.documento.setTipoIdentificacao('Cart. Motorista').then(() => {
                Procurador.documento.dataNascimento.sendKeys(Data.dataAtual() + protractor.Key.TAB);
                expect(Procurador.documento.dataNascimento.getAttribute('value')).toBe(Data.data18Anos(), "Falha ao comparar idade Carteira Motorista");
                expect(Procurador.documento.tipoIdentificacao.evaluate(
                    Procurador.documento.tipoIdentificacao.getAttribute('ng-model'))).toBe('CARTEIRA_MOTORISTA', 'Falha ao validar Tipo de Identificação');
            })

        });

        it('Validar que o campo Data de Emissão não pode ter data futura', () => {
            Procurador.documento.dataEmissao.sendKeys(Data.dataFutura() + protractor.Key.TAB).then(() => {
                expect(Procurador.documento.dataEmissao.getAttribute('value')).toBe(Data.dataAtual(), 'Falha ao apresentar data atual');
            });
        });

        it('Validar que o campo Data de Emissão não aceita data inválida', () => {
            let dataInvalida = '99/99/9999'

            Procurador.documento.dataEmissao.sendKeys(dataInvalida + protractor.Key.TAB);
            expect(Procurador.documento.dataEmissao.getAttribute('value')).toBe('', 'Falha ao apresentar data atual');
        });

        it('Validar que o campo Data de Nascimento não pode ter data futura', () => {
            Procurador.documento.dataNascimento.sendKeys(Data.dataFutura() + protractor.Key.TAB).then(() => {
                expect(Procurador.documento.dataNascimento.getAttribute('value')).toBe(Data.dataAtual(), 'Falha ao apresentar data atual');
            });
        });

        it('Validar que o campo Data de Nascimento não aceita data inválida', () => {
            let dataInvalida = '99/99/9999'

            Procurador.documento.dataNascimento.sendKeys(dataInvalida + protractor.Key.TAB);
            expect(Procurador.documento.dataNascimento.getAttribute('value')).toBe('', 'Falha ao apresentar data atual');
        });

        it('Validar que o campo Data da Vigência não pode ter data passada', () => {
            Procurador.vigencia.sendKeys(Data.dataPassada() + protractor.Key.TAB).then(() => {
            expect(Procurador.vigencia.getAttribute('value')).toBe(Data.dataAtual(), 'Falha ao apresentar data atual');
            });
        });

        it('Validar que o campo Data da Vigência não aceita data inválida', () => {
            let dataInvalida = '99/99/9999'

            Procurador.vigencia.sendKeys(dataInvalida + protractor.Key.TAB);
            expect(Procurador.vigencia.getAttribute('value')).toBe('', 'Falha ao apresentar data atual');
        });

        it('Validar que o campo Data da Vigência aceita data futura', () => {
            Procurador.vigencia.sendKeys(Data.dataFutura() + protractor.Key.TAB);
            expect(Procurador.vigencia.getAttribute('value')).toBe(Data.dataFutura(), 'Falha ao apresentar data atual');
        });

        it('Validar que o campo Data da Procuração não pode ter data futura', () => {
            Procurador.dataProcuracao.sendKeys(Data.dataFutura() + protractor.Key.TAB).then(() => {
                expect(Procurador.dataProcuracao.getAttribute('value')).toBe(Data.dataAtual(), 'Falha ao apresentar data atual');
            });
        });

        it('Validar que o campo Data da Procuração não aceita data inválida', () => {
            let dataInvalida = '99/99/9999'

            Procurador.dataProcuracao.sendKeys(dataInvalida + protractor.Key.TAB);
            expect(Procurador.dataProcuracao.getAttribute('value')).toBe('', 'Falha ao apresentar data atual');
        });

        it('Validar comportamento ao setar CPF do ‘Terceiro’ como cpf do Procurador', () => {
            Procurador.cpf.clear();
            Procurador.cpf.sendKeys('51404821341');
            Procurador.cpf.sendKeys(protractor.Key.TAB);

            expect(Modal.getModalMsg()).toEqual('O CPF não pode ser o mesmo do cadastrado.');

            Modal.clickModalBtn('close');
        });
    });

    describe('Listagem', function () {
        beforeEach(() => {
            Procurador.acessaPagina();
            Procurador.sessao.element(by.css('.step-section')).click();
        });

        it('deve mostrar mensagem de lista vazia inicialmente', () => {
            let tableRows = Procurador.getTableRows();

            expect(Procurador.listaVazia.isDisplayed()).toBeTruthy();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve inserir múltiplos', () => {
            let procuradores = DadosCadastro.cadastro.dadosComplementares.procuradores;

            Procurador.insereMultiplos(procuradores);

            let tableRows = Procurador.getTableRows();
            expect(tableRows.count()).toEqual(procuradores.length);
        });

        it('deve inserir e apagar', () => {
            let procuradores = DadosCadastro.cadastro.dadosComplementares.procuradores;

            Procurador.insereMultiplos(procuradores);
            for (var i = 0; i < procuradores.length; i++) {
                Procurador.excluir();
            }

            let tableRows = Procurador.getTableRows();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve editar', () => {
            let procuradores = DadosCadastro.cadastro.dadosComplementares.procuradores,
                novoCpf = '366.552.341-90';

            Procurador.insereMultiplos(procuradores);
            Procurador.editar(novoCpf);

            //Then
            let tableRows = Procurador.getTableRows(),
                labelNovoCpf = tableRows.all(by.binding('procurador.cpf | brCpf')).first();

            expect(tableRows.count()).toEqual(procuradores.length);
            expect(labelNovoCpf.getText()).toEqual(novoCpf);
        });

    });
});