module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/",
                            name: "[path][name].[ext]",
                        }
                    }
                ],
            },
            {    
                test: /\.(svg)$/,
                exclude: /fonts/,
                use: [
                    {
                        loader: "svg-url-loader",
                        options: {
                            noquotes: true,
                            outputPath: "assets/",
                            name: "[path][name].[ext]",
                        },
                    },
                ],
            },
            {
                enforce: "pre",
                test: /.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
};