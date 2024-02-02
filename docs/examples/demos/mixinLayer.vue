<!--
 * @Author: sunyue
 * @Date: 2024-01-22 17:14:54
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-31 17:50:03
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
-->
<style scoped>
button {
  padding: 10px;
  border: 1px solid black;
}
</style>
<script setup>
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import { Heatmap } from "ol/layer";
import { GeoJSON } from "ol/format";
import { onMounted, ref } from "vue";
import XYZ from "ol/source/XYZ";
import { Map, View, Feature } from "ol";
import axios from "axios";
import { WindLayer as OlwindLayer } from "ol-wind";
import VectorSource from "ol/source/Vector.js";
import VectorLayer from "ol/layer/Vector.js";
import { Point } from "ol/geom";
import { Fill, Style, Circle } from "ol/style.js";
import Stroke from "ol/style/Stroke";
const center = [113.2, 23.2]; //地图中心坐标
const isShowAddWind = ref(true);
const isShowAddHeat = ref(true);
const isShowAddDynamic = ref(true);
let HeatLayer, WindLayer, DynamicLayer;
let map;

const addHeatLayer = function () {
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
  HeatLayer = new Heatmap({
    source: source, // 热力图资源
    opacity: 1, // 透明度，默认1
    visible: true, // 是否显示，默认true
    zIndex: 1, // 图层渲染的Z索引， 默认按图层加载顺序叠加
    gradient: ["#00f", "#0ff", "#0f0", "#ff0", "#f00"], // 热图的颜色渐变
    blur: 15, // 模糊大小 (像素为单位)
    radius: 8, // 半径大小默认为8 (像素为单位)
  });
  map.addLayer(HeatLayer);
};
const addWindLayer = function () {
  axios.get("/json/demo.json").then((res) => {
    WindLayer = new OlwindLayer(res.data, {
      forceRender: false,
      windOptions: {
        velocityScale: 1 / 20,
        paths: 200,
        colorScale: () => {
          return "#fff";
        },
        width: 3,
        generateParticleOption: false,
      },
    });
    map.addLayer(WindLayer);
  });
};
const addDynamicLayer = function () {
  // 创建feature
  const feature = new Feature({
    geometry: new Point(fromLonLat(center)),
  });
  // 设置要素样式
  feature.setStyle(
    new Style({
      image: new Circle({
        radius: 100,
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)",
        }),
        stroke: new Stroke({
          color: "red",
        }),
      }),
    })
  );
  //创建layer并添加到map中
  DynamicLayer = new VectorLayer({
    // 创建Source
    source: new VectorSource({
      features: [feature],
    }),
  });
  map.addLayer(DynamicLayer);
};
onMounted(() => {
  map = new Map({
    target: document.getElementById("mixinMap"),
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
      zoom: 5, //地图初始化时的级别
    }),
    controls: [],
  });
});
const clickOperate = function (e) {
  const type = e.srcElement.getAttribute("id");
  if (type) {
    const virable = eval(`isShowAdd${type}`);
    if (virable.value) {
      switch (
        type //本来调用函数也可以用eval(`add${type}Layer`)但是打包的时候因为这么使用没有函数调用记录，所以给treeshake掉了
      ) {
        case "Wind":
          addWindLayer();
          break;
        case "Heat":
          addHeatLayer();
          break;
        case "Dynamic":
          addDynamicLayer();
          break;
        default:
          break;
      }
    } else {
      switch (type) {
        case "Wind":
          map.removeLayer(WindLayer);
          break;
        case "Heat":
          map.removeLayer(HeatLayer);
          break;
        case "Dynamic":
          map.removeLayer(DynamicLayer);
          break;
        default:
          break;
      }
    }
    virable.value = !virable.value;
  }
};
</script>
<template>
  <div id="mixinMap" style="width: 100%; height: 300px"></div>
  <div @click="clickOperate">
    <button id="Wind">{{ isShowAddWind ? "添加粒子图" : "移除粒子图" }}</button>
    <button id="Heat">{{ isShowAddHeat ? "添加热力图" : "移除热力图" }}</button>
    <button id="Dynamic">
      {{ isShowAddDynamic ? "添加自定义图层" : "移除自定义图层" }}
    </button>
  </div>
</template>
