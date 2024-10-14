# OlimpiAtos

Projeto desafio Tony Hawk, promovido pela Atos com referência às Olimpíadas de Paris 2024

```md
Precisamos impor algumas regras na hora de calcular a pontuação, seguiremos com a explicação da
interface e logo na sequência uma exemplificação.

# 1 - Usuário vulgo Juiz
- O juiz deverá selecionar as manobras na tela clicando com o botão esquerdo do mouse.

- Caso o skatista realize uma manobra repetida o juiz deverá clicar com o botão direito 
do mouse para contabilizar a manobra, a cor da manobra será alterada e o contador do Combo será 
incrementado demonstrando visualmente que foi aplicado a seleção.

- Caso o competidor erre alguma manobra, a mesma não será contabilizada, portanto o juiz devererá 
clicar no botão Zerar Combo para reiniciar o multiplicador.

- Ao final da "run" o juiz deverá clicar no botão "Calcular" para que seja exibido no painel a 
pontuação final do competidor.

- Caso o painel possua um nome igual, entendesse que se trata do mesmo skatista, logo a pontuação
será substituída se o valor for maior que o atual, se o nome não foi identico será adicionado um
novo competidor ao painel.
```
```md
# 2 - Exemplos de pontuação e difinição de regras
- Quando o skatista não repete nenhuma manobra e não erra nenhuma manobra:
total += (The 900 * 1) * 1;
total += (Indy Backflip * 1) * 2;
total += (Indy Frontflip * 1) * 3;
total += (Weddle Backflip * 1) * 4;

- Quando existem manobras repetidas e sem nenhum erro:
total += (The 900 * 1) * 1;
total += (Indy Backflip * 1) * 2;
total += (Indy Backflip * 2) * 3;
total += (Indy Frontflip * 1) * 4;
total += (Weddle Backflip* 1) * 5;
total += (Weddle Backflip* 2) * 6;

- Manobras sem repetição e com erro:
total += (The 900 * 1) * 1;
total += (Indy Backflip * 1) * 2;
total += (Indy Frontflip * 1) * 3;
total += (Weddle Backflip* 1) * 1;

- Manobras com repetição e com erro:
total += (The 900 * 1) * 1;
total += (Indy Backflip * 1) * 2;
total += (Indy Backflip * 2) * 3;
total += (Indy Frontflip * 1) * 4;
total += (Weddle Backflip* 1) * 1;
total += (Weddle Backflip* 2) * 2;
total += (The 900 * 2) * 3;

- A ordem da repetição das manobras não é considerada, o que importa é a quantidade de vezes que a 
manobra foi repetida.

- O combo (multiplicador) é incrementado a cada manobra realizada sem erro, caso o competeidor erre 
alguma manobra o multiplicador é zerado, isso não se aplica a repetição de manobras.

- O contador de repetição das manobras é individual, ou seja, cada manobra tem seu contador 
de repetição.
```

## Deploy

[Clique aqui para acessar o deploy do desafio](https://lksferreira.github.io/tony-hawk/)

## Localhost

### Pré-requisitos

```md
- Extensão Live Server ou qualquer outra ferramenta que permita rodar um servidor local.
```
### Como rodar o projeto

```md
Execute o Live Server na pasta raiz do projeto.
```

## Tecnologias utilizadas

As seguintes ferramentas foram usadas na construção do projeto:

```md
- HTML
- CSS
- JavaScript
- Lib: https://cdn.skypack.dev/tweakpane
```

## Autor

[Lucas Ferreira](https://www.linkedin.com/in/lucas-ferreira-developer)

## Créditos
[Designer](https://x.com/intent/follow?screen_name=jh3yy)
