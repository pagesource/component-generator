#!/usr/bin/env node
const args = process.argv.slice(2);
import { Plop, run} from "plop";
import minimist from "minimist";
const argv = minimist(args);

Plop.prepare(
    {
      cwd: argv.cwd,
      preload: argv.preload || [],
      //configPath: `${process.cwd()}/plopfile-${argv.js ? 'js' : 'ts'}.js`,
      configPath: `${process.cwd()}/node_modules/component-generator/plopfile-${argv.js ? 'js' : 'ts'}.js`,
      completion: argv.completion,
    },
    function (env) {
      Plop.execute(env, run);
    }
  );

