let Menu = require('../../menu/menu.po');
let GeraCPF = require('../../comum/cpfCnpj');
let Cadastro = require('../cadastro/cadastro.po');
let DadosCadastro = require('./dados-cadastro');
let cpf = "";

xdescribe('Gera Massa', () => {
  let countRepeat = 5

  describe('@Cadastro', () => {
    for (var i = 0; i < countRepeat; i++) {
      it('salva cadastro simples', () => {
        Menu.navegaParaCadastroPF();
        cpf = GeraCPF.getCPF();
        Cadastro.cadastraPessoaFisicaSimplesSalvaCPF(DadosCadastro, cpf);
        Menu.navegaParaHome();
      });
    }
  });
});