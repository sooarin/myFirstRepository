import { existsSync } from 'fs';
import { join } from 'path';
import YAML = require('yamljs');
import { Config } from '.';

enum Env {
  local = 'local',
  dev = 'dev',
  qa = 'qa',
  prd = 'prd',
}

const _checkConfigFile = (env?: Env): string | undefined => {
  const fileName = env ? `${env}.yml` : 'local.yml';
  const filePath = join(`${process.env.PWD}`, `./configs/conf/${fileName}`);
  console.log(filePath)
  return existsSync(filePath) === true ? filePath : undefined;
};

const _loadConfig = <T = Record<string, any>>(filePath: string | undefined): T => {
  return filePath ? YAML.load(filePath) : ({} as T);
};

export default (): Config => {
  const env = Env.local;
  const envConfigFile = _checkConfigFile(env);
  const envConfig = _loadConfig(envConfigFile);
  return envConfig as Config;
};
