function Animacao(context) {
   this.context = context;
   this.sprites = [];
   this.ligado = false;
   this.processamentos = [];
   this.spritesExcluir = [];
   this.processamentosExcluir = [];
   this.ultimoCiclo = 0;
   this.decorrido = 0;
}

Animacao.prototype = {
  /*gerar o sprite do personagem*/
   novoSprite: function(sprite) { this.sprites.push(sprite); sprite.animacao = this;},
   /*começar a animação*/
   ligar: function() { this.ultimoCiclo = 0; this.ligado = true; this.proximoFrame();},
   /*finalizar a animação*/
   desligar: function() { this.ligado = false;},
   /*começar a fase*/
   proximoFrame: function() {
      /*caso nao inicie*/
      if ( ! this.ligado ) return;
      /*reseta tempo do ciclo*/
      var agora = new Date().getTime();
      if (this.ultimoCiclo == 0) this.ultimoCiclo = agora; this.decorrido = agora - this.ultimoCiclo;
      /*atualiza a animação dos sprites*/
      for (var i in this.sprites) this.sprites[i].atualizar();
      /*projeta os sprites*/
      for (var i in this.sprites) this.sprites[i].desenhar();
      /*Processamentos gerais (musica, fundos, tiros, colisões)*/
      for (var i in this.processamentos) this.processamentos[i].processar();
      /*Processamento de exclusões*/
      this.processarExclusoes();
      /*Atualizar o instante do último ciclo*/
      this.ultimoCiclo = agora;
      /*chama o próximo ciclo*/
      var animacao = this;
      requestAnimationFrame(function() { animacao.proximoFrame(); });
   },
   /*Processamentos gerais (musica, fundos, tiros, colisões)*/
   novoProcessamento: function(processamento) { this.processamentos.push(processamento); processamento.animacao = this; },
   /*excluir dps da destruição*/
   excluirSprite: function(sprite) { this.spritesExcluir.push(sprite); },
   /*quando objetos saem do limite do canvas*/
   excluirProcessamento: function(processamento) { this.processamentosExcluir.push(processamento); },
   /*excluir objetos destruidos e fora do canvas*/
   processarExclusoes: function() {
      /*Criar novos arrays*/
      var novoSprites = []; var novoProcessamentos = [];
      /*Adiciona  se não constar no array de excluídos*/
      /*excluir os tiros e seres nao destruidos*/for (var i in this.sprites) { if (this.spritesExcluir.indexOf(this.sprites[i]) == -1) novoSprites.push(this.sprites[i]); }
      /*excluir os sprites dos tiros e seres*/for (var i in this.processamentos) { if (this.processamentosExcluir.indexOf(this.processamentos[i]) == -1) novoProcessamentos.push(this.processamentos[i]); }
      /*Limpar os arrays de exclusões*/
      this.spritesExcluir = []; this.processamentosExcluir = [];
      /*Substituir os arrays velhos pelos novos*/
      this.sprites = novoSprites; this.processamentos = novoProcessamentos;
   }
}/*fecha prototype*/
