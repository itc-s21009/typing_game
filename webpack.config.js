module.exports = {
    entry: './src/game.js',
    mode: "production",
    output: {
        path: `${__dirname}/public/js`,
        filename: 'game.js'
    },
    devServer: {
        static: 'public',
        open: '/'
    }
}