function Ovni(context, imagem, imgExplosao) {
   this.context = context;
   this.imagem = imagem;
   this.x = 0;
   this.y = 0;
   this.velocidade = 0;
   this.imgExplosao = imgExplosao;
   this.ovy = 0;
   this.cont = 0;   
}

Ovni.prototype = {
   atualizar: function() {
       this.x -= this.velocidade * this.animacao.decorrido / 800;
       this.cont++;

      if (this.cont <= 25){
         this.y -= this.velocidade * this.animacao.decorrido / 1000;        
      } else if (this.cont >= 26 && this.cont <=50){
         this.y += this.velocidade * this.animacao.decorrido / 1000;        
      } else if (this.cont > 50) {
         this.cont = 0;
      }
      
	    if (this.y < 0 || this.y > this.context.canvas.height) {
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
	    }
	  
	    if (this.x < 0) {
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
	    }

       painel.x = this.x;
       painel.y = this.y; 

      /*if (painel.pontuacao >= this.velocidade){
               this.velocidade = this.velocidade + 100;
      }*/
	  
   },     

   desenhar: function() {
      var ctx = this.context;
      var img = this.imagem;
      ctx.drawImage(img, this.x, this.y, img.width, img.height);
   },

   retangulosColisao: function() {
      // Estes valores vão sendo ajustados aos poucos
      var rets = 
      [ 
         {x: this.x, y: this.y, largura: 66, altura: 55}
      ];
      
      return rets;
   },

   colidiuCom: function(outro) {
      // Se colidiu com um Tiro, os dois desaparecem
      if (outro instanceof Tiro1 || outro instanceof Tiro2 || outro instanceof Tiro3 ) {
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
         this.animacao.excluirSprite(outro);
         this.colisor.excluirSprite(outro);         
         var explosao = new Explosao(this.context, this.imgExplosao, this.x, this.y);
         this.animacao.novoSprite(explosao);
         painel.pontuacao +=10;
         painel.powerup += 1;
      }
   }
}
