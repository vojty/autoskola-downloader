const inquirer = require('inquirer')

const { lectures } = require('./lectures')
const { downloadLecture } = require('./downloader')
const { serialResolve } = require('./utils')

inquirer
  .prompt([
    {
      type: 'checkbox',
      message: 'Select lectures to download',
      name: 'lectures',
      choices: lectures.map(lecture => ({
        name: lecture.name,
        value: lecture
      }))
    }
  ])
  .then(results => {
    const promiseFns = results.lectures.map(lecture => () =>
      downloadLecture(lecture)
    )
    return serialResolve(promiseFns)
  })
  .catch(err => {
    console.error(err)
  })
