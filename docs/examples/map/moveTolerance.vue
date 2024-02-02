<template>
  <div style="display: flex">
    <div id="map0" style="height: 300px; width: 48%"></div>
    <div id="map1" style="height: 300px; width: 48%"></div>
  </div>
</template>

<script setup>
import "ol/ol.css";
import { onMounted } from "vue";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import { Map, View } from "ol";

const center = [119.18, 26.05]; //地图中心坐标
onMounted(() => {
  const map1 = new Map({
    target: document.getElementById("map0"),
    moveTolerance: 500,
    layers: [
      new TileLayer({
        source: new XYZ({
          url:
            "http://t0.tianditu.gov.cn/img_w/wmts?" +
            "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
            "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=4ecaa982863dffa7c6cf8ddf058dedc3", //tk=后面的密匙为开发者key
        }),
      }),
    ],
    view: new View({
      center: fromLonLat(center), //设置地图中心坐标，地图初始化，会将坐标设为地图中心
      zoom: 10, //地图初始化时的级别
    }),
  });
  const map2 = new Map({
    target: document.getElementById("map1"),
    moveTolerance: 1,
    layers: [
      new TileLayer({
        source: new XYZ({
          url:
            "http://t0.tianditu.gov.cn/img_w/wmts?" +
            "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
            "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=4ecaa982863dffa7c6cf8ddf058dedc3", //tk=后面的密匙为开发者key
        }),
      }),
    ],
    view: new View({
      center: fromLonLat(center), //设置地图中心坐标，地图初始化，会将坐标设为地图中心
      zoom: 10, //地图初始化时的级别
    }),
  });
  const clickOperate = function () {
    console.log('点击');
  };
  const mounseMove = function() {
    console.log('鼠标移动')
  }
  map1.on("singleclick", clickOperate);
  map2.on("singleclick", clickOperate);
  map1.on('movestart', mounseMove)
  map2.on('movestart', mounseMove)
});
</script>
