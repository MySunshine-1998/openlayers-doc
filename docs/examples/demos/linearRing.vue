<!--
 * @Author: sunyue
 * @Date: 2024-01-29 15:32:24
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-30 15:48:50
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
-->
<script setup>
import { onMounted } from "vue";
import useMap from "../../hooks/useMap";
const { mapRef, initMap } = useMap();
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { fromLonLat } from "ol/proj";
import { Stroke, Style } from "ol/style";
import { LinearRing, Polygon } from "ol/geom";
onMounted(() => {
  initMap("linearRing");
  // 以上代码为创建地图实例
  const linearRing = new LinearRing([
    fromLonLat([119.18, 26.05]),
    fromLonLat([120.18, 26.05]),
    fromLonLat([120.18, 28.05]),
    fromLonLat([119.18, 28.05]),
  ]);
  const polygon = new Polygon([linearRing.getCoordinates()]);
  const newFeature = new Feature({
    geometry: polygon,
  });
  newFeature.setStyle(
    new Style({
      stroke: new Stroke({
        color: "yellow",
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
});
</script>
<template>
  <div style="height: 300px" id="linearRing"></div>
</template>
