import path from 'node:path';
import * as webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import tsconfig from '../tsconfig.json';

const root = path.resolve(__dirname, '..');
const transformedTsConfigAliases = Object.entries(
    tsconfig.compilerOptions.paths,
).reduce<Record<string, string>>((acc, [key, value]) => {
    acc[key.replace('/*', '')] = path.resolve(
        root,
        ...value[0].replace('/*', '').split('/')
    );

    return acc;
}, {})

export const webpackBase: webpack.Configuration = {
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
        alias: transformedTsConfigAliases
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.ELKA': JSON.stringify(process.env.ELKA)
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(js|ts)x?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'swc-loader',
                    options: {
                        sync: true,
                        jsc: {
                            parser: {
                                syntax: 'typescript'
                            }
                        }
                    }
                }
            },
            {
                test: /\.scss$/i,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: {
                                auto: true,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            },
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|jpg|png)(\?v=\d+\.\d+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][hash][ext]'
                },
            },
        ]
    }
}