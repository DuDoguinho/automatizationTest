class Resumo {
  constructor() {
    this.dadosPessoais = element(by.css('sessao-resumo[titulo="Dados Pessoais"]'));
    this.dadosComplementares = element(by.css('sessao-resumo[titulo="Dados Complementares"]'));
    this.bens = element(by.css('sessao-resumo[titulo="Bens"]'));
    this.cartaoAutografo = element(by.css('sessao-resumo[titulo="Cartão Autógrafo"]'));
    this.rendas = element(by.css('sessao-resumo[titulo="Rendas"]'));
    this.analiseCadastral = element(by.css('sessao-resumo[titulo="Análise Cadastral"]'));
    
    this.cpf = this.dadosPessoais.element(by.model('$ctrl.cpfNome.cpf'));
    this.nomeCompleto = this.dadosPessoais.element(by.model('$ctrl.cpfNome.nomeCompleto'));
    this.nomeSucinto = this.dadosPessoais.element(by.model('$ctrl.cpfNome.nomeSucinto'));

    this.sessaoDocumentos = this.dadosPessoais.element(by.css('[titulo="Documentos"]'));
    this.bySessaoDocumentos = by.css('[titulo="Documentos"]');
    this.tipoId = this.sessaoDocumentos.element(by.model('$ctrl.documento.tipoIdentificacao'));
    this.numId = this.sessaoDocumentos.element(by.model('$ctrl.documento.numeroIdentificacao'));
    this.orgExp = this.sessaoDocumentos.element(by.model('$ctrl.documento.orgaoExpedidor'));
    this.ufExp = this.sessaoDocumentos.element(by.model('$ctrl.documento.ufExpedidor'));
    this.dataEmissao = this.sessaoDocumentos.element(by.model('$ctrl.documento.dataEmissao'));
    this.dataNasc = this.sessaoDocumentos.element(by.model('$ctrl.documento.dataNascimento'));
    this.protocoloBRSAFE = this.sessaoDocumentos.element(by.model('$ctrl.documento.protocoloBRSafe'));
    this.sexo = this.sessaoDocumentos.element(by.model('$ctrl.documento.sexo'));
    this.modReprLegal = this.sessaoDocumentos.element(by.model('$ctrl.documento.modalidadeRepresentanteLegal.selected'));
    this.nacionalidade = this.sessaoDocumentos.element(by.model('$ctrl.documento.nacionalidade'));
    this.uf = this.sessaoDocumentos.element(by.model('$ctrl.documento.uf'));
    this.naturalidade = this.sessaoDocumentos.element(by.model('$ctrl.documento.naturalidade.selected'));

    this.sessaoFiliacao = this.dadosPessoais.element(by.css('[titulo="Filiação"]'));
    this.bySessaoFiliacao = by.css('[titulo="Filiação"]');
    this.nomePai = this.sessaoFiliacao.element(by.model('$ctrl.filiacao.nomePai'));
    this.nomeMae = this.sessaoFiliacao.element(by.model('$ctrl.filiacao.nomeMae'));

    this.sessaoEstadoCivil = this.dadosPessoais.element(by.css('[titulo="Estado civil"]'));
    this.bySessaoEstadoCivil = by.css('[titulo="Estado civil"]');
    this.estadoCivil = this.sessaoEstadoCivil.element(by.model('$ctrl.estadoCivil'));
    this.regimeCasamento = this.sessaoEstadoCivil.element(by.model('$ctrl.regimeCasamento'));
    this.cpfConjuge = this.sessaoEstadoCivil.element(by.model('$ctrl.cpf'));
    this.nomeConjuge = this.sessaoEstadoCivil.element(by.model('$ctrl.conjuge.nomeCompleto'));
    this.dataNascConj = this.sessaoEstadoCivil.element(by.model('$ctrl.conjuge.dataNascimento'));
    this.tipoIdConj = this.sessaoEstadoCivil.element(by.model('$ctrl.conjuge.tipoIdentificacao'));
    this.numIdConj = this.sessaoEstadoCivil.element(by.model('$ctrl.conjuge.numeroIdentificacao'));
    this.orgExpConj = this.sessaoEstadoCivil.element(by.model('$ctrl.conjuge.orgaoExpedidor'));
    this.ufConj = this.sessaoEstadoCivil.element(by.model('$ctrl.conjuge.ufExpedidor'));
    this.dataEmissaoConj = this.sessaoEstadoCivil.element(by.model('$ctrl.conjuge.dataEmissao'));
    this.profissaoConj = this.sessaoEstadoCivil.element(by.model('$ctrl.conjuge.profissao'));
    this.empresaConj = this.sessaoEstadoCivil.element(by.model('$ctrl.conjuge.empresa'));
    this.valorRendaConj = this.sessaoEstadoCivil.element(by.model('$ctrl.conjuge.valorRenda'));

    this.nomePaiConj = this.sessaoEstadoCivil.element(by.model('$ctrl.filiacao.nomePai'));
    this.nomeMaeConj = this.sessaoEstadoCivil.element(by.model('$ctrl.filiacao.nomeMae'));

    this.checkBoxNomePaiConj = this.sessaoEstadoCivil.element(by.model('$ctrl.filiacao.nomePaiNaoDeclarado'));
    this.checkBoxNomeMaeConj = this.sessaoEstadoCivil.element(by.model('$ctrl.filiacao.nomeMaeNaoDeclarado'));

    this.sessaoDependentes = this.dadosPessoais.element(by.css('[titulo="Dependentes"]'));
    this.byColunaCpfDependente = by.binding('dependente.cpf | brCpf');
    this.byColunaNomeDependente = by.binding('dependente.nomeCompleto');
    this.byColunaNascimentoDependente = by.binding("dependente.dataNascimento.format('DD/MM/YYYY')");

    this.bySessaoDependentes = by.css('[titulo="Dependentes"]');

    this.sessaoEnderecos = this.dadosPessoais.element(by.css('[titulo="Endereços"]'));
    this.bySessaoEnderecos = by.css('[titulo="Endereços"]');
    this.byColunaCEP = by.binding('endereco.cep | brCep');
    this.byColunaLogradouro = by.binding('endereco.logradouro');
    this.byColunaNumero = by.binding('endereco.numero');
    this.byColunaCidade = by.binding('endereco.cidade');
    this.byColunaPrincipal = by.css('span[ng-show="endereco.principal"]');
    this.byColunaEmpostamento = by.css('span[ng-show="endereco.principal"]');

    this.sessaoContatos = this.dadosPessoais.element(by.css('[titulo="Contatos"]'));
    this.bySessaoContatos = by.css('[titulo="Contatos"]');
    this.byColunaTipoTelefoneContato = by.binding("contato.tipoTelefone");
    this.byColunaTipoEmailContato = by.binding("contato.tipoEmail");
    this.byColunaContato = by.binding("contato.ddd + contato.numero | brPhoneNumber");
    this.byColunaContatoEmail = by.binding('contato.endereco');
    this.byColunaObsContato = by.binding("contato.observacao");

    this.sessaoDadosProfissionais = this.dadosPessoais.element(by.css('[titulo="Dados Profissionais"]'));
    this.bySessaoDadosProfissionais = by.css('[titulo="Dados Profissionais"]');
    this.grauInstrucao = this.dadosPessoais.element(by.model('$ctrl.profissional.grauInstrucao'));
    this.profissao = this.dadosPessoais.element(by.model('$ctrl.profissional.profissao'));
    this.categoria = this.dadosPessoais.element(by.model('$ctrl.profissional.especialidade'));
    this.numRegProfissional = this.dadosPessoais.element(by.model('$ctrl.profissional.nrRegistroProfissional'));
    this.orgResponsavel = this.dadosPessoais.element(by.model('$ctrl.profissional.cdOrgaoResponsavel'));
    this.ufRegistro = this.dadosPessoais.element(by.model('$ctrl.profissional.ufRegistro'));
    this.inicioProfissional = this.dadosPessoais.element(by.model('$ctrl.profissional.inicioProfissional'));
    this.mesesDeProfissao = this.dadosPessoais.element(by.model('$ctrl.profissional.mesesProfissao'));

    this.sessaoDomicilioFiscal = this.dadosPessoais.element(by.css('[titulo="Domicílio Fiscal"]'));
    this.bySessaoDomicilioFiscal = by.css('[titulo="Domicílio Fiscal"]');
    this.byColunaPais = by.binding('domicilio.siglaPais.descricao');
    this.byColunaNrIdentificacao = by.binding('domicilio.numeroIdentificacao');
    this.byColunaObservacoes =  by.binding('domicilio.observacao');

    this.sessaoProcuradores = this.dadosComplementares.element(by.css('[titulo="Procuradores"]'));
    this.bySessaoProcuradores = by.css('[titulo="Procuradores"]');
    this.byColunaCpf = by.binding("procurador.cpf | brCpf");
    this.byColunaNome = by.binding("procurador.nomeCompleto");
    this.byColunaVigencia = by.binding("procurador.procuracao.vigencia.format('DD/MM/YYYY')");

    this.sessaoParticipacoesSocietarias = this.dadosComplementares.element(by.css('[titulo="Participações Societárias"]'));
    this.bySessaoParticipacoesSocietarias = by.css('[titulo="Participações Societárias"]');
    this.byColunaCnpj = by.binding("participacaoSocietaria.cnpj | brCnpj");
    this.byColunaNomePartSocietaria = by.binding("participacaoSocietaria.nome");
    this.byColunaParticipacao = by.binding("participacaoSocietaria.percentualParticipacao*0.01 | percentage:'2'");
    this.byColunaFuncaoCargo = by.binding("participacaoSocietaria.descricaoFuncaoCargo");

    this.sessaoReferencias = this.dadosComplementares.element(by.css('[titulo="Referências"]'));
    this.bySessaoReferencias = by.css('[titulo="Referências"]');
    this.byColunaBanco = by.binding("referencia.nomeBancoEmpresa");
    this.byColunaAgencia = by.binding("referencia.nomeAgenciaLoja");

    this.sessaoSeguros = this.dadosComplementares.element(by.css('[titulo="Seguros"]'));
    this.bySessaoSeguros = by.css('[titulo="Seguros"]');
    this.byColunaTipo = by.binding("seguro.tipoDescricao");
    this.bycolunaSeguradora = by.binding("seguro.seguradoraDescricao");
    this.byColunaVencimento = by.binding("seguro.dataVencimento.format('DD/MM/YYYY')");
    this.byColunaValorSegurado = by.binding("seguro.valorSegurado | finance:true");

    this.sessaoPlanoSaude = this.dadosComplementares.element(by.css('[titulo="Planos de Saúde"]'));
    this.bySessaoPlanoSaude = by.css('[titulo="Planos de Saúde"]');
    this.byColunaTipoPlano = by.binding("plano.descricaoTipoDePlano");
    this.byColunaInstituicao = by.binding("plano.descricaoInstituicao");
    this.byColunaValorPlanoSaude = by.binding("plano.valorMensal | finance:true");

    this.sessaoPrevidencia = this.dadosComplementares.element(by.css('[titulo="Previdências"]'));
    this.bySessaoPrevidencia = by.css('[titulo="Previdências"]');
    this.byColunaTipoPrevidencia = by.binding("previdencia.descricaoTipoDePrevidencia");
    this.byColunaInstituicaoPrevidencia = by.binding("previdencia.descricaoInstituicao ");
    this.byColunaValorPrevidencia = by.binding("previdencia.valorContribuicao | finance:true");

    this.sessaoVeiculos = this.bens.element(by.css('[titulo="Veículos"]'));
    this.bySessaoVeiculos = by.css('[titulo="Veículos"]');
    this.byColunaTipoVeiculo = by.binding("veiculo.descricaoTipoDeVeiculo");
    this.byColunaModeloVeiculo = by.binding("veiculo.modelo");
    this.byColunaAnoFabricacao = by.binding("veiculo.anoFabricacao.format('YYYY')");
    this.byColunaValorVeiculo = by.binding("veiculo.valorVeiculo | finance:true");

    this.sessaoImoveis = this.bens.element(by.css('[titulo="Imóveis"]'));
    this.bySessaoImoveis = by.css('[titulo="Imóveis"]');
    this.byColunaTipoImovel = by.binding("imovel.descricaoTipoDeImovel");
    this.byColunaSituacaoImovel = by.binding("imovel.situacao");
    this.byColunaDestinacaoImovel = by.binding("imovel.destinacao");
    this.byColunaValorImovel = by.binding("imovel.valorAtual | finance:true");

    this.sessaoCartaoAutografo = this.cartaoAutografo.element(by.css('[titulo="Cartão Autógrafo"]'));
    this.bySessaoCartaoAutografo = by.css('[titulo="Cartão Autógrafo"]');
    this.byColunaTipoCartaoAutografo = by.binding("cartaoAutografo.pessoa.tipo.descricao");
    this.byColunaNomeCartaoAutografo = by.binding("cartaoAutografo.pessoa.nome");

    this.sessaoRendas = this.rendas.element(by.css('[titulo="Rendas"]'));
    this.bySessaoRendas = by.css('[titulo="Renda"]');
    this.byColunaNomeRendas = by.binding("renda.fontePagadora.nome");
    this.byColunaCpfCnpjRendas = by.binding("renda.fontePagadora.cpfCnpj | brCpfCnpj");
    this.byColunaValorRendas = by.binding("renda.remuneracao | finance:true");
    this.byColunaTipoRendas = by.binding("renda.descricaoTipoDeRenda");
    this.byColunaPercentualRendas = by.binding("(renda.remuneracao / $ctrl.rendas.total) | percentage");

    this.sessaoInfoCompl = this.analiseCadastral.element(by.css('[titulo="Informações Complementares"]'));
    this.bySessaoInfoCompl = by.css('[titulo="Informações Complementares"]');
    this.tipoPessoaInfoCompl = this.sessaoInfoCompl.element(by.model("$ctrl.informacoesComplementares.codigoTipoPessoa"));
    this.dataAnaliseInfoCompl = this.sessaoInfoCompl.element(by.model("$ctrl.informacoesComplementares.dataAnalise"));
    this.postoInfoCompl = this.sessaoInfoCompl.element(by.model("$ctrl.informacoesComplementares.codigoPosto"));
    this.avaliacaoGerenteInfoCompl = this.sessaoInfoCompl.element(by.model("$ctrl.informacoesComplementares.avaliacaoGerente"));
    this.observacaoInfoCompl = this.sessaoInfoCompl.element(by.model("$ctrl.informacoesComplementares.observacao"));
    this.observacaoContratoInfoCompl = this.sessaoInfoCompl.element(by.model("$ctrl.informacoesComplementares.observacaoContrato"));

    this.sessaoRestricoesAcatadas = this.analiseCadastral.element(by.css('[titulo="Restrições Acatadas"]'));
    this.bySessaoRestricoesAcatadas = by.css('[titulo="Restrições Acatadas"]');
    this.byColunaDataRestricoes = by.binding("restricao.data.format('DD/MM/YYYY')");
    this.byColunaObservacaoRestricoes = by.binding("restricao.observacao");
    this.byColunaValorRestricoes = by.binding("restricao.valor | finance:true");
    this.byColunaResponsavelResrtricoes = by.binding("restricao.responsavel");
    this.byColunaTipoRestricoes = by.binding("restricao.tipo");

    this.sessaoMatriculaVinculada = this.analiseCadastral.element(by.css('[titulo="Matrícula Vinculada"]'));
    this.bySessaoMatriculaVinculada = by.css('[titulo="Matrícula Vinculada"]');
    this.matricula = this.sessaoMatriculaVinculada.element(by.model("$ctrl.vinculo.numeroMatricula"));
    this.NomeAssociadoMatricula = this.sessaoMatriculaVinculada.element(by.model("$ctrl.vinculo.nomeAssociado"));
    this.tipoVinculoMatricula = this.sessaoMatriculaVinculada.element(by.model("$ctrl.vinculo.tipoVinculo"));

    this.sessaoPessoaReportavelFatca = this.analiseCadastral.element(by.css('[titulo="Pessoa Reportável FATCA"]'));
    this.bySessaoPessoaReportavelFatca = by.css('[titulo="Pessoa Reportável FATCA"]');
  }

  abreSessao(sessaoPai, bySessao) {
    if (bySessao != null && bySessao != undefined) {
      return sessaoPai.element(bySessao).click();
    } else {
      return sessaoPai.element(by.css('.sectionWrapperHeader')).click();
    }
  }
}

module.exports = new Resumo();