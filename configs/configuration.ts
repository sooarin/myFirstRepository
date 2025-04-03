import { existsSync } from 'fs';
import { join } from 'path';
import { Config } from 'configs';
import YAML = require('yamljs');

enum Env {
  local = 'local',
  dev = 'dev',
  qa = 'qa',
  prd = 'prd',
}

const _checkConfigFile = (env?: Env): string | undefined => {
  const fileName = env ? `${env}.yml` : 'local.yml';
  const filePath = join(`${process.env.PWD}`, `./configs/conf/${fileName}`);
  return existsSync(filePath) === true ? filePath : undefined;
};

const _loadConfig = <T = Record<string, any>>(filePath: string | undefined): T => {
  return filePath ? YAML.load(filePath) : ({} as T);
};

export default (): Config => {
  const env = (process.env.wavve_env as Env) || Env.local;
  const envConfigFile = _checkConfigFile(env);
  const envConfig = _loadConfig(envConfigFile);
  return envConfig as Config;
};
