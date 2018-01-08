let Data = require('../../../comum/data');
let Gerador = require('../../../comum/cpfCnpj');

class Cadastro {
    constructor() {
        this.cadastro = {
            dadosPessoais: {
                cpf: '',
                nomeCompleto: "Amanda da Silva Souza",
                nomeSucinto: "Amanda Souza",
                documentos: {
                    tipoId: "Cart. Motorista",
                    numId: "1020304050",
                    orgExp: "DETRAN",
                    ufExp: "SC",
                    dataEmissao: "10/01/1960",
                    dataNasc: "03/02/1970",
                    protocoloBRSAFE: "55555",
                    sexo: "Feminino",
                    modRepresentanteLegal: "Nenhum",
                    nacionalidade: "brasil",
                    uf: "SC",
                    naturalidade: "Florianópolis"
                },
                filiacao: {
                    nomePai: "João Vicente da Silva Souza",
                    nomeMae: "Maria Augusta Figueiredo Souza"
                },
                estadoCivil: {
                    estadoCivil: "Casado",
                    regimeCasamentoUnião: "Comunhão Parcial de Bens",
                    cpfConjuge: Gerador.getCPF(),
                    nomeCompConjuge: 'Douglas Carvalho Dias',
                    dataNascConjuge: '01/03/1969',
                    tipoIdConjuge: 'Cart. Identidade',
                    numIdConjuge: '1234567',
                    orgExpConjuge: 'SSP',
                    ufConjuge: 'SC',
                    dataEmissaoConjuge: '08/08/1990',
                    profissaoConjuge: 'AGENTE COMUNITARIO DE SAUDE',
                    empresaConjuge: 'Bau da Felicidade',
                    valorRendaConjuge: '2000,00',
                    filiacaoConjuge: {
                        nomePaiConjuge: 'Adão Felizardo Corpes',
                        nomeMaeConjuge: 'Anamélia Lemos Corpes'
                    },
                    contatosConjuge: {
                        fones: [{
                            tipo: "RESIDENCIAL",
                            ddd: "(48)",
                            fone: "9878-9999",
                            observacoes: "OBSERVAÇÃO TELEFONE"
                        }],
                        emails: [{
                            tipo: "PESSOAL",
                            contato: "emailteste@teste.com",
                            observacoes: "OBSERVAÇÃO E-MAIL"
                        }],
                    },
                    dependentes: [
                        {
                            cpf: Gerador.getCPF(),
                            nome: "Dependente Amanda",
                            dataNasc: "10/10/2010",
                            tipo: "21/22 - Filho(a)",
                            valorRenda: "0",
                            valorPensao: "1.500,00"
                        },
                        {
                            cpf: Gerador.getCPF(),
                            nome: "Dependente 2 Amanda",
                            dataNasc: "07/05/1997",
                            tipo: "21/22 - Filho(a)",
                            valorRenda: "0",
                            valorPensao: "900,00"
                        }
                    ],
                    enderecos: [
                        {
                            tipo: "Residencial",
                            cep: "88133-203",
                            principal: true,
                            empostamento: false,
                            logradouro: "Rua Chica da Silva",
                            numero: "123",
                            caixaPostal: "321",
                            complemento: "CASA",
                            bairro: "Jardim Aquarius",
                            uf: "SC",
                            cidade: "Palhoça",
                            situacaoEndereco: "Própria",
                            resideDesde: Data.dataAtual()
                        },
                        {
                            tipo: "Comercial",
                            cep: "88354-487",
                            principal: false,
                            empostamento: false,
                            logradouro: "Rua SC - 044",
                            numero: "123",
                            caixaPostal: "321",
                            complemento: "CASA",
                            bairro: "Souza Cruz",
                            uf: "SC",
                            cidade: "Brusque",
                            situacaoEndereco: "Própria",
                            resideDesde: Data.dataAtual()
                        }
                    ],
                    contatos: {
                        fones: [{
                            tipo: "RESIDENCIAL",
                            ddd: "(47)",
                            fone: "9878-9999",
                            observacoes: "OBSERVAÇÃO TELEFONE"
                        }],
                        emails: [{
                            tipo: "PESSOAL",
                            contato: "teste123@teste.com",
                            observacoes: "OBSERVAÇÃO E-MAIL"
                        },
                        {
                            tipo: "PESSOAL",
                            contato: "teste321@teste.com",
                            observacoes: "OBSERVAÇÃO E-MAIL 1"
                        }
                        ]
                    },
                    dadosProfissionais: {
                        grauInstrucao: "Mestrado",
                        profissao: "VENDEDOR",
                        categoria: "VENDEDOR",
                        numeroRegProfissional: "1234567",
                        orgResponsavel: "CRM",
                        ufRegistro: "Sc",
                        inicioProfissional: "01/08/2017"
                    }
                },
                dadosComplementares: {
                    procuradores: [{
                        cpf: Gerador.getCPF(),
                        nome: 'JOÃO DA SILVA',
                        cargo: 'Atendente',
                        tipoId: 'Cart. Identidade',
                        numId: '102030405',
                        orgExp: 'SSP',
                        ufExp: 'SC',
                        dataEmissao: '01/05/1987',
                        dataNasc: '03/12/1975',
                        tipoProcuracao: 'Particular',
                        prazoProcuracao: 'Determinado',
                        vigencia: Data.dataAtual(),
                        status: 'ativo'
                    }],
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
                        marca: 'MARCA',
                        anoFabricacao: '2015',
                        anoModelo: '2017',
                        valor: '250,00',
                        valorAlienado: '500,00',
                        Situacao: 'Alienado',
                        nf: '12345',
                        fornecedor: 'FORNECEDOR',
                        placa: 'XXX1234',
                        certificadoNumero: '1234567890',
                        chassi: 'abcdefghij1234567890',
                        renavam: '123456789012345'
                    }],
                    imoveis: [{
                        tipo: 'CASA',
                        situacao: 'LIVRE',
                        destinacao: 'RESIDENCIAL',
                        localizacao: 'TESTE LOCALIZAÇÃO 123',
                        area:'989,77',
                        areaConstruida:'12345,67',
                        valorAtual: '8.888,88',
                        valorHipotecado: '9.999,99',
                        valorAvaliacao: '5.762,99',
                        valorAverbacao: '4.333,88',
                        inscricao: 'INSCRIÇÃO 1234',
                        registo: 'EXEMPLO123',
                        numeroMatricula:'1234567890',
                        numeroLivro: '1234567890',
                        cartorio: 'EXEMPLO CARTÓRIO 123',
                        descricao: 'DESCRIÇÃO BENS IMÓVEIS EXEMPLO 1123',
                        origem: 'ORIGEM BENS IMÓVEIS EXEMPLO 1123',
                        cpfVendedor: Gerador.getCPF(),
                        nomeVendedor: 'NOME COMPLETO VENDEDOR'
                    }]
                },
                cartaoAutografo: [{
                    tipo: 'PROCURADOR',
                    nome: 'JOÃO DA SILVA'
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