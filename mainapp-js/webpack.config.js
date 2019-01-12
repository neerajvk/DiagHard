const path = require('path');

module.exports = {
    entry: [ './src/index.js', ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../mainapp-py/app/static/js')
    },
    watch: true,
};
