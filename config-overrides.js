const { override, addLessLoader } = require("customize-cra");

module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
        localIdentName: '[local]--[hash:base64:5]' // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
    })
);