class CpfCnpj {
    mod(a,b){return Math.round(a-(Math.floor(a/b)*b));}

    getCNPJ(){
        let n1 = Math.round(Math.random()*9);
        let n2 = Math.round(Math.random()*9);
        let n3 = Math.round(Math.random()*9);
        let n4 = Math.round(Math.random()*9);
        let n5 = Math.round(Math.random()*9);
        let n6 = Math.round(Math.random()*9);
        let n7 = Math.round(Math.random()*9);
        let n8 = Math.round(Math.random()*9);
        let n9 = 0;
        let n10 = 0;
        let n11 = 0;
        let n12 = 1;

        let aux = n1 * 5 + n2 * 4 + n3 * 3 + n4 * 2 + n5 * 9 + n6 * 8 + n7 * 7 + n8 * 6 + n9 * 5 + n10 * 4 + n11 * 3 + n12 * 2;
        aux = this.mod(aux, 11);
        let nv1 = aux < 2 ? 0 : 11 - aux;

        aux = n1 * 6 + n2 * 5 + n3 * 4 + n4 * 3 + n5 * 2 + n6 * 9 + n7 * 8 + n8 * 7 + n9 * 6 + n10 * 5 + n11 * 4 + n12 * 3 + nv1 * 2;
        aux = this.mod(aux, 11);
        let nv2 = aux < 2 ? 0 : 11 - aux;

        return ""+n1+n2+"."+n3+n4+n5+"."+n6+n7+n8+"/"+n9+n10+n11+n12+"-"+nv1+nv2;
    }

    getCPF(){
        let n1 = Math.round(Math.random()*9),
            n2 = Math.round(Math.random()*9),
            n3 = Math.round(Math.random()*9),
            n4 = Math.round(Math.random()*9),
            n5 = Math.round(Math.random()*9),
            n6 = Math.round(Math.random()*9),
            n7 = Math.round(Math.random()*9),
            n8 = Math.round(Math.random()*9),
            n9 = Math.round(Math.random()*9);

        let aux = n1 * 10 + n2 * 9 + n3 * 8 + n4 * 7 + n5 * 6 + n6 * 5 + n7 * 4 + n8 * 3 + n9 * 2;
        aux = this.mod(aux, 11);
        let nv1 = aux < 2 ? 0 : 11 - aux;

        aux = n1 * 11 + n2 * 10 + n3 * 9 + n4 * 8 + n5 * 7 + n6 * 6 + n7 * 5 + n8 * 4 + n9 * 3 + nv1 * 2;
        aux = this.mod(aux, 11);
        let nv2 = aux < 2 ? 0 : 11 - aux;

        return ""+n1+n2+n3+"."+n4+n5+n6+"."+n7+n8+n9+"-"+nv1+nv2;
    }
}

module.exports = new CpfCnpj();
