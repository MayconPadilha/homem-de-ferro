var SOM_EXPLOSAO = new Audio();
SOM_EXPLOSAO.src = 'snd/explosao.mp3';
SOM_EXPLOSAO.volume = 0.1;
SOM_EXPLOSAO.load();

function Explosao(context, imagem, x, y) {
   this.context = context;
   this.imagem = imagem;
   this.spritesheet = new Spritesheet(context, imagem, 5, 1);
   this.spritesheet.intervalo = 75;
   this.x = x;
   this.y = y;
   this.animando = false;

   var explosao = this;
   /*quando acaba a explosao*/
   this.fimDaExplosao = null;
   /*encerar animação da explosao*/
   this.spritesheet.fimDoCiclo = function() { explosao.animacao.excluirSprite(explosao);
     /*caso falhe*/
     if (explosao.fimDaExplosao) explosao.fimDaExplosao();
   }/*fim explosão*/
   SOM_EXPLOSAO.volume = 0.1;
   SOM_EXPLOSAO.currentTime = 0.0;
   SOM_EXPLOSAO.play();
}/*fecha function explosao*/

Explosao.prototype = {
   atualizar: function() {},
   desenhar: function() {this.spritesheet.desenhar(this.x, this.y); this.spritesheet.proximoQuadro();}
}/*fecha prototipe*/
