class Mensagem {
    obrigatoriedade(item) {
        return item.element(by.xpath('following-sibling::label')).isPresent();
    }

    textoMensagem(item) {
       try{ 
            return item.element(by.xpath('following-sibling::label')).getText();
        }
        catch(exception) {return '';}
    }

    ativarCampo(item) {
        item.sendKeys('9');
        item.clear();
        element(by.css('body')).click();
    }

    visivel(item) {
        return item.element(by.xpath('following-sibling::label')).isPresent();
    }
}

module.exports = new Mensagem();