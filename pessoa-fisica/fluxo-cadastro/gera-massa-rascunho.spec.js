let Menu = require('../../menu/menu.po');
let GeraCPF = require('../../comum/cpfCnpj');
let Cadastro = require('../cadastro/cadastro.po');
let DadosCadastro = require('./dados-cadastro');
let cpf = "";

xdescribe('Gera Massa', () => {
  let countRepeat = 3

  describe('@RascunhoSimples', () => {
    for (var i = 0; i < countRepeat; i++) {
      it('salva rascunho simples', () => {
        Menu.navegaParaCadastroPF();
        let cpf = Cadastro.preenchePessoaFisicaSemAutografo(DadosCadastro);
        Cadastro.navegaAnaliseCadastral(cpf);
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
    };
  });

  describe('@RascunhoCompleto', () => {
    for (var i = 0; i < countRepeat; i++) {
      xit('salva rascunho completo', () => {
        Menu.navegaParaCadastroPF();        
        let cpf = Cadastro.preenchePessoaFisica(DadosCadastro);
        Cadastro.navegaAnaliseCadastral(cpf);
        Cadastro.proximo.click().then(() => {
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
      });
    };
  });

});