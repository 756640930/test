import 'ol/ol.css';
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import LineString from 'ol/geom/LineString';
import Map from 'ol/Map';
import View from 'ol/View';
import ol from 'ol';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {transform} from 'ol/proj';
import { getVectorContext } from 'ol/render';
import * as turf from '@turf/turf';
import Point from 'ol/geom/Point';
import {toLonLat} from 'ol/proj';
import {toStringHDMS} from 'ol/coordinate';
import {altKeyOnly, click, pointerMove} from 'ol/events/condition';
import {
  defaults as defaultInteractions,
  Select
} from "ol/interaction";
import Overlay from 'ol/Overlay';


var container = document.getElementById('popup');
var content_element = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new Overlay({
  element: container,
  autoPan: true,
  offset: [-20,30],
});
var tileLayer = new TileLayer({
  preload: 4,
  source: new OSM(),
});

map.addOverlay(overlay);
map.addLayer(tileLayer);
// /**
//  * Add a click handler to hide the popup.
//  * @return {boolean} Don't follow the href.
//  */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

//修改选择功能的默认属性
var selectPointerMove = new Select({
  condition: pointerMove,
});



// //总网络link的style
// var styles = {
//   'LineString': new Style({
//     stroke: new Stroke({
//       color: 'rgba(200,200,200)',
//       width: 3.5,
//     }),
//   }),
// };

// var styleFunction = function (feature) {
//   return styles[feature.getGeometry().getType()];
// };
// //总Link的数据
// var link_data = window.link_geojson_data;

// //转化geojson数据的坐标系
// for(var i = 0;i < link_data.features.length;i++){
//   //开始转换
//   link_data.features[i].geometry.coordinates[0] = transform(link_data.features[i].geometry.coordinates[0],'EPSG:4326','EPSG:3857');
//   link_data.features[i].geometry.coordinates[1] = transform(link_data.features[i].geometry.coordinates[1],'EPSG:4326','EPSG:3857');  
// };

// //总网络geo数据
// var geojsonObject = link_data;

// //加载道路geojson对象数据
// var vectorSource = new VectorSource({
//   features: new GeoJSON().readFeatures(geojsonObject),
// });

// var link_Layer = new VectorLayer({
//   source: vectorSource,
//   style: styleFunction,
//   visible: true,
// });


var iiii = transform([-76.898229,38.999111],'EPSG:4326','EPSG:3857');
console.log(iiii);




//绑定多选框
let controls = document.getElementById('controls');     
        // 事件委托
        controls.addEventListener('click', (event) => {
            if(event.target.checked){                       // 如果选中某一复选框
                // 通过DOM元素的id值来判断应该对哪个图层进行显示
                switch(event.target.id){
                    case "Agent1":
                        map.getLayers().item(1).setVisible(true);
                        break;
                    case "Agent2": 
                        map.getLayers().item(2).setVisible(true);
                        break;
                    case "Agent3": 
                        map.getLayers().item(3).setVisible(true);
                        break;
                    case "Agent4": 
                        map.getLayers().item(4).setVisible(true);
                        break;
                    case "Agent5": 
                        map.getLayers().item(5).setVisible(true);
                        break;
                    case "Node": 
                        map.getLayers().item(6).setVisible(true);
                        break;
                }
            }else{                                         // 如果取消某一复选框
                // 通过DOM元素的id值来判断应该对哪个图层进行隐藏
                switch(event.target.id){
                    case "Agent1":
                        map.getLayers().item(1).setVisible(false);
                        break;
                    case "Agent2": 
                        map.getLayers().item(2).setVisible(false);
                        break;
                    case "Agent3": 
                        map.getLayers().item(3).setVisible(false);
                        break;
                    case "Agent4": 
                        map.getLayers().item(4).setVisible(false);
                        break;
                    case "Agent5": 
                        map.getLayers().item(5).setVisible(false);
                        break;
                    case "Node": 
                        map.getLayers().item(6).setVisible(false);
                        break;
                }
            } 
        });


map.on('click', function (evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel,function(feature, layer) 
  {
      return feature;
    });
  if (feature) {
      var geometry = feature.getGeometry();
      var coord = evt.coordinate
      var contents = '<p>title_name1: content</p>'+'<br/>'+'<p>title_name2: content</p>'+'<br/>'+'<p>......</p>';    
      content_element.innerHTML = contents;
      overlay.setPosition(coord);
  }
});

map.on('pointermove', function(e) {
  if (e.dragging) return;
     
  var pixel = map.getEventPixel(e.originalEvent);
  var hit = map.hasFeatureAtPixel(pixel);
  map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});








//动态路径1的样式
var style_1 = new Style({
  stroke: new Stroke({
    color: 'rgba(27,75,153)',
    width: 4,
  }),
});
//动态路径2的样式
var style_2 = new Style({
  stroke: new Stroke({
    color: 'rgba(210,46,41)',
    width: 4,
  }),
});
//动态路径3的样式
var style_3 = new Style({
  stroke: new Stroke({
    color: 'rgba(210,46,41)',
    width: 4,
  }),
});
//动态路径4的样式
var style_4 = new Style({
  stroke: new Stroke({
    color: 'rgba(27,75,153)',
    width: 4,
  }),
});
//动态路径5的样式
var style_5 = new Style({
  stroke: new Stroke({
    color: 'rgba(154,192,67)',
    width: 4,
  }),
});

//用来存储所有的feature的坐标
var sourceString_1 = [];
//动态路径1的source
var flightsSource = new VectorSource({
  wrapX: false,
  attributions:
    'Link and node data by ' +
    '<a href="http://openflights.org/data.html">Xuesong Zhou</a>,',
  loader: function(){
      var flightsData = window.flights1;
      for (var i = 0; i < flightsData.length; i++) {
        var flight = flightsData[i];
        var from = flight[0];
        var to = flight[1];

        // create an arc circle between the two locations
        var arcGenerator = new arc.GreatCircle(
          {x: from[0], y: from[1]},
          {x: to[0], y: to[1]}
        );

        var arcLine = arcGenerator.Arc(100, {offset: 0});
        sourceString_1 = sourceString_1.concat(arcLine.geometries[0].coords);
      }
          // var line = new LineString(arcLine.geometries[0].coords);
          var line = new LineString(sourceString_1);
          line.transform('EPSG:4326', 'EPSG:3857');

          var feature = new Feature({
            geometry: line,
            finished: false,
          });
          // add the feature with a delay so that the animation
          // for all features does not start at the same time
          addLater(feature, 0);
      tileLayer.on('postrender', animateFlights);
  }
});
//用来存储所有的feature的坐标
var sourceString_2 = [];
//动态路径1的source
var flightsSource_2 = new VectorSource({
  wrapX: false,
  attributions:
  'Link and node data by ' +
  '<a href="http://openflights.org/data.html">Xuesong Zhou</a>,',
  loader: function(){
      var flightsData = window.flights_2;
      for (var i = 0; i < flightsData.length; i++) {
        var flight = flightsData[i];
        var from = flight[0];
        var to = flight[1];

        // create an arc circle between the two locations
        var arcGenerator = new arc.GreatCircle(
          {x: from[0], y: from[1]},
          {x: to[0], y: to[1]}
        );

        var arcLine = arcGenerator.Arc(100, {offset: 0});
        sourceString_2 = sourceString_2.concat(arcLine.geometries[0].coords);
      }
          // var line = new LineString(arcLine.geometries[0].coords);
          var line = new LineString(sourceString_2);
          line.transform('EPSG:4326', 'EPSG:3857');

          var feature = new Feature({
            geometry: line,
            finished: false,
          });
          // add the feature with a delay so that the animation
          // for all features does not start at the same time
          addLater_2(feature, 0);
      tileLayer.on('postrender', animateFlights_2);
  }
});
//用来存储所有的feature的坐标
var sourceString_3 = [];
//动态路径3的source
var flightsSource_3 = new VectorSource({
  wrapX: false,
  attributions:
  'Link and node data by ' +
  '<a href="http://openflights.org/data.html">Xuesong Zhou</a>,',
  loader: function(){
      var flightsData = window.flights_3;
      for (var i = 0; i < flightsData.length; i++) {
        var flight = flightsData[i];
        var from = flight[0];
        var to = flight[1];

        // create an arc circle between the two locations
        var arcGenerator = new arc.GreatCircle(
          {x: from[0], y: from[1]},
          {x: to[0], y: to[1]}
        );

        var arcLine = arcGenerator.Arc(100, {offset: 0});
        sourceString_3 = sourceString_3.concat(arcLine.geometries[0].coords);
      }
          // var line = new LineString(arcLine.geometries[0].coords);

          var line = new LineString(sourceString_3);

          line.transform('EPSG:4326', 'EPSG:3857');

          var feature = new Feature({
            geometry: line,
            finished: false,
          });
          // add the feature with a delay so that the animation
          // for all features does not start at the same time
          addLater_3(feature, 0);
      tileLayer.on('postrender', animateFlights_3);
  }
});
//用来存储所有的feature的坐标
var sourceString_4 = [];
//动态路径3的source
var flightsSource_4 = new VectorSource({
  wrapX: false,
  attributions:
  'Link and node data by ' +
  '<a href="http://openflights.org/data.html">Xuesong Zhou</a>,',
  loader: function(){
      var flightsData = window.flights_4;
      for (var i = 0; i < flightsData.length; i++) {
        var flight = flightsData[i];
        var from = flight[0];
        var to = flight[1];

        // create an arc circle between the two locations
        var arcGenerator = new arc.GreatCircle(
          {x: from[0], y: from[1]},
          {x: to[0], y: to[1]}
        );

        var arcLine = arcGenerator.Arc(100, {offset: 0});
        sourceString_4 = sourceString_4.concat(arcLine.geometries[0].coords);
      }
          // var line = new LineString(arcLine.geometries[0].coords);
          var line = new LineString(sourceString_4);
          line.transform('EPSG:4326', 'EPSG:3857');

          var feature = new Feature({
            geometry: line,
            finished: false,
          });
          // add the feature with a delay so that the animation
          // for all features does not start at the same time
          addLater_4(feature, 0);
      tileLayer.on('postrender', animateFlights_4);
  }
});
//用来存储所有的feature的坐标
var sourceString_5 = [];
//动态路径3的source
var flightsSource_5 = new VectorSource({
  wrapX: false,
  attributions:
  'Link and node data by ' +
  '<a href="http://openflights.org/data.html">Xuesong Zhou</a>,',
  loader: function(){
      var flightsData = window.flights_5;
      for (var i = 0; i < flightsData.length; i++) {
        var flight = flightsData[i];
        var from = flight[0];
        var to = flight[1];

        // create an arc circle between the two locations
        var arcGenerator = new arc.GreatCircle(
          {x: from[0], y: from[1]},
          {x: to[0], y: to[1]}
        );

        var arcLine = arcGenerator.Arc(100, {offset: 0});
        sourceString_5 = sourceString_5.concat(arcLine.geometries[0].coords);
      }
          // var line = new LineString(arcLine.geometries[0].coords);
          var line = new LineString(sourceString_5);
          line.transform('EPSG:4326', 'EPSG:3857');

          var feature = new Feature({
            geometry: line,
            finished: false,
          });
          // add the feature with a delay so that the animation
          // for all features does not start at the same time
          addLater_5(feature, 0);
      tileLayer.on('postrender', animateFlights_5);
  }
});



var flightsLayer_1 = new VectorLayer({
  source: flightsSource,
  style: function (feature) {
    // if the animation is still active for a feature, do not
    // render the feature with the layer style
    if (feature.get('finished')) {
      return style_1;
    } else {
      return null;
    }
  },
});
var flightsLayer_2 = new VectorLayer({
  source: flightsSource_2,
  style: function (feature) {
    // if the animation is still active for a feature, do not
    // render the feature with the layer style
    if (feature.get('finished')) {
      return style_2;
    } else {
      return null;
    }
  },
});
var flightsLayer_3 = new VectorLayer({
  source: flightsSource_3,
  style: function (feature) {
    // if the animation is still active for a feature, do not
    // render the feature with the layer style
    if (feature.get('finished')) {
      return style_3;
    } else {
      return null;
    }
  },
});
var flightsLayer_4 = new VectorLayer({
  source: flightsSource_4,
  style: function (feature) {
    // if the animation is still active for a feature, do not
    // render the feature with the layer style
    if (feature.get('finished')) {
      return style_4;
    } else {
      return null;
    }
  },
});
var flightsLayer_5 = new VectorLayer({
  source: flightsSource_5,
  style: function (feature) {
    // if the animation is still active for a feature, do not
    // render the feature with the layer style
    if (feature.get('finished')) {
      return style_5;
    } else {
      return null;
    }
  },
});
// map.addLayer(link_Layer);
map.addLayer(flightsLayer_1);
map.addLayer(flightsLayer_2);
map.addLayer(flightsLayer_3);
map.addLayer(flightsLayer_4);
map.addLayer(flightsLayer_5);
var pointsPerMs = 0.2;
function animateFlights(event) {
  var vectorContext = getVectorContext(event);
  var frameState = event.frameState;
  vectorContext.setStyle(style_1);

  var features = flightsSource.getFeatures();
  for (var i = 0; i < features.length; i++) {
    var feature = features[i];
    if (!feature.get('finished')) {
      // only draw the lines for which the animation has not finished yet
      var coords = feature.getGeometry().getCoordinates();
      var elapsedTime = frameState.time - feature.get('start');
      var elapsedPoints = elapsedTime * pointsPerMs;

      if (elapsedPoints >= coords.length) {
        feature.set('finished', true);
      }

      var maxIndex = Math.min(elapsedPoints, coords.length);
      var currentLine = new LineString(coords.slice(0, maxIndex));

      // directly draw the line with the vector context
      vectorContext.drawGeometry(currentLine);
    }
  }
  // tell OpenLayers to continue the animation
  map.render();
}
function animateFlights_2(event) {
  var vectorContext = getVectorContext(event);
  var frameState = event.frameState;
  vectorContext.setStyle(style_2);

  var features = flightsSource_2.getFeatures();
  for (var i = 0; i < features.length; i++) {
    var feature = features[i];
    if (!feature.get('finished')) {
      // only draw the lines for which the animation has not finished yet
      var coords = feature.getGeometry().getCoordinates();
      var elapsedTime = frameState.time - feature.get('start');
      var elapsedPoints = elapsedTime * pointsPerMs;

      if (elapsedPoints >= coords.length) {
        feature.set('finished', true);
      }

      var maxIndex = Math.min(elapsedPoints, coords.length);
      var currentLine = new LineString(coords.slice(0, maxIndex));

      // directly draw the line with the vector context
      vectorContext.drawGeometry(currentLine);
    }
  }
  // tell OpenLayers to continue the animation
  map.render();
}
function animateFlights_3(event) {
  var vectorContext = getVectorContext(event);
  var frameState = event.frameState;
  vectorContext.setStyle(style_3);

  var features = flightsSource_3.getFeatures();
  for (var i = 0; i < features.length; i++) {
    var feature = features[i];
    if (!feature.get('finished')) {
      // only draw the lines for which the animation has not finished yet
      var coords = feature.getGeometry().getCoordinates();
      var elapsedTime = frameState.time - feature.get('start');
      var elapsedPoints = elapsedTime * pointsPerMs;

      if (elapsedPoints >= coords.length) {
        feature.set('finished', true);
      }

      var maxIndex = Math.min(elapsedPoints, coords.length);
      var currentLine = new LineString(coords.slice(0, maxIndex));

      // directly draw the line with the vector context
      vectorContext.drawGeometry(currentLine);
    }
  }
  // tell OpenLayers to continue the animation
  map.render();
}
function animateFlights_4(event) {
  var vectorContext = getVectorContext(event);
  var frameState = event.frameState;
  vectorContext.setStyle(style_4);

  var features = flightsSource_4.getFeatures();
  for (var i = 0; i < features.length; i++) {
    var feature = features[i];
    if (!feature.get('finished')) {
      // only draw the lines for which the animation has not finished yet
      var coords = feature.getGeometry().getCoordinates();
      var elapsedTime = frameState.time - feature.get('start');
      var elapsedPoints = elapsedTime * pointsPerMs;

      if (elapsedPoints >= coords.length) {
        feature.set('finished', true);
      }

      var maxIndex = Math.min(elapsedPoints, coords.length);
      var currentLine = new LineString(coords.slice(0, maxIndex));

      // directly draw the line with the vector context
      vectorContext.drawGeometry(currentLine);
    }
  }
  // tell OpenLayers to continue the animation
  map.render();
}
function animateFlights_5(event) {
  var vectorContext = getVectorContext(event);
  var frameState = event.frameState;
  vectorContext.setStyle(style_5);

  var features = flightsSource_5.getFeatures();
  for (var i = 0; i < features.length; i++) {
    var feature = features[i];
    if (!feature.get('finished')) {
      // only draw the lines for which the animation has not finished yet
      var coords = feature.getGeometry().getCoordinates();
      var elapsedTime = frameState.time - feature.get('start');
      var elapsedPoints = elapsedTime * pointsPerMs;

      if (elapsedPoints >= coords.length) {
        feature.set('finished', true);
      }

      var maxIndex = Math.min(elapsedPoints, coords.length);
      var currentLine = new LineString(coords.slice(0, maxIndex));

      // directly draw the line with the vector context
      vectorContext.drawGeometry(currentLine);
    }
  }
  // tell OpenLayers to continue the animation
  map.render();
}






function addLater(feature, timeout) {
  window.setTimeout(function () {
    feature.set('start', new Date().getTime());
    flightsSource.addFeature(feature);
  }, timeout);
}
function addLater_2(feature, timeout) {
  window.setTimeout(function () {
    feature.set('start', new Date().getTime());
    flightsSource_2.addFeature(feature);
  }, timeout);
}
function addLater_3(feature, timeout) {
  window.setTimeout(function () {
    feature.set('start', new Date().getTime());
    flightsSource_3.addFeature(feature);
  }, timeout);
}
function addLater_4(feature, timeout) {
  window.setTimeout(function () {
    feature.set('start', new Date().getTime());
    flightsSource_4.addFeature(feature);
  }, timeout);
}
function addLater_5(feature, timeout) {
  window.setTimeout(function () {
    feature.set('start', new Date().getTime());
    flightsSource_5.addFeature(feature);
  }, timeout);
}