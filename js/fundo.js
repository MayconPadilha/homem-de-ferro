function Fundo(context, imagem) {
   this.context = context;
   this.imagem = imagem;
   this.velocidade = 0;
   this.posicaoEmenda = 0;
}
Fundo.prototype = {
   atualizar: function() {
      /*atualiza o fundo*/
      this.imagem.height = this.context.canvas.height;
      /*Atualizar a posição*/
      this.posicaoEmenda -= this.velocidade * this.animacao.decorrido / 1500;
      /* se passou da posição*/
      if (this.posicaoEmenda < this.imagem.width * -1){ this.posicaoEmenda = 0; }
   },/*fecha atualizar*/

   desenhar: function() {
      /*instancia*/
      var img = this.imagem;
      /*Primeira cópia*/
      var posicaoX = this.posicaoEmenda + img.width;
      this.context.drawImage(img, posicaoX, 0, img.width, img.height);
      /*Segunda cópia*/
      posicaoX = this.posicaoEmenda;
      this.context.drawImage(img, posicaoX, 0, img.width, img.height);
   }/*fecha desenhar*/
}/*fecha prototype*/
