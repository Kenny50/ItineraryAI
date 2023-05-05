class Constant {
    staticFileDir =  '/api/static'
    port = 3020
    backendPrefix =  '/api/'
    devDomain = `http://localhost:${this.port}`
    staticFileAddress =  `${this.devDomain}${this.staticFileDir}`
    realFileAddress = '/app/config'
}
const constant = new Constant();

module.exports = constant;