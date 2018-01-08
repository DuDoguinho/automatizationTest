let DadosNome = require('../dados-pessoais/dados-cpf-nome/dados-cpf-nome.po')
let Documentos = require('../dados-pessoais/documentos/documentos.po');
let Filiacao = require('../dados-pessoais/filiacao/filiacao.po');
let EstadoCivil = require('../dados-pessoais/estado-civil/estado-civil.po');
let Dependentes = require('../dados-pessoais/dependentes/dependentes.po');
let Endereco = require('../dados-pessoais/enderecos/enderecos.po');
let Contatos = require('../dados-pessoais/contatos/contatos.po');
let RepresentanteLegal = require('../dados-pessoais/representante-legal/representante-legal.po');
let DadosProfissionais = require('../dados-pessoais/dados-profissionais/dados-profissionais.po');

let Procurador = require('../dados-complementares/procuradores/procurador.po');
let ParticipacaoSocietaria = require('../dados-complementares/participacoes-societarias/participacao-societaria.po');
let Referencia = require('../dados-complementares/referencias/referencias.po');
let Seguro = require('../dados-complementares/seguros/seguros.po');
let PlanoSaude = require('../dados-complementares/planos-de-saude/planos-de-saude.po');
let Previdencia = require('../dados-complementares/previdencias/previdencias.po');

let Veiculo = require('../bens/veiculos/veiculos.po');
let Imovel = require('../bens/imoveis/imoveis.po');

let Renda = require('../renda/renda.po');
let CartaoAutografo = require('../cartao-autografo/cartao-autografo.po');

let InfoComplementares = require('../analise-cadastral/info-complementares/info-complementares.po');
let RestricoesAcatadas = require('../analise-cadastral/restricoes-acatadas/restricoes-acatadas.po');
let MatriculaVinculada = require('../analise-cadastral/matricula-vinculada/matricula-vinculada.po');
let PessoaFatca = require('../analise-cadastral/pessoa-reportavel-fatca/pessoa-reportavel-fatca.po');

let Matricula = require('../matricula/matricula/matricula.po');
let Menu = require('../../menu/menu.po');

let GestaoContaCorrente = require('../conta-corrente/gestao-conta-corrente/gestao-conta-corrente.po');

let Data = require('../../comum/data');
let GeraCPF = require('../../comum/cpfCnpj');

let Modal = require('../../comum/modal');

class Cadastro {
  constructor() {
    this.matricula = element(by.css('div[title="Matrícula"]'));

    this.conta = element(by.css('.add-conta'));
    this.terceiro = element(by.css('.add-terceiro'));
    this.cpf_modal = element(by.id('cpfField'));
    this.buscar = element(by.css('modal-cpf')).element(by.css('button.btn-confirmacao'));

    this.salvar_rascunho = element(by.id('btnSalvarRascunho'));
    this.proximo = element.all(by.id('btnNext')).first();
    this.msgs_sucesso = element(by.css('mensagem-sucesso'));
    this.msgs_erro = element(by.css('mensagem-erro'))
    this.msgs_erro_list = element.all(by.css('mensagem-erro'));
    this.cart_aut_sucesso = element(by.css('[ng-show="$ctrl.salvoComSucesso"]'));

    this.dados_pessoais = element(by.css('[href$="/dados-pessoais"]'));
    this.dados_complementares = element(by.css('[href$="/dados-complementares"]'));
    this.bens = element(by.css('[href$="/bens"]'));
    this.cartao_autografo = element(by.css('[href$="/cartao-autografo"]'));
    this.renda = element(by.css('[href$="/renda"]'));
    this.analise_cadastral = element(by.css('[href$="/analise-cadastral"]'));
    this.resumo = element(by.css('[href$="/resumo"]'));

    this.botaoConfirmarCadastro = element.all(by.id('btnConfirmaCadastro')).first();
    this.botaoFechaModalConfirmaCadastro = element(by.css('modal-status')).element(by.css('.uni-modal--close'));
    this.botaoAtualizarCadastro = element(by.css('.atualizarDados'));

    this.matriculaGerada = element(by.css('div.user-matricula[ng-if="$ctrl.isAssociado"] span.numero'));
    this.contaGerada = element(by.css('div.user-matricula[ng-if="$ctrl.isCorrentista"] span.numero'));

    this.versao = element(by.css('.dash-info > .dash-version'));
  }

  confirmaCadastro() {
    this.botaoConfirmarCadastro.click();
    return this.botaoFechaModalConfirmaCadastro.click();
  }

  navegaDadosPessoais(cpf) {
    browser.get('#/cadastro/terceiro/' + cpf.replace('.', '').replace('.', '').replace('-', '') + '/dados-pessoais');
    //this.dados_pessoais.click();
  }

  navegaDadosComplementares(cpf) {
    browser.get('#/cadastro/terceiro/' + cpf.replace('.', '').replace('.', '').replace('-', '') + '/dados-complementares');
    //this.dados_complementares.click();    
  }

  navegaBens(cpf) {
    browser.get('#/cadastro/terceiro/' + cpf.replace('.', '').replace('.', '').replace('-', '') + '/bens');
    //this.bens.click();
  }

  navegaCartaoAutografo(cpf) {
    browser.get('#/cadastro/terceiro/' + cpf.replace('.', '').replace('.', '').replace('-', '') + '/cartao-autografo');
    //this.cartao_autografo.click();
  }

  navegaRenda(cpf) {
    browser.get('#/cadastro/terceiro/' + cpf.replace('.', '').replace('.', '').replace('-', '') + '/renda');
    //this.renda.click();
  }

  navegaAnaliseCadastral(cpf) {
    browser.get('#/cadastro/terceiro/' + cpf.replace('.', '').replace('.', '').replace('-', '') + '/analise-cadastral');
    //this.analise_cadastral.click();
  }

  navegaResumo(cpf) {
    browser.get('#/cadastro/terceiro/' + cpf.replace('.', '').replace('.', '').replace('-', '') + '/resumo');
    //this.resumo.click();
  }

  buscaCpf(cpf) {
    this.cpf_modal.sendKeys(cpf);
    return this.buscar.click();
  }

  salvarRascunho() {
    return this.salvar_rascunho.click();
  }

  preecheCamposObrigatoriosDadosPessoais(dadosPessoais) {
    DadosNome.preencherCamposObrigatorios(dadosPessoais['nomeCompleto']);

    Documentos.abreSessao();
    Documentos.preencheDocumentos(dadosPessoais['documentos']['tipoId'], dadosPessoais['documentos']['numId'], dadosPessoais['documentos']['orgExp'],
      dadosPessoais['documentos']['ufExp'], dadosPessoais['documentos']['dataEmissao'], dadosPessoais['documentos']['dataNasc'],
      dadosPessoais['documentos']['protocoloBRSAFE'], dadosPessoais['documentos']['uf'], dadosPessoais['documentos']['sexo'],
      dadosPessoais['documentos']['modRepresentanteLegal'], dadosPessoais['documentos']['nacionalidade'], dadosPessoais['documentos']['naturalidade']);

    Filiacao.abreSessao();
    Filiacao.preencherCamposObrigatorios(dadosPessoais['filiacao']['nomePai'], dadosPessoais['filiacao']['nomeMae']);

    EstadoCivil.abreSessao();
    EstadoCivil.setEstadoCivil(dadosPessoais['estadoCivil']);

    Endereco.abreSessao();
    Endereco.insereMultiplos(dadosPessoais['enderecos']);

    Contatos.abreSessao();
    Contatos.insereEmails(2);
    Contatos.insereTelefones(1);

    DadosProfissionais.abreSessao();
    DadosProfissionais.preencheObrigatorios();
  }

  preecheDadosPessoais(dadosPessoais) {
    DadosNome.preencherCamposObrigatorios(dadosPessoais['nomeCompleto']);

    Documentos.abreSessao();
    Documentos.preencheDocumentos(dadosPessoais['documentos']['tipoId'], dadosPessoais['documentos']['numId'], dadosPessoais['documentos']['orgExp'],
      dadosPessoais['documentos']['ufExp'], dadosPessoais['documentos']['dataEmissao'], dadosPessoais['documentos']['dataNasc'],
      dadosPessoais['documentos']['protocoloBRSAFE'], dadosPessoais['documentos']['uf'], dadosPessoais['documentos']['sexo'],
      dadosPessoais['documentos']['modRepresentanteLegal'], dadosPessoais['documentos']['nacionalidade'], dadosPessoais['documentos']['naturalidade']);

    Filiacao.abreSessao();
    Filiacao.preencherCamposObrigatorios(dadosPessoais['filiacao']['nomePai'], dadosPessoais['filiacao']['nomeMae']);

    EstadoCivil.abreSessao();
    EstadoCivil.setEstadoCivil(dadosPessoais['estadoCivil']);

    Dependentes.abreSessao();
    Dependentes.insereMultiplos(dadosPessoais['dependentes']);

    Endereco.abreSessao();
    Endereco.insereMultiplos(dadosPessoais['enderecos']);

    Contatos.abreSessao();
    Contatos.insereEmails(dadosPessoais.contatos.emails);
    Contatos.insereTelefones(dadosPessoais.contatos.fones);

    DadosProfissionais.abreSessao();
    DadosProfissionais.preencheObrigatorios(dadosPessoais.dadosProfissionais);
  }

  preecheDadosPessoaisSemDependente(dadosPessoais) {
    DadosNome.preencherCamposObrigatorios(dadosPessoais['nomeCompleto']);

    Documentos.abreSessao();
    Documentos.preencheDocumentos(dadosPessoais['documentos']['tipoId'], dadosPessoais['documentos']['numId'], dadosPessoais['documentos']['orgExp'],
      dadosPessoais['documentos']['ufExp'], dadosPessoais['documentos']['dataEmissao'], dadosPessoais['documentos']['dataNasc'],
      dadosPessoais['documentos']['protocoloBRSAFE'], dadosPessoais['documentos']['uf'], dadosPessoais['documentos']['sexo'],
      dadosPessoais['documentos']['modRepresentanteLegal'], dadosPessoais['documentos']['nacionalidade'], dadosPessoais['documentos']['naturalidade']);

    Filiacao.abreSessao();
    Filiacao.preencherCamposObrigatorios(dadosPessoais['filiacao']['nomePai'], dadosPessoais['filiacao']['nomeMae']);

    EstadoCivil.abreSessao();
    EstadoCivil.setEstadoCivil(dadosPessoais['estadoCivil']);

    Endereco.abreSessao();
    Endereco.insereMultiplos(dadosPessoais['enderecos']);

    Contatos.abreSessao();
    Contatos.insereEmails(dadosPessoais.contatos.emails);
    Contatos.insereTelefones(dadosPessoais.contatos.fones);

    DadosProfissionais.abreSessao();
    DadosProfissionais.preencheObrigatorios(dadosPessoais.dadosProfissionais);
  }

  preencheDadosComplementares(dadosComplementares) {
    Procurador.abreSessao();
    let cpfsProc = Procurador.insereMultiplos(dadosComplementares.procuradores);

    ParticipacaoSocietaria.abreSessao();
    let cnpjPartSoc = ParticipacaoSocietaria.insereMultiplos(dadosComplementares.participacoesSocietarias);

    Referencia.abreSessao();
    Referencia.insereMultiplos(1);

    Seguro.abreSessao();
    Seguro.insereMultiplos(1);

    PlanoSaude.abreSessao();
    PlanoSaude.insereMultiplos(1);

    Previdencia.abreSessao();
    Previdencia.insereMultiplos(1);
  }

  preencheDadosComplementaresSimples(dadosComplementares) {
    Procurador.abreSessao();
    let cpfsProc = Procurador.insereMultiplos(dadosComplementares.procuradores);
  }


  preencheCamposObrigatoriosBens(dadosBens) {
    Veiculo.abreSessao();
    Veiculo.insereMultiplos(1);

    Imovel.abreSessao();
    Imovel.insereMultiplos(1);
  }

  insereRenda(dadosRenda) {
    Renda.abreSessao();
    Renda.botaoNovo.click();

    Renda.clicaTiposDeFontePagadora(2);
    Renda.nome.sendKeys('Fonte Pagadora SemCNPJ _Auto');
    Renda.setFolhaLayout('Unimed');
    Renda.setTipoControle('Privado');
    Renda.setRamo('Outros');
    Renda.remuneracao.sendKeys('5000000');
    Renda.dataRenda.sendKeys('10102000');

    Renda.setTipoRenda('Comprovada');
    Renda.setComprovacao();

    Renda.botaoSalvar.click();

    Renda.dataAtualizacao.clear();
    Renda.dataAtualizacao.sendKeys(Data.dataMesAno(1, '-') + protractor.Key.TAB);
  }

  insereDependentes(dadosDependentes) {
    Dependentes.insereMultiplos(dadosDependentes);
  }

  insereCartaoAutografo(dadosCartaoAutografo) {
    CartaoAutografo.abreSessao();
    CartaoAutografo.botaoNovo.click();
    CartaoAutografo.setNome(dadosCartaoAutografo[0]['nome'].toUpperCase());
    CartaoAutografo.carregarAssinatura();
    CartaoAutografo.botaoSalvar.click();
  }

  preencheInfoComplementares() {
    InfoComplementares.sessao.click();
    InfoComplementares.setTipoPessoa();
    InfoComplementares.setDataAnalise();
    InfoComplementares.setPosto();
    InfoComplementares.setAvaliacaoGerente();
    InfoComplementares.preencheObservacao();
    InfoComplementares.preencheObservacaoContrato();
  }

  insereRestricoesAcatadas(RestricoesAcatadasJson) {
    let valor = '5.000,00';
    let respons = 'Bilbo Baggins'
    let tipo = 'Acatado'

    RestricoesAcatadas.sessao.click();
    RestricoesAcatadas.clicaNovo();
    RestricoesAcatadas.setDataRestricao(Data.dataAtual());
    RestricoesAcatadas.preencheObservacao(RestricoesAcatadasJson.observacao);
    RestricoesAcatadas.preencheValor(RestricoesAcatadasJson.valor || valor);
    RestricoesAcatadas.preencheResponsavel(RestricoesAcatadasJson.responsavel || respons);
    RestricoesAcatadas.setTipoRestricao(RestricoesAcatadasJson.tipoRestricao || tipo);
    RestricoesAcatadas.clicaSalvar();
  }
  preencheMatriculaVinculada() {
    let matricula = '53309'

    MatriculaVinculada.sessao.click();
    MatriculaVinculada.setMatricula(matricula);
    MatriculaVinculada.matricula.sendKeys(protractor.Key.TAB);
    MatriculaVinculada.preencheVinculo();
  }
  preenchePessoaFatca() {
    PessoaFatca.sessao.click();
    PessoaFatca.setarPossuiAutorizacaoResidencia('SIM');
    PessoaFatca.setarPossuiOutroDomicilio('SIM');
    PessoaFatca.setarPossuiGreencard('SIM');
    PessoaFatca.setarConsideradoUsPerson('SIM');
  }

  cadastraPessoaFisica(DadosCadastro) {
    let cpf = GeraCPF.getCPF().replace('.', '').replace('.', '').replace('-', '');
    this.buscaCpf(cpf);    
    
    this.preecheDadosPessoais(DadosCadastro.getDadosPessoais());
    this.proximo.click();

    this.preencheDadosComplementares(DadosCadastro.getDadosComplementares());
    this.proximo.click();

    this.preencheCamposObrigatoriosBens(DadosCadastro.getBens());
    this.proximo.click();

    this.insereCartaoAutografo(DadosCadastro.getCartaoAutografo());
    this.proximo.click();

    this.insereRenda(DadosCadastro.getRenda());
    this.proximo.click();

    this.preencheInfoComplementares();
    this.insereRestricoesAcatadas(DadosCadastro.getAnaliseCadastral().restricoesAcatadas);
    this.preencheMatriculaVinculada();
    this.preenchePessoaFatca();
    this.proximo.click();

    this.confirmaCadastro();
    console.log(cpf);
    return cpf;
  }

  preenchePessoaFisicaSemAutografo(DadosCadastro) {
    let cpf = GeraCPF.getCPF().replace('.', '').replace('.', '').replace('-', '');
    this.buscaCpf(cpf);
    
    this.preecheDadosPessoais(DadosCadastro.getDadosPessoais());
    this.proximo.click();

    this.preencheDadosComplementares(DadosCadastro.getDadosComplementares());
    this.proximo.click();

    this.preencheCamposObrigatoriosBens(DadosCadastro.getBens());
    this.proximo.click();
    this.proximo.click();

    this.insereRenda(DadosCadastro.getRenda());
    this.proximo.click();

    this.preencheInfoComplementares();
    this.insereRestricoesAcatadas(DadosCadastro.getAnaliseCadastral().restricoesAcatadas);
    this.preencheMatriculaVinculada();
    this.preenchePessoaFatca();

    this.salvarRascunho();
    console.log(cpf);
    return cpf;
  }

  preenchePessoaFisica(DadosCadastro) {
    let cpf = GeraCPF.getCPF().replace('.', '').replace('.', '').replace('-', '');
    this.buscaCpf(cpf);    

    this.preecheDadosPessoais(DadosCadastro.getDadosPessoais());
    this.proximo.click();

    this.preencheDadosComplementares(DadosCadastro.getDadosComplementares());
    this.proximo.click();

    this.preencheCamposObrigatoriosBens(DadosCadastro.getBens());
    this.proximo.click();

    this.insereCartaoAutografo(DadosCadastro.getCartaoAutografo());
    this.proximo.click();

    this.insereRenda(DadosCadastro.getRenda());
    this.proximo.click();

    this.preencheInfoComplementares();
    this.insereRestricoesAcatadas(DadosCadastro.getAnaliseCadastral().restricoesAcatadas);
    this.preencheMatriculaVinculada();
    this.preenchePessoaFatca();

    this.proximo.click();
    console.log(cpf);
    return cpf;
  }

  atualizaCadastro() {
    return this.botaoAtualizarCadastro.click();
  }

  insereRepresentanteLegal(DadosCadastro, cpf) {
    Documentos.acessaPagina(cpf);
    DadosNome.preencherCamposObrigatorios(DadosCadastro.cadastro.dadosPessoais.nomeCompleto);
    Documentos.abreSessao().then(() => {
      Documentos.setModalidadeRepresentanteLegal('Pessoa Física Menor de Idade');
      RepresentanteLegal.abreSessao().then(() => {
        RepresentanteLegal.preencherCamposObrigatorios(DadosCadastro.cadastro.dadosPessoais.representanteLegal);
        this.salvarRascunho();
      });
    });
  }

  cadastraPessoaFisicaSimples(DadosCadastro, _cpf) {
    let cpf = _cpf
    if (!cpf) {
      cpf = GeraCPF.getCPF();
    }
    this.buscaCpf(cpf);            

    this.preecheDadosPessoais(DadosCadastro.getDadosPessoais());
    this.proximo.click();

    this.preencheDadosComplementaresSimples(DadosCadastro.getDadosComplementares());
    this.proximo.click();

    this.navegaAnaliseCadastral(cpf);
    this.preencheInfoComplementares();
    this.proximo.click();

    this.confirmaCadastro();
    return cpf;
  }

  cadastraPessoaFisicaSimplesSalvaCPF(DadosCadastro, _cpf) {
    let cpf = _cpf
    if (!cpf) {
      cpf = GeraCPF.getCPF();
    }
    this.buscaCpf(cpf);
    

    this.preecheDadosPessoais(DadosCadastro.getDadosPessoais());
    this.proximo.click();

    this.preencheDadosComplementares(DadosCadastro.getDadosComplementares());
    this.proximo.click();

    this.navegaAnaliseCadastral(cpf);
    this.preencheInfoComplementares();
    this.proximo.click();

    this.confirmaCadastro().then(() => {
      let fs = require('fs');
      let fileName = './cpfs_cadastro_simples.txt'
      fs.exists(fileName, function (exists) {
        if (exists) {
          fs.readFile(fileName, function readFileCallback(err, data) {
            if (err) {
              console.log(err);
            } else {
              fs.writeFile(fileName, data + '\r\n' + cpf);
            }
          });
        } else {
          fs.writeFile(fileName, cpf);
        }
      });

    });
    return cpf;
  }

  cadastraMatricula(_cpf) {
    let cpf = _cpf || '';
    Menu.matricula.click();

    return Matricula.botaoSalvar.click().then(() => {
      var EC = protractor.ExpectedConditions;
      browser.wait(EC.presenceOf(this.matriculaGerada), 10000);
      return this.matriculaGerada.getText().then((matricula) => {
        element(by.css('modal-steps')).element(by.css('.uni-modal--close')).click();
        let fs = require('fs');
        let fileName = './cpfs_matricula_cadastro_simples.txt'
        fs.exists(fileName, function (exists) {
          if (exists) {
            fs.readFile(fileName, function readFileCallback(err, data) {
              if (err) {
                console.log(err);
              } else {
                fs.writeFile(fileName, data + '\r\n' + "CPF: " + cpf + " - Matrícula: " + matricula);
              }
            });
          } else {
            fs.writeFile(fileName, "CPF: " + cpf + " - Matrícula: " + matricula);
          }
        });
        return matricula;
      });
    });
  }

  cadastraConta(cpf) {
    GestaoContaCorrente.abreSessao();
    GestaoContaCorrente.setTipoConta();
    GestaoContaCorrente.setModalidade();
    GestaoContaCorrente.setContatoDudoguinho();
    GestaoContaCorrente.setAssinatura();
    GestaoContaCorrente.setCpmf();
    GestaoContaCorrente.setSituacao();
    GestaoContaCorrente.setEmpostamento();

    GestaoContaCorrente.clicaSalvar().then(() => {
      var EC = protractor.ExpectedConditions;
      browser.wait(EC.presenceOf(this.contaGerada), 10000);
      return this.contaGerada.getText().then((conta) => {
        element(by.css('modal-steps')).element(by.css('.uni-modal--close')).click();
        
        let fs = require('fs');
        let fileName = './cpfs_conta_cadastro_simples.txt'
        fs.exists(fileName, function (exists) {
          if (exists) {
            fs.readFile(fileName, function readFileCallback(err, data) {
              if (err) {
                console.log(err);
              } else {
                fs.writeFile(fileName, data + '\r\n' + "CPF: " + cpf + " - Conta: " + conta);
              }
            });
          } else {
            fs.writeFile(fileName, "CPF: " + cpf + " - Conta: " + conta);
          }
        });
        return conta;
      });
    });
  }
}

module.exports = new Cadastro();