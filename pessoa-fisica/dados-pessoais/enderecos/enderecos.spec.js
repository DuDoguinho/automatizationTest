let Endereco = require('./enderecos.po');
let Mensagem = require('../../../comum/mensagem');
let Estresse = require('../../../comum/estresse');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Data = require('../../../comum/data');
let Cadastro = require('../../cadastro/cadastro.po');
let Resumo = require('../../resumo/resumo.po');
let Gerador = require('../../../comum/cpfCnpj');
let cpf = '';

describe('Endereços', () => {
    describe('Formulário', function () {
        beforeAll(() => {
            cpf = Gerador.getCPF().replace('.', '').replace('.', '').replace('-', '');
        })

        beforeEach(() => {
            Endereco.acessaPagina(cpf);
            Endereco.sessao.element(by.css('.step-section')).click();
            Endereco.botaoNovo.click();
        });

        it('deve validar os campos obrigatórios', () => {
            Endereco.tipoEndereco.click();
            Endereco.tipoEndereco.sendKeys(protractor.Key.UP);
            Endereco.tipoEndereco.sendKeys(protractor.Key.TAB);
            Endereco.cep.sendKeys(protractor.Key.TAB);

            Endereco.botaoSalvar.click().then(() => {

                expect(Mensagem.obrigatoriedade(Endereco.tipoEndereco)).toBeTruthy();
                expect(Mensagem.obrigatoriedade(Endereco.cep)).toBeTruthy();
                expect(Mensagem.obrigatoriedade(Endereco.logradouro)).toBeTruthy();
                expect(Mensagem.obrigatoriedade(Endereco.numero)).toBeTruthy();
                expect(Mensagem.obrigatoriedade(Endereco.bairro)).toBeTruthy();
                expect(Mensagem.obrigatoriedade(Endereco.estado)).toBeTruthy();
                expect(Mensagem.obrigatoriedade(Endereco.codigoCidade)).toBeTruthy();
                expect(Mensagem.obrigatoriedade(Endereco.situacaoEndereco)).toBeTruthy();
            });
        });

        it('deve validar tamanho máximo dos campos da seção', () => {
            Estresse.estressarCampo(Endereco.logradouro, 100);
            Estresse.estressarCampo(Endereco.numero, 100);
            Estresse.estressarCampo(Endereco.caixaPostal, 100);
            Estresse.estressarCampo(Endereco.complemento, 100);
            Estresse.estressarCampo(Endereco.bairro, 100);

            Estresse.avaliarLength(Endereco.logradouro, Endereco.tamanhoDosCampos.logradouro);
            Estresse.avaliarLength(Endereco.numero, Endereco.tamanhoDosCampos.numero);
            Estresse.avaliarLength(Endereco.caixaPostal, Endereco.tamanhoDosCampos.caixaPostal);
            Estresse.avaliarLength(Endereco.complemento, Endereco.tamanhoDosCampos.complemento);
            Estresse.avaliarLength(Endereco.bairro, Endereco.tamanhoDosCampos.bairro);
        });

        it('deve cancelar', () => {
            let formularioVisivel = element(by.css('dados-endereco[endereco="$ctrl.endereco"]')).isPresent();
            expect(formularioVisivel).toBeTruthy();

            Endereco.botaoCancelar.click();

            expect(Endereco.botaoNovo.isDisplayed()).toBeTruthy();

            let formulario = element(by.css('dados-endereco[endereco="$ctrl.endereco"]')).isPresent();
            expect(formulario).not.toBeTruthy();
        });

        it('deve limpar e desabilitar campo NUMERO se checkbox for marcado', () => {
            Endereco.numero.sendKeys('888');
            Endereco.enderecoSemNumero.click();

            expect(Endereco.numero.isEnabled()).toBe(false);
            expect(Endereco.numero.evaluate(Endereco.numero.getAttribute('ng-model'))).toEqual(null);
        });

        it('deve carregar UF e CIDADE através do CEP', () => {
            let cep = '96745-000';

            Endereco.cep.sendKeys(cep);
            element(by.css('body')).click();

            expect(Endereco.estado.element(by.css('option:checked')).getText()).toEqual('RS');
            expect(Endereco.logradouro.evaluate(Endereco.logradouro.getAttribute('ng-model'))).toEqual(null);
            expect(Endereco.codigoCidade.element(by.css('option:checked')).getText()).toEqual('Charqueadas');
        });

        it('deve carregar UF, CIDADE, BAIRRO e LOGRADOURO através do CEP', () => {
            let cep = '90560-000';

            Endereco.cep.sendKeys(cep);
            element(by.css('body')).click();

            expect(Endereco.estado.element(by.css('option:checked')).getText()).toEqual('RS');
            expect(Endereco.logradouro.evaluate(Endereco.logradouro.getAttribute('ng-model'))).toEqual('Avenida Cristóvão Colombo');
            expect(Endereco.bairro.evaluate(Endereco.bairro.getAttribute('ng-model'))).toEqual('Floresta');
            expect(Endereco.codigoCidade.element(by.css('option:checked')).getText()).toEqual('Porto Alegre');
        });

        it('Campo caixa postal deve aceitar apenas números', () => {
            let postalInvalido = '*A%5555'
            let postalValido = '5555'

            Endereco.caixaPostal.clear();
            Endereco.caixaPostal.sendKeys(postalInvalido);
            expect(Endereco.caixaPostal.getAttribute('value')).toEqual(postalValido);
        });

        it('Checkbox Empostamento e Situacao do Endereco devem vir marcados por default', () => {
            expect(Endereco.checkBoxPrincipal.evaluate(Endereco.checkBoxPrincipal.getAttribute('ng-model'))).toBe(true, "Falha ao verificar se checkbox 'Principal' está marcado");
            expect(Endereco.checkBoxEmpostamento.evaluate(Endereco.checkBoxEmpostamento.getAttribute('ng-model'))).toBe(true, "Falha ao verificar se checkbox 'Empostamento' está marcado");
        });

        it('Deve aparecer mensagem de Obrigatoriedade do campo "Situação Endereço" quando checkbox "Principal" estiver marcado', () => {
            Endereco.marcaPrincipal();
            Endereco.botaoSalvar.click();
            Endereco.marcaPrincipal();
            expect(Mensagem.obrigatoriedade(Endereco.situacaoEndereco)).toBeTruthy();
        });

        it('Deve verificar comportamento dos campos "Situação Endereço", "Reside Desde" e "Meses de Residência" ao marcar/desmarcar checkbox "Principal" ', () => {            
            Endereco.marcaPrincipal().then(() => {
                expect(Endereco.situacaoEndereco.isEnabled()).toBe(false, "Falha ao validar se campo Situação Endereço está desabilitado");
                expect(Endereco.resideDesde.isEnabled()).toBe(false, "Falha ao validar se campo Reside Desde está desabilitado");
                expect(Endereco.mesesDeResidencia.isEnabled()).toBe(false, "Falha ao validar se campo Meses de Residência está desabilitado");
            })
            Endereco.marcaPrincipal().then(() => {
                expect(Endereco.situacaoEndereco.isEnabled()).toBe(true, "Falha ao validar se campo Situação Endereço está habilitado");
                expect(Endereco.resideDesde.isEnabled()).toBe(true, "Falha ao validar se campo Reside Desde está habilitado");
                expect(Endereco.mesesDeResidencia.isEnabled()).toBe(false, "Falha ao validar se campo Meses de Residência está habilitado");
            });
        });

        it('Campo "Meses de Rediências" deve ser coerente com "Reside Desde"', () => {
            let numeroMeses = 15;
            Endereco.resideDesde.sendKeys(Data.dataMesAno(numeroMeses, '-') + protractor.Key.TAB);
            expect(Endereco.mesesDeResidencia.getAttribute('value')).toEqual(numeroMeses.toString());
        });

        it('Deve validar a obrigatoriedade de ao menos um endereço principal e um residencial', () => {
            Endereco.setTipoEndereco('Comercial');
            Endereco.marcaPrincipal();
            Endereco.cep.sendKeys('90820120' + protractor.Key.TAB);
            Endereco.numero.sendKeys('566');
            Endereco.botaoSalvar.click();
            Cadastro.navegaResumo('51404821341');

            Cadastro.botaoConfirmarCadastro.click().then(() => {
                expect(element.all(by.repeater('erro in $ctrl.mensagens')).filter(function (elem) {
                    return elem.getText().then(function (text) {
                        return text.includes('Erro ao validar endereço é obrigatório ter um endereço principal');
                    });
                }).count()).toBe(1, "Falha ao validar obrigatoriedade do checkbox Endereço Principal");

                expect(element.all(by.repeater('erro in $ctrl.mensagens')).filter(function (elem) {
                    return elem.getText().then(function (text) {
                        return text.includes('Ao menos um Endereço do Tipo Residencial deve ser informado.');
                    });
                }).count()).toBe(1, "Falha ao validar que existe ao menos um endereço do Tipo Residencial.");
            });
        });
    });

    describe('Listagem', function () {
        beforeAll(() => {
            cpf = Gerador.getCPF().replace('.', '').replace('.', '').replace('-', '');
        })
        beforeEach(() => {
            Endereco.acessaPagina(cpf);
            Endereco.sessao.element(by.css('.step-section')).click();
        });

        it('deve mostrar mensagem de lista vazia inicialmente', () => {
            let tableRows = Endereco.getTableRows();

            expect(Endereco.listaVazia.isDisplayed()).toBeTruthy();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve inserir múltiplos', () => {
            let enderecos = DadosCadastro.cadastro.dadosPessoais.enderecos;

            Endereco.insereMultiplos(enderecos);

            let tableRows = Endereco.getTableRows();
            expect(tableRows.count()).toEqual(enderecos.length);
        });

        it('deve inserir e apagar', () => {
            let enderecos = DadosCadastro.cadastro.dadosPessoais.enderecos;

            Endereco.insereMultiplos(enderecos);
            for (var i = 0; i < enderecos.length; i++) {
                Endereco.excluir();
            }

            let tableRows = Endereco.getTableRows();
            expect(tableRows.count()).toEqual(0);
        });

        it('deve editar', () => {
            let enderecos = DadosCadastro.cadastro.dadosPessoais.enderecos,
                novoCep = '90820-120';

            Endereco.insereMultiplos(enderecos);
            Endereco.editar(novoCep);

            let tableRows = Endereco.getTableRows(),
                labelNovoCep = tableRows.all(by.binding('endereco.cep | brCep')).first();

            expect(tableRows.count()).toEqual(enderecos.length);
            expect(labelNovoCep.getText()).toEqual(novoCep);
        });

    });
});