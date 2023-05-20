#!/usr/bin/env node
import { cli } from 'cleye';
import { spawn } from 'child_process';
import path from "path";
import { consola } from 'consola'
import packJson from '../package.json';

const argv = cli({
  name: 'gong-create',
  version: packJson.version,
  description: 'cli',
  flags: {
    // 打开插件商店
    plugins: {
      type: Boolean,
      alias: 'p',
    },
    // 添加插件
    use: {
      type: String,
      alias: 'a',
    },
    // 列举本地插件
    location: {
      type: Boolean,
      alias: 'l',
    }
  }
});

const initAPP = () => {
  spawn('node', [`${path.resolve(__dirname, 'cli.js')}`], { stdio: 'inherit' });
}

const openPlginStroe = () => {
  spawn('node', [`${path.resolve(__dirname, 'pluginStore.js')}`], { stdio: 'inherit' });
}

const { plugins, location, use } = argv.flags;

if (plugins) {
  openPlginStroe()
} else {
  initAPP();
}




