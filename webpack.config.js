const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: 'production',
  entry: './src/plurality-modal',
  output: {
    path: path.resolve('lib'),
    filename: 'PluralitySocialConnect.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      // JavaScript and TypeScript rules
      {
        test: /\.tsx?$/,
        exclude: [
          /(node_modules)/, // Exclude node_modules
          path.resolve(__dirname, 'src/pages') // Exclude the src/pages folder
        ],
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true // Skip type-checking, `tsc` handles that
          }
        }
      },
      {
        test: /\.js?$/,
        exclude: [
          /(node_modules)/, // Exclude node_modules
          path.resolve(__dirname, 'src/pages') // Exclude the src/pages folder
        ],
        use: 'babel-loader',
      },
      // CSS files
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    }
  },
  externals: {
    // Don't bundle react or react-dom      
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  },
  plugins: [
    new webpack.DefinePlugin(envKeys)
  ]
};
