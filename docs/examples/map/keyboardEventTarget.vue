<!--
 * @Author: sunyue
 * @Date: 2024-01-19 14:32:51
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-19 17:22:13
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
-->
<template>
  <div id="map" style="height: 300px"></div>
  <button id="keyboardEventTargetButton">keyboardEventTarget</button>
</template>

<script setup>
import "ol/ol.css";
import { onMounted } from "vue";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import { Map, View } from "ol";
import KeyboardPan from "ol/interaction/KeyboardPan.js";

const center = [119.18, 26.05]; //地图中心坐标
const keyboardPan = new KeyboardPan({});
onMounted(() => {
  new Map({
    target: document.getElementById("map"),
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
    interactions: [keyboardPan],
    keyboardEventTarget: document,
    view: new View({
      center: fromLonLat(center), //设置地图中心坐标，地图初始化，会将坐标设为地图中心
      zoom: 10, //地图初始化时的级别
    }),
  });
});
</script>
