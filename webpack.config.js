module.exports = {
    entry: './src/index.js',
    mode: "production",
    output: {
        path: `${__dirname}/public`,
        filename: 'main.js'
    },
    devServer: {
        static: 'public',
        open: '/'
    }
}