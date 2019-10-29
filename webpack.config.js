var path  = require('path')
const resolve = dir => path.resolve(__dirname, dir);

var root = path.resolve(__dirname)
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {entry, plugins} = require('./page.config')

module.exports = {
    // devtool: 'source-map',
    mode: 'development',
    entry: {
        ...entry
    },
    output: {
        path: path.join(root, 'dist'),
        filename: '[name].js',
        publicPath: ''
    },
    resolve: {
        alias: {
            '@': resolve('src/'),
            'lib': resolve('lib/')
        }
    },
    devServer: {
        publicPath: '',
        progress: true,
        contentBase: './'
    },
    module: {
        rules: [{
            test: /\.(sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'resolve-url-loader'
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            enforce: 'pre',
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ['@babel/preset-env']
                }
            }, {
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            }]
        }, {
            test: /\.(ttf|eot|svg|woff|woff2)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    limit: 50000,
                    name: '[name].[ext]',
                    publicPath: 'font/',
                    outputPath: 'font'
                }
            }]
        }]
    },
    plugins: [
        ...plugins,
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
          canPrint: true
        })
    ],
    optimization: {
        minimize: true
    }
}