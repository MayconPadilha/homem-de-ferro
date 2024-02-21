function Nave(context, teclado, imagem, imgExplosao, imgExplosao2, imgTiro1, imgTiro2, imgTiro3) {
   this.context = context;
   this.teclado = teclado;
   this.imagem = imagem;
   this.x = 0;
   this.y = 0;
   this.velocidade = 0;
   this.spritesheet = new Spritesheet(context, imagem, 3, 3);
   this.spritesheet.coluna = 0;
   this.spritesheet.intervalo = 75;
   this.imgExplosao = imgExplosao;
   this.imgExplosao2 = imgExplosao2;
   this.acabaramVidas = null;
   this.vidasExtras = 4;
   this.imgTiro1 = imgTiro1;
   this.imgTiro2 = imgTiro2;
   this.imgTiro3 = imgTiro3;

}
Nave.prototype = {
   atualizar: function() {
      var incremento =
          this.velocidade * this.animacao.decorrido / 1000;

      if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0)
         this.x -= incremento;

      if (this.teclado.pressionada(SETA_DIREITA) &&
               this.x < this.context.canvas.width - 36)
         this.x += incremento;

      if (this.teclado.pressionada(SETA_ACIMA) && this.y > 0)
         this.y -= incremento;

      if (this.teclado.pressionada(SETA_ABAIXO) &&
               this.y < this.context.canvas.height - 48)
         this.y += incremento;
   },
   desenhar: function() {
      if (this.teclado.pressionada(SETA_ACIMA))
         this.spritesheet.coluna = 0;
      else if (this.teclado.pressionada(SETA_ABAIXO))
         this.spritesheet.coluna = 2;
      else
         this.spritesheet.coluna = 1;

      this.spritesheet.desenhar(this.x, this.y);
      this.spritesheet.proximoQuadro();
   },
   atirar: function() {
      if (painel.pontiro <= 10){
         var t1 = new Tiro1(this.context, this.imgTiro1, this);
         this.animacao.novoSprite(t1);
         this.colisor.novoSprite(t1);
      } else if (painel.pontiro >= 11 && painel.pontiro <= 20){
         var t1 = new Tiro1(this.context, this.imgTiro1, this);
         this.animacao.novoSprite(t1);
         this.colisor.novoSprite(t1);
         var t2 = new Tiro2(this.context, this.imgTiro1, this);
         this.animacao.novoSprite(t2);
         this.colisor.novoSprite(t2);
      } else if (painel.pontiro >= 20 && painel.pontiro <= 30){
         var t1 = new Tiro1(this.context, this.imgTiro2, this);
         this.animacao.novoSprite(t1);
         this.colisor.novoSprite(t1);
         var t2 = new Tiro2(this.context, this.imgTiro2, this);
         this.animacao.novoSprite(t2);
         this.colisor.novoSprite(t2);
      } else if (painel.pontiro >= 31 && painel.pontiro <= 40){
         var t1 = new Tiro1(this.context, this.imgTiro2, this);
         this.animacao.novoSprite(t1);
         this.colisor.novoSprite(t1);
         var t2 = new Tiro2(this.context, this.imgTiro1, this);
         this.animacao.novoSprite(t2);
         this.colisor.novoSprite(t2);
         var t3 = new Tiro3(this.context, this.imgTiro1, this);
         this.animacao.novoSprite(t3);
         this.colisor.novoSprite(t3);
      } else if (painel.pontiro >= 41 ){
         var t1 = new Tiro1(this.context, this.imgTiro3, this);
         this.animacao.novoSprite(t1);
         this.colisor.novoSprite(t1);
         var t2 = new Tiro2(this.context, this.imgTiro2, this);
         this.animacao.novoSprite(t2);
         this.colisor.novoSprite(t2);
         var t3 = new Tiro3(this.context, this.imgTiro2, this);
         this.animacao.novoSprite(t3);
         this.colisor.novoSprite(t3);
      }


   },
   retangulosColisao: function() {
      // Estes valores vão sendo ajustados aos poucos
      var rets =
      [
         {x: this.x, y: this.y, largura: 180, altura: 43}

      ];

      return rets;
   },
   colidiuCom: function(outro) {
      // Se colidiu com um Ovni...
      if (outro instanceof Ovni || outro instanceof Tirovni || outro instanceof Tirochefao1 || outro instanceof Tirochefao2) {
         this.animacao.excluirSprite(this);
         this.animacao.excluirSprite(outro);
         this.colisor.excluirSprite(this);
         this.colisor.excluirSprite(outro);

         var exp1 = new Explosao(this.context, this.imgExplosao2,
                                 this.x, this.y);
         var exp2 = new Explosao(this.context, this.imgExplosao,
                                 outro.x, outro.y);

         this.animacao.novoSprite(exp1);
         this.animacao.novoSprite(exp2);

         var nave = this;
         exp1.fimDaExplosao = function() {
            nave.vidasExtras--;

            if (nave.vidasExtras < 0) {
               if (nave.acabaramVidas) nave.acabaramVidas();
            }
            else {
               // Recolocar a nave no engine
               nave.colisor.novoSprite(nave);
               nave.animacao.novoSprite(nave);
               painel.pontiro = 0;
               nave.posicionar();

            }
         }
      }

      if (outro instanceof Powerup){
         this.animacao.excluirSprite(outro);
         this.colisor.excluirSprite(outro);
         painel.pontiro += 11;
      }

      if (outro instanceof Chefao){
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);

         var exp1 = new Explosao(this.context, this.imgExplosao,
                                 this.x, this.y);
         var exp2 = new Explosao(this.context, this.imgExplosao,
                                 outro.x, outro.y);

         this.animacao.novoSprite(exp1);
         this.animacao.novoSprite(exp2);

         var nave = this;
         exp1.fimDaExplosao = function() {
            nave.vidasExtras--;

            if (nave.vidasExtras < 0) {
               if (nave.acabaramVidas) nave.acabaramVidas();
            }
            else {
               // Recolocar a nave no engine
               nave.colisor.novoSprite(nave);
               nave.animacao.novoSprite(nave);
               painel.pontiro = 0;
               nave.posicionar();

            }
         }
      }
   },
   posicionar: function() {
      var canvas = this.context.canvas;
      this.x = 18;  // 36 / 2
      this.y = canvas.height / 2;
   }
}
