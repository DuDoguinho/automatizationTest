let cadastroVersao = element(by.css('.dash-info > .dash-version'));

describe('Versão Cadastro', () => {
  it('deve validar se é a versão correta', () => {  
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.presenceOf(cadastroVersao), 5000);  
    expect(cadastroVersao.getText()).toBe(browser.params.versao, "Falha ao validar versão do ambiente de Cadastro.");
  });
});    
  