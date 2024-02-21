function Chefao(context, imagem, imgExplosao) {
   this.context = context;
   this.imagem = imagem;
   this.spritesheet = new Spritesheet(context, imagem, 1, 9);
   this.spritesheet.coluna = 0;
   this.spritesheet.intervalo = 90;
   this.x = this.context.canvas.width;
   this.canvas2 = this.context.canvas.height - 121;
   this.velocidade = 200;
   this.cont = 0;
   this.imgExplosao = imgExplosao;
}

Chefao.prototype = {
   atualizar: function() {
      /*local do nascimento do chefe*/
      if (this.x > this.context.canvas.width - 510){this.x -= this.velocidade * this.animacao.decorrido / 1000;} this.cont++;
      /*define a vida do chefe*/
      if (this.cont <= 150 && this.y > 0){ this.y -= this.velocidade * this.animacao.decorrido / 1000; }
      /*define a morte do chefe*/
      else if (this.cont >= 151 && this.cont <=300 && this.y < this.context.canvas.height - 310){ this.y += this.velocidade * this.animacao.decorrido / 1000; }
      /*caso o chefe não morra*/
      else if (this.cont > 300) { this.cont = 0; }
      /*Local do chefe*/
      painel.tcx1 = this.x;
      painel.tcy1 = this.y + 80;
      painel.tcy2 = this.y + 260;
      painel.vidachefao = painel.vidachefao;
   },
   /*projeta o chefe*/
   desenhar: function() { this.spritesheet.desenhar(this.x, this.y); this.spritesheet.proximoQuadro(); },
   /*area de colisão do chefe*/
   retangulosColisao: function() { return [ {x: this.x, y: this.y, largura: this.imagem.width, altura: this.imagem.height} ];},
   /*vida e quantidade de tiros pra morrer*/
   colidiuCom: function(outro) {
      if (outro instanceof Tiro1 || outro instanceof Tiro2 || outro instanceof Tiro3) {
         if ( painel.vidachefao > 0){
            if (painel.pontiro <= 10){ painel.vidachefao = painel.vidachefao - 1; this.animacao.excluirSprite(outro); this.colisor.excluirSprite(outro);}
            else if (painel.pontiro >= 11 && painel.pontiro <= 20){ painel.vidachefao = painel.vidachefao - 2; this.animacao.excluirSprite(outro); this.colisor.excluirSprite(outro);  }
            else if (painel.pontiro >= 20 && painel.pontiro <= 30){ painel.vidachefao = painel.vidachefao - 3; this.animacao.excluirSprite(outro); this.colisor.excluirSprite(outro);  }
            else if (painel.pontiro >= 31 && painel.pontiro <= 40){ painel.vidachefao = painel.vidachefao - 4; this.animacao.excluirSprite(outro); this.colisor.excluirSprite(outro);  }
            else if (painel.pontiro >= 41 ){ painel.vidachefao = painel.vidachefao - 5; this.animacao.excluirSprite(outro); this.colisor.excluirSprite(outro);  }
          }/*fecha if painel*/
         else if (painel.vidachefao <= 0) {var explosao = new Explosao(this.context, this.imgExplosao, this.x + 100, this.y + 50);
            this.animacao.novoSprite(explosao); this.animacao.excluirSprite(this); this.colisor.excluirSprite(this); this.animacao.excluirSprite(outro); this.colisor.excluirSprite(outro);}
      }/*fecha if de indentificaçãode tiro*/
   }/*fecha função colidiuCom*/
}/*fecha o prototype*/
