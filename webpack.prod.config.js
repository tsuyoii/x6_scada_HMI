const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production', //生产模式会压缩代码
  entry: path.resolve(__dirname, './src/app.tsx'), //指定打包入口文件
  output: {
    filename: 'index.js', //打包后的文件名
    // chunkFilename: '[name].[hash:8].js', //动态import文件名,
    path: path.resolve(__dirname, './dist'), //输出路径
    chunkLoading: false, //不分包，将所有chunk合并到一个主包，假的懒加载
    // libraryTarget: 'commonjs2', //指定类型，默认是var ?//意思是把我们的输出作为react组件
    // library: 'x6_scada',
    library: {
      name: 'XScadas',
      type: 'umd', // 以库的形式导出入口文件时，输出的类型,这里是通过umd的方式来暴露library,适用于使用方import的方式导入npm包
    },
  },

  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
  },

  resolve: {
    // 解决导入的文件可以不用添加后缀名
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            // transpileOnly:true
          },
        },
      },
      {
        test: /\.(css)$/,
        // include: path.resolve(__dirname, './src'), // 这里会直接到 src 文件下找 less/css 文件进行编译，这里是项目优化的一个小技巧
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              //  您可以在此处指定publicPath
              //  默认情况下，它在webpackOptions.output中使用publicPath
              publicPath: './',
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 占位符 placeholder
            name: '[name]_[hash].[ext]',
            outputPath: 'assets/images/',
            limit: 2048,
          },
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'assets/css/[name].css',
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       // context: 'node_modules/x6_scada/dist', //作用域，  注意：x6_scada/dist要改成你自己的
    //       from: 'src/*', //检测的文件
    //       to: 'js/', //复制的目的地
    //       toType: 'dir', //目的地类型
    //     },
    //   ],
    // }),
  ],
};
