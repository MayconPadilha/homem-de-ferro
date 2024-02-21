function Spritesheet(context, imagem, linhas, colunas) {
   this.context = context;
   this.imagem = imagem;
   this.numLinhas = linhas;
   this.numColunas = colunas;
   this.intervalo = 0;
   this.linha = 0;
   this.coluna = 0;
   this.fimDoCiclo = null;
}
Spritesheet.prototype = {
   proximoQuadro: function() {
      var agora = new Date().getTime();
      /*Se ainda não tem último tempo medido*/
      if (! this.ultimoTempo) this.ultimoTempo = agora;
      /* mudar de coluna?*/
      if (agora - this.ultimoTempo < this.intervalo) return;
      if (this.linha < this.numLinhas - 1) { this.linha++; }
      else { this.linha = 0; /*acabou um ciclo!*/ if (this.fimDoCiclo) this.fimDoCiclo();}
      /*Guardar hora da última mudança*/
      this.ultimoTempo = agora;
   },/*fecha proximoQuadro*/

   desenhar: function(x, y) {
      var largura = this.imagem.width / this.numColunas;
      var altura = this.imagem.height / this.numLinhas;
      /*projetar o spritesheet*/
      this.context.drawImage( this.imagem, largura * this.coluna, altura * this.linha, largura, altura, x, y, largura, altura);
   }/*fecha desenhar*/
}/*fecha prototype*/
