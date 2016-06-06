#! /usr/bin/env node

var path = require('path');
var fs = require('fs');
var pkg = require( path.join(__dirname, 'package.json') );
var program = require('commander');
var xml2js = require('xml2js');
var _ = require('lodash');

program
  .version(pkg.version)
  .arguments('<fontFile> <outputFile>')
  .action(main)
  .parse(process.argv);


function main(fontFile, outputFile) {

  fs.readFile(fontFile, function(error, data){
    if (error) {
      console.error(error)
    } else {
      var parser = new xml2js.Parser();
      parser.addListener('end', function(result) {
          var glyphs = _.get(result, 'svg.defs.0.font.0.glyph', []);
          glyphObjectsToCharcodes(glyphs);
      });
      parser.parseString(data);
    }
  });

  var glyphObjectsToCharcodes = function(glyphs) {
    var charcodes = {};
    for (var i = glyphs.length - 1; i >= 0; i--) {
      var glyph = glyphs[i]['$'];
      if (!glyph['glyph-name'] || !glyph['unicode']) {
        console.error('glyph-name or unicode attribute not found! in %s', fontFile);
        process.exit();
      }
      charcodes[glyph['glyph-name']] = glyph['unicode'].charCodeAt(0);
    }
    saveCharcodesToFile(charcodes);
  }

  var saveCharcodesToFile = function(charcodes) {
    var outputString = JSON.stringify(charcodes, null, 2);
    fs.writeFile(outputFile, outputString, function(error){
      if (error) console.error(error);
    });
  }

}
