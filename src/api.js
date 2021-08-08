const { default: axios } = require('axios')

const BASE_URL = 'https://etesty2.mdcr.cz'
const LECTURE_URL = `${BASE_URL}/Test/GeneratePractise/`
const QUESTION_URL = `${BASE_URL}/Test/RenderQuestion`

function fetchQuestion(id) {
  return axios.post(QUESTION_URL, { id }).then((res) => res.data)
}

function fetchLecture(id) {
  return axios.post(LECTURE_URL, { lectureID: id }).then((res) => res.data)
}

function fetchAsset(assetUrl) {
  const url = `${BASE_URL}${assetUrl}`
  return axios.get(url, {
    responseType: 'arraybuffer'
  })
}

module.exports = {
  fetchLecture,
  fetchQuestion,
  fetchAsset
}
