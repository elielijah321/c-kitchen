const fs = require('fs');

const staticfilesrc = './staticwebapp.config.json';
const staticFileDest = './dist/staticwebapp.config.json';

const cssfilesrc = './bootstrap.min.css';
const cssFileDest = './dist/bootstrap.min.css';

const mapfilesrc = './bootstrap.min.css.map';
const mapFileDest = './dist/bootstrap.min.css.map';

try {
  fs.promises.copyFile(staticfilesrc, staticFileDest);
  console.log('staticwebapp.config.json copied successfully!');

  fs.promises.copyFile(cssfilesrc, cssFileDest);
  console.log('bootstrap.min.css copied successfully!');

  fs.promises.copyFile(mapfilesrc, mapFileDest);
  console.log('bootstrap.css.map copied successfully!');

  // Wait for a second before exiting
  // await new Promise((resolve) => setTimeout(resolve, 1000));
} catch (err) {
  console.error('Error copying config file:', err);
}