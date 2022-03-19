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