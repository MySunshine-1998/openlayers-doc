<!--
 * @Author: sunyue
 * @Date: 2024-01-22 17:14:54
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-26 16:03:05
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
-->
<script setup>
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import { onMounted } from "vue";
import XYZ from "ol/source/XYZ";
import { Map, View } from "ol";
import { WindLayer } from "ol-wind";
import axios from "axios";
const center = [113.2, 23.2]; //地图中心坐标
onMounted(() => {
  const map = new Map({
    target: document.getElementById("map1"),
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
      zoom: 2, //地图初始化时的级别
    }),
    controls: [],
  });
  axios.get("/json/demo.json").then((res) => {
    const windLayer = new WindLayer(res.data, {
      forceRender: false,
      windOptions: {
        // colorScale: scale,
        velocityScale: 1 / 20,
        paths: 200,
        // eslint-disable-next-line no-unused-vars
        colorScale: () => {
          return "#fff";
        },
        width: 3,
        // colorScale: scale,
        generateParticleOption: false,
      },
      // map: map,
      // projection: 'EPSG:4326'
    });
    map.addLayer(windLayer)
  });
});
</script>
<template>
  <div id="map1" style="width: 100%; height: 300px"></div>
</template>
