function Tirochefao(context, imgExplosao) {
   this.context = context;
   this.largura = 30;
   this.altura = 10;
   this.velocidade = 400;
   this.imgExplosao = imgExplosao;
   this.cor = 'black';
   this.x = painel.tcx1;
   this.y1 = painel.tcy1;
   this.y2 = painel.tcy2;
   this.y = 0;
}

Tirochefao.prototype = {
  /*Cria a velocidade do Chefão*/
  atualizar: function() {
      this.x -= this.velocidade * this.animacao.decorrido / 1000;
       /*Excluir o tiro quando sumir da tela*/
      if (this.x < 0) {this.animacao.excluirSprite(this); this.colisor.excluirSprite(this);}
   }

   /*Cria o Chefão*/
   desenhar: function() {
      var ctx = this.context;
      ctx.save();
         if (painel.tirochefao == 0){ctx.fillStyle = this.cor; ctx.fillRect(this.x, this.y1, this.largura, this.altura); painel.tirochefao = 1;}
         else if (painel.tirochefao == 1){ctx.fillStyle = this.cor; ctx.fillRect(this.x, this.y2, this.largura, this.altura); painel.tirochefao = 0;}
      ctx.restore();
   }/*fecha desenhar*/

   /*Altura do Chefão*/
   retangulosColisao: function() {
      return [ {x: this.x, y: this.y1, largura: this.largura, altura: this.altura},
               {x: this.x, y: this.y2, largura: this.largura, altura: this.altura} ];
   }/*fecha retangulosColisao*/

   /*Excluir o Sprite dsp da morte*/
   colidiuCom: function(outro) {
      if (outro instanceof Tiro1 || outro instanceof Tiro2 || outro instanceof Tiro3 ) {
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
         this.animacao.excluirSprite(outro);
         this.colisor.excluirSprite(outro);
         var explosao = new Explosao(this.context, this.imgExplosao, this.x, this.y);
         this.animacao.novoSprite(explosao);
      }/*fecha função*/
   }/*fecha if*/
}/*fecha prototipo*/
