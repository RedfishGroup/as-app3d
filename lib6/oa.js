'use strict';

System.register(['./OofA.js', './DataSet.js', './AgentSet.js', './Color.js', './ColorMap.js', './util.js'], function (_export, _context) {
  var OofA, DataSet, AgentSet, Color, ColorMap, util;
  return {
    setters: [function (_OofAJs) {
      OofA = _OofAJs.default;
    }, function (_DataSetJs) {
      DataSet = _DataSetJs.default;
    }, function (_AgentSetJs) {
      AgentSet = _AgentSetJs.default;
    }, function (_ColorJs) {
      Color = _ColorJs.default;
    }, function (_ColorMapJs) {
      ColorMap = _ColorMapJs.default;
    }, function (_utilJs) {
      util = _utilJs.default;
    }],
    execute: function () {
      // Import the lib/ mmodules via relative paths


      const modules = { DataSet, util, OofA, AgentSet, Color, ColorMap };
      util.copyTo(window, modules);

      console.log('DataSet, util, OofA, AgentSet, Color, ColorMap');
      console.log('ds, u, oofa, aset, color, cmap');

      const oa = new OofA({
        id: Uint32Array,
        color: Uint8Array,
        colorMap: [[1, 2, 3], 0],
        position: [Float32Array, 2] // x, y
      }, 2, 2);

      util.repeat(4, i => {
        oa.push({
          id: i,
          color: i * 10,
          position: [i, i + 2]
        });
      });

      const runs = 1e6;
      const test = new OofA({
        id: Uint32Array,
        color: Uint8Array,
        colorMap: [[1, 2, 3], 0],
        position: [Float32Array, 2] // x, y
      }, runs, 0);
      util.timeit(i => {
        test.push({
          id: i,
          color: i % 25,
          position: [i, i]
        });
      }, runs, 'getterSetter push');

      const test1 = new OofA({
        id: Uint32Array,
        color: Uint8Array,
        colorMap: [[1, 2, 3], 0],
        position: [Float32Array, 2] // x, y
      }, runs, 0);
      util.timeit(i => {
        test1.pushObject({
          id: i,
          color: i % 25,
          position: [i, i]
        });
      }, runs, 'object push');

      const gs = test.createGetterSetter();
      let obj, id, color, position, obj1, id1, color1, position1;
      util.timeit(i => {
        obj = gs;
        obj.ix = i;
        id = obj.id;
        color = obj.color;
        position = obj.position;
      }, runs, 'getterSetter getObject');
      util.timeit(i => {
        obj1 = test1.getObject(i, obj1);
        id1 = obj1.id;
        color1 = obj1.color;
        position1 = obj1.position;
      }, runs, 'object getObject');

      util.copyTo(window, { oa, runs, test, test1, gs, obj, obj1 });
      util.copyTo(window, { id, color, position, id1, color1, position1 });
    }
  };
});