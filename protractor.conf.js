let Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
let moment = require('moment');

exports.config = {
    framework: 'jasmine2',
    baseUrl: 'https://cadastro-tst.e-dudoguinho.com.br/',
    specs: ['./**/*.spec.js'],
    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 120000,
        showColors: true,
        isVerbose: true,
        includeStackTrace: false,
        print: function () {}
    },
    params: {
        versao: 'v1.13.0'
    },
    onPrepare: function () {
        browser.driver.manage().window().getSize().then((sizeJson) => {
            if (sizeJson.width < 1300) {
                browser.driver.manage().window().setSize(1300, 2000);
            }
        });

        jasmine.getEnv().addReporter(new SpecReporter({
            displayFailuresSummary: true,
            displayFailedSpec: true,
            displaySuiteNumber: true,
            displaySpecDuration: true
        }));

        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: './test-results/results_' + moment.now() + '/',
            screenshotsFolder: 'images',
            filePrefix: 'index',
            takeScreenshots: true,
            takeScreenshotsOnlyOnFailures: true,
            fixedScreenshotName: true,
            showPassed: false
        }));

        let Login = require('./login/login.po');
        Login.logarNaPagina();
    },
    afterLaunch: function () {
        let Login = require('./login/login.po');
        Login.sair.click();
    },
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [
                '--no-sandbox'
            ],
            prefs: {
                download: {
                    'prompt_for_download': false,
                    'default_directory': __dirname + '/imgs/'
                }
            }
        },
        maxInstances: 5
    },
    suites: {
        dadosPessoais: './pessoa-fisica/dados-pessoais/**/*.spec.js',
        dadosComplementares: './pessoa-fisica/dados-complementares/**/*.spec.js',
        bens: './pessoa-fisica/bens/**/*.spec.js',
        cartaoAutografo: './pessoa-fisica/cartao-autografo/**/*.spec.js',
        renda: './pessoa-fisica/renda/**/*.spec.js',
        analiseCadastral: './pessoa-fisica/analise-cadastral/**/*.spec.js',
        fluxoCadastro: './pessoa-fisica/fluxo-cadastro/fluxo-cadastro.spec.js',
        imoveis: './pessoa-fisica/bens/imoveis/*.spec.js',
        veiculos: './pessoa-fisica/bens/veiculos/*.spec.js',
        updateVeiculos: './pessoa-fisica/bens/veiculos/update*.spec.js',
        updateRenda: './pessoa-fisica/renda/**/update*.spec.js',
        matricula: './pessoa-fisica/matricula/**/*.spec.js',
        contaCorrente: './pessoa-fisica/conta-corrente/**/*.spec.js',
        massaMatricula: './pessoa-fisica/fluxo-cadastro/gera-massa-matricula.spec.js',
        massaCadastro: './pessoa-fisica/fluxo-cadastro/gera-massa-cadastro-simples.spec.js',
        massaRascunho: './pessoa-fisica/fluxo-cadastro/gera-massa-rascunho-simples.spec.js',
        smoke: [
            './_smoke/**/*.spec.js',
            './pessoa-fisica/dados-pessoais/documentos/documentos.spec.js',
            './pessoa-fisica/dados-pessoais/representante-legal/representante-legal.spec.js',
            './pessoa-fisica/dados-pessoais/filiacao/filiacao.spec.js',
            './pessoa-fisica/dados-pessoais/estado-civil/estado-civil.spec.js',
            './pessoa-fisica/dados-pessoais/dependentes/dependentes.spec.js',
            './pessoa-fisica/dados-pessoais/enderecos/enderecos.spec.js',
            './pessoa-fisica/dados-pessoais/contatos/contatos.spec.js',
            './pessoa-fisica/dados-pessoais/dados-profissionais/dados-profissionais.spec.js',
            './pessoa-fisica/dados-pessoais/domicilio-fiscal/domicilio-fiscal.spec.js',
            './pessoa-fisica/dados-complementares/procuradores/procurador.spec.js',
            './pessoa-fisica/dados-complementares/participacoes-societarias/participacao-societaria.spec.js',
            './pessoa-fisica/dados-complementares/referencias/referencias.spec.js',
            './pessoa-fisica/dados-complementares/seguros/seguros.spec.js',
            './pessoa-fisica/dados-complementares/planos-de-saude/planos-de-saude.spec.js',
            './pessoa-fisica/dados-complementares/previdencias/previdencias.spec.js',
            './pessoa-fisica/bens/veiculos/veiculos.spec.js',
            './pessoa-fisica/bens/imoveis/imoveis.spec.js',
            './pessoa-fisica/cartao-autografo/cartao-autografo.spec.js',
            './pessoa-fisica/renda/renda.spec.js',
            './pessoa-fisica/analise-cadastral/info-complementares/info-complementares.spec.js',
            './pessoa-fisica/analise-cadastral/restricoes-acatadas/restricoes-acatadas.spec.js',
            './pessoa-fisica/analise-cadastral/matricula-vinculada/matricula-vinculada.spec.js',
            './pessoa-fisica/analise-cadastral/pessoa-reportavel-fatca/pessoa-reportavel-fatca.spec.js',
            './pessoa-juridica/enderecos/enderecos-pj.spec.js',
            './pessoa-juridica/contatos/contatos-pj.spec.js',
            './pessoa-juridica/dados-registro/dados-registro-pj.spec.js',
            './pessoa-juridica/sociedade/socieade.spec.js'
        ],
        regressao: [
            './pessoa-fisica/fluxo-cadastro/fluxo-cadastro.spec.js',
            './pessoa-fisica/renda/update-renda.spec.js',
            './pessoa-fisica/dados-pessoais/dependentes/update-dependentes.spec.js',
            './pessoa-fisica/dados-pessoais/estado-civil/update-estado-civil.spec.js',
            './pessoa-fisica/bens/veiculos/upadte-veiculos.spec.js',
            './pessoa-fisica/bens/imoveis/upadte-imoveis.spec.js',
            './pessoa-fisica/dados-pessoais/dados-profissionais/update-dados-profissionais.spec.js',
            './pessoa-fisica/dados-pessoais/documentos/update-documentos.spec.js',
            './pessoa-fisica/dados-pessoais/filiacao/update-filiacao.spec.js',
            './pessoa-fisica/dados-pessoais/contatos/update-contatos.spec.js',
            './pessoa-fisica/dados-pessoais/domicilio-fiscal/update-domicilio-fiscal.spec.js'
        ],
        geraMassa: [
            './pessoa-fisica/fluxo-cadastro/gera-massa-cadastro-simples.spec.js',
            './pessoa-fisica/fluxo-cadastro/gera-massa-matricula.spec.js',
            './pessoa-fisica/fluxo-cadastro/gera-rascunho.spec.js'
        ],
        dadosEmpresa: [
            './pessoa-juridica/dados-empresa/enderecos/enderecos-pj.spec.js',
            './pessoa-juridica/dados-empresa/contatos/contatos-pj.spec.js',
            './pessoa-juridica/dados-empresa/dados-registro/dados-registro-pj.spec.js'
        ]
    }
};