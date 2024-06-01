'use strict';
var fs = require('fs');

require('colors');
var jsDiff       = require('diff');
var beautifyHtml = require('js-beautify').html;
var _            = require('lodash');
var wrench       = require('wrench');

function compareFolders (folder1, folder2) {

  // First log any differences between file paths in the two folders
  var filePathDiffs = _.difference(folder1.files, folder2.files);

  filePathDiffs.forEach(function (fileDiff) {
    if (_.contains(folder1.files, fileDiff)) {
      console.log(folder1.name.yellow + ' contains the file ' + fileDiff.blue + ' which was not found for ' + folder2.name.magenta);
    } else {
      console.log(folder2.name.yellow + ' contains the file ' + fileDiff.blue + ' which was not found for ' + folder1.name.magenta);
    }
  });

  var anyDiffs = false;

  // Ignore the file path differences when comparing the common files' contents
  _.without.apply(null, [folder1.files].concat(filePathDiffs || []))
    .forEach(function (file) {
      var file1 = beautifyHtml(fs.readFileSync(process.cwd() + '/' + folder1.path + '/' + file, 'utf8').replace(/\n/g, ''));
      var file2 = beautifyHtml(fs.readFileSync(process.cwd() + '/' + folder2.path + '/' + file, 'utf8').replace(/\n/g, ''));

      var diff = jsDiff.diffChars(file1, file2);

      // Determine the number of differences between the html files
      var numberOfDiffs = diff.filter(function (fileDiff) {
        return fileDiff.value.trim().length && (fileDiff.removed || fileDiff.added);
      });

      // Only log the file if there are differences
      if (diff.length === 0 || numberOfDiffs.length === 0) {
        return;
      } else {
        anyDiffs = true;
      }


      console.log('\n\nDiff for '.blue + file.magenta);
      console.log('Red is '.red + folder1.name.red + '.\n'.red + 'Green is '.green + folder2.name.green + '.\n'.green);

      // Print the differences between the files
      diff.forEach(function (templateDiff, i, diffs) {

        if (templateDiff.added && diffs[i + 1] && diffs[i + 1].removed) {
          var swap = templateDiff;
          templateDiff = diffs[i + 1];
          diffs[i + 1] = swap;
        }
        if (templateDiff.removed) {
          process.stdout.write(templateDiff.value.red);
        } else if (templateDiff.added) {
          process.stdout.write(templateDiff.value.green);
        } else {
          process.stdout.write(templateDiff.value);
        }
      });
    });

  // If no diffs are found, log a sucess message
  if (!anyDiffs) {
    console.log('All files matching.'.green);
    return true;
  } else {
    return false;
  }
}

module.exports = function (folders) {

  var foldersMatch = true;

  _.each(folders, function (folder) {
    folder.files = wrench.readdirSyncRecursive(folder.path)

      // Only compare html files
      .filter(function (file) {
        return file.lastIndexOf('.html') === file.length - '.html'.length && fs.statSync(folder.path + '/' + file).isFile();
      });
  })

  // Compare each folder against each other folder
  .forEach(function (folder, index, folders) {
    for (var i = index + 1; i < folders.length; i++) {
      if (!compareFolders(folder, folders[i])) {
        foldersMatch = false;
      }
    }
  });

  return foldersMatch;
};

