const rp = require('request-promise')

const BASE_URL = 'https://etesty2.mdcr.cz'
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

function fetchAsset(assetUrl) {
  const url = `${BASE_URL}${assetUrl}`
  return rp({
    url,
    encoding: null,
    resolveWithFullResponse: true
  })
}

module.exports = {
  fetchLecture,
  fetchQuestion,
  fetchAsset
}
