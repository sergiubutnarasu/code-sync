#!/usr/bin/env node

import * as program from "commander";
import { App } from "./app";

let app = new App();

program.version('0.0.1');

program
  .command('mount')
  .description('Mount here!')
  .action(function () {
    app.Start();
  });

program.parse(process.argv)