let moment = require('moment');
class Estresse {

    gerarString(length) {
        let longString = "";
        for (let i = 0; i < (length + 1); i++) {
            longString += "9";
        }
        return longString;
    }

    avaliarLength(item, length, desc) {
        let textLength = 0;
        item.evaluate(item.getAttribute('ng-model'))
           .then(valida(length, desc||''));
    } 

    avaliarLengthValor(item,desc) {
        let length = 15;
        let textLength = 0;
        item.evaluate(item.getAttribute('ng-model'))
            .then(valida(length,desc||''));
    }

    estressarCampo(item, length) {
        item.sendKeys(this.gerarString(length));
    }

}

function valida(length, desc) {
    desc = desc || '';
    return (_item) => {
        let textLength = _item.toString().length;
        expect(textLength).toBe(length, 'Falha ao validar tamanho máximo do campo "'+desc+'".');
    }
}

module.exports = new Estresse();
