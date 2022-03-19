# Primeiros passos

## **Iniciando um novo projeto**

O primeiro passo é criarmos uma nova pasta e abrí-la no nosso Visual Studio Code.

Depois, basta iniciar um projeto node com o seguinte comando:

```bash
npm init -y
```

A opção -y serve para dizer que vamos responder todas as perguntas feitas na criação do `package.json` com sim. Isso serve para criar o arquivo `package.json` sem responder o questionário.

Após esse processo, será criado um arquivo `package.json` no projeto, desse jeito:

![Screenshot_20220319_111702.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a1ff3865-c919-4bb2-9a36-8e8cd42cc27c/Screenshot_20220319_111702.png)

## Instalando o React

Agora vamos rodar com o seguinte comando num novo projeto:

```bash
npm install react 
npm install react-dom
```

Aqui, estamos instalando o React em si e também o react-dom, que serve para lidar com a DOM do HTML no React.

Após isso vamos criar também algumas pastas, a `src` e a `public`**.** Na pasta `public`, ficarão nossos códigos mais externos ao react em si e na pasta `src` estará o restante do nosso código, tirando os arquivos de configuração. Por enquanto ainda não vamos criar nenhum arquivo nelas.

![Screenshot_20220319_111855.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/732b9c6c-6314-4569-92c1-62449e583466/Screenshot_20220319_111855.png)

<aside>
💡 Caso queira deixar as pastas com ícones personalizados, basta instalar a extensão do Visual Studio Code chamada **Material Icon Theme**

</aside>

## Instalando o Babel

Babel é um conversor de javascript. Ele pega nosso código escrito em javascript mais moderno e o converte para que seja interpretado pelos navegadores. Isso ocorre porque os navegadores normalmente não conseguem acompanhar a velocidade de atualização do js usado no node.js. O babel faz esse papel de intermediário e torna nosso código legível para o navegador.

Para instalar o babel, basta executar no terminal: 

```bash
npm install @babel/core -D
npm install @babel/cli -D
npm install @babel/preset-env -D
```

- O `@babel/core` é o núcleo do babel. Ele que permite que nós consigamos criar um arquivo de configuração;
- O `@babel/cli` serve para que possamos rodar os comandos do babel no terminal;
- O `@babel/preset-env` serve para que a gente pule algumas etapas de configuração desnecessárias em cada ambiente de desenvolvimento.

O babel por padrão não entende a sintaxe do React, e, para que seja possível fazer isso, precisamos instalar mais um preset:

```bash
npm install @babel/preset-react -D
```

Após isso, basta configurar o arquivo `babel.config.js` no nosso projeto, na pasta raiz:

```jsx
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ]
}
```

E no nosso `package.json` vamos adicionar um script (Aqui, os scripts são comandos que criamos para rodar no terminal. Os `...` só indicam que existe coisa a mais no arquivo, mas não é o foco no momento):

```json
{
	...
   "scripts": {
    "build": "babel src/index.jsx --out-file dist/bundle.js"
  },
	...
}
```

Esse script diz que vamos usar o babel que instalamos para pegar o arquivo `src/index.jsx` e ele irá ser convertido e ir para a pasta `dist` com o nome de `bundle.js`.

<aside>
💡  Quando tiver uma / separando o arquivo, o que vem antes significa somente a pasta em que o arquivo se encontra. Nesse caso, o arquivo `index.jsx` dentro de `src`

</aside>

O arquivo completo do `package.json` vai estar assim (A única coisa que mudamos foi o script build. Também não se preocupe se o `name` estiver diferente. É apenas o nome que dei para a pasta):

```json
{
  "name": "new-reactjs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "babel src/index.jsx --out-file dist/bundle.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "@babel/cli": "^7.17.6",
    "@babel/core": "^7.17.8",
    "@babel/preset-env": "^7.16.11",
		"@babel/preset-react": "^7.16.7"
  }
}
```

Por enquanto a estrutura de pastas está assim: 

![Screenshot_20220319_114327.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dcfe7b3c-12a4-4a2f-8b0d-55a27bda047a/Screenshot_20220319_114327.png)

## Convertendo nosso primeiro arquivo com o Babel

Na pasta `src`, vamos criar um arquivo ****`index.jsx` (será o arquivo que o babel irá converter) e adicionar o seguinte: 

```jsx
import React from 'react';

function App() {
  return <h1>Hello, World!</h1>
}
```

Agora, caso a gente execute o script que a gente criou (o build) no terminal com `npm run`, ele irá criar uma basta dist com um arquivo `bundle.js` dentro:

```jsx
npm run build
```

Após executar esse script, veremos que algo mudou nas nossas pastas. Uma nova pasta surgiu com um arquivo dentro (visualização do index.jsx também): 

![Screenshot_20220319_114606.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9a42f0e2-a3c7-401e-96e5-7b1029d4b063/Screenshot_20220319_114606.png)

Nele está nosso `bundle.js`. Se abrí-lo verá um código escrito de forma meio confusa. Não se preocupe com eke. É apenas o nosso arquivo React convertido.

## Instalando o Webpack

O webpack serve para que possamos usar algumas tecnologias mais recentes no nosso desenvolvimento, como o sass por exemplo. 

<aside>
💡 Sass é uma maneira diferente de escrever arquivos css que facilita o processo de herança de estilos.

</aside>

[Sass: Syntactically Awesome Style Sheets](https://sass-lang.com/)

Para instalar o webpack, basta executar os seguintes comandos:

```json
npm install webpack -D
npm install webpack-cli -D
npm install babel-loader -D
```

- O `webpack` vai ser quem será responsável por fazer as mudanças necessárias no nosso `bundle.js`.
- O `webpack-cli` serve para que o `npm` consiga executá-lo no terminal.
- O `babel-loader` vai integrar o webpack com o babel para que eles funcionem em conjunto.

---

Após isso, vamos criar nosso arquivo `webpack.config.js` na pasta raiz do nosso projeto.

<aside>
💡 A raiz é onde todos os arquivos e pastas do nosso projeto se encontram. Quando se fala em deixar algo na raiz, significa que isso não estará dentro de nenhuma subpasta.

</aside>

Como o nome do arquivo indica, ele é um arquivo de configuração. Então existem várias opções a serem passadas, mas que não precisamos nos preocupar em decorar. Apenas devemos conhecer esse arquivo para casos em que possamos precisar mudar alguma coisa neles.

O conteúdo do arquivo será:

```jsx
const path = require('path');

module.exports = {
  // Modo da aplicação (se é produção ou desenvolvimento)
  mode: 'development',
  // Entrada dos arquivos que vamos empacotar
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  // Para onde enviar os arquivos empacotados
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  // Empacota arquivos .jsx como arquivos .js
  resolve: {
    extensions: ['.js', '.jsx']
  },

  // Os modules definem o comportamento dos arquivos
  module: {
    rules: [
      // Indica que vamos usar o babel-loader para converter os arquivos .jsx
      // Também indica que a pasta node_modules será ignorada na conversão
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}
```

<aside>
💡 As linhas com `//` indicam comentários. Comentários são partes que serão ignoradas na execução do arquivo e servem para instruir o programador

</aside>

O `path` é um pacote do próprio node.js que serve para várias coisas, entre elas, normalizar o caminho de pastas entre sistemas operacionais. No linux, no mac, e no windows, a maneira de escrever esses caminhos podem mudar. Então existe o `path.resolve`. Que vai resolver o problema de escrever esses caminhos de maneiras diferentes. Pegando de exemplo o `entry`, o caminho que estamos passando é `src/index.jsx`. Com o path, fica:

```jsx
path.resolve(__dirname, 'src', 'index.js');
```

O `__dirname` é uma variável global que indica o diretório do arquivo.

![Screenshot_20220319_153703.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4acf2bb4-272e-44c7-88cb-de25e93314ae/Screenshot_20220319_153703.png)

## Finalmente iniciando a primeira página

Agora, vamos criar nosso arquivo de entrada. O `index.html` como não vamos usar esse arquivo durante o processo de criação, vamos deixá-lo na pasta `public` antes criada.

O arquivo é apenas um HTML simples iniciado com o `html:5`. As diferenças estão no `<body>`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React JS</title>
</head>
<body>
  <div id="root"></div>

  <script src="../dist/bundle.js"></script>
</body>
</html>
```

a `div` vai servir para injetar nossos arquivos .jsx dentro do html e o `script` é onde vamos chamar nosso pacote `dist/bundle.js`. Precisamos colocar o `..` para voltar um diretório.

---

Voltando para nosso arquivo `src/index.jsx`, vamos adicionar duas linhas no nosso arquivo.

```jsx
import React from 'react';
import { render } from 'react-dom'; // Linha adicionada

function App() {
  return <h1>Hello, World!</h1>;
}

render(<App/>, document.getElementById('root')); // Linha adicionada
```

Essas duas linhas são, respectivamente o renderizador do react e a chamada desse renderizador.

Nessa chamada vai nossa função `App` e também vamos pegar o elemento root lá do `index.html`.

---

A última mudança que vamos fazer é alterar o script build lá no `package.json`.

```json
{
	...
   "scripts": {
    "build": "webpack"
  },
	...
}
```

Como estamos usando o webpack, ele automaticamente chama o babel também, graças ao `babel-loader`.

O `package.json` final ficará assim:

```json
{
  "name": "new-reactjs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "@babel/cli": "^7.17.6",
    "@babel/core": "^7.17.8",
    "@babel/preset-env": "^7.16.11",
    "@babel/preset-react": "^7.16.7",
    "babel-loader": "^8.2.3",
    "webpack": "^5.70.0",
    "webpack-cli": "^4.9.2"
  }
}
```

Por fim, vamos abrir o terminal e executar o comando:

```bash
npm run build
```

E agora podemos abrir nosso `index.html` no navegador e ele irá nos mostrar “Hello, World!”

Estrutura de pastas completa: