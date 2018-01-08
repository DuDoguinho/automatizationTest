class Combobox{
  clickFirst(elem, repeater, texto) {
    elem.click();
    elem.element(by.model('$select.search')).sendKeys(texto);
    element.all(by.repeater(repeater)).filter((el) => {
      return el.$$('span').first().getText().then((txt) => {
        return txt.includes(texto);
      })
    }).then((filtered) => {
      filtered[0].click();
    });
  }
}

module.exports = new Combobox();