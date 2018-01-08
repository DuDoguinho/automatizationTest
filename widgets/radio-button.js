class RadioButton {
    clicaRadio(ngModel, value){
        return element(by.css("input[value="+value+"][ng-model='"+ngModel+"'] ~ div")).click();
     }
}

module.exports = new RadioButton();