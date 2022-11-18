
function validarnull (valor){
    let respuesta =''   
    if(!valor){
        respuesta =' '
    }else{
        respuesta = valor
    }
    return respuesta
   }
//************************************************************************* */
function validar_decimal (numero)   {
    let valor= numero;
    let numero_0 = 0;
    valor = parseFloat( '0' + valor);
    if ( isNaN(valor)  ) {
        numero_0 = 0
    }else {
        numero_0 = valor;
    }
    return numero_0
}
//************************************************************************* */
 function validar_entero  (numero)  {
    let valor= numero;
    let numero_0 = 0;
    valor = parseInt( '0' + valor)
    if ( isNaN(valor)  ) {
        numero_0 = 0
    }else {
        numero_0 = valor
    }
    return numero_0
}
//****************************************** */
module.exports = { validarnull, validar_decimal,validar_entero}