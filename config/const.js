const path = require('path');
const dev = {
    ROUTER_ROOT_PATH: '/',
    OUTPUT_PATH: path.resolve(__dirname, '../public')
}

const prod = {
    ROUTER_ROOT_PATH: '/',
    OUTPUT_PATH: path.resolve(__dirname, '../public')
}

const gitv = {
    ROUTER_ROOT_PATH: '/webgl-learning/gitpages',
    OUTPUT_PATH: path.resolve(__dirname, '../gitpages')
}

module.exports = {
    dev,
    prod,
    gitv
}