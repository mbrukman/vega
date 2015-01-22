define(function(require, exports, module) {
  var Node = require('./Node'),
      changeset = require('./changeset'),
      util = require('../util/index');

  function Signal(graph, name, init) {
    Node.prototype.call(this, graph);

    this._name  = name;
    this._value = init;
  };

  var proto = (Bin.prototype = new Node());

  proto.name = function() { return this._name; };

  proto.value = function(val) {
    if(!arguments.length) return this._value;
    this._value = val;
    return this;
  };

  proto.fire = function(cs) {
    if(!cs) cs = changeset.create({}, true);
    cs.signals[this._name] = 1;
    this._graph.propagate(cs, this);
  };

  return Signal;
})