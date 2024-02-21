function Tirochefao2(context, imgExplosao) {
   this.context = context;
   this.largura = 30;
   this.altura = 10; 
   this.velocidade = 400; 
   this.imgExplosao = imgExplosao;  
   this.cor = 'red'; 
   this.x = painel.tcx1;
   this.y1 = painel.tcy1;   
   this.y2 = painel.tcy2;   
   this.y = 0;

}
Tirochefao2.prototype = {
   atualizar: function() {
      this.x -= 
         this.velocidade * this.animacao.decorrido / 1000;     

      // Excluir o tiro quando sumir da tela
      if (this.x < 0) {
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
      }

   },
   desenhar: function() {
      var ctx = this.context;
      ctx.fillStyle='purple';      
      ctx.beginPath();
      ctx.arc(this.x, this.y2, 20, 0, Math.PI*2,true);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle='pink';
      ctx.lineWidth = 5;
      ctx.stroke();
   },
   retangulosColisao: function() {
      return [ {x: this.x - 10, y: this.y2 - 10, largura: 20, altura: 20} ];
   },
   colidiuCom: function(outro) {
      if (outro instanceof Tiro1 || outro instanceof Tiro2 || outro instanceof Tiro3 ) {
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
         this.animacao.excluirSprite(outro);
         this.colisor.excluirSprite(outro);         
         var explosao = new Explosao(this.context, this.imgExplosao, this.x, this.y2);
         this.animacao.novoSprite(explosao);
      }
   }
}
