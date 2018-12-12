const rp = require('request-promise')

const BASE_URL = 'http://etesty2.mdcr.cz'
const LECTURE_URL = `${BASE_URL}/Test/GeneratePractise/`
const QUESTION_URL = `${BASE_URL}/Test/RenderQuestion`

function fetchQuestion(id) {
  return rp({
    uri: QUESTION_URL,
    method: 'POST',
    body: {
      id
    },
    json: true
  })
}

function fetchLecture(id) {
  return rp({
    uri: LECTURE_URL,
    method: 'POST',
    body: {
      lectureID: id
    },
    json: true
  })
}

function fetchImage(imageUrl) {
  const url = `${BASE_URL}${imageUrl}`
  return rp({
    url,
    encoding: null,
    resolveWithFullResponse: true
  })
}

function fetchFlash(flashUrl) {
  const url = `${BASE_URL}${flashUrl}`
  return rp({
    url,
    encoding: null,
    resolveWithFullResponse: true
  })
}

module.exports = {
  fetchLecture,
  fetchQuestion,
  fetchImage,
  fetchFlash
}
