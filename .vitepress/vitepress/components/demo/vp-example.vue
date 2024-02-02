<!--
 * @Author: sunyue
 * @Date: 2024-01-16 14:13:38
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-19 11:12:44
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
-->
<script setup>
import { ref, defineAsyncComponent, computed } from 'vue';
const props = defineProps(['file'])
const components = import.meta.glob('../../../../docs/examples/**/*.vue')
const AsyncComponent = defineAsyncComponent(components[`../../../../docs/examples/${props.file}.vue`]);

const demo = computed(() => AsyncComponent)
</script>

<template>
  <div class="example-showcase">
      <component :is="demo" v-bind="$attrs" v-if="demo" />
  </div>
</template>

<style>
.example-showcase {
  padding: 1.5rem;
  margin: 0.5px;
  background-color: #fff;
}
</style>