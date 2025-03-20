const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3003,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react']
        }
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'notificationCenter',
      filename: 'remoteEntry.js',
      exposes: {
        './NotificationCenter': './src/NotificationCenter.jsx',
      },
      remotes: {
        userProfile: 'userProfile@https://white-plant-07d551a0f.6.azurestaticapps.net/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
        'styled-components': { singleton: true, requiredVersion: false },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
} 