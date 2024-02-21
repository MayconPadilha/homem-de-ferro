var SOM_TIRO = new Audio();
SOM_TIRO.src = 'snd/tiro.mp3';
SOM_TIRO.volume = 0.2;
SOM_TIRO.load();

function Tiro(context, imagem, nave) {
   	this.context = context;
    this.imagem = imagem;
   	this.nave = nave;
    /*posição do disparo*/
    if (painel.pontiro <= 29){ this.x = nave.x + 140;  this.y = nave.y +25; this.velocidade = 400; this.altura = 40; this.largura = 32;}
    else if (painel.pontiro >= 30 && painel.pontiro <= 59){ this.x = nave.x + 140;  this.y = nave.y + 25; this.velocidade = 500; this.altura = 38; this.largura = 56;}
    else if (painel.pontiro >= 60){ this.x = nave.x + 140;  this.y = nave.y + 25; this.velocidade = 600; this.altura = 66; this.largura = 104;}
   SOM_TIRO.currentTime = 0.0;
   SOM_TIRO.play();
}

Tiro.prototype = {
   atualizar: function() { this.x +=this.velocidade * this.animacao.decorrido / 1000;
      /*Excluir o tiro quando sumir da tela*/
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
