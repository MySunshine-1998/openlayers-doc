<!--
 * @Author: sunyue
 * @Date: 2024-01-19 14:32:51
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-29 09:23:13
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
-->
<template>
  <div id="operateMap" style="height: 300px"></div>
  <button @click="addLayer">添加图层</button>
  <button @click="removeLayer">移除图层</button>
</template>
<style scoped>
button {
  padding: 10px;
  border: 1px solid black;
}
</style>
<script setup>
import "ol/ol.css";
import { onMounted } from "vue";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import { Feature, Map, View } from "ol";
// 引入依赖
import VectorSource from "ol/source/Vector.js";
import VectorLayer from "ol/layer/Vector.js";
import { Point } from "ol/geom";
import {Fill, Style, Circle} from 'ol/style.js';
import Stroke from "ol/style/Stroke";

const center = [119.18, 26.05]; //地图中心坐标
let map;
onMounted(() => {
  map = new Map({
    target: document.getElementById("operateMap"),
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
});

const addLayer = function () {
  // 创建feature
  const feature = new Feature({
    geometry: new Point(fromLonLat(center))
  });
  // 设置要素样式
  feature.setStyle(
    new Style({
      image: new Circle({
        radius: 100,
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: 'red'
        })
      })
    })
  );
  //创建layer并添加到map中
  const newLayer = new VectorLayer({
    // 创建Source
    source: new VectorSource({
      features: [feature],
    }),
  });
  map.addLayer(newLayer);
};

const removeLayer = function () {
  // 获取所有图层
  const layers = map.getLayerGroup().getLayers().array_;
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    // 删掉VectorLayer
    if (layer instanceof VectorLayer) map.removeLayer(layer);
  }
};
</script>
