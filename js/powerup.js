var SOM_POWERUP = new Audio();
SOM_POWERUP.src = 'snd/powerup.mp3';
SOM_POWERUP.volume = 1;
SOM_POWERUP.load();

function Powerup(contexto, imagem, nave) {
   this.context = context;
   this.imagem = imagem;
   this.nave = nave;
   this.largura = imagem.width;
   this.altura = imagem.height;
   this.velocidade = 200;
   this.x = painel.x;
   this.y = painel.y;
   this.cont = 0;
}

Powerup.prototype = {
   atualizar: function() {
      this.x -= this.velocidade * this.animacao.decorrido / 1000;
      /*cria o primeiro sprite*/
      if (this.x < 0) { this.animacao.excluirSprite(this); this.colisor.excluirSprite(this); } this.cont++;
      /*primeiro powerup*/
      if (this.cont <= 150 && this.y > 0){ this.y -= this.velocidade * this.animacao.decorrido / 2000; }
      /*segundo powerup*/
      else if (this.cont >= 151 && this.cont <=300 && this.y < this.context.canvas.height - 100){ this.y += this.velocidade * this.animacao.decorrido / 2000; }
      /*terciro powerup*/
      else if (this.cont > 300) { this.cont = 0; }
   },/*fecha atualizar*/

   desenhar: function() {
      var ctx = this.context; var img = this.imagem;
      /*projeta o tiro na tela*/
      ctx.drawImage(img, this.x, this.y, img.width, img.height);
   },/*fecha desenhar*/

   /*area de colisao do tiro*/
   retangulosColisao: function() { return [ {x: this.x, y: this.y, largura: this.largura, altura: this.altura} ]; },

   /*executar a musica*/
   colidiuCom: function(outro) {
      if (outro instanceof Nave){
         SOM_POWERUP.currentTime = 0.0;
         SOM_POWERUP.play();
      }/*fecha instanceof*/
   }/*fecha colidiuCom*/
}/*fecha prototype*/
