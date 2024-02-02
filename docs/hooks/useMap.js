// useMap.js
import { ref } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";

export default function useMap() {
  
  const map = ref(null); // 存放地图实例的ref对象

  // 初始化地图
  const initMap = (target, zoom = 8) => {
    if (!map.value) {
      const source = new XYZ({
        url:
          "http://t0.tianditu.gov.cn/img_w/wmts?" +
          "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
          "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=4ecaa982863dffa7c6cf8ddf058dedc3", //tk=后面的密匙为开发者key
      });

      const tileLayer = new TileLayer({
        source: source
      });

      const view = new View({ center: fromLonLat([119.18, 26.05]), zoom });

      map.value = new Map({ target, layers: [tileLayer], view: view });
    }

    return map;
  };

  return {
    mapRef: map,
    initMap
  };
}