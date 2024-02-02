<!--
 * @Author: sunyue
 * @Date: 2024-01-18 10:11:56
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-19 17:39:33
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
-->
## 介绍
Map方法是OpenLayers的核心，生成一个Map需要传入View、多个Layer和一个目标容器。代码示例见[生成地图实例](/examples/quickstart)。
Openlayers会在Map实例中添加一个class为ol-viewport的容器（可用getViewport方法获取到）以及另外两个元素，一个是缩放组件，class为ol-overlaycontainer-stopevent，另一个是弹窗（overlay）组件，class为ol-overlaycontainer。
如果阅读过[快速开始](/examples/quickstart)的同学一定知道Map中存在多个Layer，Layer以数组的形式存储在layerGroups中，我们在创建Map时传入了layers参数，值为一个数组类型。openlayers会将layer集合生成一个顶层的group，并提供了getLayerGroup方法和setLayerGroup操作此group。Map实例创建好后可以通过Map.getLayerGroup().getLayers方法获取所有图层，Map.addLayer方法和Map.removeLayer方法操作此group中的图层，具体图层的介绍在[图层](/examples/layer.md)，此处不多做介绍。
## 参数说明
| 属性名称 | 数据类型 | 描述 | 是否必填 |
|-------|-------|-------|-------|
|controls|Array|用于切换地图层级|否|
|pixelRatio|Number|设备上物理像素与设备无关像素（dip）之间的比率，默认值为window.devicePixelRatio。这个属性可以用来控制地图的分辨率，例如，将pixelRatio设置为2可以将地图的分辨率提高一倍。|否|
|interactions|Array|初始化地图设置的交互|否|
|keyboardEventTarget|HTMLElement/Document/string|用于指定键盘事件的目标元素,默认值为创建地图提供的容器。当用户在地图上进行交互操作时，例如缩放(KeyboardZoom交互)、平移(KeyboardPan交互)等，浏览器会触发相应的键盘事件。通过设置 keyboardEventTarget，可以将这些事件绑定到指定的元素上，以便在地图外部处理这些事件。|否|
|layers|Array|图层|是|
|maxTilesLoading|Number(默认16)|设置同时加载的瓦片数量的最大值|否|
|moveTolerance|Number(默认1)|定义光标必须移动的最小距离（以像素为单位）才能触发地图移动事件。主要用于改变用户操作对于地图的灵敏度影响。|否|
|overlays|Array|地图初始化加载的弹窗|否|
|target|HTMLElement/string|容器|是|
|view|Array(坐标)|地图中心|是|
## 示例
### moveTolerance
::: demo 左侧地图将moveTolerance设为500，打开控制台我们可以发现拖动左侧地图需要拖出很远才会打印“鼠标移动”，输出大多都为“点击”；右侧地图稍微拖动就会打印“鼠标移动”，很少会打印出“点击”。
map/moveTolerance
:::
### keyboardEventTarget 
::: demo 此示例将keyboardEventTarget设为document,操作键盘上下左右键地图可跟随键盘移动。
map/keyboardEventTarget
:::
## 常用方法
### 添加类方法
| 方法名称 | 参数 | 描述 |
| -------- | -------- | -------- |
addControl | control | 添加control | 
addInteraction | interaction | 添加interaction，例如：new KeyboardPan() |
addLayer | layer | 添加layer |
addOverlay | overlay | 添加弹窗 |
### 移除类方法（与add类似）
| 方法名称 | 参数 | 描述 |
| -------- | -------- | -------- |
removeControl | control | 移除control | 
removeInteraction | interaction | 移除interaction|
removeLayer | layer | 移除layer |
removeOverlay | overlay | 移除弹窗 |
### 工具函数
| 方法名称 | 参数 | 描述 | 返回值
| -------- | -------- | -------- | -------- |
change | 无 | 为地图增加一个版本并派发'change'事件，可用Map.on('change')方法监听到 | 无 |
dispatchEvent| 字符串或者一个带有type属性的Object |通过调用这个方法并传递一个事件对象作为参数，可以模拟地图上发生的事件，从而触发相应的事件处理函数并且我们可以在地图上注册相应的事件监听来响应|boolean/undefined 
flushDeclutterItems | 无 | 暂时没搞明白 |无
forEachFeatureAtPixel | pixel，callback，options | 遍历地图上与给定像素坐标重叠的所有feature，回调函数会在每个与pixel重叠的feature上执行一次 | 回调函数结果
getCoordinateFromPixel | pixel | 返回指定像素的坐标 | coordinate 
getEventCoordinate | event | 返回鼠标事件所在位置的地理坐标 | coordinate
getEventPixel | event | 返回鼠标事件所在位置的像素 | Pixel
getFeaturesAtPixel | pixel, options | 返回指定像素的所有feature | features
getOverlayById | id | 根据id获取overlay | Overlay
getPixelFromCoordinate | coordinate | 根据坐标获取像素 | pixel
hasFeatureAtPixel | pixel, options | 判断此像素中是否存在feature | Boolean
### get类方法
| 方法名称 | 参数 | 描述 | 返回值
| -------- | -------- | -------- | -------- |
get | key | 获取地图属性值 | value
getAllLayers | 无 | 获取所有的layer | layers
getControls | 无 | 获取所有的controls | controls
getInteractions | 无 | 获取所有的Interactions,例如平移，缩放，旋转 | Interactions
getKeys | 无 | 获取所有属性的name | names
getLayerGroup | 无 | 获取layerGroup | layerGroup
getLayers | 无 | 获取所有当前显示的layers | layers
getOverlays | 无 | 获取所有overlays | overlays
getProperties | 无 | 获取所有属性 | Object
getRevision | 无 | 地图对象的当前修订版本号 | Revision
getSize | 无 | 获取当前地图容器大小 | [长, 宽]
getTarget | 无 | 获取创建地图时传入的target | HTMLElement/string 
getTargetElement | 无 | 获取当前地图容器 | HTMLElement
getView | 无 | 获取当前视图的中心点坐标、缩放级别、尺寸以及旋转角度等信息 | View
getViewport | 无 | 获取viewport元素 | HTMLElement
### set类方法
| 方法名称 | 参数 | 描述 | 返回值
| -------- | -------- | -------- | -------- |
set | key, value, silent | 设置属性值，其中silent属性控制是否触发监听 | 无
unset | key, silent | 抹除某属性 | 无
setLayerGroup | layerGroup | 设置layerGroup | 无
setLayers | layers | 设置layers | 无
setProperties | Object, silent | 设置properties，其中silent属性控制是否触发监听 | 无
setSize | [长,宽] | 设置地图大小 | 无 
setTarget | HTMLElement, string | 设置地图容器 | 无
setView | View | 设置地图View | 无
### 事件监听类方法
| 方法名称 | 参数 | 描述 | 返回值
| -------- | -------- | -------- | -------- |
on | type, listener | 监听地图 | 监听函数的key，如果监听了多种type，则返回key组成的数组
once | type, listener | 只监听一次 | 监听函数的key，如果监听了多种type，则返回key组成的数组
un | type, listener | 不监听某事件 | 无
### 渲染类方法
| 方法名称 | 参数 | 描述 | 返回值
| -------- | -------- | -------- | -------- |
render | 无 | 返回Map的render函数 | 无
renderSync | 无 | 在调用这个方法时，它会阻塞代码执行直到渲染完成，常配合rendercomplete事件使用 | 无