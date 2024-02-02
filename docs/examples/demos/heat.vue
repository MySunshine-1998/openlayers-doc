<!--
 * @Author: sunyue
 * @Date: 2024-01-22 17:14:54
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-29 09:21:29
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
-->
<script setup>
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import { Heatmap } from "ol/layer";
import { GeoJSON } from "ol/format";
import { onMounted } from "vue";
import XYZ from "ol/source/XYZ";
import { Map, View } from "ol";
// 模拟热力数据
let heatMapList = [];
for (let i = 0; i < 30; i++) {
  heatMapList.push({
    lng: `113.2${Math.ceil(Math.random() * 1000)}`,
    lat: `23.2${Math.ceil(Math.random() * 1000)}`,
  });
}
let geojsonData = {
  type: "FeatureCollection",
};
geojsonData["features"] = heatMapList.map((item) => {
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: fromLonLat([item.lng, item.lat]),
    },
  };
});
// 创建热力图资源
const source = new VectorSource({
  features: new GeoJSON().readFeatures(geojsonData),
});
// 创建热力图图层
const heatmapLayer = new Heatmap({
  source: source, // 热力图资源 
  opacity: 1, // 透明度，默认1
  visible: true, // 是否显示，默认true
  zIndex: 1, // 图层渲染的Z索引， 默认按图层加载顺序叠加
  gradient: ["#00f", "#0ff", "#0f0", "#ff0", "#f00"], // 热图的颜色渐变
  blur: 15, // 模糊大小 (像素为单位)
  radius: 8, // 半径大小默认为8 (像素为单位)
});
const center = [113.2, 23.2]; //地图中心坐标
onMounted(() => {
  const map = new Map({
    target: document.getElementById("heatMap"),
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
    controls: [],
  });
  map.addLayer(heatmapLayer);
});
</script>
<template>
  <div id="heatMap" style="width: 100%; height: 300px"></div>
</template>
