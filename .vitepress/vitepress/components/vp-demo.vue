<!--
 * @Author: sunyue
 * @Date: 2024-01-15 14:14:32
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-17 17:40:57
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
-->
<script setup>
import { computed, getCurrentInstance, onMounted, ref, toRef } from "vue";
import { isClient, useClipboard, useToggle } from '@vueuse/core'
import Example from "./demo/vp-example.vue";
import SourceCode from "./demo/vp-source-code.vue";

const vm = getCurrentInstance()
const props = defineProps([
  "demos",
  "source",
  "path",
  "rawSource",
  "description",
]);

const decodedDescription = computed(() =>
  decodeURIComponent(props.description || "")
);

const sourceVisible = ref(false);

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})

const copyCode = async () => {
  const { $toast } = vm.appContext.config.globalProperties
  if (!isSupported) {
    $toast.error('copy-failed')
  }
  try {
    await copy()
    $toast.success('copy-success')
  } catch (e) {
    $toast.error('copy-failed')
    console.error(e.message)
  }
}
</script>

<template>
  <p text="sm" v-html="decodedDescription" />
  <div class="example">
    <Example :file="path" />
    <div class="op-btns">
      <button class="op-btn" @click="copyCode">复制</button>
      <button class="op-btn" @click="sourceVisible = !sourceVisible">
        展开代码
      </button>
    </div>
    <SourceCode v-show="sourceVisible" :source="source" />
  </div>
</template>

<style scoped lang="scss">
.example {
  border: 1px solid #f5f8ff;
  border-radius: 4px;

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: #909399;
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: #909399;

        &:hover {
          color: #303133;
        }
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #dcdfe6;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: #909399;
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: #409eff;
    }
  }
}
</style>
