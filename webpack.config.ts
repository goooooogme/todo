import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { merge } from 'webpack-merge';
import {sentryWebpackPlugin} from '@sentry/webpack-plugin';
import { webpackBase } from './configs/webpackBase';

const isProduction = process.env.NODE_ENV === 'production';

const config: webpack.Configuration = {
    entry: path.resolve(__dirname, 'src/index.tsx'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProduction
            ? 'bundle.[contenthash].js'
            : 'bundle.js',
        publicPath: '/',
        clean: true,
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },

    module: {
        rules: [
           {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            inject: true,
        }),

        ...(isProduction
            ? [
                  sentryWebpackPlugin({
                      moduleMetadata: ({ release }) => ({
                          dsn: 'MICROSERVICE_NAME',
                          release,
                      }),
                  }),
              ]
            : []),
    ],

    devtool: false,

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3001,
        historyApiFallback: true,
        open: true,
        hot: true,
    },
};

export default merge(config, webpackBase);
