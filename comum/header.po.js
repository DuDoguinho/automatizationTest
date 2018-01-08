class Header {
  constructor() {
    this.nome = element(by.css('span.page-header--nome'));
    this.cpf_cooperativa = element(by.xpath('//span[contains(@class,"page-header--dados")]'));    
  }

  getCpf(){
    let cpf = '';
    return this.cpf_cooperativa.getText().then((txt) => {
      cpf = txt.search(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/ig);
      return cpf;
    });
  }
}

module.exports = new Header();