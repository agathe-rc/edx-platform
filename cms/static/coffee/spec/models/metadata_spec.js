// Generated by CoffeeScript 1.6.1
(function() {

  define(["js/models/metadata"], function(Metadata) {
    return describe("Metadata", function() {
      it("knows when the value has not been modified", function() {
        var model;
        model = new Metadata({
          'value': 'original',
          'explicitly_set': false
        });
        expect(model.isModified()).toBeFalsy();
        model = new Metadata({
          'value': 'original',
          'explicitly_set': true
        });
        model.setValue('original');
        return expect(model.isModified()).toBeFalsy();
      });
      it("knows when the value has been modified", function() {
        var model;
        model = new Metadata({
          'value': 'original',
          'explicitly_set': false
        });
        model.setValue('original');
        expect(model.isModified()).toBeTruthy();
        model = new Metadata({
          'value': 'original',
          'explicitly_set': true
        });
        model.setValue('modified');
        return expect(model.isModified()).toBeTruthy();
      });
      it("tracks when values have been explicitly set", function() {
        var model;
        model = new Metadata({
          'value': 'original',
          'explicitly_set': false
        });
        expect(model.isExplicitlySet()).toBeFalsy();
        model.setValue('original');
        return expect(model.isExplicitlySet()).toBeTruthy();
      });
      it("has both 'display value' and a 'value' methods", function() {
        var model;
        model = new Metadata({
          'value': 'default',
          'explicitly_set': false
        });
        expect(model.getValue()).toBeNull;
        expect(model.getDisplayValue()).toBe('default');
        model.setValue('modified');
        expect(model.getValue()).toBe('modified');
        return expect(model.getDisplayValue()).toBe('modified');
      });
      it("has a clear method for reverting to the default", function() {
        var model;
        model = new Metadata({
          'value': 'original',
          'default_value': 'default',
          'explicitly_set': true
        });
        model.clear();
        expect(model.getValue()).toBeNull;
        expect(model.getDisplayValue()).toBe('default');
        return expect(model.isExplicitlySet()).toBeFalsy();
      });
      it("has a getter for field name", function() {
        var model;
        model = new Metadata({
          'field_name': 'foo'
        });
        return expect(model.getFieldName()).toBe('foo');
      });
      it("has a getter for options", function() {
        var model;
        model = new Metadata({
          'options': ['foo', 'bar']
        });
        return expect(model.getOptions()).toEqual(['foo', 'bar']);
      });
      return it("has a getter for type", function() {
        var model;
        model = new Metadata({
          'type': 'Integer'
        });
        return expect(model.getType()).toBe(Metadata.INTEGER_TYPE);
      });
    });
  });

}).call(this);
