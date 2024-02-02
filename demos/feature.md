<!--
 * @Author: sunyue
 * @Date: 2024-01-26 16:07:26
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-31 16:57:45
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
-->
### 圆 Circle
#### 固定像素 固定像素的圆不论放大或者缩小都不会改变视觉上的大小
::: demo
demos/circlePixel
:::
#### 固定半径 固定半径的圆会根据不同的比例尺展示不同的大小
::: demo
demos/circleRadius
:::
### 点 Point
请参考 [圆->固定像素](#固定像素-固定像素的圆不论放大或者缩小都不会改变视觉上的大小)
### 线 LineString
#### 一条线
::: demo
demos/line
:::
#### 多线 MultiLineString
::: demo
demos/multipleLine
:::
### 多边形 Polygon
::: demo
demos/polygon
:::
### 闭环 LinearRing
::: demo
demos/linearRing
:::
### 多点 MultiPoint
::: demo
demos/multipoint
:::
### 多个多边形 MultiPolygon
::: demo
demos/multipolygon
:::
### 隐藏/显示Feature
之前的openlayers版本是针对Feature提供了setVisible函数，用来控制Feature显隐的，在新版本中去除了这一方法，只有Layer提供setVisible。
::: demo
demos/operateFeature
:::