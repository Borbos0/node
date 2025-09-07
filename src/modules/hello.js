const getHello = (reqUrl) => {
    const HOST = process.env.HOST

    const url = new URL(reqUrl, `http://${HOST}`)

    const name = url.searchParams.get('hello')

    if (!name) {
      return 'Hello, stranger!'
    }
    
    return `Hello, ${name}!`
}

module.exports = getHello
