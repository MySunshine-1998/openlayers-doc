<!--
 * @Author: sunyue
 * @Date: 2024-01-30 17:15:21
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-31 16:38:32
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
-->
<style scoped></style>
<script setup>
import { Feature } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { onMounted, ref } from "vue";
import useMap from "../../hooks/useMap";
const { mapRef, initMap } = useMap();
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Circle, Fill, Stroke, Style, Text } from "ol/style";

const feature = new Feature({
  geometry: new Point(fromLonLat([119.18, 26.05])),
});
const circleStyle = new Style({
  text: new Text({
    text: "五部2024年一切顺利",
    fill: new Fill({
      color: "red",
    }),
    scale: 1.5,
  }),
  image: new Circle({
    radius: 100,
    stroke: new Stroke({
      color: "yellow",
    }),
    fill: new Fill({
      color: 'rgba(225, 6, 2, 0.4)',
    }),
  }),
});
feature.setStyle(circleStyle);
const newLayer = new VectorLayer({
  source: new VectorSource({
    features: [feature],
  }),
});
const addLayer = function () {
  mapRef.value.addLayer(newLayer);
};

onMounted(() => {
  initMap("styleMixin");
  addLayer();
});
</script>
<template>
  <div id="styleMixin" style="height: 300px"></div>
</template>
