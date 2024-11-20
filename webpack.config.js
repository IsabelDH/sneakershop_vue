// webpack.config.js

const path = require('path');

module.exports = {
  entry: './src/index.js', // Dit is het startpunt van je app (bijvoorbeeld je hoofd javascript bestand)
  output: {
    filename: 'bundle.js', // Het outputbestand
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // CSS-loader voor Tailwind CSS
      {
        test: /\.css$/,
        use: [
          'style-loader',  // Voegt CSS in je HTML
          'css-loader',    // Verwerkt CSS-bestanden
          'postcss-loader', // Verwerkt Tailwind CSS via PostCSS
        ],
      },
      // Andere rules voor JavaScript of andere bestendtypes kunnen hier worden toegevoegd
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], // Extensies die Webpack kan verwerken
  },
};
