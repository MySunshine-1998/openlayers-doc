## 介绍
在OpenLayers中，一个图层（Layer）通常需要一个数据源（Source）来提供它所需的数据。Source可以看作是图层的数据后端，它定义了数据的类型、格式以及获取数据的方式。Source常见类型如下
- ImageWMS   
  用于获取来自WMS服务的图片数据的Source。它可以用于显示各种类型的地图数据，如栅格数据、矢量数据等。 
- TileJSON
  用于获取TileJSON数据的Source。TileJSON是一种JSON格式的数据，包含了地图瓦片的元数据和配置信息。
- Vector
  用于获取矢量数据的Source。它可以用于显示各种类型的矢量数据，如点、线、多边形等。一般前端需要自己绘制Feature时使用此类型，应用比较广泛。
- ImageStatic
  用于获取静态图片数据的Source。它可以用于显示任何类型的静态图片数据，如卫星图像、街道地图等。
- XYZ
  用于获取XYZ格式的瓦片数据的Source。XYZ格式是一种常见的瓦片格式，可以用于显示各种类型的地图数据。一般加载瓦片数据使用此方法，开发中经常用到。
- Zoomify
  用于获取Zoomify格式的瓦片数据的Source。Zoomify是一种高质量的瓦片格式，可以用于显示高分辨率的地图数据。
- OSM
  这是openlayers自带的地图，如果非内网开发可使用。
