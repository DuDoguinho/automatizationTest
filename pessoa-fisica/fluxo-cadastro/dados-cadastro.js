let Data = require('../../comum/data');
let Gerador = require('../../comum/cpfCnpj');

class Cadastro {
  constructor() {
    this.cadastro = {
      dadosPessoais: {
        cpf: '00790038005',
        nomeCompleto: "Juarez Mequetrefe Auto",
        nomeSucinto: "Juarez Auto",
        documentos: {
          tipoId: "Cart. Identidade",
          numId: "1020304050",
          orgExp: "SSP",
          ufExp: "RS",
          dataEmissao: "10/10/2010",
          dataNasc: "03/12/1985",
          protocoloBRSAFE: "55555",
          sexo: "Masculino",
          modRepresentanteLegal: "Nenhum",
          nacionalidade: "brasil",
          uf: "RS",
          naturalidade: "porto alegre"
        },
        representanteLegal: {
          cpf: Gerador.getCPF(),
          nomeCompleto: 'REPRESENTANTE SERENO',
          tipoIdentificacao: 'Cart. Motorista',
          numeroIdentificacao: '987654321',
          orgExp: 'DETRAN',
          ufExp: 'RS',
          dataEmissao: '10/10/2010',
          dataNasc: Data.dataMenosAnos(20),
          endereco:{
            tipo: "Residencial",
            cep: "90820-120",
            logradouro: "RUA ITAPITOCAI",
            numero: "123",
            caixaPostal: "321",
            complemento: "CASA",
            bairro: "CRISTAL",
            uf: "RS",
            cidade: "Porto Alegre",            
          }
        },
        filiacao: {
          nomePai: "João Mequetrefe",
          nomeMae: "Maria Mequetrefe",
        },
        estadoCivil: "Solteiro",
        dependentes: [{
            cpf: Gerador.getCPF(),
            nome: "Dependente Mequetrefe",
            dataNasc: "10/10/2010",
            tipo: "21/22 - Filho(a)",
            valorRenda: "0",
            valorPensao: "2.300,00"
          },
          {
            cpf: Gerador.getCPF(),
            nome: "Dependente 2 Mequetrefe",
            dataNasc: "07/05/1998",
            tipo: "21/22 - Filho(a)",
            valorRenda: "0",
            valorPensao: "1.200,00"
          }
        ],
        enderecos: [{
            tipo: "Residencial",
            cep: "96745-000",
            principal: true,
            empostamento: false,
            logradouro: "LOGRADOURO",
            numero: "123",
            caixaPostal: "321",
            complemento: "CASA",
            bairro: "BAIRRO",
            uf: "RS",
            cidade: "Charqueadas",
            situacaoEndereco: "Própria",
            resideDesde: Data.dataMesAno(2, '-')
          },
          {
            tipo: "Comercial",
            cep: "90820-120",
            principal: false,
            empostamento: false,
            logradouro: "RUA ITAPITOCAÍ",
            numero: "123",
            caixaPostal: "321",
            complemento: "CASA",
            bairro: "CRISTAL",
            uf: "RS",
            cidade: "Porto Alegre",
            situacaoEndereco: "Própria",
            resideDesde: Data.dataMesAno(2, '-')
          }
        ],
        contatos: {
          fones: [{
            tipo: "RESIDENCIAL",
            ddd: "(51)",
            fone: "9878-9999",
            observacoes: "OBSERVAÇÃO TELEFONE"
          }],
          emails: [{
              tipo: "PESSOAL",
              contato: "EMAILDOFULANO1@A.COM",
              observacoes: "OBSERVAÇÃO E-MAIL"
            },
            {
              tipo: "PESSOAL",
              contato: "EMAILDOFULANO@A.COM",
              observacoes: "OBSERVAÇÃO E-MAIL 1"
            }
          ]
        },
        dadosProfissionais: {
          grauInstrucao: "Doutorado",
          profissao: "MUSICO",
          categoria: "MUSICO",
          numeroRegProfissional: "123456",
          orgResponsavel: "Selecione",
          ufRegistro: "Selecione",
          inicioProfissional: ""
        },
        domicilioFiscal: {
          pais: "brasil",
          nrIdentificacao: Gerador.getCPF().replace('.','').replace('.','').replace('-',''),
          observacoes: "CPF"
        }
      },
      dadosComplementares: {
        procuradores: [{
            cpf: Gerador.getCPF(),
            nome: 'JOÃO DA SILVA',
            cargo: 'Arigó Master',
            tipoId: 'Cart. Identidade',
            numId: '102030405',
            orgExp: 'SSP',
            ufExp: 'RS',
            dataEmissao: '01/05/1997',
            dataNasc: '03/12/1985',
            tipoProcuracao: 'Particular',
            prazoProcuracao: 'Determinado',
            vigencia: Data.dataAtual(),
            status: 'ativo'
          },
          {
            cpf: Gerador.getCPF(),
            nome: 'ASTROGILDO PEREIRA',
            cargo: 'Jucupira Mór',
            tipoId: 'Cart. Identidade',
            numId: '5040302010',
            orgExp: 'SSP',
            ufExp: 'RS',
            dataEmissao: '20/07/1980',
            dataNasc: '03/12/1975',
            tipoProcuracao: 'Particular',
            prazoProcuracao: 'Determinado',
            vigencia: Data.dataAtual(),
            status: 'ativo'
          },
        ],
        participacoesSocietarias: [{
          cnpj: Gerador.getCNPJ(),
          nome: 'EMPRESA',
          participacao: '15,00%',
          funcaoCargo: 'SÓCIO/ADMINISTRADOR'
        }],
        referencias: [{
          bancoEmpresa: 'REFERÊNCIA',
          agenciaLoja: 'AGÊNCIA/LOJA'
        }],
        seguros: [{
          tipo: 'SEGURO SAÚDE',
          seguradora: 'ALLIANZ SEGUROS S.A.',
          vencimento: Data.dataAtual(),
          valorSegurado: '300.000,00',
          apolice: '9999999',
          corretora: 'Corretora'
        }],
        planosDeSaude: [{
          tipoDePlano: 'MÉDICO',
          instituicao: 'GOLDEN CROSS',
          valorDoPlano: '250,00',
          cobertura: 'Completa',
          dataDeVencimento: Data.dataAtual()
        }],
        previdencias: [{
          tipoDePrevidencia: 'COMPLEMENTAR',
          instituicao: 'BANCO ITAÚ',
          valorContribuicao: '680,00',
          valorMontante: '250,00',
          inicioDaContribuicao: Data.dataAtual(),
          dependentesSemPlano: '5',
          numeroProposta: '123',
          dependentes: true
        }]
      },
      bens: {
        veiculos: [{
          tipo: 'NÁUTICO',
          modelo: 'MODELO',
          anoFabricacao: '2015',
          valor: '250,00'
        }],
        imoveis: [{
          tipo: 'CASA',
          situacao: 'LIVRE',
          destinacao: 'RESIDENCIAL',
          valorAtual: '8.888,88'
        }]
      },
      cartaoAutografo: [{
        tipo: 'PROCURADOR',
        nome: 'JOÃO DA SILVA'
      },
      {
        tipo: 'PROCURADOR',
        nome: 'ASTROGILDO PEREIRA'
      }],
      rendas: [{
        tipoFontePagadora: "semCnpj",
        cpfCnpj: "",
        nome: "FONTE PAGADORA SEMCNPJ _AUTO",
        layout: "Unimed",
        empresaComCreditoConsignado: false,
        tipoControle: "Privado",
        ramo: "Comércio",
        entitadeCooperativa: false,
        dataAdmissao: "10/10/2000",
        remuneracao: "50.000,00",
        dataRenda: "10/10/2010",
        tipoRenda: "Comprovada",
        comprovacao: "DECORE"
      }],
      analiseCadastal: {
        infoComplementares: {
          tipoPessoa: 'FISICA IMUNE',
          posto: '2 - Posto 2',
          avaliacaoGerente: 'Regular',
          observacao: 'Preenchendo campo observacao',
          observacaoContrato: 'Preenchendo campo observacao contrato'
        },
        restricoesAcatadas: {
          dataRestricao: Data.dataAtual(),
          observacao: 'Preenchendo campo observacao',
          valor: '5.000,00',
          responsavel: 'Bilbo Baggins',
          tipoRestricao: 'Acatado'
        },
        matriculaVinculada: {
          matricula: '53309',
          nomeAssociado: 'Cooperada Ana32250',
          tipoVinculo: 'Pai'
        }
      }
    }
  }
  getDadosPessoais() {
    return this.cadastro.dadosPessoais;
  }

  getDadosComplementares() {
    return this.cadastro.dadosComplementares;
  }

  getBens() {
    return this.cadastro.bens;
  }

  getCartaoAutografo() {
    return this.cadastro.cartaoAutografo;
  }

  getRenda() {
    return this.cadastro.rendas;
  }

  getAnaliseCadastral() {
    return this.cadastro.analiseCadastal;
  }
}

module.exports = new Cadastro();