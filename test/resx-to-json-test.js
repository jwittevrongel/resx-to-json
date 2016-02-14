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

  describe('#Converter.fromResxFile', function() {
    var converter = new resxToJson.Converter();

    it('should handle unicode correctly', function(testDone) {
      converter.fromResxFile(__dirname + '/YesNo.zh.resx', completed);
      function completed(err, result) {
        should.not.exist(err);
        result.should.have.property('zh');
        result.zh.should.have.property('GENERAL_Yes').eql('是');
        result.zh.should.have.property('GENERAL_No').eql('没有');
        testDone();
      }
    });

    it('should process default language correctly', function(testDone) {
      converter.fromResxFile(__dirname + '/YesNo.resx', completed);
      function completed(err, result) {
        should.not.exist(err);
        result.should.have.property('en');
        result.en.should.have.property('GENERAL_Yes').eql('Yes');
        result.en.should.have.property('GENERAL_No').eql('No');
        testDone();
      }
    });

    it('should process default language correctly', function(testDone) {
      converter.fromResxFile(__dirname + '/YesNo.resx', completed);
      function completed(err, result) {
        should.not.exist(err);
        result.should.have.property('en');
        result.en.should.have.property('GENERAL_Yes').eql('Yes');
        result.en.should.have.property('GENERAL_No').eql('No');
        testDone();
      }
    });

    it('should process country and language correctly', function(testDone) {
      converter.fromResxFile(__dirname + '/YesNo.fr-CA.resx', completed);
      function completed(err, result) {
        should.not.exist(err);
        result.should.have.property('fr_CA');
        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        result.fr_CA.should.have.property('GENERAL_Yes').eql('Oui');
        result.fr_CA.should.have.property('GENERAL_No').eql('Non');
        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
        testDone();
      }
    });
  });
});