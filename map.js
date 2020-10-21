import Map from 'ol/Map';
import View from 'ol/View';
import {pointerMove} from 'ol/events/condition';
import {
  defaults as defaultInteractions,
  Select
} from "ol/interaction";
import {FullScreen} from 'ol/control';
import {fromLonLat} from 'ol/proj';
import {easeIn, easeOut} from 'ol/easing';




//修改选择功能的默认属性
var selectPointerMove = new Select({
  condition: pointerMove,
});
var location1 = [-12460000.10578194, 3951000.0];

window.map = new Map({
  layers: [],
  target: document.getElementById('map'),
  view: new View({
    center: location1,
    zoom: 14,
  }),
  interactions: defaultInteractions().extend([
    selectPointerMove
])
});


//全屏控件
var fullscreen = new FullScreen();
map.addControl(fullscreen);
function onClick(id, callback) {
  document.getElementById(id).addEventListener('click', callback);
};


onClick('pan-to-washington', function () {
  map.getView().animate(
    {center: [-8560271.695184544, 4721544.2317580255]},
    {zoom: 13},
  );
});
onClick('pan-to-phoenix', function () {
  map.getView().animate(
    {center: [-12460000.10578194, 3951000.0]},
    {zoom: 14},
  );
});






 

