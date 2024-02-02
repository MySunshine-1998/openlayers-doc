<!--
 * @Author: sunyue
 * @Date: 2024-01-30 16:09:37
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-30 17:28:36
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
-->
### Fill
```js
const fill = new Fill({
    color: 'red'
})
```
### Icon
```js
const icon = new Icon({
    src: '/map/car.png',
    scale: 1,
    rotation: 120
})
```
### Text
```js
const text = new Text({
    text: '正在运输',
    font: '40px sans-serif',
    font: '20px',
    textBaseline: 'bottom',
    offsetY: [-10],
    fill: new Fill({
        color: 'yellow'
    }),
    scale: 1.5
})
```
### Image
```js
const image = new Image({
    opacity: 1
})
```
### Circle
```js
const circle = new Circle({
    radius: 20
})
```
### Stroke
```js
const stroke = new Stroke({
    color: 'yellow'
})
```
### 结合demo
::: demo 
demos/stylesMixin
:::