let moment = require('moment');
class Data {
    dataFutura(_qtd, _tempo){
        let qtd = _qtd || 10;
        let tempo = _tempo || 'days';
        return moment().add(qtd,tempo).format('DD/MM/YYYY');
    }

    dataAtual(){
        return moment().format('DD/MM/YYYY');
    }

    diaAtual(_qtd){
        let qtd = _qtd || 10;
        let tempo = 'days';
        return moment().add(qtd,tempo).format('D');        
    }

    dataAtualMesAno(){
        return moment().format('MM/YYYY');
    }

    dataMesAno(months, plusMinus){
        let signal = plusMinus || "+";
        if (signal == "-"){
            return moment().subtract(months,'months').format('MM/YYYY');
        }
        else{
            return moment().add(months,'months').format('MM/YYYY');
        }
    }

    formataData(data,format){
        let fmt = format || 'DD/MM/YYYY';
        return (data ? moment(data).format(fmt) : moment().format(fmt));
    }

    calcularMeses(data){
        let dataConvertida = moment(data, 'DD/MM/YYYY').toDate();
        return moment().diff(dataConvertida, 'months');
    }

    data18Anos(){
        return moment().subtract(18, 'years').format('DD/MM/YYYY');
    }

    dataMenosAnos(int){
        return moment().subtract(int, 'years').format('DD/MM/YYYY');
    }

    dataPassada(){
        return moment().subtract(10,'days').format('DD/MM/YYYY');
    }
}

module.exports = new Data();
