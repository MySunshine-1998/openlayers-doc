<!--
 * @Author: sunyue
 * @Date: 2024-01-18 10:05:45
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-22 16:23:46
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
-->
## 介绍
在OpenLayers中，图层（Layer）是用于展示地理数据的二维平面。每个图层都含有源（Source），它指定了图层的数据来源。另外，图层也包含一个名为render的属性，这个属性负责将数据渲染为我们可以看到的效果。

OpenLayers中的图层可以分为基础图层（Base Layer）和覆盖图层（Overlay Layer）。基础图层是位于最底层的图层，其他所有图层都是基于它来显示的。默认情况下，最先添加的图层会被设置为基础图层。覆盖图层则是可以叠加在基础图层之上的图层。

此外，OpenLayers还提供了一些预定义的图层类型，例如矢量图层（Vector Layer）、栅格图层（Raster Layer）、WMS图层（WMS Layer）等。同时，你也可以根据需要自定义创建自己的图层类型。
## 参数说明
| 属性名称 | 数据类型 | 描述 | 是否必填 |
|-------|-------|-------|-------|
className | string | 给layer设置样式 | 否
opacity | number(0-1，默认为1) | layer透明度 | 否
visible | Boolean | 是否隐藏 | 否 
extent | [左上角x,左上角y,右上角x,右上角y] | 设置layer渲染区域 | 否
zIndex | number | zIndex | 否
minResolution | number | 图层能显示的最小分辨率 | 否
maxResolution | number | 图层能展示的最大分辨率 | 否
minZoom | number | 最小缩放倍数 | 否
maxZoom | number | 最大缩放倍数 | 否
source | SourceType | 此layer的图层,如果未设置,openlayers会生成一个空的source | 否
map | Map | Map | 否
render | function | 渲染函数 | 否
properties | Object | 属性 | 否
## 常用方法
### 事件
| 方法名称 | 参数 | 描述 | 返回值 |
|-------|-------|-------|-------|
changed | 无 | 为地图增加一个版本并派发'change'事件，可用Map.on('change')方法监听到 | 无
dispatchEvent | 无 | 字符串或者一个带有type属性的Object |通过调用这个方法并传递一个事件对象作为参数，可以模拟地图上发生的事件，从而触发相应的事件处理函数并且我们可以在地图上注册相应的事件监听来响应|boolean/undefined
on | type(String/Array), 回调函数 | 监听事件 | 返回回调函数的唯一key，如果type为array则返回由key组成的数组 
once | type(String/Array)，回调函数 | 只监听一次 | 返回回调函数的唯一key，如果type为array则返回由key组成的数组
un | type(String/Array)，回调函数 | 取消监听 | 无
### 事件类型

### 工具类
| 方法名称 | 参数 | 描述 | 返回值 |
|-------|-------|-------|-------|
isVisible | View/undefined（如果此图层没有被添加到map中传View，否则不传）| 控制图层显隐 | 此图层visible属性值
### get类方法
| 方法名称 | 参数 | 描述 | 返回值 |
|-------|-------|-------|-------|
get | key | 获取某属性值 | value
getAttributions | View | 暂时没有搞懂
getExtent | 无 | 获取图层范围 | [最小x、最小y、最大x、最大y]
getKeys | 无 | 获取多个属性值（不知道官方为何把此方法放在layer里面） | 获取object属性名称
getMaxResolution | 无 | 获取图层最大分辨率，如果没有设置最大分辨率则返回Infinity | Number
getMaxZoom | 无 | 获取图层最大缩放倍数，如果没有设置最大zoom则返回Infinity | Number
getMinResolution | 无 | 获取图层最小分辨率，如果没有设置最大分辨率则返回0 | Number
getMinZoom | 无 | 获取图层最小缩放倍数，如果没有设置最小zoom则返回-Infinity | Number
getOpacity | 无 | 获取layer的透明度（0-1）| Number
getProperties | 无 | 获取图层所有属性 | Object
getRevision | 无 | 获取版本 | Number
getSource | 无 | 获取此图层的source | Source
getVisible | 无 | 获取此图层visible属性值 | Boolean
getZIndex | 无 | 获取此图层zIndex | number 
### set类方法
| 方法名称 | 参数 | 描述 | 返回值 |
|-------|-------|-------|-------|
set | key, value, silent | 设置属性值 | 无
setExtent | extend | 设置图层范围 | 无
setMap | Map实例 | 当 setMap 方法被调用时，会执行以下操作：1.添加图层。2.移除图层：如果传null，则图层会从当前所在的地图上移除，不再显示。3.图层渲染顺序：在渲染时，图层会根据 z-index（z索引）和位置进行排序。如果未定义 z-index，对于添加到地图图层集合中的图层，默认 z-index 为0；如果使用了 setMap 方法，默认 z-index 为无穷大。| 无
setMaxResolution | Number | 设置最大分辨率 | 无
setMaxZoom | Number | 设置最大zoom | 无
setMinResolution | Number | 设置最小分辨率 | 无
setMinZoom | Number | 设置最小zoom | 无
setOpacity | Number(0,1) | 设置透明度 | 无
setProperties | Object/silent | 设置属性 | 无 
setSource | Source | 设置layer的矢量源 | 无
setVisible | Boolean | 设置layer是否可见 | 无
setZIndex | Number | 设置zindex | 无
unset | key, silent | 取消设置某属性 | 无
### 示例
:::demo 
layer/layer
:::
