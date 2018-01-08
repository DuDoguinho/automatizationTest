class UISelect {

    seleciona(modelId, text) {
        return this.pesquisa(modelId, text).first().click();
    }

    pesquisa(modelId, text) {
        let model = element(by.model(modelId));
        model.click();

        model.element(by.model('$select.search')).sendKeys(text);

        return model.all(by.css('.ui-select-choices-row-inner span'));
    }

    campoSelecionado(modelId) {
        let model = element(by.model(modelId));
        model.click();

        return model.element(by.model('$select.search'));
    }
}

module.exports = new UISelect();