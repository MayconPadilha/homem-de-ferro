var SOM_TIRO = new Audio();
SOM_TIRO.src = 'snd/tiro.mp3';
SOM_TIRO.volume = 0.2;
SOM_TIRO.load();

function Tiro3(context, imagem, nave) {
   	this.context = context;
    this.imagem = imagem;
   	this.nave = nave;
    if (painel.pontiro >= 31 && painel.pontiro <= 40){ this.x = nave.x + 140; this.y = nave.y - 5; this.velocidade = 400; this.altura = 10; this.largura = 40; }
    else if (painel.pontiro >= 41 ){ this.x = nave.x + 140; this.y = nave.y - 15; this.velocidade = 500; this.altura = 20; this.largura = 80; }
    SOM_TIRO.currentTime = 0.0;
    SOM_TIRO.play();
}/*fecha Tiro3*/

Tiro3.prototype = {
   atualizar: function() {this.x += this.velocidade * this.animacao.decorrido / 1000;
     if (painel.pontiro >= 31){ this.y -= this.velocidade * this.animacao.decorrido / 3000; }
      // Excluir o tiro quando sumir da tela
      if (this.x > this.context.canvas.height * 2) { this.animacao.excluirSprite(this); this.colisor.excluirSprite(this); }
   },/*fecha atualizar*/

   desenhar: function() {
     /*projeta o tiro na tela*/
      var ctx = this.context; var img = this.imagem;
      ctx.drawImage(img, this.x, this.y, img.width, img.height);
   },/*fecha desenhar*/

   retangulosColisao: function() { return [ {x: this.x, y: this.y, largura: this.largura, altura: this.altura} ]; },
   /*objeto de colisao do tiro*/

   colidiuCom: function(outro) {}
   /*com quer o tiro esta colidindo*/
}/*fecha prototype*/
