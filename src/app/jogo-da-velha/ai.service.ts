import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'  // Essa classe de serviços será carregado na root da aplicação
})
export class AIService {
    // O computador é o oponente 'O' = Minimizer. O jogador 'X' é o Maximizer.
    jogador = 'X';
    oponente = 'O';     
    fimDeJogo: boolean = false;    
   
    //--------------------------------------------------------------------
    turnoAdversario(tabuleiro:Array<string>, modoJogo: string): number {    
        
        let move: number = 0;
        let quadrados = [...tabuleiro];
        
        if(modoJogo === 'IAIniciante') {                    
            move = this.jogadaAleatoria(quadrados);
            return move;        
        }
        else {            
            move = this.jogadaOtima(quadrados);
            return move;
        }        
    }

    
    //--------------------------------------------------------------------
    // Modo iniciante
    // As escolhas são completamente aleatórias
    private jogadaAleatoria(quadrados: Array<string>): number {        
        let quadradosVazios = this.obtemPosicaoQuadradosVazios(quadrados);
        return quadradosVazios[Math.floor(Math.random() * quadradosVazios.length)];        
    }
    
    // Modo expert
    // As escolhas são sempre ótimas
    private jogadaOtima(quadrados:string[]): number {                        
        let melhorValor = 1000;
        let melhorPosicao;        
    
        // Verifica todas as posições vazias, obtendo os melhores valores MiniMax para elas
        // Retorna o index da posição com o valor ótimo        
        for (let i = 0; i < 9; i++)
        {
            if(quadrados[i] === '-') {
                // Faz a jogada
                quadrados[i] = this.oponente;
                
                // Calcula o valor para esse movimento
                // int profundidade, bool ehMaximizer                
                let valorJogada = this.minimax(quadrados, 1, true);

                // Se o valor atual é melhor que o melhor valor,então atualiza
                if (valorJogada < melhorValor)
                {
                    melhorPosicao = i;
                    melhorValor = valorJogada;
                }

                // Desfaz a jogada
                quadrados[i] = '-';
            }
        }    
        
        return melhorPosicao;
    }
   
   
    //--------------------------------------------------------------------
    private obtemPosicaoQuadradosVazios(quadrados:string[]): Array<number> {
        let posicaoQuadradosVazios: Array<number> = [];

        for(let i = 0; i < quadrados.length; i++){
        if (quadrados[i] === '-')
            posicaoQuadradosVazios.push(i);
        } 

        return posicaoQuadradosVazios;
    }
    
   
    //--------------------------------------------------------------------
    // Função recursiva que calcula o valor MiniMax de um estado do jogo
    // Ela considera todos os possíveis caminhos que o jogo pode ir e retorna o valor do melhor caminho
    private minimax(quadrados:string[], profundidade: number, ehMaximizer: boolean): number {
    
        let pontuacao = this.evaluationFunction(quadrados, profundidade);

        // Se acabou o jogo, retorna a pontuação
        if(this.fimDeJogo) {            
            this.fimDeJogo = false;
            return pontuacao;
        }
        
        if(ehMaximizer){                        
            return this.maximizer(quadrados, profundidade, ehMaximizer);
        }
        else {                  
            return this.minimizer(quadrados, profundidade, ehMaximizer);
        } 
    }
    

    //--------------------------------------------------------------------    
    private maximizer(quadrados:string[], profundidade: number, ehMaximizer: boolean) {
        
        let melhor = -1000;
    
        // Passa por todas os quadrados vazios
        for (let i = 0; i < 9; i++)
        {     
            if(quadrados[i] === '-') {
            
                // Faz a jogada
                quadrados[i] = this.jogador;                

                // Calcula o valor para esse movimento de forma recursiva            
                // Se o valor atual é MAIOR que o melhor valor, então atualiza                
                const minimax = this.minimax(quadrados, profundidade + 1, !ehMaximizer);
                melhor = Math.max(melhor, minimax);
                
                // Desfaz a jogada
                quadrados[i] = '-';                
            }
        }
                
        return melhor;
    }


    //--------------------------------------------------------------------    
    private minimizer(quadrados:string[], profundidade: number, ehMaximizer: boolean) {
        
        let melhor = 1000;
    
        // Passa por todos os quadrados vazios
        for (let i = 0; i < 9; i++)
        {   
            if(quadrados[i] === '-') {
                
                // Faz a jogada
                quadrados[i] = this.oponente;
                                
                // Calcula o valor para esse movimento de forma recursiva            
                // Se o valor atual é MENOR que o melhor valor, então atualiza                
                let minimax = this.minimax(quadrados, profundidade + 1, !ehMaximizer);                
                melhor = Math.min(melhor, minimax); 
                
                // Desfaz a jogada
                quadrados[i] = '-';                
            }
        }
        
        return melhor;
    }

    //-----------------------------------------------------------------
    /* 
    Se 'X' (jogador) ganhar, daremos a ele uma pontuação de 10 (por exemplo). Porém, o oponente 'O' (computador)
    deve atrapalhar ao máximo o jogo de 'X', de forma que ele demore mais turnos para alcançar a vitória.
    Assim, a pontuação total de X será: (10 - Quantidade de turnos para chegar à vitória)

    Se 'X' perder, daremos a ele uma pontuação de -10. 
    O oponente 'O' (computador) deve querer que isso aconteça o mais rápido possível.
    Dessa forma, quanto mais 'X' demorar a perder, mais o jogador 'O' será penalizado, aumentando a pontuação de 'X'.
    Assim, a pontuação total de X será: (-10 + Quantidade de turnos para perder)
    */
    private evaluationFunction(quadrados: string[], profundidade: number): number {

        // Checa as linhas para ver se houve vencedor:
        for (let i = 0; i <= 6; i += 3)
        {
            if (quadrados[i] !== '-' && quadrados[i] === quadrados[i + 1] && quadrados[i] === quadrados[i + 2])
            {
                this.fimDeJogo = true;

                if (quadrados[i] === this.jogador)
                    return 10 - profundidade;
                    
                if (quadrados[i] === this.oponente)
                    return -10 + profundidade;                    
            }
        }
 
        // Checa colunas para ver se houve vencedor:
        for (let i = 0; i < 3; i++)
        {
            if (quadrados[i] !== '-' && quadrados[i] === quadrados[i + 3] && quadrados[i] === quadrados[i + 6])
            {
                this.fimDeJogo = true;
                
                if (quadrados[i] === this.jogador)
                    return 10 - profundidade;
                    
                if (quadrados[i] === this.oponente)
                    return -10 + profundidade;                    
            }
        }

        // Checa diagonais:
        if (quadrados[0] !== '-' && quadrados[0] === quadrados[4] && quadrados[0] === quadrados[8]){
            
            this.fimDeJogo = true;
                
            if (quadrados[0] === this.jogador)
                    return 10 - profundidade;
                    
            if (quadrados[0] === this.oponente)
                    return -10 + profundidade;                    
        }

        if (quadrados[2] !== '-' &&  quadrados[2] === quadrados[4] && quadrados[2] === quadrados[6]){
            
            this.fimDeJogo = true;
                
            if (quadrados[2] === this.jogador)
                    return 10 - profundidade;
                    
            if (quadrados[2] === this.oponente)
                    return -10 + profundidade;                    
        }

        // Verifica se terminou em empate
        if(!this.temJogadasRestantes(quadrados)) {
            this.fimDeJogo = true;            
        }

        // Empate ou o jogo continua...
        return 0;
    }        

     //--------------------------------------------------------------------
     private temJogadasRestantes(quadrados:string[]): boolean {
        for(let i = 0; i < 9; i++){
            if (quadrados[i] === '-')
                return true;
        } 

        return false;
    }
}