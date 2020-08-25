import yargs from 'yargs';
import chalk from 'chalk';
import * as Cmd from './cmd';


export const logo = ""
  + "                                                         _            \n"
  + "                                                  (_)   | |           \n"
  + "     ___ __ _ _ ____   ____ _ ___ ______ ___ _ __  _  __| | ___ _ __  \n"
  + "    / __/ _` | '_ \\ \\ / / _` / __|______/ __| '_ \\| |/ _` |/ _ \\ '__| \n"
  + "   | (_| (_| | | | \\ V / (_| \\__ \\      \\__ \\ |_) | | (_| |  __/ |    \n"
  + "    \\___\\__,_|_| |_|\\_/ \\__,_|___/      |___/ .__/|_|\\__,_|\\___|_|    \n"
  + "                                            | |                       \n"
  + "                                            |_|                       \n";


const cmdArgs = yargs

  .command('template', 'generate yaml template', (yargs) => {
    yargs.options({
      base: {
        alias: "p",
        describe: "base directory of downloaded files",
        type: "string"
      }
    })
      .options({
        limit: {
          alias: "l",
          describe: "total storage limit. e.g. 500mb, or 20gb",
          type: "string"
        }
      })

      .options({
        "file-limit": {
          alias: "f",
          describe: "storage limit for a single file. e.g 100mb",
          type: "string"
        }
      })

      .options({
        "file-wlist": {
          alias: "w",
          describe: "if exists, guaranteed to be downloaded. e.g. a.pdf,b.pdf"
            + "Note there is no space between file names",
          type: "string"
        }
      })

      .options({
        "file-blist": {
          alias: "b",
          describe: "if exists, won't be downloaded.",
          type: "string"
        }
      })

      .options({
        "file-ext-wlist": {
          alias: "e",
          describe: "if exists, files with given extensions will be downloaded.",
          type: "string"
        }
      })

      .options({
        "file-ext-blist": {
          alias: "z",
          describe: "if exists, files with given extensions won't be downloaded.",
          type: "string"
        }
      })

      .options({
        "update-method": {
          alias: "u",
          describe: "newFileOnly | overwrite",
          type: "string"
        }
      })

      .options({
        verbosity: {
          alias: "v",
          describe: "mute | verbose | vverbose",
          type: "string"
        }
      })

  }, Cmd.yamlGenerateHandler)
  .command('courses', 'show all courses', (yargs) => {
    yargs
      .options({
        all: {
          alias: "a",
          describe: "show more details",
          type: "boolean",
        }
      })
      .alias('h', 'help')
  }, Cmd.courseCommandHandler)

  .command("user", 'show user info', Cmd.userCommandHandler)

  .command("quota", "show storage quota on canvas", Cmd.quotaCommandHandler)

  .command("download [yaml]",
    chalk.blue("download files with given yaml config"), (yargs) => {
      yargs.positional('yaml', {
        alias: 'f',
        describe: `${chalk.yellow("yaml config file")}`,
        default: "main.yaml",
      })
    }, Cmd.downloadCommandHandler)

  .usage(chalk.yellow(logo))
  .help()
  .version("current version: 0.1.0")
  .alias('help', 'h')
  .alias('version', 'v')
  .describe('v', 'show version information')
  .epilog("more information from https://github.com/ailrk/canvas-spider")
  .showHelpOnFail(false, "whoops, something wrong. run with --help")
  .argv;
