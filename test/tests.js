// Generated by CoffeeScript 1.7.1
(function() {
  module('test ajax', {
    setup: function() {
      this.jQget = $.get;
      this.jQpost = $.post;
      return $.get = $.post = function(url, data, success) {
        if ((data.model != null) && typeof data.model === 'string') {
          data.model = JSON.parse(data.model);
        }
        return success(data);
      };
    },
    teardown: function() {
      $.get = this.jQget;
      return $.post = this.jQpost;
    }
  });

  test('fetch model', function() {
    var model;
    model = new LocalModel({
      url: 'foo',
      el: '#qunit-fixture'
    });
    model.fetch({
      spam: 'egg'
    });
    return deepEqual(model.model, {
      spam: 'egg'
    });
  });

  test('merge and save model', function() {
    var model;
    model = new LocalModel({
      url: 'foo',
      el: '#qunit-fixture'
    });
    model.save({
      spam: 'egg'
    });
    return deepEqual(model.model, {
      spam: 'egg'
    });
  });

  test('save model and merge response', function() {
    var model;
    model = new LocalModel({
      url: 'foo',
      el: '#qunit-fixture'
    });
    model.save({}, {
      spam: 'egg'
    });
    return deepEqual(model.model, {
      spam: 'egg'
    });
  });

  test('correctly merge response', function() {
    var model;
    model = new LocalModel({
      url: 'foo',
      el: '#qunit-fixture'
    });
    model.save({
      spam: 'ham',
      spam: 'egg'
    });
    return deepEqual(model.model, {
      spam: 'egg'
    });
  });

  module('test ui');

  test('test render', function() {
    var model;
    model = new LocalModel({
      url: 'foo',
      el: '#qunit-fixture'
    });
    model.model.value = 'foo';
    model.render();
    return equal($('#qunit-fixture').html(), 'foo');
  });

  module('test model');

  test('get value', function() {
    var model;
    model = new LocalModel({
      url: 'foo',
      el: '#qunit-fixture'
    });
    model.model = {
      spam: 'egg',
      foo: 'bar'
    };
    return equal(model.get('spam'), 'egg');
  });

  test('get entire model', function() {
    var model;
    model = new LocalModel({
      url: 'foo',
      el: '#qunit-fixture'
    });
    model.model = {
      spam: 'egg',
      foo: 'bar'
    };
    return deepEqual(model.get(), {
      spam: 'egg',
      foo: 'bar'
    });
  });

  test('set value', function() {
    var model;
    model = new LocalModel({
      url: 'foo',
      el: '#qunit-fixture'
    });
    model.model = {
      spam: 'egg',
      foo: 'bar'
    };
    model.set({
      spam: 'ham'
    });
    return equal(model.get('spam'), 'ham');
  });

  test('set multiple values', function() {
    var model;
    model = new LocalModel({
      url: 'foo',
      el: '#qunit-fixture'
    });
    model.model = {
      spam: 'egg',
      foo: 'bar'
    };
    model.set({
      spam: 'ham',
      foo: 'egg'
    });
    equal(model.get('spam'), 'ham');
    return equal(model.get('foo'), 'egg');
  });

  module('test inheritance');

  test('test override proto method', function() {
    var MyModel, model;
    MyModel = LocalModel.extend({
      fetch: function() {
        return 'ok';
      }
    });
    model = new MyModel({
      url: 'foo',
      el: '#qunit-fixture'
    });
    return equal(model.fetch(), 'ok');
  });

  test('test __super__ alias', function() {
    var MyModel, model;
    expect(1);
    MyModel = LocalModel.extend({
      fetch: function() {
        return equal(MyModel.__super__.fetch, LocalModel.prototype.fetch);
      }
    });
    model = new MyModel({
      url: 'foo',
      el: '#qunit-fixture'
    });
    return model.fetch();
  });

}).call(this);