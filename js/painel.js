function Painel(context, nave) {
   this.context = context;
   this.nave = nave;
   this.spritesheet = new Spritesheet(context, nave.imagem, 3, 3);
   this.pontuacao = 0;
   this.pontiro = 0;
   this.vidachefao = 500;
   this.powerup = 0;
   this.tirochefao = 0;
}
Painel.prototype = {
  /*atualiza quantidades de vidas*/
   atualizar: function() {},
   desenhar: function() {
      this.context.scale(0.5, 0.5);
      var x = 10; var y = 10;
      /*distancia entre vidas*/
      for (var i = 1; i <= this.nave.vidasExtras; i++) { this.spritesheet.desenhar(x, y); x += 100; }
      this.context.scale(2, 2);
   }/*Fecha desenhar*/
}/*fecha prototype*/
