'use strict';

var xml2js = require('xml2js');
var path = require('path');
var _ = require('lodash');
var fs = require('fs');

function nggettextLocaleFormatter(locale) {
  if (locale.length > 2) {
    var split = locale.split('-');
    locale = split[0].toLowerCase() + '_' + split[1].toUpperCase();
  }
  return locale;
}

function defaultLocaleFormatter(locale) {
  return locale;
}

function ResxToJsonConverter(options) {
  this.options = _.defaults(options, {
    defaultLocale: 'en',
    localeFormat: 'nggettext',
  });
  switch (this.options.localeFormat) {
    case 'nggettext': {
      this.localeFormatter = nggettextLocaleFormatter;
      break;
    }

    default: {
      this.localeFormatter = defaultLocaleFormatter;
      break;
    }
  }
}

ResxToJsonConverter.prototype.fromXmlString =
  function(xmlString, locale, callback) {
    var parser = new xml2js.Parser();
    parser.parseString(xmlString, function(err, parsed) {
      if (err) {
        return callback(err, null);
      }

      var dictionary = {};
      parsed.root.data.forEach(function(nameValuePair) {
        dictionary[nameValuePair.$.name] = nameValuePair.value[0];
      });

      var result = {};
      result[locale] = dictionary;
      return callback(null, result);
    });
  };

ResxToJsonConverter.prototype.determineLocale =
  function(resxFilePath) {
    var locale = path.extname(path.parse(resxFilePath).name);
    if (!locale) {
      locale = this.options.defaultLocale;
    } else {
      locale = locale.substring(1);
    }
    return this.localeFormatter(locale);
  };

ResxToJsonConverter.prototype.fromResxFile =
  function(resxFilePath, callback) {
    var locale = this.determineLocale(resxFilePath);
    var self = this;
    fs.readFile(resxFilePath, function(err, fileContents) {
      if (err) {
        return callback(err, null);
      }
      return self.fromXmlString(fileContents, locale, callback);
    });
  };
