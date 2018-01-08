let Agendamento = require('./agendamento-integralizacoes.po');
let Mensagem = require('../../../comum/mensagem');
let Menu = require('../../../menu/menu.po');
let Cadastro = require('../../cadastro/cadastro.po');
let DadosCadastro = require('../../fluxo-cadastro/dados-cadastro');
let Data = require('../../../comum/data');
let cpf = '';
var EC = protractor.ExpectedConditions;
let contaTemp = '2066440';

describe('Agendamento Capital', () => {
  describe('Agendamento de Integralizações', () => {
    beforeEach(() => {
      Menu.navegaParaCadastroPF();
      if (!cpf) {
        cpf = Cadastro.cadastraPessoaFisicaSimples(DadosCadastro);
        Menu.navegaParaCadastroPF();
        Cadastro.buscaCpf(cpf);
        Cadastro.cadastraMatricula();
        Menu.navegaParaCadastroPF();
      }
      Cadastro.buscaCpf(cpf);
      Menu.navegaParaAgendamentoCapital();
    });

    it('deve validar obrigatoriedade dos campos', () => {
      Agendamento.btnSalvar.click().then(() => {
        expect(Mensagem.obrigatoriedade(Agendamento.contaDebito)).toBe(true, "Falha ao validar obrigatoriedade do campo 'Conta Débito'.");
        expect(Mensagem.obrigatoriedade(Agendamento.lancIntegralizacao)).toBe(false, "Falha ao validar obrigatoriedade do campo 'Lanc. Integralização'.");
        expect(Mensagem.obrigatoriedade(Agendamento.capitalIntegralizar)).toBe(true, "Falha ao validar obrigatoriedade do campo 'Capital a Integralizar'.");
        expect(Mensagem.obrigatoriedade(Agendamento.qtdParcelas)).toBe(true, "Falha ao validar obrigatoriedade do campo 'Qtd. Parcelas'.");
        expect(Mensagem.obrigatoriedade(Agendamento.valorParcelaMensal)).toBe(true, "Falha ao validar obrigatoriedade do campo 'Valor Parcela Mensal'.");

        Agendamento.tipoAgendamento.getAttribute('value').then((tipo) => {
          if (tipo == "F") {
            expect(Mensagem.obrigatoriedade(Agendamento.vencParcelaDia)).toBe(true, "Falha ao validar obrigatoriedade do campo 'Venc. Parcela' para Dia fixo.");
          } else {
            expect(Mensagem.obrigatoriedade(Agendamento.vencParcelaAnoMes)).toBe(true, "Falha ao validar obrigatoriedade do campo 'Venc. Parcela' para Último dia útil.");
          }
        });

        expect(Mensagem.obrigatoriedade(Agendamento.tipoCobranca)).toBe(false, "Falha ao validar obrigatoriedade do campo 'Tipo Cobrança'.");
      });
      Menu.navegaParaHome();
    });

    it('deve popular Nome do Correntista ao inserir uma Conta Débito', () => {
      expect(Agendamento.nomeCorrentista.getText('value')).toBe('ASSOCIADO SEM CONTA CADASTRADA', 'Falha ao identificar valor default do campo Nome do Correntista');
      Agendamento.contaDebito.sendKeys(contaTemp + protractor.Key.TAB);
      expect(Agendamento.nomeCorrentista.getText('value')).toBe('JUAREZ AUTO', "Falha ao validar Nome do Correntista");
      Menu.navegaParaHome();
    });

    it('deve popular Nome do Correntista como "NÃO ENCONTRADO" ao inserir uma Conta Débito inválida', () => {
      expect(Agendamento.nomeCorrentista.getText('value')).toBe('ASSOCIADO SEM CONTA CADASTRADA', 'Falha ao identificar valor default do campo Nome do Correntista');
      Agendamento.contaDebito.sendKeys('666' + protractor.Key.TAB);
      expect(Agendamento.nomeCorrentista.getText('value')).toBe('NÃO ENCONTRADO', "Falha ao validar Nome do Correntista");
      Menu.navegaParaHome();
    });

    it('campo Nome do Correntista deve vir desabilitado', () => {
      expect(Agendamento.nomeCorrentista.isDisplayed()).toBe(true, "Falha ao validar se campo Nome do Correntista está desabilitado.");
    });

    it('deve verificar que campo Data da Entrada não aceita data inválida', () => {
      let dataInvalida = '99/99/9999'

      Agendamento.dataEntrada.clear();
      Agendamento.dataEntrada.sendKeys(dataInvalida + protractor.Key.TAB);
      expect(Agendamento.dataEntrada.getAttribute('value')).toBe('', 'Falha ao validar campo Data de Entrada com valor inválido.');
    });

    it('validar que campo Data da Entrada deve ter início sempre a partir do próximo dia subsequente ao dia de hoje', () => {
      let data = Data.dataAtual();
      Agendamento.dataEntrada.clear();
      Agendamento.dataEntrada.sendKeys(data + protractor.Key.TAB);
      expect(Agendamento.dataEntrada.getAttribute('value')).toBe(Data.dataFutura(1,'days'), 'Falha ao validar campo Data de Entrada com valor inválido.');
    });

    it('validar que campo Valor da Parcela deve preencher o valor a ser pago mensalmente pelo usuário para completar o valor total da cota.', () => {
      let capital = 50000000;
      let qtdParcelas = 120;
      let entrada = 0;
      let valorParcelaMensal = (((capital/100)-entrada)/qtdParcelas).toFixed(2).replace('.',',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.');
      
      Agendamento.capitalIntegralizar.clear();
      Agendamento.capitalIntegralizar.sendKeys(capital.toString());
      Agendamento.qtdParcelas.clear();
      Agendamento.qtdParcelas.sendKeys(qtdParcelas.toString() + protractor.Key.TAB).then(()=>{
        expect(Agendamento.valorParcelaMensal.getAttribute('value')).toBe('R$ '+valorParcelaMensal, "Falha ao validar se campo Valor Parcela Mensal está sendo calculado de acordo.");
      });
    });

    it('validar que campo Quantidade de Parcelas deve conter o número de parcelas baseado no cálculo.', () => {
      let capital = 50000000;
      let entrada = 0;
      let valorParcelaMensal = 300000
      let qtdParcelas = Math.round(((capital/100)-entrada)/(valorParcelaMensal/100));
      
      Agendamento.capitalIntegralizar.clear();
      Agendamento.capitalIntegralizar.sendKeys(capital.toString());
      Agendamento.valorParcelaMensal.clear();
      Agendamento.valorParcelaMensal.sendKeys(valorParcelaMensal.toString() + protractor.Key.TAB).then(()=>{        
        expect(Agendamento.qtdParcelas.getAttribute('value')).toBe(qtdParcelas.toString(), "Falha ao validar se campo Quantidade de Parcelas está sendo calculado de acordo.");
      });
    });

    it('validar que ao selecionar "Dia fixo" no campo Venc. Parcela deve aceitar uma data com espaço apenas para o Dia de vencimento (DD)', () => {
      Agendamento.setTipoAgendamento('fixo');
      Agendamento.vencParcelaDia.clear();
      Agendamento.vencParcelaDia.sendKeys(Data.diaAtual(2));      
      Agendamento.vencParcelaAnoMes.sendKeys(Data.dataMesAno(1));
      expect(Agendamento.vencParcelaDia.getAttribute('value')).toBe(Data.diaAtual(2), "Falha ao validar valor do campo 'Venc. Parcela' para Dia fixo.");
      expect(Agendamento.vencParcelaAnoMes.getAttribute('value')).toBe(Data.dataMesAno(1), "Falha ao validar valor do campo 'Mês Inicial' para Dia fixo.");
    });

    it('validar que ao selecionar "Último dia Útil" no campo Venc. Parcela deve desabilitar o campo "Venc. Parcela" e verificar o valor no campo Mês Inicial (MM/YYYY)', () => {      
      Agendamento.setTipoAgendamento('útil');            
      Agendamento.vencParcelaAnoMes.clear();
      Agendamento.vencParcelaAnoMes.sendKeys(Data.dataMesAno(1));
      Agendamento.vencParcelaDia.click().then(()=>{
        expect(Agendamento.vencParcelaDia.isEnabled()).toBe(false,"Falha ao validar se campo Dia de Vencimento da Parcela está desabilitado.");
        expect(Agendamento.vencParcelaDia.getAttribute('value')).toBe('', "Falha ao validar valor do campo 'Venc. Parcela' para Dia fixo.");
        expect(Agendamento.vencParcelaAnoMes.getAttribute('value')).toBe(Data.dataMesAno(1), "Falha ao validar valor do campo 'Mês Inicial' para Último dia Útil.");
      });      
    });

    it('verificar se ao selecionar Débito em Conta no campo Tipo de Cobrança aparece um checkbox Verificar Saldo',()=>{
      Agendamento.setTipoCobranca('Cobrança').then(()=>{
        expect(Agendamento.verificarSaldo.isPresent()).toBe(false, "Falha ao verificar se checkbox Verificar Saldo está oculto.");
      });
      Agendamento.setTipoCobranca('Débito em Conta').then(()=>{
        expect(Agendamento.verificarSaldo.isDisplayed()).toBe(true, "Falha ao verificar se checkbox Verificar Saldo está sendo mostrado.");
      });
    });

    it('deve cadastrar um Agendamento de Capital', () => {
      Agendamento.contaDebito.clear();
      Agendamento.contaDebito.sendKeys(contaTemp + protractor.Key.TAB);
      expect(Agendamento.nomeCorrentista.getText('value')).toBe('JUAREZ AUTO', "Falha ao validar Nome do Correntista");

      Agendamento.setLancIntegralizacao();
      Agendamento.capitalIntegralizar.clear();
      Agendamento.capitalIntegralizar.sendKeys('500.000,00');
      Agendamento.qtdParcelas.clear();
      Agendamento.qtdParcelas.sendKeys('300' + protractor.Key.TAB).then(() => {
        expect(Agendamento.valorParcelaMensal.getAttribute('value')).toBe('R$ 1.666,67')
      })

      Agendamento.setTipoAgendamento('Últim');
      Agendamento.vencParcelaDia.click();
      Agendamento.vencParcelaAnoMes.sendKeys(Data.dataAtualMesAno() + protractor.Key.TAB);

      Agendamento.setTipoCobranca();

      Agendamento.btnSalvar.click().then(() => {        
        browser.wait(EC.presenceOf(Menu.agendamentoCapital), 10000);
        expect(Menu.agendamentoCapital.element(by.css('.card-done.active')).isDisplayed()).toBe(true, "Falha ao validar se Agendamento de Capital foi efetuado com sucesso.");
        element(by.css('modal-steps')).element(by.css('.uni-modal--close')).click().then(() => {
          expect(Agendamento.msgs_sucesso.getText()).toContain('Os dados de agendamento foram salvos com sucesso.', "Falha ao validar se mensagem de sucesso de Agendamento de Capital foi apresentada corretamente.");
        });
      });
    });
  });

});