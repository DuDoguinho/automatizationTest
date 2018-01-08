let Menu = require('../../menu/menu.po');
let GeraCPF = require('../../comum/cpfCnpj');
let Cadastro = require('../cadastro/cadastro.po');
let DadosCadastro = require('./dados-cadastro');
let cpf = "";

xdescribe('Gera Massa', () => {
  let countRepeat = 3

  describe('@Matricula', () => {
    for (var i = 0; i < countRepeat; i++) {
      it('salva cadastro/matrícula', () => {
        Menu.navegaParaCadastroPF();
        cpf = Cadastro.cadastraPessoaFisica(DadosCadastro);
        Menu.navegaParaCadastroPF().then(() => {
          Cadastro.buscaCpf(cpf);
          Cadastro.cadastraMatricula(cpf);
          Menu.navegaParaHome();
        });
      });
    }
  });

});