// /* eslint-disable */
import test from 'ava'
const puppeteer = require('puppeteer')
const shell = require('shelljs')

const models = shell
    .ls('models/*.js')
    .sed(/^models./, '')
    .sed(/.js$/, '')
    .replace(/\n$/, '')
    .split('\n')
shell.echo(models)

const child = shell.exec('live-server --no-browser --quiet --watch=src', {
    async: true,
})
// const child = shell.exec('live-server --no-browser --watch=src')
// const child = shell.exec('http-server --silent')

function wait(seconds = 1) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), seconds * 1000)
    })
}

models.forEach(async model => {
    await test.serial(model, async t => {
        const url = `http://127.0.0.1:8080/docs/models/?${model}`
        console.log('testing:', model, url)
        const browser = await puppeteer.launch({ headless: false })
        // console.log('browser')
        const page = await browser.newPage()
        // console.log('page')
        await page.goto(url)
        console.log('waiting 4 seconds') // works! lets model run n seconds
        await wait(4)
        console.log('done waiting')

        await page.screenshot({ path: `test/${model}.png` })
        await browser.close()
        t.pass()
    })
})

test('foo', t => {
    t.is(2, 2)
})

test.after.always('guaranteed cleanup', t => {
    child.kill()
})
