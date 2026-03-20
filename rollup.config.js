import rimraf from 'rimraf';
import resolve from "@rollup/plugin-node-resolve";
import copy from 'rollup-plugin-copy'
import html from "@open-wc/rollup-plugin-html";
//import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import serve from 'rollup-plugin-serve';

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const dir = 'public';
const buildTarget = process.env.BUILD || 'dev';
const isProductionBuild = buildTarget === 'production';
const shouldServe = !isProductionBuild;

const certificateDirectory = process.env.LOCATION_TO_KEY;
const https = certificateDirectory
  && ['localhost-key.pem', 'localhost.pem', 'rootCA.pem'].every((file) => existsSync(join(certificateDirectory, file)))
  ? {
      key: readFileSync(join(certificateDirectory, 'localhost-key.pem')),
      cert: readFileSync(join(certificateDirectory, 'localhost.pem')),
      ca: readFileSync(join(certificateDirectory, 'rootCA.pem')),
    }
  : undefined;

const config = {
  input: "src/index.html",
  output: {
    dir,
    format: "es",
    sourcemap: true
  },
  plugins: [
    resolve(),
    copy({
      targets: [
        { src: 'src/assets/mp3/*', dest: 'public/assets/mp3' },
        { src: 'src/assets/img/*', dest: 'public/assets/img' },
      ]
    }),
    html(),
    //typescript(),
    ...(isProductionBuild ? [terser()] : []),
    ...(shouldServe ? [serve({
      contentBase: dir,
      host: 'localhost',
      port: 20001,
      ...(https ? { https } : {}),
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
      historyApiFallback: true,
    })] : []),
  ],
  preserveEntrySignatures: 'strict',
};

rimraf.sync('./public/');

export default config;
