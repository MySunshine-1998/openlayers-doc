<script setup>
import { onMounted, ref } from "vue";
import useMap from "../../hooks/useMap";
const { mapRef, initMap } = useMap();
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { fromLonLat } from "ol/proj";
import { Stroke, Style } from "ol/style";
import { Circle } from "ol/geom";
onMounted(() => {
  initMap("circleRadius");
  // 以上代码为创建地图实例
  
  const newFeature = new Feature({
    geometry: new Circle(fromLonLat([119.18, 26.05]), 40000) //半径单位是米
  })
  newFeature.setStyle(new Style({
    stroke: new Stroke({
        color: 'yellow'
    })
  }))
  const newSource = new VectorSource({
      features: [ newFeature ]
  })
  const newLayer = new VectorLayer({
      source: newSource
  })
  mapRef.value.addLayer(newLayer)
});

</script>
<template>
  <div style="height: 300px" id="circleRadius"></div>
</template>
