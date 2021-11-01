//Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2

//velocidade da bolinha
let velocidadexBolinha = 5;
let velocidadeyBolinha = 5;

//raquete
let xRaquete = 5
let yRaquete = 150
let wRaquete = 10
let hRaquete = 90

//raquete do oponente 
let xRaqueteOponente = 585
let yRaqueteOponente = 150
let wRaqueteOponente = 10
let hRaqueteOponente = 90
let velocidadeOponente
let chanceDeErrar = 0

//sons do jogo
let raquetada
let ponto
let trilha

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound ("ponto.mp3")
  raquetada = loadSound ("raquetada.mp3")
}

//Placar do Jogo
let meusPontos = 0
let pontosDoOponente = 0

let colidiu = false


function setup() {
  createCanvas(600, 400)
  trilha.loop()
}

function draw() {
  background(0);
  mostraBolinha()
  movimentodabolinha()
  colisaodaborda()
  mostrarRaquete()
  movimentaRaquete1()
  mostrarRaqueteOponente()
  colisaocomRaquete(xRaquete, yRaquete)
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente)
  movimentaRaqueteOponente()
  incluiPlacar()
  marcaPonto()
}

function mostraBolinha()
{circle (xBolinha, yBolinha, diametro)

}

function movimentodabolinha()
{xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
                            
}

function colisaodaborda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){velocidadexBolinha *= -1;}
  if (yBolinha + raio > height || yBolinha - raio < 0) { velocidadeyBolinha *= -1}

}

function mostrarRaquete()
{rect (xRaquete, yRaquete, wRaquete, hRaquete)
                         
}

function mostrarRaqueteOponente()
{rect (xRaqueteOponente, yRaqueteOponente, wRaqueteOponente, hRaqueteOponente)
                         
}


function movimentaRaquete1(){
  if (keyIsDown(UP_ARROW)){yRaquete -= 10}
  if (keyIsDown(DOWN_ARROW)){yRaquete += 10}

}

function colisaocomRaquete()
{if (xBolinha - raio < xRaquete + wRaquete && yBolinha - raio < yRaquete + hRaquete && yBolinha + raio > yRaquete){velocidadexBolinha *= -1
    raquetada.play()                                                    }
}

function verificaColisaoRaquete(x, y){ 
  colidiu= 
  collideRectCircle(x, y, wRaquete, hRaquete, xBolinha, yBolinha, raio)
if (colidiu){
  velocidadexBolinha *= -1
  raquetada.play()
}
}


function  movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - wRaquete / 2 -30
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar(){
  if (pontosDoOponente >= meusPontos){
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -=1
    if (chanceDeErrar <=35){
      chanceDeErrar = 35
    }
  }
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER)
  textSize(16)
  fill(color(255,140,0))
  rect(150,10,40,20)
  fill(255)
  text(meusPontos, 170, 26)
  fill(color(255,140,0))
  rect(450,10,40,20)
  fill(255)
  text(pontosDoOponente, 470,26)
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos +=1
    ponto.play()
  }
  if (xBolinha < 10){
    pontosDoOponente += 1
    ponto.play()
  }
}