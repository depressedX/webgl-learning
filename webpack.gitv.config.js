const base = require('webpack.config');
const merge = require('webpack-merge');

module.exports = merge(base, {
    output: {
        path: __dirname + '/public',
        filename: '[name].js'
    }
});