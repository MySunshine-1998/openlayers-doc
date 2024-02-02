<!--
 * @Author: sunyue
 * @Date: 2024-01-29 15:32:24
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-31 16:54:56
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
-->
<script setup>
import { onMounted, ref } from "vue";
import useMap from "../../hooks/useMap";
const { mapRef, initMap } = useMap();
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { fromLonLat } from "ol/proj";
import { Circle, Stroke, Style, Fill } from "ol/style";
import { Point } from "ol/geom";
let flag = ref(false);
let feature, style;
const hideFeature = function () {
  style = feature.getStyle();
  const hideStyle = new Style({
    stroke: new Stroke({
      color: "rgb(255, 255, 255, 0)",
    }),
    fill: new Fill({
      color: "rgb(255, 255, 255, 0)",
    }),
  });
  feature.setStyle(hideStyle);
};
const showFeature = function () {
    feature.setStyle(style)
};

const createFeature = function () {
  const newFeature = new Feature({
    geometry: new Point(fromLonLat([119.18, 26.05])),
  });
  newFeature.setStyle(
    new Style({
      image: new Circle({
        radius: 100,
        stroke: new Stroke({
          color: "yellow",
        }),
      }),
    })
  );
  const newSource = new VectorSource({
    features: [newFeature],
  });
  const newLayer = new VectorLayer({
    source: newSource,
  });
  mapRef.value.addLayer(newLayer);
  return newFeature;
};

const operateButton = function () {
  flag.value = !flag.value;
  if (flag.value) {
      hideFeature();
    } else {
      showFeature();
  }
};

onMounted(() => {
  initMap("operateFeature");
  feature = createFeature();
});
</script>
<template>
  <div style="height: 300px" id="operateFeature"></div>
  <button @click="operateButton">{{ flag ? "展示" : "隐藏" }}</button>
</template>
