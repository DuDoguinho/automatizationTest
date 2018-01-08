let Renda = require('./renda.po');
let Mensagem = require('../../comum/mensagem');
let Estresse = require('../../comum/estresse');
let Data = require('../../comum/data');
let Cadastro = require('../cadastro/cadastro.po');
let Menu = require('../../menu/menu.po');
let AlteracaoCadastral = require('../cadastro/alteracao-cadastral.po');
let DadosCadastro = require('../fluxo-cadastro/dados-cadastro');
let cpf = '';
var altera;

describe('Update Renda Pessoa Fi­sica', () => {
    describe('Formulário Renda', () => {
        beforeAll(() => {
            if (!cpf) {
                Menu.navegaParaCadastroPF();                
                cpf = Cadastro.cadastraPessoaFisicaSimples(DadosCadastro);
            }
            altera = new AlteracaoCadastral(cpf);
        });

        beforeEach(() => {            
            Menu.navegaParaAlteracaoCadastral();
            altera.buscaCpf(cpf);            
            altera.navegaParaRenda(cpf);
        });
        
        it('Deve validar obrigatoriedade do campo Data Atualização', () => {
            Renda.dataAtualizacao.clear();
            Renda.dataAtualizacao.sendKeys(protractor.Key.TAB);
            Cadastro.atualizaCadastro();
            expect(Mensagem.obrigatoriedade(Renda.dataAtualizacao)).toBe(true, "Falha ao validar Data Atualização de Renda");
        });

        it('Deve inserir nova Renda e validar os campos obrigatorios', () => {
            Renda.botaoNovo.click();
            Renda.setFolhaLayout('Usimed');

            Renda.botaoSalvar.click();

            expect(Mensagem.obrigatoriedade(Renda.cnpj)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Renda.nome)).toBeTruthy();
            expect(Renda.tipoControle.evaluate(Renda.tipoControle.getAttribute('ng-model'))).toEqual("PRIVADO");
            expect(Mensagem.obrigatoriedade(Renda.remuneracao)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Renda.dataRenda)).toBeTruthy();
            expect(Mensagem.obrigatoriedade(Renda.tipo)).toBeTruthy();

            let cnpjValido = '48856637000100';
            Renda.cnpj.sendKeys(cnpjValido);
            Renda.nome.sendKeys('Mequetrefe LTDA');
            Renda.preencheRemuneracao();
            Renda.setDataRenda(Data.dataAtual());
            Renda.setTipoRenda('Comprovada');
            Renda.setComprovacao('Extratos');
            Renda.botaoSalvar.click();

            expect(Renda.getTableRows().last().element(Renda.byColunaNome).getText()).toBe('Mequetrefe LTDA'.toUpperCase(), "Falha ao comparar Nome da Fonte Pagadora");
            expect(Renda.getTableRows().last().element(Renda.byColunaCpfCnpj).getText()).toBe('48.856.637/0001-00', "Falha ao comparar CPF/CNPJ da Fonte Pagadora");
            expect(Renda.getTableRows().last().element(Renda.byValor).getText()).toBe("R$ " + '899.962,22', "Falha ao comparar Valor de Remuneração da Renda");
            expect(Renda.getTableRows().last().element(Renda.byTipo).getText()).toBe('Comprovada'.toUpperCase(), "Falha ao comparar Tipo de Renda");

            Cadastro.atualizaCadastro();
            expect(Cadastro.msgs_sucesso.isDisplayed()).toBe(true, "Falha na verificação da mensagem de sucesso ao Atualizar Cadastro");
            expect(Cadastro.msgs_sucesso.element(by.binding('$ctrl.mensagens[0].message')).getText()).toBe('Cadastro atualizado com sucesso', "Falha na verificação da mensagem de sucesso ao Atualizar Cadastro");
            
            Menu.navegaParaAlteracaoCadastral();
            altera.buscaCpf(cpf);
            altera.navegaParaRenda(cpf);

            expect(Renda.getTableRows().last().element(Renda.byColunaNome).getText()).toBe('Mequetrefe LTDA'.toUpperCase(), "Falha ao comparar Nome da Fonte Pagadora");
            expect(Renda.getTableRows().last().element(Renda.byColunaCpfCnpj).getText()).toBe('48.856.637/0001-00', "Falha ao comparar CPF/CNPJ da Fonte Pagadora");
            expect(Renda.getTableRows().last().element(Renda.byValor).getText()).toBe("R$ " + '899.962,22', "Falha ao comparar Valor de Remuneração da Renda");
            expect(Renda.getTableRows().last().element(Renda.byTipo).getText()).toBe('Comprovada'.toUpperCase(), "Falha ao comparar Tipo de Renda");
        });

        it('Deve excluir renda', () => {
            Renda.getTableRows().then((elemsBefore) => {
                let qtd = elemsBefore.length;
                Renda.excluir();

                Renda.getTableRows().then((elemsAfter) => {
                    expect(elemsAfter.length).toBe(qtd - 1, "Falha ao excluir Renda em Update");
                });

                Cadastro.atualizaCadastro();
                expect(Cadastro.msgs_sucesso.isDisplayed()).toBe(true, "Falha na verificação da mensagem de sucesso ao Atualizar Cadastro");
                expect(Cadastro.msgs_sucesso.element(by.binding('$ctrl.mensagens[0].message')).getText()).toBe('Cadastro atualizado com sucesso', "Falha na verificação da mensagem de sucesso ao Atualizar Cadastro");

                Menu.navegaParaAlteracaoCadastral();
                altera.buscaCpf(cpf);
                altera.navegaParaRenda(cpf);

                Renda.getTableRows().then((elemsAfter) => {
                    expect(elemsAfter.length).toBe(qtd - 1, "Falha ao excluir Renda em Update");
                });
            });
        });

        it('Não deve aceitar valor negativo para total de rendas', () => {
            let cnpjValido = '48856637000100';
            
            Renda.botaoNovo.click();
            Renda.cnpj.sendKeys(cnpjValido);

            Renda.nome.sendKeys('Mequetrefe LTDA');
            Renda.remuneracao.click();
            Renda.remuneracao.sendKeys('--');
            Renda.preencheRemuneracao();
            Renda.setDataRenda(Data.dataAtual());
            Renda.setTipoRenda('Comprovada');
            Renda.setComprovacao('Extratos');
            Renda.botaoSalvar.click();
            
            Cadastro.atualizaCadastro().then(()=>{
                expect(Renda.msgErro.isDisplayed()).toBeTruthy('Falha ao validar mensagem de erro');
            });
        });

        it('deve inserir renda duplicada e validar resposta do sistema.', () => {
            Renda.botaoNovo.click();

            let cnpjValido = '48856637000100';
            Renda.cnpj.sendKeys(cnpjValido);
            Renda.nome.sendKeys('Mequetrefe LTDA');
            Renda.preencheRemuneracao();
            Renda.setDataRenda(Data.dataAtual());
            Renda.setTipoRenda('Comprovada');
            Renda.setComprovacao('Extratos');
            Renda.botaoSalvar.click();

            expect(Renda.getTableRows().last().element(Renda.byColunaNome).getText()).toBe('Mequetrefe LTDA'.toUpperCase(), "Falha ao comparar Nome da Fonte Pagadora");
            expect(Renda.getTableRows().last().element(Renda.byColunaCpfCnpj).getText()).toBe('48.856.637/0001-00', "Falha ao comparar CPF/CNPJ da Fonte Pagadora");
            expect(Renda.getTableRows().last().element(Renda.byValor).getText()).toBe("R$ " + '899.962,22', "Falha ao comparar Valor de Remuneração da Renda");
            expect(Renda.getTableRows().last().element(Renda.byTipo).getText()).toBe('Comprovada'.toUpperCase(), "Falha ao comparar Tipo de Renda");

            Renda.botaoNovo.click();

            Renda.cnpj.sendKeys(cnpjValido);
            Renda.nome.sendKeys('Mequetrefe LTDA');
            Renda.preencheRemuneracao();
            Renda.setDataRenda(Data.dataAtual());
            Renda.setTipoRenda('Comprovada');
            Renda.setComprovacao('Extratos');
            Renda.botaoSalvar.click();

            expect(Renda.getTableRows().last().element(Renda.byColunaNome).getText()).toBe('Mequetrefe LTDA'.toUpperCase(), "Falha ao comparar Nome da Fonte Pagadora");
            expect(Renda.getTableRows().last().element(Renda.byColunaCpfCnpj).getText()).toBe('48.856.637/0001-00', "Falha ao comparar CPF/CNPJ da Fonte Pagadora");
            expect(Renda.getTableRows().last().element(Renda.byValor).getText()).toBe("R$ " + '899.962,22', "Falha ao comparar Valor de Remuneração da Renda");
            expect(Renda.getTableRows().last().element(Renda.byTipo).getText()).toBe('Comprovada'.toUpperCase(), "Falha ao comparar Tipo de Renda");

            Cadastro.atualizaCadastro();
            expect(Cadastro.msgs_erro.isDisplayed()).toBe(true, "Falha na verificação da mensagem de sucesso ao Atualizar Cadastro");
            expect(Cadastro.msgs_erro.element(by.repeater('erro in $ctrl.mensagens')).getText()).toContain('Não pode haver rendas repetidas.', "Falha na verificação da mensagem de sucesso ao Atualizar Cadastro");
        });
    });
});