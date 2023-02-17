const spawn = require('child_process').spawn
const {existsSync} = require("fs")
// const which = require('which')
// const bashPath = 'C:\\Windows\\System32\\bash.exe';
const bashPath = 'C:\\Program Files\\Git\\bin\\bash.EXE';

function run (projectDir, cb) {
    const options = {
    }
    if (process.platform === 'win32') {
        const bashPath = `${process.env.windir}\\system32\\bash.exe`;

        if (existsSync(bashPath)) {
            options.shell = bashPath
        }
        //      const bashPath = which.sync('bash', { nothrow: true })
      if (0 && bashPath) {
        options.shell = bashPath // .replace(/\\Program Files (x86)/, "\\PROGRA~2")
                                // .replace(/\\Program Files/, "\\PROGRA~1")
      }
    }
    // const test = spawn('npm', ['test'], options)
  console.log(`Running ${options.shell}`);
  const test = spawn('ls', ['-lh'], options)

    let log = ''
    test.stdout.on('data', function (text) {
      log += text.toString()
    })
    test.stderr.on('data', function (text) {
      log += text.toString()
    })

    test.on('close', function (code) {
      cb(null, code, log)
    })
  }
  console.log("process.platform", process.platform);

  run("./", (_foo, code, log) => {
    console.log(log);
    console.log(`Process ended with ${code}` );
  })