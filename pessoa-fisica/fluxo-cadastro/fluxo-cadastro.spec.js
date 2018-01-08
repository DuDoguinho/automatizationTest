let Menu = require('../../menu/menu.po');
let Cadastro = require('../cadastro/cadastro.po');
let GeraCPF = require('../../comum/cpfCnpj');
let DadosNome = require('../dados-pessoais/dados-cpf-nome/dados-cpf-nome.po')
let Documentos = require('../dados-pessoais/documentos/documentos.po');
let Filiacao = require('../dados-pessoais/filiacao/filiacao.po');
let EstadoCivil = require('../dados-pessoais/estado-civil/estado-civil.po');
let Dependentes = require('../dados-pessoais/dependentes/dependentes.po');
let Endereco = require('../dados-pessoais/enderecos/enderecos.po');
let Contatos = require('../dados-pessoais/contatos/contatos.po');
let DadosProfissionais = require('../dados-pessoais/dados-profissionais/dados-profissionais.po');
let DomicilioFiscal = require('../dados-pessoais/domicilio-fiscal/domicilio-fiscal.po');
let Mensagem = require('../../comum/mensagem');
let DadosCadastro = require('./dados-cadastro');

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
let cpf = "";

let InfoComplementares = require('../analise-cadastral/info-complementares/info-complementares.po');
let RestricoesAcatadas = require('../analise-cadastral/restricoes-acatadas/restricoes-acatadas.po');
let MatriculaVinculada = require('../analise-cadastral/matricula-vinculada/matricula-vinculada.po');
let PessoaFatca = require('../analise-cadastral/pessoa-reportavel-fatca/pessoa-reportavel-fatca.po');

let Resumo = require('../resumo/resumo.po');

describe('Fluxo de Cadastro', () => {
  beforeEach(() => {
    Menu.navegaParaCadastroPF();
  });

  it('Salvar Rascunho Completo @rascunho_completo', () => {    
    let cpf = Cadastro.preenchePessoaFisica(DadosCadastro);
    console.log(cpf);
    let fs = require('fs');
    fileName = './cpfs_rascunho_completo.txt'
    fs.exists(fileName, function (exists) {
      if (exists) {
        console.log("yes file exists");
        fs.readFile(fileName, function readFileCallback(err, data) {
          if (err) {
            console.log(err);
          } else {
            fs.writeFile(fileName, data + '\r\n' + cpf);
          }
        });
      } else {
        console.log("file not exists")
        fs.writeFile(fileName, cpf);
      }
    });
  });

  it('Salvar Rascunho Simples @rascunho_simples', () => {
    let cpf = GeraCPF.getCPF().replace('.', '').replace('.', '').replace('-', '');

    Cadastro.buscaCpf(cpf);
    Cadastro.preecheDadosPessoais(DadosCadastro.getDadosPessoais());
    Cadastro.proximo.click();

    Cadastro.navegaAnaliseCadastral(cpf)
    Cadastro.preencheInfoComplementares();
    Cadastro.proximo.click().then(() => {
      console.log(cpf);
      let fs = require('fs');
      fileName = './cpfs_rascunho_simples.txt'
      fs.exists(fileName, function (exists) {
        if (exists) {
          console.log("yes file exists");
          fs.readFile(fileName, function readFileCallback(err, data) {
            if (err) {
              console.log(err);
            } else {
              fs.writeFile(fileName, data + '\r\n' + cpf);
            }
          });
        } else {
          console.log("file not exists")
          fs.writeFile(fileName, cpf);
        }
      });
    });
  });

  it('Salvar Cadastro', () => {
    let cpf = Cadastro.preenchePessoaFisica(DadosCadastro);
    Cadastro.navegaResumo(cpf);
    Cadastro.confirmaCadastro().then(() => {
      cpf = ""
    });
  });

  it('Salvar Rascunho - Pessoa Física - Dados Pessoais Pessoa Física - Pai e Mãe - Solteiro - Sem Dependentes - Com endereço - Com contatos', () => {

    if (cpf != null && cpf != "") {
      Cadastro.buscaCpf(cpf);
    } else {
      cpf = GeraCPF.getCPF().replace('.', '').replace('.', '').replace('-', '');
      Cadastro.buscaCpf(cpf);
    }

    let dadosPessoais = DadosCadastro.getDadosPessoais();
    Cadastro.preecheDadosPessoais(dadosPessoais);

    Cadastro.salvarRascunho();
    expect(Cadastro.msgs_sucesso.isEnabled()).toBe(true, "Falha na verificação da mensagem de sucesso ao Salvar Rascunho");

    Menu.navegaParaCadastroPF();
    Cadastro.buscaCpf(cpf);

    expect(DadosNome.nomeCompleto.getAttribute('value')).toBe(dadosPessoais['nomeCompleto'].toUpperCase(), "Falha ao comparar Nome Completo.");
    expect(DadosNome.nomeSucinto.getAttribute('value')).toBe(dadosPessoais['nomeSucinto'].toUpperCase(), "Falha ao comparar Nome Sucinto.");

    //// Validações 
    Documentos.abreSessao().then(() => {
      expect(Documentos.tipoIdentificacao.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais['documentos']['tipoId'], "Falha ao comparar Tipo de Identificação.");
      expect(Documentos.numeroIdentificacao.getAttribute('value')).toBe(dadosPessoais['documentos']['numId'], "Falha ao comparar Número de Identificação.");
      expect(Documentos.orgaoExpedidor.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais['documentos']['orgExp'], "Falha ao comparar Órgão Expedidor.");
      expect(Documentos.ufExpedidor.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais['documentos']['ufExp'], "Falha ao comparar UF Órgão Expedidor.");
      expect(Documentos.dataEmissao.getAttribute('value')).toBe(dadosPessoais['documentos']['dataEmissao'], "Falha ao comparar Data de Emissão.");
      expect(Documentos.dataNascimento.getAttribute('value')).toBe(dadosPessoais['documentos']['dataNasc'], "Falha ao comparar Data de Nascimento.");
      expect(Documentos.protocoloBRSafe.getAttribute('value')).toBe(dadosPessoais['documentos']['protocoloBRSAFE'], "Falha ao comparar Data de Nascimento.");
      expect(Documentos.sexo.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais['documentos']['sexo'], "Falha ao comparar Sexo.");
      expect(Documentos.modalidadeRepresentanteLegal.getText()).toBe(dadosPessoais['documentos']['modRepresentanteLegal'].toUpperCase(), "Falha ao comparar Modalidade Representante Legal.");
      expect(Documentos.nacionalidade.getText()).toBe(dadosPessoais['documentos']['nacionalidade'].toUpperCase(), "Falha ao comparar Nacionalidade.");
      expect(Documentos.uf.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais['documentos']['uf'].toUpperCase(), "Falha ao comparar UF.");
      expect(Documentos.naturalidade.getText()).toBe(dadosPessoais['documentos']['naturalidade'].toUpperCase(), "Falha ao comparar Naturalidade.");
    });

    Filiacao.abreSessao().then(() => {
      expect(Filiacao.nomePai.getAttribute('value')).toBe(dadosPessoais['filiacao']['nomePai'].toUpperCase(), "Falha ao comparar Nome do Pai");
      expect(Filiacao.nomeMae.getAttribute('value')).toBe(dadosPessoais['filiacao']['nomeMae'].toUpperCase(), "Falha ao comparar Nome do Mãe");
    });

    EstadoCivil.abreSessao().then(() => {
      expect(EstadoCivil.estadoCivil.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais['estadoCivil'], "Falha ao comparar Estado Civil");
    });

    Dependentes.abreSessao().then(() => {

      expect(Dependentes.sessao.element(Dependentes.byColunaCpf).getText()).toBe(dadosPessoais.dependentes[0].cpf, "Falha ao comparar CPF de Dependentes");
      expect(Dependentes.sessao.element(Dependentes.byColunaNome).getText()).toBe(dadosPessoais.dependentes[0].nome.toUpperCase(), "Falha ao comparar Nome de Dependentes");
      expect(Dependentes.sessao.element(Dependentes.byColunaNascimento).getText()).toBe(dadosPessoais.dependentes[0].dataNasc, "Falha ao comparar Nascimento de Dependentes");

    });

    Endereco.abreSessao().then(() => {
      Endereco.editaPrimeiro().then(() => {
        expect(Endereco.tipoEndereco.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais['enderecos'][0]['tipo'], "Falha ao comparar Tipo de Endereço.");
        expect(Endereco.cep.getAttribute('value')).toBe(dadosPessoais['enderecos'][0]['cep'], "Falha ao comparar Cep");
        expect(Endereco.logradouro.getAttribute('value')).toBe(dadosPessoais['enderecos'][0]['logradouro'].toUpperCase(), "Falha ao comparar Logradouro");
        expect(Endereco.numero.getAttribute('value')).toBe(dadosPessoais['enderecos'][0]['numero'], "Falha ao comparar Logradouro");
        expect(Endereco.caixaPostal.getAttribute('value')).toBe(dadosPessoais['enderecos'][0]['caixaPostal'], "Falha ao comparar Caixa Postal");
        expect(Endereco.complemento.getAttribute('value')).toBe(dadosPessoais['enderecos'][0]['complemento'], "Falha ao comparar Complemento");
        expect(Endereco.bairro.getAttribute('value')).toBe(dadosPessoais['enderecos'][0]['bairro'], "Falha ao comparar Bairro");
        expect(Endereco.estado.getAttribute('value')).toBe(dadosPessoais['enderecos'][0]['uf'], "Falha ao comparar UF");
        expect(Endereco.codigoCidade.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais['enderecos'][0]['cidade'], "Falha ao comparar Cidade");
        expect(Endereco.situacaoEndereco.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais['enderecos'][0]['situacaoEndereco'], "Falha ao comparar Situação do Endereço");
        expect(Endereco.resideDesde.getAttribute('value')).toBe(dadosPessoais['enderecos'][0]['resideDesde'], "Falha ao comparar Reside desde");
      });
    });

    Contatos.abreSessao().then(() => {
      fone = dadosPessoais['contatos']['fones'][0]['ddd'] + ' ' + dadosPessoais['contatos']['fones'][0]['fone'];
      fones = Contatos.getTableRowsTelefones();
      expect(fones.first().element(Contatos.byColunaTipoTelefone).getText()).toBe(dadosPessoais['contatos']['fones'][0]['tipo'], "Falha ao comparar tipo de telefone");
      expect(fones.first().element(by.binding('contato.ddd + contato.numero | brPhoneNumber')).getText()).toBe(fone, "Falha ao comparar telefone");
      expect(fones.first().element(by.binding('contato.observacao')).getText()).toBe(dadosPessoais['contatos']['fones'][0]['observacoes'], "Falha ao comparar observações de telefone");

      emails = Contatos.getTableRowsEmails();
      expect(emails.first().element(by.binding('contato.tipoEmail')).getText()).toBe(dadosPessoais['contatos']['emails'][0]['tipo'], "Falha ao comparar tipo de email");
      expect(emails.first().element(by.binding('contato.endereco')).getText()).toBe(dadosPessoais['contatos']['emails'][0]['contato'], "Falha ao comparar contato de email");
      expect(emails.first().element(by.binding('contato.observacao')).getText()).toBe(dadosPessoais['contatos']['emails'][0]['observacoes'], "Falha ao comparar observações de email");
      expect(emails.last().element(by.binding('contato.tipoEmail')).getText()).toBe(dadosPessoais['contatos']['emails'][1]['tipo'], "Falha ao comparar tipo de email");
      expect(emails.last().element(by.binding('contato.endereco')).getText()).toBe(dadosPessoais['contatos']['emails'][1]['contato'], "Falha ao comparar contato de email");
      expect(emails.last().element(by.binding('contato.observacao')).getText()).toBe(dadosPessoais['contatos']['emails'][1]['observacoes'], "Falha ao comparar observações de email");

    });

    DadosProfissionais.abreSessao().then(() => {

      expect(DadosProfissionais.grauInstrucao.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais.dadosProfissionais.grauInstrucao, "Falha ao comparar Grau de Instrução");
      expect(DadosProfissionais.profissao.getText()).toBe(dadosPessoais['dadosProfissionais']['profissao'], "Falha ao comparar Profissão");
      expect(DadosProfissionais.categoria.getText()).toBe(dadosPessoais['dadosProfissionais']['categoria'], "Falha ao comparar Categoria");
      expect(DadosProfissionais.nrRegistroProfissional.getAttribute('value')).toBe(dadosPessoais['dadosProfissionais']['numeroRegProfissional'], "Falha ao comparar Número Reg. Profissional");
      expect(DadosProfissionais.cdOrgaoResponsavel.getText()).toBe(dadosPessoais['dadosProfissionais']['orgResponsavel'], "Falha ao comparar Órgão Responsável");
      expect(DadosProfissionais.ufRegistro.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais['dadosProfissionais']['ufRegistro'], "Falha ao comparar UF Registro");
      expect(DadosProfissionais.inicioProfissional.getText()).toBe(dadosPessoais['dadosProfissionais']['inicioProfissional'], "Falha ao comparar UF Registro");
    });
  });

  it('Salvar Rascunho - Pessoa Física - Dados Complementares Pessoa Física', () => {

    if (cpf != null && cpf != "") {
      Cadastro.buscaCpf(cpf);
      Cadastro.navegaDadosComplementares(cpf);
    } else {
      cpf = GeraCPF.getCPF().replace('.', '').replace('.', '').replace('-', '');
      Cadastro.buscaCpf(cpf);
      Cadastro.preecheDadosPessoais(DadosCadastro.getDadosPessoais());
      Cadastro.salvarRascunho();
    }

    let dadosComplementares = DadosCadastro.getDadosComplementares();

    Procurador.sessao.click();
    let cpfsProc = Procurador.insereMultiplos(dadosComplementares.procuradores);

    ParticipacaoSocietaria.sessao.click();
    let cnpjPartSoc = ParticipacaoSocietaria.insereMultiplos(dadosComplementares.participacoesSocietarias);

    Referencia.sessao.click();
    Referencia.insereMultiplos(1);

    Seguro.sessao.click();
    Seguro.insereMultiplos(1);

    PlanoSaude.sessao.click();
    PlanoSaude.insereMultiplos(1);

    Previdencia.sessao.click();
    Previdencia.insereMultiplos(1);

    Cadastro.salvarRascunho();
    expect(Cadastro.msgs_sucesso.isEnabled()).toBe(true);

    Menu.navegaParaCadastroPF()
    Cadastro.buscaCpf(cpf);

    Cadastro.navegaDadosComplementares(cpf);
    Procurador.abreSessao().then(() => {
      let procuradores = Procurador.getTableRows();
      expect(procuradores.first().element(by.binding('procurador.cpf | brCpf')).getText()).toBe(cpfsProc[0], "Falha ao comparar CPF de Procuradores.");
      expect(procuradores.first().element(by.binding('procurador.nomeCompleto')).getText()).toBe(dadosComplementares['procuradores'][0]['nome'].toUpperCase(), "Falha ao comparar Nome de Procurador");
      expect(procuradores.first().element(by.binding("procurador.procuracao.vigencia.format('DD/MM/YYYY')")).getText()).toBe(dadosComplementares['procuradores'][0]['vigencia'], "Falha ao comparar Vigência");
    });

    ParticipacaoSocietaria.abreSessao().then(() => {
      let participacoes = ParticipacaoSocietaria.getTableRows();
      expect(participacoes.first().element(by.binding('participacaoSocietaria.cnpj | brCnpj')).getText()).toBe(cnpjPartSoc[0], "Falha ao comparar CNPJ de Participação Societária");
      expect(participacoes.first().element(by.binding('participacaoSocietaria.nome')).getText()).toBe(dadosComplementares['participacoesSocietarias'][0]['nome'], "Falha ao comparar Nome de Participação Societária");
      expect(participacoes.first().element(by.css('td[ng-bind*="participacaoSocietaria.percentualParticipacao"]')).getText()).toBe(dadosComplementares['participacoesSocietarias'][0]['participacao'], "Falha ao comparar Nome de Participação Societária");
      expect(participacoes.first().element(by.binding('participacaoSocietaria.descricaoFuncaoCargo')).getText()).toBe(dadosComplementares['participacoesSocietarias'][0]['funcaoCargo'], "Falha ao comparar Função/Cargo de Participação Societária");
    });

    Referencia.abreSessao().then(() => {
      let referencias = Referencia.getTableRows();
      expect(referencias.first().element(by.binding('referencia.nomeBancoEmpresa')).getText()).toBe(dadosComplementares['referencias'][0]['bancoEmpresa'], "Falha ao comparar Banco/Empresa");
      expect(referencias.first().element(by.binding('referencia.nomeAgenciaLoja')).getText()).toBe(dadosComplementares['referencias'][0]['agenciaLoja'], "Falha ao comparar Nome Agência / Loja");
    });

    Seguro.abreSessao().then(() => {
      let seguros = Seguro.getTableRows();
      expect(seguros.first().element(by.binding('seguro.tipoDescricao')).getText()).toBe(dadosComplementares['seguros'][0]['tipo'], "Falha ao comparar Tipo de Seguro.");
      expect(seguros.first().element(by.binding('seguro.seguradoraDescricao')).getText()).toBe(dadosComplementares['seguros'][0]['seguradora'], "Falha ao comparar Seguradora de Seguro.");
      expect(seguros.first().element(by.binding("seguro.dataVencimento.format('DD/MM/YYYY')")).getText()).toBe(dadosComplementares['seguros'][0]['vencimento'], "Falha ao comparar Vencimento de Seguro.");
      expect(seguros.first().element(by.binding('seguro.valorSegurado | finance:true')).getText()).toBe("R$ " + dadosComplementares['seguros'][0]['valorSegurado'], "Falha ao comparar Vencimento de Seguro.");
    });

    PlanoSaude.abreSessao().then(() => {
      let planos = PlanoSaude.getTableRows();
      expect(planos.first().element(by.binding('plano.descricaoTipoDePlano')).getText()).toBe(dadosComplementares['planosDeSaude'][0]['tipoDePlano'], "Falha ao comparar Tipo de Plano de Saúde");
      expect(planos.first().element(by.binding('plano.descricaoInstituicao')).getText()).toBe(dadosComplementares['planosDeSaude'][0]['instituicao'], "Falha ao comparar Instituição de Plano de Saúde");
      expect(planos.first().element(by.binding('plano.valorMensal | finance:true')).getText()).toBe("R$ " + dadosComplementares['planosDeSaude'][0]['valorDoPlano'], "Falha ao comparar Valor do Plano de Saúde");
    });

    Previdencia.abreSessao().then(() => {
      let previdencias = Previdencia.getTableRows();
      expect(previdencias.first().element(by.binding('previdencia.descricaoTipoDePrevidencia')).getText()).toBe(dadosComplementares['previdencias'][0]['tipoDePrevidencia'], "Falha ao comparar Tipo de Previdência");
      expect(previdencias.first().element(by.binding('previdencia.descricaoInstituicao')).getText()).toBe(dadosComplementares['previdencias'][0]['instituicao'], "Falha ao comparar Instituição de Previdência");
      expect(previdencias.first().element(by.binding('previdencia.valorContribuicao | finance:true')).getText()).toBe("R$ " + dadosComplementares['previdencias'][0]['valorContribuicao'], "Falha ao comparar Valor Contribuição de Previdência");
    });
  });

  it('Salvar Rascunho - Pessoa Física - Bens Pessoa Física', () => {

    if (cpf != null && cpf != "") {
      Cadastro.buscaCpf(cpf);
      Cadastro.navegaBens(cpf);
    } else {
      cpf = GeraCPF.getCPF().replace('.', '').replace('.', '').replace('-', '');
      Cadastro.buscaCpf(cpf);
      Cadastro.preecheDadosPessoais(DadosCadastro.getDadosPessoais());
      Cadastro.proximo.click();

      Cadastro.preencheDadosComplementares(DadosCadastro.getDadosComplementares());
      Cadastro.proximo.click();
    }

    let bens = DadosCadastro.getBens();

    Cadastro.preencheCamposObrigatoriosBens(bens);

    Cadastro.salvarRascunho();
    expect(Cadastro.msgs_sucesso.isEnabled()).toBe(true);

    Menu.navegaParaCadastroPF();
    Cadastro.buscaCpf(cpf);
    Cadastro.navegaBens(cpf);

    Veiculo.abreSessao().then(() => {
      let veiculos = Veiculo.getTableRows();
      expect(veiculos.first().element(by.binding('veiculo.descricaoTipoDeVeiculo')).getText()).toBe(bens['veiculos'][0]['tipo'], "Falha ao comparar Tipo de Veículo - Bens");
      expect(veiculos.first().element(by.binding('veiculo.modelo')).getText()).toBe(bens['veiculos'][0]['modelo'], "Falha ao comparar Modelo de Veículo - Bens");
      expect(veiculos.first().element(by.binding("veiculo.anoFabricacao.format('YYYY')")).getText()).toBe(bens['veiculos'][0]['anoFabricacao'], "Falha ao comparar Ano de Fabricação de Veículo - Bens");
      expect(veiculos.first().element(by.binding('veiculo.valorVeiculo | finance:true')).getText()).toBe("R$ " + bens['veiculos'][0]['valor'], "Falha ao comparar Valor de Veículo - Bens");
    });

    Imovel.abreSessao().then(() => {
      let imoveis = Imovel.getTableRows();
      expect(imoveis.first().element(by.binding('imovel.descricaoTipoDeImovel')).getText()).toBe(bens['imoveis'][0]['tipo'], "Falha ao comparar Tipo de Imóvel - Bens");
      expect(imoveis.first().element(by.binding('imovel.situacao')).getText()).toBe(bens['imoveis'][0]['situacao'], "Falha ao comparar Situação de Imóvel - Bens");
      expect(imoveis.first().element(by.binding('imovel.destinacao')).getText()).toBe(bens['imoveis'][0]['destinacao'], "Falha ao comparar Destinação de Imóvel - Bens");
      expect(imoveis.first().element(by.binding('imovel.valorAtual | finance:true')).getText()).toBe("R$ " + bens['imoveis'][0]['valorAtual'], "Falha ao comparar Valor Atual de Imóvel - Bens");
    });
  });

  it('Salvar Rascunho - Pessoa Física - Cartão Autógrafo Pessoa Física', () => {

    if (cpf != null && cpf != "") {
      Cadastro.buscaCpf(cpf);
      Cadastro.navegaCartaoAutografo(cpf);
    } else {
      cpf = GeraCPF.getCPF().replace('.', '').replace('.', '').replace('-', '');
      Cadastro.buscaCpf(cpf);
      Cadastro.preecheDadosPessoais(DadosCadastro.getDadosPessoais());
      Cadastro.proximo.click();

      Cadastro.preencheDadosComplementares(DadosCadastro.getDadosComplementares());
      Cadastro.proximo.click();

      Cadastro.preencheCamposObrigatoriosBens(DadosCadastro.getBens());
      Cadastro.proximo.click();
    }

    let cartaoAut = DadosCadastro.getCartaoAutografo();

    CartaoAutografo.abreSessao();
    CartaoAutografo.botaoNovo.click();

    CartaoAutografo.setNome(cartaoAut[0]['nome'].toUpperCase());
    CartaoAutografo.carregarAssinatura();
    CartaoAutografo.botaoSalvar.click();

    expect(Cadastro.cart_aut_sucesso.isEnabled()).toBe(true);

    Menu.navegaParaCadastroPF();
    Cadastro.buscaCpf(cpf);
    Cadastro.navegaCartaoAutografo(cpf);
    CartaoAutografo.abreSessao().then(() => {

      botaoEditar = CartaoAutografo.getTableRows().all(by.css('button[title="Editar"]')).first();
      colunaTipo = CartaoAutografo.getTableRows().all(by.binding('cartaoAutografo.pessoa.tipo.descricao')).first();
      colunaNome = CartaoAutografo.getTableRows().all(by.binding('cartaoAutografo.pessoa.nome')).first();

      botaoEditar.click();
      expect(CartaoAutografo.assinatura.element(by.css('img')).isDisplayed()).toBe(true, 'Falha ao validar Imagem de assinatura');
      CartaoAutografo.botaoCancelar.click();

      expect(colunaTipo.getText()).toBe(cartaoAut[0]['tipo'], "Falha ao comparar Tipo do Cartão Autógrafo");
      expect(colunaNome.getText()).toBe(cartaoAut[0]['nome'].toUpperCase(), "Falha ao comparar Nome do Cartão Autógrafo");

    });
  });

  it('Salvar Rascunho - Pessoa Física - Renda', () => {
    if (cpf != null && cpf != "") {
      Cadastro.buscaCpf(cpf);
      Cadastro.navegaRenda(cpf);
    } else {
      cpf = GeraCPF.getCPF().replace('.', '').replace('.', '').replace('-', '');
      Cadastro.buscaCpf(cpf);
      Cadastro.preecheDadosPessoais(DadosCadastro.getDadosPessoais());
      Cadastro.proximo.click();

      Cadastro.preencheDadosComplementares(DadosCadastro.getDadosComplementares());
      Cadastro.proximo.click();

      Cadastro.preencheCamposObrigatoriosBens(DadosCadastro.getBens());
      Cadastro.proximo.click();

      Cadastro.insereCartaoAutografo(DadosCadastro.getCartaoAutografo());
      Cadastro.proximo.click();
    }

    let count = Renda.getTableRows().count();
    Cadastro.insereRenda(DadosCadastro.getRenda());
    Cadastro.salvarRascunho();

    let dadosRenda = DadosCadastro.getRenda();

    expect(Cadastro.msgs_sucesso.isEnabled()).toBe(true);

    Menu.navegaParaCadastroPF();
    Cadastro.buscaCpf(cpf);
    Cadastro.navegaRenda(cpf);

    Renda.getTableRows().then((rows) => {
      count.then((value) => {
        expect(rows.length).toBe(value + 1, "Renda não inserida");
      });

      expect(Renda.getTableRows().first().element(Renda.byColunaNome).getText()).toBe(dadosRenda[0].nome.toUpperCase(), "Falha ao comparar Nome da Fonte Pagadora");
      expect(Renda.getTableRows().first().element(Renda.byColunaCpfCnpj).getText()).toBe(dadosRenda[0].cpfCnpj, "Falha ao comparar CPF/CNPJ da Fonte Pagadora");
      expect(Renda.getTableRows().first().element(Renda.byValor).getText()).toBe("R$ " + dadosRenda[0].remuneracao, "Falha ao comparar Valor de Remuneração da Renda");
      expect(Renda.getTableRows().first().element(Renda.byTipo).getText()).toBe(dadosRenda[0].tipoRenda.toUpperCase(), "Falha ao comparar Tipo de Renda");

      let rendas = Renda.getTableRows();
      let soma = 0
      rendas.each((linha) => {
        let renda = linha.element(Renda.byValor).getText().then((value) => {
          let val = parseFloat(value.match(/\d+\.?\d*/g)[0].replace(/\./g, '') + '.' + value.match(/\d+\.?\d*/g)[1]);
          soma = parseFloat(soma) + parseFloat(val);
        });
      });
      let renda = Renda.getTableRows().first().element(Renda.byValor).getText();
      renda.then((value) => {
        let val = parseFloat(value.match(/\d+\.?\d*/g)[0].replace(/\./g, '') + '.' + value.match(/\d+\.?\d*/g)[1]);
        expect(Renda.getTableRows().first().element(Renda.byPercentTotal).getText()).toBe(((val * 100) / soma) + "%", "Falha ao comparar % Sobre Total");
      });
    });
  });

  it('Salvar Rascunho - Pessoa Física - Análise Cadastral', () => {
    if (cpf != null && cpf != "") {
      Cadastro.buscaCpf(cpf);
      Cadastro.navegaAnaliseCadastral(cpf);
    } else {
      cpf = GeraCPF.getCPF().replace('.', '').replace('.', '').replace('-', '');
      Cadastro.buscaCpf(cpf);
      Cadastro.preecheDadosPessoais(DadosCadastro.getDadosPessoais());
      Cadastro.proximo.click();

      Cadastro.preencheDadosComplementares(DadosCadastro.getDadosComplementares());
      Cadastro.proximo.click();

      Cadastro.preencheCamposObrigatoriosBens(DadosCadastro.getBens());
      Cadastro.proximo.click();

      Cadastro.insereCartaoAutografo(DadosCadastro.getCartaoAutografo());
      Cadastro.proximo.click();

      Cadastro.insereRenda(DadosCadastro.getRenda());
      Cadastro.proximo.click();
    }

    let analiseCadastral = DadosCadastro.getAnaliseCadastral();

    Cadastro.preencheInfoComplementares();
    Cadastro.insereRestricoesAcatadas(DadosCadastro.getAnaliseCadastral().restricoesAcatadas);
    Cadastro.preencheMatriculaVinculada();
    Cadastro.preenchePessoaFatca();

    Cadastro.salvarRascunho();
    expect(Cadastro.msgs_sucesso.isEnabled()).toBe(true);

    Menu.navegaParaCadastroPF();
    Cadastro.buscaCpf(cpf);
    Cadastro.navegaAnaliseCadastral(cpf);

    InfoComplementares.abreSessao().then(() => {
      expect(InfoComplementares.tipoPessoa.element(by.css('option[selected="selected"]')).getText()).toBe(analiseCadastral.infoComplementares.tipoPessoa, "Falha ao comparar Tipo Pessoa");
      expect(InfoComplementares.posto.element(by.css('option[selected="selected"]')).getText()).toBe(analiseCadastral.infoComplementares.posto, "Falha ao comparar posto");
      expect(InfoComplementares.avaliacaoGerente.element(by.css('option[selected="selected"]')).getText()).toBe(analiseCadastral.infoComplementares.avaliacaoGerente, "Falha ao comparar posto");
      expect(InfoComplementares.observacao.getAttribute('value')).toBe(analiseCadastral.infoComplementares.observacao, "Falha ao comparar Observacao");
      expect(InfoComplementares.observacaoContrato.getAttribute('value')).toBe(analiseCadastral.infoComplementares.observacaoContrato, "Falha ao comparar Observacao");
    });

    RestricoesAcatadas.abreSessao().then(() => {
      let lines = RestricoesAcatadas.getTableRows();
      expect(lines.first().element(RestricoesAcatadas.byColunaData).getText()).toBe(analiseCadastral.restricoesAcatadas.dataRestricao, "Falha ao comparar data Restricoes Acatadas");
      expect(lines.first().element(RestricoesAcatadas.byColunaObservacao).getText()).toBe(analiseCadastral.restricoesAcatadas.observacao.toUpperCase(), "Falha ao comparar observacao Restricoes Acatadas");
      expect(lines.first().element(RestricoesAcatadas.byColunaValor).getText()).toBe('R$ ' + analiseCadastral.restricoesAcatadas.valor, "Falha ao comparar valor Restricoes Acatadas");
      expect(lines.first().element(RestricoesAcatadas.byColunaResponsavel).getText()).toBe(analiseCadastral.restricoesAcatadas.responsavel.toUpperCase(), "Falha ao comparar Responsavel Restricoes Acatadas");
      expect(lines.first().element(RestricoesAcatadas.byCOlunaTipo).getText()).toBe(analiseCadastral.restricoesAcatadas.tipoRestricao.toUpperCase(), "Falha ao comparar tipo restricao Restricoes Acatadas");
    });

    MatriculaVinculada.abreSessao().then(() => {
      expect(MatriculaVinculada.matricula.getAttribute('value')).toBe(analiseCadastral.matriculaVinculada.matricula, "Falha ao comparar matricula");
      expect(MatriculaVinculada.nomeAssociado.getAttribute('value')).toBe(analiseCadastral.matriculaVinculada.nomeAssociado, "Falaha ao comparar Nome Associado");
      expect(MatriculaVinculada.tipoVinculo.element(by.css('option[selected="selected"]')).getText()).toContain(analiseCadastral.matriculaVinculada.tipoVinculo, "Falha ao comparar tipo vinculo");
    });
  });

  it('Pessoa Física - Não deve efetuar cadastro com duplo domicílio',()=>{    
    if (!cpf) {            
      cpf = Cadastro.preenchePessoaFisica(DadosCadastro);
      Menu.navegaParaCadastroPF();
    }    
    Cadastro.buscaCpf(cpf);
    Cadastro.navegaDadosPessoais(cpf);
    DomicilioFiscal.abreSecao();
    DomicilioFiscal.clicaNovo();
    DomicilioFiscal.setPais('brasil');
    DomicilioFiscal.preencheIdentificacao('11625286805');
    DomicilioFiscal.preencheObservacao('CPF - Domicilio Duplicado');
    DomicilioFiscal.clicaSalvar();
    Cadastro.salvarRascunho();
    Cadastro.navegaResumo(cpf);
    Cadastro.botaoConfirmarCadastro.click();
    expect(Cadastro.msgs_erro.isDisplayed()).toBeTruthy('Falha ao validar inserção de Duplo domicílio fiscal para o mesmo País.');    
    expect(Cadastro.msgs_erro_list.count()).toBe(1, 'Falha ao validar quantidade de erros.');
  });

  it('Pessoa Física - Resumo: Deve validar campos e confirmar cadastro', () => {
    if (!!cpf) {
      Cadastro.buscaCpf(cpf);
      Cadastro.navegaResumo(cpf);
    } else {
      cpf = Cadastro.preenchePessoaFisica(DadosCadastro);
    }

    let dadosPessoais = DadosCadastro.getDadosPessoais();
    let dadosComplementares = DadosCadastro.getDadosComplementares();
    let bens = DadosCadastro.getBens();
    let cartaoAut = DadosCadastro.getCartaoAutografo();
    let dadosRenda = DadosCadastro.getRenda();
    let analiseCadastral = DadosCadastro.getAnaliseCadastral();

    Resumo.abreSessao(Resumo.dadosPessoais).then(() => {
      Resumo.abreSessao(Resumo.dadosPessoais, Resumo.bySessaoDocumentos).then(() => {
        //expects Documentos
        expect(Resumo.tipoId.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais.documentos.tipoId, "Falha ao comparar Tipo de Identificação.");
        expect(Resumo.numId.getAttribute('value')).toBe(dadosPessoais.documentos.numId, "Falha ao comparar Número de Identificação.");
        expect(Resumo.orgExp.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais.documentos.orgExp, "Falha ao comparar Órgão Expedidor.");
        expect(Resumo.ufExp.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais.documentos.ufExp, "Falha ao comparar UF Órgão Expedidor.");
        expect(Resumo.dataEmissao.getAttribute('value')).toBe(dadosPessoais.documentos.dataEmissao, "Falha ao comparar Data de Emissão.");
        expect(Resumo.dataNasc.getAttribute('value')).toBe(dadosPessoais.documentos.dataNasc, "Falha ao comparar Data de Nascimento.");
        expect(Resumo.protocoloBRSAFE.getAttribute('value')).toBe(dadosPessoais.documentos.protocoloBRSAFE, "Falha ao comparar Data de Nascimento.");
        expect(Resumo.sexo.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais.documentos.sexo, "Falha ao comparar Sexo.");
        expect(Resumo.modReprLegal.getText()).toBe(dadosPessoais.documentos.modRepresentanteLegal.toUpperCase(), "Falha ao comparar Modalidade Representante Legal.");
        expect(Resumo.nacionalidade.getText()).toBe(dadosPessoais.documentos.nacionalidade.toUpperCase(), "Falha ao comparar Nacionalidade.");
        expect(Resumo.uf.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais.documentos.uf.toUpperCase(), "Falha ao comparar UF.");
        expect(Resumo.naturalidade.getText()).toBe(dadosPessoais.documentos.naturalidade.toUpperCase(), "Falha ao comparar Naturalidade.");
      });

      Resumo.abreSessao(Resumo.dadosPessoais, Resumo.bySessaoFiliacao).then(() => {
        //expects Filiacao
        expect(Resumo.nomePai.getAttribute('value')).toBe(dadosPessoais.filiacao.nomePai.toUpperCase(), "Falha ao comparar Nome do Pai");
        expect(Resumo.nomeMae.getAttribute('value')).toBe(dadosPessoais.filiacao.nomeMae.toUpperCase(), "Falha ao comparar Nome do Mãe");
      });

      Resumo.abreSessao(Resumo.dadosPessoais, Resumo.bySessaoEstadoCivil).then(() => {
        //expects Estado Civil
        expect(Resumo.estadoCivil.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais['estadoCivil'], "Falha ao comparar Estado Civil");
      });

      Resumo.abreSessao(Resumo.dadosPessoais, Resumo.bySessaoDependentes).then(() => {
        let linhas = Dependentes.getTableRows();

        //expects Dependentes
        expect(linhas.first().element(Resumo.byColunaCpfDependente).getText()).toBe(dadosPessoais.dependentes[0].cpf, "Falha ao comparar CPF de Dependente - Dados Pessoais - Dependente");
        expect(linhas.first().element(Resumo.byColunaNomeDependente).getText()).toBe(dadosPessoais.dependentes[0].nome.toUpperCase(), "Falha ao comparar Nom Completo de Dependente - Dados Pessoais - Dependente");
        expect(linhas.first().element(Resumo.byColunaNascimentoDependente).getText()).toBe(dadosPessoais.dependentes[0].dataNasc, "Falha ao comparar Nascimento de Dependente - Dados Pessoais - Dependente");
      });

      Resumo.abreSessao(Resumo.dadosPessoais, Resumo.bySessaoEnderecos).then(() => {
        let linhas = Endereco.getTableRows();

        //expects Enderecos
        expect(linhas.first().element(Resumo.byColunaCEP).getText()).toBe(dadosPessoais.enderecos[0].cep, "Falha ao comparar coluna CEP de Endereço");
        expect(linhas.first().element(Resumo.byColunaLogradouro).getText()).toBe(dadosPessoais.enderecos[0].logradouro.toUpperCase(), "Falha ao comparar coluna Logradouro de Endereço");
        expect(linhas.first().element(Resumo.byColunaNumero).getText()).toBe(dadosPessoais.enderecos[0].numero, "Falha ao comparar coluna Número de Endereço");
        expect(linhas.first().element(Resumo.byColunaCidade).getText()).toBe(dadosPessoais.enderecos[0].cidade.toUpperCase(), "Falha ao comparar coluna Cidade de Endereço");
        //expect(linhas.first().element(Resumo.byColunaPrincipal).getText()).toBe(dadosPessoais.enderecos[0].cidade, "Falha ao comparar coluna Cidade de Endereço");
        console.log('É necessário validar coluna Principal e Empostamento de Endereço de Pessoa Física');
      });

      Resumo.abreSessao(Resumo.dadosPessoais, Resumo.bySessaoContatos).then(() => {
        //expects Contatos
        let fones = Contatos.getTableRowsTelefones();
        expect(fones.first().element(Resumo.byColunaTipoTelefoneContato).getText()).toBe(dadosPessoais.contatos.fones[0].tipo, "Falha ao comparar coluna Tipo de Contato de Telefone");
        expect(fones.first().element(Resumo.byColunaContato).getText()).toBe(dadosPessoais.contatos.fones[0].ddd + " " + dadosPessoais.contatos.fones[0].fone, "Falha ao comparar coluna Contato de Telefone");
        expect(fones.first().element(Resumo.byColunaObsContato).getText()).toBe(dadosPessoais.contatos.fones[0].observacoes, "Falha ao comparar coluna Observações de Telefone");

        let emails = Contatos.getTableRowsEmails();
        expect(emails.first().element(Resumo.byColunaTipoEmailContato).getText()).toBe(dadosPessoais.contatos.emails[0].tipo, "Falha ao comparar coluna Tipo de Contato de Email");
        expect(emails.first().element(Resumo.byColunaContatoEmail).getText()).toBe(dadosPessoais.contatos.emails[0].contato, "Falha ao comparar coluna Contato de Email");
        expect(emails.first().element(Resumo.byColunaObsContato).getText()).toBe(dadosPessoais.contatos.emails[0].observacoes, "Falha ao comparar coluna Observações de Email");

        expect(emails.last().element(Resumo.byColunaTipoEmailContato).getText()).toBe(dadosPessoais.contatos.emails[1].tipo, "Falha ao comparar coluna Tipo de Contato de Email");
        expect(emails.last().element(Resumo.byColunaContatoEmail).getText()).toBe(dadosPessoais.contatos.emails[1].contato, "Falha ao comparar coluna Contato de Email");
        expect(emails.last().element(Resumo.byColunaObsContato).getText()).toBe(dadosPessoais.contatos.emails[1].observacoes, "Falha ao comparar coluna Observações de Email");
      });

      Resumo.abreSessao(Resumo.dadosPessoais, Resumo.bySessaoDadosProfissionais).then(() => {
        //expects Dados Profissionais
        
        expect(Resumo.grauInstrucao.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais.dadosProfissionais.grauInstrucao, "Falha ao comparar Grau de Instrução");
        expect(Resumo.profissao.getText()).toBe(dadosPessoais.dadosProfissionais.profissao, "Falha ao comparar Profissão");
        expect(Resumo.categoria.getText()).toBe(dadosPessoais.dadosProfissionais.categoria, "Falha ao comparar Categoria");
        expect(Resumo.numRegProfissional.getAttribute('value')).toBe(dadosPessoais.dadosProfissionais.numeroRegProfissional, "Falha ao comparar Número Reg. Profissional");
        expect(Resumo.orgResponsavel.getText()).toBe(dadosPessoais.dadosProfissionais.orgResponsavel, "Falha ao comparar Órgão Responsável");
        expect(Resumo.ufRegistro.element(by.css('option[selected="selected"]')).getText()).toBe(dadosPessoais.dadosProfissionais.ufRegistro, "Falha ao comparar UF Registro");
        expect(Resumo.inicioProfissional.getText()).toBe(dadosPessoais.dadosProfissionais.inicioProfissional, "Falha ao comparar UF Registro");
      });

      Resumo.abreSessao(Resumo.dadosPessoais, Resumo.bySessaoDomicilioFiscal).then(()=>{
        let domicilio = DomicilioFiscal.getTableRows();
        
        expect(domicilio.first().element(Resumo.byColunaPais).getText()).toBe(dadosPessoais.domicilioFiscal.pais.toUpperCase(), 'Falha ao validar campo País em Domicílio Fiscal');
        expect(domicilio.first().element(Resumo.byColunaNrIdentificacao).getText()).toBe(cpf, 'Falha ao validar campo cpf em Domicílio Fiscal');
        expect(domicilio.first().element(Resumo.byColunaObservacoes).getText()).toBe(dadosPessoais.domicilioFiscal.observacoes, 'Falha ao validar campo observacoes em Domicílio Fiscal');
      });
    });

    Resumo.abreSessao(Resumo.dadosComplementares).then(() => {
      Resumo.abreSessao(Resumo.dadosComplementares, Resumo.bySessaoProcuradores).then(() => {
        let procuradores = Procurador.getTableRows();

        //expects Procuradores
        expect(procuradores.first().element(Resumo.byColunaCpf).getText()).toBe(dadosComplementares.procuradores[0].cpf, "Falha ao comparar CPF de Procuradores.");
        expect(procuradores.first().element(Resumo.byColunaNome).getText()).toBe(dadosComplementares.procuradores[0].nome.toUpperCase(), "Falha ao comparar Nome de Procurador");
        expect(procuradores.first().element(Resumo.byColunaVigencia).getText()).toBe(dadosComplementares.procuradores[0].vigencia, "Falha ao comparar Vigência");
      });

      Resumo.abreSessao(Resumo.dadosComplementares, Resumo.bySessaoParticipacoesSocietarias).then(() => {
        let participacoes = ParticipacaoSocietaria.getTableRows();
        //expects Part.Societarias

        expect(participacoes.first().element(Resumo.byColunaCnpj).getText()).toBe(dadosComplementares.participacoesSocietarias[0].cnpj, "Falha ao comparar CNPJ de Participação Societária");
        expect(participacoes.first().element(Resumo.byColunaNomePartSocietaria).getText()).toBe(dadosComplementares.participacoesSocietarias[0].nome, "Falha ao comparar Nome de Participação Societária");
        expect(participacoes.first().element(Resumo.byColunaParticipacao).getText()).toBe(dadosComplementares.participacoesSocietarias[0].participacao, "Falha ao comparar Nome de Participação Societária");
        expect(participacoes.first().element(Resumo.byColunaFuncaoCargo).getText()).toBe(dadosComplementares.participacoesSocietarias[0].funcaoCargo, "Falha ao comparar Função/Cargo de Participação Societária");
      });

      Resumo.abreSessao(Resumo.dadosComplementares, Resumo.bySessaoReferencias).then(() => {
        let referencias = Referencia.getTableRows();
        //expects Referencias
        expect(referencias.first().element(Resumo.byColunaBanco).getText()).toBe(dadosComplementares.referencias[0].bancoEmpresa, "Falha ao comparar Banco/Empresa");
        expect(referencias.first().element(Resumo.byColunaAgencia).getText()).toBe(dadosComplementares.referencias[0].agenciaLoja, "Falha ao comparar Nome Agência / Loja");
      });

      Resumo.abreSessao(Resumo.dadosComplementares, Resumo.bySessaoSeguros).then(() => {
        let seguros = Seguro.getTableRows();
        //expects Seguros
        expect(seguros.first().element(Resumo.byColunaTipo).getText()).toBe(dadosComplementares.seguros[0].tipo, "Falha ao comparar Tipo de Seguro.");
        expect(seguros.first().element(Resumo.bycolunaSeguradora).getText()).toBe(dadosComplementares.seguros[0].seguradora, "Falha ao comparar Seguradora de Seguro.");
        expect(seguros.first().element(Resumo.byColunaVencimento).getText()).toBe(dadosComplementares.seguros[0].vencimento, "Falha ao comparar Vencimento de Seguro.");
        expect(seguros.first().element(Resumo.byColunaValorSegurado).getText()).toBe("R$ " + dadosComplementares.seguros[0].valorSegurado, "Falha ao comparar Vencimento de Seguro.");
      });

      Resumo.abreSessao(Resumo.dadosComplementares, Resumo.bySessaoPlanoSaude).then(() => {
        let planos = PlanoSaude.getTableRows();

        //expects Plano de Saude
        expect(planos.first().element(Resumo.byColunaTipoPlano).getText()).toBe(dadosComplementares.planosDeSaude[0].tipoDePlano, "Falha ao comparar Tipo de Plano de Saúde");
        expect(planos.first().element(Resumo.byColunaInstituicao).getText()).toBe(dadosComplementares.planosDeSaude[0].instituicao, "Falha ao comparar Instituição de Plano de Saúde");
        expect(planos.first().element(Resumo.byColunaValorPlanoSaude).getText()).toBe("R$ " + dadosComplementares.planosDeSaude[0].valorDoPlano, "Falha ao comparar Valor do Plano de Saúde");

      });

      Resumo.abreSessao(Resumo.dadosComplementares, Resumo.bySessaoPrevidencia).then(() => {
        let previdencias = Previdencia.getTableRows();

        //expects Previdencia
        expect(previdencias.first().element(Resumo.byColunaTipoPrevidencia).getText()).toBe(dadosComplementares.previdencias[0].tipoDePrevidencia, "Falha ao comparar Tipo de Previdência");
        expect(previdencias.first().element(Resumo.byColunaInstituicaoPrevidencia).getText()).toBe(dadosComplementares.previdencias[0].instituicao, "Falha ao comparar Instituição de Previdência");
        expect(previdencias.first().element(Resumo.byColunaValorPrevidencia).getText()).toBe("R$ " + dadosComplementares.previdencias[0].valorContribuicao, "Falha ao comparar Valor Contribuição de Previdência");
      });
    });

    Resumo.abreSessao(Resumo.bens).then(() => {

      Resumo.abreSessao(Resumo.bens, Resumo.bySessaoVeiculos).then(() => {
        let veiculos = Veiculo.getTableRows();

        //expects Veiculos
        expect(veiculos.first().element(Resumo.byColunaTipoVeiculo).getText()).toBe(bens.veiculos[0].tipo, "Falha ao comparar Tipo de Veículo - Bens");
        expect(veiculos.first().element(Resumo.byColunaModeloVeiculo).getText()).toBe(bens.veiculos[0].modelo, "Falha ao comparar Modelo de Veículo - Bens");
        expect(veiculos.first().element(Resumo.byColunaAnoFabricacao).getText()).toBe(bens.veiculos[0].anoFabricacao, "Falha ao comparar Ano de Fabricação de Veículo - Bens");
        expect(veiculos.first().element(Resumo.byColunaValorVeiculo).getText()).toBe("R$ " + bens.veiculos[0].valor, "Falha ao comparar Valor de Veículo - Bens");
      });

      Resumo.abreSessao(Resumo.bens, Resumo.bySessaoImoveis).then(() => {
        let imoveis = Imovel.getTableRows();

        //expects Imoveis
        expect(imoveis.first().element(Resumo.byColunaTipoImovel).getText()).toBe(bens.imoveis[0].tipo, "Falha ao comparar Tipo de Imóvel - Bens");
        expect(imoveis.first().element(Resumo.byColunaSituacaoImovel).getText()).toBe(bens.imoveis[0].situacao, "Falha ao comparar Situação de Imóvel - Bens");
        expect(imoveis.first().element(Resumo.byColunaDestinacaoImovel).getText()).toBe(bens.imoveis[0].destinacao, "Falha ao comparar Destinação de Imóvel - Bens");
        expect(imoveis.first().element(Resumo.byColunaValorImovel).getText()).toBe("R$ " + bens.imoveis[0].valorAtual, "Falha ao comparar Valor Atual de Imóvel - Bens");
      });
    });

    Resumo.abreSessao(Resumo.cartaoAutografo).then(() => {
      let lines = CartaoAutografo.getTableRows();

      //expects Cart.Autografo
      expect(lines.first().element(Resumo.byColunaTipoCartaoAutografo).getText()).toBe(cartaoAut[0].tipo, "Falha ao comparar Tipo do Cartão Autógrafo");
      expect(lines.first().element(Resumo.byColunaNomeCartaoAutografo).getText()).toBe(cartaoAut[0].nome.toUpperCase(), "Falha ao comparar Nome do Cartão Autógrafo");
    });

    Resumo.abreSessao(Resumo.rendas).then(() => {
      //expects Rendas
      expect(Renda.getTableRows().first().element(Resumo.byColunaNomeRendas).getText()).toBe(dadosRenda[0].nome.toUpperCase(), "Falha ao comparar Nome da Fonte Pagadora");
      expect(Renda.getTableRows().first().element(Resumo.byColunaCpfCnpjRendas).getText()).toBe(dadosRenda[0].cpfCnpj, "Falha ao comparar CPF/CNPJ da Fonte Pagadora");
      expect(Renda.getTableRows().first().element(Resumo.byColunaValorRendas).getText()).toBe("R$ " + dadosRenda[0].remuneracao, "Falha ao comparar Valor de Remuneração da Renda");
      expect(Renda.getTableRows().first().element(Resumo.byColunaTipoRendas).getText()).toBe(dadosRenda[0].tipoRenda.toUpperCase(), "Falha ao comparar Tipo de Renda");
    });

    Resumo.abreSessao(Resumo.analiseCadastral).then(() => {
      Resumo.abreSessao(Resumo.analiseCadastral, Resumo.bySessaoInfoCompl).then(() => {
        //Expect Informacoes Complementares
        expect(Resumo.tipoPessoaInfoCompl.element(by.css('option[selected="selected"]')).getText()).toBe(analiseCadastral.infoComplementares.tipoPessoa, "Falha ao comparar Tipo Pessoa");
        expect(Resumo.postoInfoCompl.element(by.css('option[selected="selected"]')).getText()).toBe(analiseCadastral.infoComplementares.posto, "Falha ao comparar posto");
        expect(Resumo.avaliacaoGerenteInfoCompl.element(by.css('option[selected="selected"]')).getText()).toBe(analiseCadastral.infoComplementares.avaliacaoGerente, "Falha ao comparar posto");
        expect(Resumo.observacaoInfoCompl.getAttribute('value')).toBe(analiseCadastral.infoComplementares.observacao, "Falha ao comparar Observacao");
        expect(Resumo.observacaoContratoInfoCompl.getAttribute('value')).toBe(analiseCadastral.infoComplementares.observacaoContrato, "Falha ao comparar Observacao");
      });

      Resumo.abreSessao(Resumo.analiseCadastral, Resumo.bySessaoRestricoesAcatadas).then(() => {
        let lines = RestricoesAcatadas.getTableRows();

        //Expect Restricoes Acatadas
        expect(lines.first().element(Resumo.byColunaDataRestricoes).getText()).toBe(analiseCadastral.restricoesAcatadas.dataRestricao, "Falha ao comparar data Restricoes Acatadas");
        expect(lines.first().element(Resumo.byColunaObservacaoRestricoes).getText()).toBe(analiseCadastral.restricoesAcatadas.observacao.toUpperCase(), "Falha ao comparar observacao Restricoes Acatadas");
        expect(lines.first().element(Resumo.byColunaValorRestricoes).getText()).toBe('R$ ' + analiseCadastral.restricoesAcatadas.valor, "Falha ao comparar valor Restricoes Acatadas");
        expect(lines.first().element(Resumo.byColunaResponsavelResrtricoes).getText()).toBe(analiseCadastral.restricoesAcatadas.responsavel.toUpperCase(), "Falha ao comparar Responsavel Restricoes Acatadas");
        expect(lines.first().element(Resumo.byColunaTipoRestricoes).getText()).toBe(analiseCadastral.restricoesAcatadas.tipoRestricao.toUpperCase(), "Falha ao comparar tipo restricao Restricoes Acatadas");
      });

      Resumo.abreSessao(Resumo.analiseCadastral, Resumo.bySessaoMatriculaVinculada).then(() => {
        //Expect Matricula Vinculada
        expect(Resumo.matricula.getAttribute('value')).toBe(analiseCadastral.matriculaVinculada.matricula, "Falha ao comparar matricula");
        expect(Resumo.NomeAssociadoMatricula.getAttribute('value')).toBe(analiseCadastral.matriculaVinculada.nomeAssociado, "Falaha ao comparar Nome Associado");
        expect(Resumo.tipoVinculoMatricula.element(by.css('option[selected="selected"]')).getText()).toContain(analiseCadastral.matriculaVinculada.tipoVinculo, "Falha ao comparar tipo vinculo");
      });

      Resumo.abreSessao(Resumo.analiseCadastral, Resumo.bySessaoPessoaReportavelFatca).then(() => {
        //Expect Pessoa Reportavel Fatca
      });
    });
  });

});