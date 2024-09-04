// 🖼 COPY FILES WITHOUT OPTIMIZATION

import gulp from 'gulp';
import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import { paths } from './paths.js';

const { src, dest, parallel } = gulp;

/**
 * Copies files that do not need to be optimized or built to the dist folder.
 * To handle different types of files, create copies of this function with modified paths.
 *
 * @returns {NodeJS.WritableStream} The Gulp stream.
 */
function copyAssets() {
  return src(paths.files.src.assets, { encoding: false })
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(newer(paths.files.dest.assets))
    .pipe(dest(paths.files.dest.assets));
}

function copyRootFiles() {
  return src(paths.files.src.root, { encoding: false })
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(newer(paths.files.dest.root))
    .pipe(dest(paths.files.dest.root));
}

// Измените экспорт, чтобы возвращать функцию, выполняющую параллельно задачи
export default function copyFiles(done) {
  return parallel(copyAssets, copyRootFiles)(done);
}
