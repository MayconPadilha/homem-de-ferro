var SETA_ESQUERDA = 37;
var SETA_ACIMA = 38;
var SETA_DIREITA = 39;
var SETA_ABAIXO = 40;
var ESPACO = 32;

function Teclado(elemento) {
   this.elemento = elemento;
   /*aray das teclas*/
   this.pressionadas = [];
   /*aray das teclas apertadas*/
   this.disparadas = [];
   /*aray das teclas registradas*/
   this.funcoesDisparo = [];
   var teclado = this;

   elemento.addEventListener('keydown', function(evento) {
      var tecla = evento.keyCode;
      teclado.pressionadas[tecla] = true;
      /*Disparar somente se for o primeiro keydown da tecla*/
      if (teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]) {teclado.disparadas[tecla] = true; teclado.funcoesDisparo[tecla] () ; }
   });/*fecha keydown*/

   elemento.addEventListener('keyup', function(evento) {
      /*dispara somente quando soltar a tecla*/
      teclado.pressionadas[evento.keyCode] = false;
      teclado.disparadas[evento.keyCode] = false;
   });/*fecha keyup*/
}
Teclado.prototype = {
  pressionada: function(tecla) {return this.pressionadas[tecla];},
  disparou: function(tecla, callback) {this.funcoesDisparo[tecla] = callback;}
}/*fecha prototype*/
