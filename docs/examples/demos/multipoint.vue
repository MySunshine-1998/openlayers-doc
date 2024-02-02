<!--
 * @Author: sunyue
 * @Date: 2024-01-30 15:49:59
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-30 15:57:35
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
-->
<script setup>
import { onMounted, ref } from "vue";
import useMap from "../../hooks/useMap";
const { mapRef, initMap } = useMap();
import CircleStyle from "ol/style/Circle";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { MultiPoint } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Stroke, Style } from "ol/style";
onMounted(() => {
  initMap("multipoint");
  // 以上代码为创建地图实例

  const newFeature = new Feature({
    geometry: new MultiPoint([
      fromLonLat([119.18, 26.05]),
      fromLonLat([120.18, 28.05]),
      fromLonLat([120.18, 28.05]),
      fromLonLat([122.5, 28.05]),
    ]),
  });
  newFeature.setStyle(
    new Style({
      image: new CircleStyle({
        radius: 40, //此为像素
        stroke: new Stroke({
          color: "red",
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
});
</script>
<template>
  <div style="height: 300px" id="multipoint"></div>
</template>
