let Cadastro = require('../pessoa-fisica/cadastro/cadastro.po')
let Update = require('../pessoa-fisica/cadastro/alteracao-cadastral.po');
let Menu = require('../menu/menu.po');
let cpf = ''

xdescribe('Validação de Busca', () => {
  beforeAll(()=>{
    pending('É necessário avaliar o cenário');
    Menu.navegaParaCadastroPF();
    cpf = Cadastro.cadastraPessoaFisicaSimples();
    Menu.navegaParaCadastroPF(); 
    Cadastro.buscaCpf(cpf);
    Cadastro.cadastraMatricula(cpf);
    Menu.navegaParaCadastroPF(); 
    Cadastro.buscaCpf(cpf);
    Cadastro.cadastraMatricula(cpf);
  });
  
  describe('Insert Cadastro', () => {    
    it('deve buscar por cpf', () => {
      pending('É necessário avaliar o cenário');
      Menu.navegaParaCadastroPF();      
    });
  });
  
  describe('Alteração Cadastral', () => {
    it('deve buscar por cpf', () => {
      pending('É necessário avaliar o cenário');
      let update = new Update(cpf);
      Menu.navegaParaAlteracaoCadastral();
      update.buscaCpf(cpf);
      expect(element(by.css('[ng-if="$ctrl.contaCorrentista"]')).isPresent()).toBe(true, "Falha ao verificar busca por CPF.");
    });

    it('deve buscar por matrícula', () => {
      pending('É necessário avaliar o cenário');
      let update = new Update(matricula);
      Menu.navegaParaAlteracaoCadastral();
      update.buscaMatricula(matricula);
      expect(element(by.css('[ng-if="$ctrl.contaCorrentista"]')).isPresent()).toBe(true, "Falha ao verificar busca por Matrícula.");
    });

    it('deve buscar por conta', () => {
      pending('É necessário avaliar o cenário');
      let update = new Update(conta);
      Menu.navegaParaAlteracaoCadastral();
      update.buscaConta(conta);
      expect(element(by.css('[ng-if="$ctrl.contaCorrentista"]')).isPresent()).toBe(true, "Falha ao verificar busca por Conta.");
    });
  });
  
});