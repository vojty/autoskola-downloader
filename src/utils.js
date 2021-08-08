const cheerio = require('cheerio')

function sanitize(text) {
  return text.replace(/\s/g, ' ').trim()
}

function parseQuestionHtml(html) {
  const $ = cheerio.load(html)
  const text = $('.question-text').text()
  const imageUrls = $('.image-frame img')
    .map((i, image) => $(image).attr('src'))
    .get()
    .map(
      (url) => escape(url) // special chars in url :/
    )

  const videoUrl = $('.image-frame source').attr('src')
  const answers = $('.answer')
    .map((i, answer) => ({
      id: $(answer).data('answerid'),
      text: sanitize($(answer).find('p').text())
    }))
    .get()
  return {
    text: sanitize(text),
    imageUrls,
    videoUrl,
    answers
  }
}

function serialResolve(factoryFns) {
  return factoryFns.reduce(
    (promiseChain, factory) =>
      promiseChain.then((chainResults) => factory().then((currentResult) => [...chainResults, currentResult])),
    Promise.resolve([])
  )
}

module.exports = {
  parseQuestionHtml,
  serialResolve
}
