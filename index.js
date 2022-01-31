#!/usr/bin/env node
const args = process.argv.slice(2);
import { Plop, run} from "plop";
import minimist from "minimist";
const argv = minimist(args);
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

Plop.prepare(
    {
      cwd: argv.cwd,
      preload: argv.preload || [],
      configPath: `${__dirname}/plopfile.js`,
      completion: argv.completion,
    },
    function (env) {
      Plop.execute(env, run);
    }
  );

