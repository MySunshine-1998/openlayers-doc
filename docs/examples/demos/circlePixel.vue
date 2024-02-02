<script setup>
import { onMounted, ref } from "vue";
import useMap from "../../hooks/useMap";
const { mapRef, initMap } = useMap();
import CircleStyle from "ol/style/Circle";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Stroke, Style } from "ol/style";
onMounted(() => {
  initMap("circlePixel");
  // 以上代码为创建地图实例
  
  const newFeature = new Feature({
      geometry: new Point(fromLonLat([119.18, 26.05]))
  })
  newFeature.setStyle(new Style({
      image: new CircleStyle({
          radius: 40, //此为像素
          stroke: new Stroke({
              color: 'red'
          })
      }),
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
  <div style="height: 300px" id="circlePixel"></div>
</template>
