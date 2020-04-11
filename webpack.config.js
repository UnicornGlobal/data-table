const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    index: './src/main.js'
  },
  mode: 'development',
  plugins: [
    new VueLoaderPlugin()
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all'
    },
    removeAvailableModules: true,
    providedExports: true,
    usedExports: true
  },
  output: {
    path: path.resolve(__dirname, './'),
    publicPath: './',
    filename: 'index.js',
    libraryTarget: 'umd',
    library: '@unicorns/data-table',
    umdNamedDefine: true
  },
  externals: {
    vue: 'vue',
    moment: 'moment',
    pikaday: 'pikaday',
    '@unicorns/avatars': '@unicorns/avatars',
    'vue-select': 'vue-select'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compiler: require('styled-vue/compiler')
        }
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [
              {removeDoctype: true},
              {removeComments: true},
              {removeMetadata: true},
              {removeDesc: true},
              {removeUselessDefs: true},
              {removeXMLNS: true},
              {removeEditorsNSData: true},
              {removeEmptyAttrs: true},
              {removeHiddenmElems: true},
              {removeEmptyText: true},
              {removeEmptyContainers: true},
              {minifyStyles: true},
              {removeUnknownsAndDefaults: true},
              {removeUselessStrokeAndFill: true},
              {removeUnusedNS: true},
              {removeRasterImages: true},
              {mergePaths: true},
              {convertShapeToPath: true},
              {removeScriptElement: true}
            ]
          }
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.mode = 'production'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

// test specific setups
if (process.env.NODE_ENV === 'test') {
  module.exports.externals = [require('webpack-node-externals')()]
  module.exports.devtool = 'eval'
}
