import {Path, mkPath} from './pathtools';
import {Config, ConfigBuilder, Auth} from './types';
import {parse} from 'yamljs';
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import {convertToBytes} from './utils';
import chalk from 'chalk';

// smart constructor for default config.
// only field `authentication` doesn't have a default value.
export function mkDefaultConfig(): ConfigBuilder {
  return {
    baseDir: mkPath('.'),

    update: "newFileOnly",

    verbosity: "verbose",

    // default no limit
    maxFileSize: "Infinity",

    // default no limit
    maxTotalSize: "Infinity",

    // snapshot directory
    snapshotDir: mkPath('./.snapshot'),

    allowVideo: false,

    allowLink: false,

    courseWhilteList: [],

    courseBlackList: [],

    fileBlackList: [],

    fileWhiteList: [],

    fileExtensionBlackList: [],

    fileExtensionWhiteList: [],
  }
}

function authenticated<T extends {authentication?: Auth}, U extends T & {authentication: Auth}>(a: T): a is U {
  return a.authentication !== undefined;
}

export async function loadConfig(p: Path): Promise<Config> {
  const yaml = await readYaml(p);

  const {maxTotalSize, maxFileSize} = yaml;

  const config = {
    ...mkDefaultConfig(),
    ...yaml,
    maxFileSize: convertToBytes(maxFileSize ?? Infinity),
    maxTotalSize: convertToBytes(maxTotalSize ?? Infinity),
  };

  if (authenticated(config)) {
    return config as Config;
  }

  throw new Error(""
    + chalk.red("Load file error, ")
    + "No authentication information");
}

async function readYaml(p: Path) {
  const readFile = promisify(fs.readFile);
  let file: string = "";
  try {
    file = (await readFile(path.resolve(p.path))).toString();
  } catch (err) {
    console.error(chalk.red(`yaml file ${p.path} doesn't exist`));
    process.exit(0);
  }

  const parsed = parse(file) as any;
  parsed.baseDir = mkPath(parsed.baseDir);
  parsed.snapshotDir = mkPath(parsed.snapshotDir);

  return parsed as ConfigBuilder;
}
