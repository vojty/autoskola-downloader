const fs = require('fs')
const cp = require('child_process')
const path = require('path')
const fsExtra = require('fs-extra')

const { fetchLecture, fetchQuestion, fetchImage, fetchFlash } = require('./api')
const { parseQuestionHtml, serialResolve } = require('./utils')

const DATA_DIR = path.join(__dirname, '../data')

function downloadImage(lectureDir, imageUrl, name) {
  return fetchImage(imageUrl).then(res => {
    const contentType = res.headers['content-type']
    const ext = contentType.replace(/image\/\.?/, '')
    const filename = `${name}.${ext}`
    fs.writeFileSync(`${lectureDir}/${filename}`, res.body)
    return filename
  })
}

function downloadFlash(lectureDir, flashUrl, name) {
  return fetchFlash(flashUrl).then(res => {
    const swfFile = `${lectureDir}/${name}.swf`
    fs.writeFileSync(swfFile, res.body)
    const filename = `${name}.gif`
    cp.execSync(`ffmpeg -i ${swfFile} ${lectureDir}/${filename}`)
    fs.unlinkSync(swfFile)
    return filename
  })
}

function downloadLecture(lecture) {
  const lectureDir = `${DATA_DIR}/lecture-${lecture.id}`
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
          const { text, answers, imageUrls, flashUrl } = parseQuestionHtml(
            response
          )

          const imagePromiseFactories = imageUrls.map((imageUrl, index) => () =>
            downloadImage(lectureDir, imageUrl, `${id}-${index + 1}`)
          )

          if (flashUrl) {
            imagePromiseFactories.push(() =>
              downloadFlash(lectureDir, flashUrl, `${id}-${imageUrls + 1}`)
            )
          }

          return serialResolve(imagePromiseFactories).then(images => ({
            id,
            text,
            code: question.Code,
            correctAnswers: question.CorrectAnswers,
            answers,
            images
          }))
        })
    })

    return serialResolve(questionPromises).then(questions => {
      console.log(`Saving ${lecture.name}`)
      questions.sort((a, b) => a.code.localeCompare(b.code))
      fs.writeFileSync(
        `${lectureDir}/data.json`,
        JSON.stringify(questions, null, 2)
      )
    })
  })
}

module.exports = {
  downloadLecture
}
