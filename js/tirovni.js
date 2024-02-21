function Tirovni(context, imgExplosao) {
   this.context = context;
   this.largura = 30;
   this.altura = 10;
   this.velocidade = 400;
   this.imgExplosao = imgExplosao;
   this.cor = 'gray';
   this.x = painel.x;
   this.y = painel.y;
}

Tirovni.prototype = {
   atualizar: function() { this.x -= this.velocidade * this.animacao.decorrido / 1000;
      /*Excluir o tiro quando sumir da tela*/
      if (this.x < 0) { this.animacao.excluirSprite(this); this.colisor.excluirSprite(this); }
   },/*atualizar*/

   desenhar: function() {
      /*projeta o desenho do tiro*/
      var ctx = this.context; ctx.save(); ctx.fillStyle = this.cor; ctx.fillRect(this.x, this.y, this.largura, this.altura); ctx.restore();
   },/*fim desenhar*/

   retangulosColisao: function() {
      /*area de colsao do Tiro*/
      return [ {x: this.x, y: this.y, largura: this.largura, altura: this.altura} ];
   },

   colidiuCom: function(outro) {
      if (outro instanceof Tiro1 || outro instanceof Tiro2 || outro instanceof Tiro3 ) {
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
         this.animacao.excluirSprite(outro);
         this.colisor.excluirSprite(outro);
         var explosao = new Explosao(this.context, this.imgExplosao, this.x, this.y);
         this.animacao.novoSprite(explosao);
      }
   }
}
