# Motion Hand

Marque esse projeto com uma estrela 🌟

## Preview

<img width=100% src="assets/demo-template-lg.gif">

## Pre-reqs

- Este projeto foi criado usando Node.js v19.7.0
- O ideal é que você use o projeto em ambiente Unix (Linux). Se você estiver no Windows, é recomendado que use
  o [Windows Subsystem Linux](https://www.omgubuntu.co.uk/how-to-install-wsl2-on-windows-10) possíveis comandos de
  terminal podem não funcionar adequadamente no Windows

## Running

- Execute `npm ci` na pasta que contém o arquivo `package.json` para restaurar os pacotes
- Execute `npm start` e em seguida vá para o seu navegador em [http://localhost:3000](http://localhost:3000) para
  visualizar a página acima

## Checklist Features

- Titles List
    - [x] Campo para pesquisa não deve travar ao digitar termo de pesquisa
    - [x] Elementos em segundo plano continuem sendo clicáveis após canvas
    - [X] Deve capturar movimentos das mãos e desenha-las na tela usando *Canvas* 🙌
    - [x] Deve disparar scroll up quando usar a palma das mãos abertas 🖐
    - [x] Deve disparar scroll down quando usar a palma das mãos fechadas ✊
    - [ ] Deve disparar click no elemento mais próximo quando usar gesto de pinça 🤏🏻
    - [ ] Ao mover elementos na tela, deve disparar evento **:hover** em elementos em contexto

- Video Player
    - [x] Deve ser possivel de reproduzir ou pausar videos com o piscar de olhos 😁
    - [x] Todo processamento de Machine Learning deve ser feito via Web worker

### Extras

- [ ] Diferenciar piscada de olhos entre olho direito e esquerdo e atualizar log para mostrar qual olho que piscou.
- [ ] Reconhecer gestos de mãos individuais e printar no log

### Links de referencia:

- Reuni todos os links em [referências](./referencias.md)

### FAQ

- browser-sync está lançando erros no Windows e nunca inicializa:
    - Solução: Trocar o browser-sync pelo http-server.
        1. instale o **http-server**  com `npm i -D http-server`
        2. no package.json apague todo o comando do `browser-sync` e substitua por `npx http-server .`
        3. agora o projeto vai estar executando na :8080 então vá no navegador e tente acessar o http://localhost:8080/
           A unica coisa, é que o projeto não vai reiniciar quando voce alterar algum código, vai precisar dar um F5 na
           página toda vez que alterar algo

### Créditos

- Interface baseada no projeto [Streaming Service](https://codepen.io/Gunnarhawk/pen/vYJEwoM)
  de [gunnarhawk](https://github.com/Gunnarhawk)
- Machine Learning baseados no projeto [
  semana-javascript-expert07](https://github.com/ErickWendel/semana-javascript-expert07)
  de [ErickWendel](https://github.com/ErickWendel)
