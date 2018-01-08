class Modal {
    getModalBtn(tipo) {
        tipo = tipo || 'yes';
        let modalBtn = element.all(by.css('div.modal-content')).first();
        modalBtn = modalBtn.element(by.css('div.modal-footer'));
        modalBtn = modalBtn.element(by.css('button[ng-click="' + tipo + '()"]'));
        return modalBtn;
    }

    getModal() {        
        let modal = element.all(by.css('div.modal-content')).first();
        return modal;
    }

    getModalMsg() {
        let modalMsg = element.all(by.css('div.modal-content')).first();
        modalMsg = modalMsg.element(by.css('div.modal-body')).getText();
        return modalMsg;
    }

    clickModalBtn(type) {
        type = type || 'close';
        let btnConfirma = this.getModalBtn(type);
        return btnConfirma.click();
    }
}

module.exports = new Modal();