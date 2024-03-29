const HtmlWebpackPlugin = require('html-webpack-plugin')
const pages = require('./src/pages')

const entry = []
const plugins = []
const openPage = pages ? `${pages[0].name}.html` : ''

const registerEntry = ({name}) => {
    entry[`${name}`] = `./src/pages/${name}/index.js`
}

const registerPlugin = ({
    name,
    template,
    filename,
    chunks
}) => {
    plugins.push(new HtmlWebpackPlugin({
        template: template || `./src/pages/${name}/index.html`,
        filename: filename || `${name}.html`,
        chunks: chunks || [`${name}`],
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    }))
}

pages.forEach((item) => {
    registerEntry(item)
    registerPlugin(item)
})

module.exports = {
    entry,
    plugins,
    openPage
}
