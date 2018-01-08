var Login = require('./login.po');

xdescribe('Login', () => {
    beforeEach(() => {
        Login.acessaPagina();
    });

    it('não deve logar com as credenciais incorretas', () => {
       Login.credenciais('566', 'camila', 'senha');

       Login
        .botaoEntrar
        .click()
        .then(() => {
            let mensagem = element(by.css('.message-login'))
            expect(mensagem.isDisplayed()).toBe(true);
        });
    });

    it('deve logar com as credenciais corretas', () => {
       Login.credenciais('566', 'camila', '123456');

       Login
        .botaoEntrar
        .click()
        .then(() => {
            expect(browser.getCurrentUrl()).not.toContain('#/login');
        });
    });
});
