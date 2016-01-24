'use strict';

var should = require('should');
var resxToJson = require('../resx-to-json');

describe('resx-to-json', function() {
  describe('#Converter', function() {
    it('should set defaults when none are provided', function() {
      var converter = new resxToJson.Converter();
      converter.options.should.have.property('defaultLocale', 'en');
      converter.options.should.have.property('localeFormat', 'nggettext');
    });

    it('should honor provided options', function() {
      var options = {
        defaultLocale: 'fr',
        localeFormat: 'asprovided',
      };
      var converter = new resxToJson.Converter(options);
      converter.options.should.have.property('defaultLocale', 'fr');
      converter.options.should.have.property('localeFormat', 'asprovided');
    });
  });

  describe('#Converter.nggettextLocaleFormatter', function() {
    var converter = new resxToJson.Converter({localeFormat: 'nggettext'});

    it('should correctly handle a locale with a hyphen', function() {
      var formattedLocale = converter.localeFormatter('en-us');
      formattedLocale.should.equal('en_US');
    });

    it('should correctly handle a locale without a hyphen', function() {
      var formattedLocale = converter.localeFormatter('fr');
      formattedLocale.should.equal('fr');
    });
  });

  describe('#Converter.defaultLocaleFormatter', function() {
    var converter = new resxToJson.Converter({localeFormat: ''});

    it('should not modify the passed locale string', function() {
      var formattedLocale = converter.localeFormatter('en-us');
      formattedLocale.should.equal('en-us');
    });
  });
});