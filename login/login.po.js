class Login {
    constructor() {
        this.usuario = element(by.id('username'));
        this.senha = element(by.id('password'));
        //this.botaoEntrar = element(by.id('bttEntrar'));
        this.botaoEntrar = element(by.id('kc-login'));
        this.sair = element(by.css('.logoutBtn'));
        this.home = element(by.css('.home-title'));
    }

    acessaPagina() {
        //browser.get('#/login');
        browser.ignoreSynchronization = true;
        browser.get('login');
    }

    cooperativa(texto) {
        //var cooperativa = element(by.model('$ctrl.data.cooperativa.selected'));
        //var cooperativaSelecionada = cooperativa.element(by.css('.ui-select-search'));
        var cooperativa = element(by.css('button[data-id="cooperativa"]'));
        cooperativa.click().then(() => {
            var cooperativaSelecionada = element(by.css('div.bs-searchbox')).element(by.css('input'));
            //var cooperativaSelecionada = element(by.model('$select.search'));
            cooperativaSelecionada.sendKeys(texto);

            //element.all(by.css('.ui-select-choices-row-inner span')).first().click();
            element.all(by.css('.active')).first().click();
        });
    }

    credenciais(cooperativa, usuario, senha) {
        this.usuario.sendKeys(usuario);
        this.senha.sendKeys(senha);
        this.cooperativa(cooperativa);
    }

    logarNaPagina() {
        this.acessaPagina();
        this.credenciais('566', 'camila', '123456');
        this.botaoEntrar.click().then(() => {
            browser.ignoreSynchronization = false;
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(this.home), 5000);
        });
    }

}


module.exports = new Login();