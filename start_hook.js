require('@babel/register')({
    presets: ['@babel/preset-env']
});

module.exports = require('./server/server.js');