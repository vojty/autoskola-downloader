const fs = require('fs')
const path = require('path')
const fsExtra = require('fs-extra')

const { fetchLecture, fetchQuestion, fetchAsset } = require('./api')
const { parseQuestionHtml, serialResolve } = require('./utils')

const DATA_DIR = path.join(__dirname, '../data')

function downloadAsset(lectureDir, videoUrl, name) {
  return fetchAsset(videoUrl).then(res => {
    const contentType = res.headers['content-type']
    const ext = contentType.replace(/(video|image)\/\.?/, '')
    const filename = `${name}.${ext}`
    fs.writeFileSync(
      path.join(lectureDir, filename),
      Buffer.from(res.data, 'binary')
    )
    return { filename, contentType }
  })
}

function downloadLecture(lecture) {
  const lectureDir = path.join(DATA_DIR, `lecture-${lecture.id}`)
  if (fs.existsSync(lectureDir)) {
    fsExtra.removeSync(lectureDir)
  }
  fsExtra.ensureDirSync(lectureDir)
  return fetchLecture(lecture.id).then(res => {
    console.log(
      `Downloading ${lecture.name}, questions: ${res.Questions.length}`
    )
    const questionPromises = res.Questions.map((question, i) => {
      const id = question.QuestionID
      return () =>
        fetchQuestion(id).then(response => {
          console.log(
            `[${i + 1}/${res.Questions.length}] Downloading Question ${i + 1}`
          )
          const { text, answers, imageUrls, videoUrl } = parseQuestionHtml(
            response
          )

          const assetPromiseFactories = imageUrls.map((imageUrl, index) => () =>
            downloadAsset(lectureDir, imageUrl, `${id}-${index + 1}`)
          )

          if (videoUrl) {
            assetPromiseFactories.push(() =>
              downloadAsset(lectureDir, videoUrl, `${id}-${imageUrls + 1}`)
            )
          }

          return serialResolve(assetPromiseFactories).then(assets => ({
            id,
            text,
            code: question.Code,
            correctAnswers: question.CorrectAnswers,
            answers,
            assets
          }))
        })
    })

    return serialResolve(questionPromises).then(questions => {
      console.log(`Saving ${lecture.name}`)
      questions.sort((a, b) => a.code.localeCompare(b.code))
      fs.writeFileSync(
        path.join(lectureDir, 'data.json'),
        JSON.stringify(questions, null, 2)
      )
    })
  })
}

module.exports = {
  downloadLecture
}
