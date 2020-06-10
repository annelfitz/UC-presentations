<!-- .slide: data-background="../reveal.js/img/bg-1.png" -->
<!-- .slide: class="title" -->
</br></br>
<h1 style="text-align: left; font-size: 80px;">Working with FeatureLayers in the ArcGIS API for JavaScript</h1>
<p style="text-align: left; font-size: 30px;">Bjorn Svensson and Anne Fitz</p>
<p style="text-align: left; font-size: 30px;">slides: <a href="https://git.io/Jfipd"><code>https://git.io/Jfipd<code></a></p>

----
<!-- .slide: data-background="../reveal.js/img/bg-4.png" -->
### Introductions

<div style="width:48%; float:left;">
Bjorn Svensson

</div>
<div style="width:48%; float:right; border-left: 2px solid white; padding: 10px;">
<img src="Images/intro/anne.png" style="float:left"></img>
<img src="Images/intro/anne2.png" style="margin-bottom:0px;"></img>
<img src="Images/intro/anne3.png" style="margin-top:0px;"></img>
Anne Fitz</br>
</div>

----
<!-- .slide: data-background="../reveal.js/img/bg-3.png" -->
</br></br></br>

### First time using the ArcGIS API for JavaScript?

#### Watch [Getting Started with Web Development and the ArcGIS API for JavaScript](https://www.youtube.com/watch?v=zQTkkFUhzLI) to understand the basics, then come back to this presentation!

<< add shortened link here >>

----
<!-- .slide: data-background="../reveal.js/img/bg-3.png" -->
### Agenda

- Adding a FeatureLayer
- Visualization
  - Rendering
  - Layer blending
  - Clustering
  - Highlight features
  - Filtering
- Labeling
- Querying
- Editing Features

----

### What's so special about FeatureLayers?

![FeatureLayer](Images/featurelayer.png)

- Works with your data as features
- Can be rendered in 2D or 3D
- Can be used for editing
- Updates to data are automatically available to client
- Allows for dynamic styling and interactive workflows
- Support for client-side filtering, querying, and statistics

----

### Adding a FeatureLayer to your map

**Sources**

- Feature services or map services
- Feature collections
- Portal item (from ArcGIS Online or Enterprise)

```js
const layer = new FeatureLayer({
  url: "https://<url to my server>/FeatureServer",
  // portalItem: {
  //    id: "item id from portal"
  // },
  renderer: { ... },
  popupTemplate: { ... },
});

map.add(layer);
```

----

### Adding a FeatureLayer to your map

<a href="Demos/part1-intro/add-featurelayer.html" target="_blank"><img src="Images/demo/d1-add-featurelayer.png"></img></a>

----

### Adding a FeatureLayer to your map: definitionExpression

Restrict data retrieved from the feature service

- to work with a subset of features
- to remove features with null attributes.

```js
layer.definitionExpression = "STATE_NAME = 'California'";
```

<a href="Demos/part1-intro/add-featurelayer.html" target="_blank"><img src="Images/demo/d1-definition-expression.png"></img></a>

----

<h3 style="margin-top:-35px"> Visualization: Rendering</h3>

<p style="margin:0">A renderer defines how the FeatureLayer is drawn.</p>

|[SimpleRenderer](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-SimpleRenderer.html)| [ClassBreaksRenderer](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-ClassBreaksRenderer.html)| [UniqueValueRenderer](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-UniqueValueRenderer.html) |
|----------|----------|----------|
| [![SimpleRenderer](Images/simple-renderer.png)](https://developers.arcgis.com/javascript/latest/sample-code/visualization-location-simple/index.html) | [![ClassBreaksRenderer](Images/classbreaks-renderer.png)](https://developers.arcgis.com/javascript/latest/sample-code/visualization-classbreaks/index.html) | [![UniqueValueRenderer](Images/uniquevalue-renderer.png)](https://developers.arcgis.com/javascript/latest/sample-code/visualization-location-types/index.html) |

| [HeatmapRenderer](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-HeatmapRenderer.html) | [DotDensityRenderer](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-DotDensityRenderer.html) | [DictionaryRenderer](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-DictionaryRenderer.html) |
|----------|----------|----------|
| [![HeatmapRenderer](Images/heatmap-renderer.png)](https://developers.arcgis.com/javascript/latest/sample-code/visualization-heatmap-scale/index.html) | [![DotDensityRenderer](Images/dotdensity-renderer.png)](https://developers.arcgis.com/javascript/latest/sample-code/visualization-dot-density/index.html) | [![DictionaryRenderer](Images/dictionary-renderer.png)](https://developers.arcgis.com/javascript/latest/sample-code/visualization-dictionary/index.html) |

----

### Visualization: SimpleRenderer Demo

Visualize streets with [SimpleLineSymbol](https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html)

<a href="Demos/part2-visualization/simplerenderer.html" target="_blank"><img src="Images/demo/d2-simplerenderer.png" style="float:left;margin-top:0"></img>

```js
const streets = new FeatureLayer({
  portalItem: {
    id: "fad8da699eb1439ea9e20a8b97cffa7f"
  },
  renderer: {
    type: "simple",
    symbol: {
      // autocasts as SimpleLineSymbol
      type: "simple-line",
      size: 1,
      color: "black"
    }
  }
});
```
</a>

----

### Visualization: UniqueValueRenderer Demo

Visualize one-way streets with [CIMSymbols](https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-CIMSymbol.html)

<a href="Demos/part2-visualization/cim-uniquevaluerenderer.html" target="_blank"><img src="Images/demo/d2-cim.png" style="float:left;margin-top:0"></img>

```js
const streets = new FeatureLayer({
  portalItem: {
    id: "fad8da699eb1439ea9e20a8b97cffa7f"
  },
  renderer: {
    type: "unique-value",
    field: "oneway",
    defaultSymbol: {
      type: "simple-line"
    },
    uniqueValueInfos: [{
      value: "yes",
      symbol: { // CIMSymbol
        type: "cim",
        data: { ... }
      }
    }]
  }
});
```
</a>

----

### Visualization: Visual Variables

<div style="width:35%; float:left">
**[Visual variables](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-SimpleRenderer.html#visualVariables)**: used to create data-driven thematic visualizations
<ul>
 <li>size</li>
 <li>color</li>
 <li>opacity</li>
 <li>rotation</li>
</ul>
</div>
<div style="width:65%; float:right;">
<a href="Demos/part2-visualization/visualvariables.html" target="_blank"><img src="Images/demo/d2-vvs.png"></img></a>
</div>

----

### Visualization: Smart Mapping

[Smart Mapping APIs](https://developers.arcgis.com/javascript/latest/guide/visualization-overview/#smart-mapping-apis): generate renderers with "smart" default symbols based on the summary statistics of the dataset and the basemap

<a href="https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=visualization-sm-classbreaks" target="_blank"><img src="Images/smartmapping.png"></img></a>

----

### Visualization: Layer blending

`featureLayer.blendMode`: a method of blending layers together to create interesting effects or produce a seemingly new layer

<a href="Demos/part2-visualization/layerblend.html" target="_blank"><img src="Images/layer-blendmode.png"></img></a>

----

### Visualization: Clustering

**Clustering:** a method of reducing points by grouping them into clusters based on their spatial proximity to one another.

<a href="https://developers.arcgis.com/javascript/latest/sample-code/featurereduction-cluster/index.html" target="_blank"><img src="Images/clustering-horizontal.png" style="margin: 10px;"></img></a>

----

### Visualization: Highlight
<a href="https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=highlight-scenelayer" target="_blank"><img src="Images/highlight.png" style="float:right"></img></a>

<div style="width: 50%;">
  <ul>
    <li>Highlight features on the LayerView</li>
    <li>Maintain a handle to the current highlight</li>
    <li>Highlight options: color, opacity, halo</li>
  </ul>
</div>
</br>

 ```js
if (highlight){
  highlight.remove();
}
highlight = layerView.highlight(result.features);
```


----

### Visualization: Filtering

- Define the filter criteria
- Define the style for filtered features
- Apply the filter to the LayerView

<a href="Demos/part2-visualization/filter.html" target="_blank"><img src="Images/demo/d2-filtering.png"></img></a>

----

### Labeling

Label features to show relevant information at a glance.

----

### Labeling demos

----

### Querying

- Attribute queries
  - select only features passing a WHERE SQL clause
- Spatial queries
  - select only features passing a spatial filter
- Statistic queries
  - returns statistics about the selected features

----

### Server-side querying

Bring features from your data into the web browser.

<a href="Demos/part4-querying/serverside.html" target="_blank"><img src="Images/query.png" style="float:left; margin-right: 20px;"></img></a>

[Query features](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=featurelayer-query-basic)

```js
featureLayer.queryFeatures({
    geometry: point
}).then(function(featureSet){
    // do something with the results
});
```

[Query attachments](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=query-attachments)

```js
featureLayer.queryAttachments()
```

[Query related features](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=query-related-features)

```js
featureLayer.queryRelatedFeatures()
```

----

### Client-side querying

Query data already in the web browser.
`featureLayerView.queryFeatures()`

- Really fast
- Avoids round-trips to the server
- Only works with available features
- Make sure you have all the attributes you need

<a href="Demos/part4-querying/clientside-hover.html" target="_blank">Demo</a>

----

### Querying statistics

<a href="https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=featurelayerview-query-geometry" target="_blank"><img src="Images/demo/d4-query-stats.png"></img></a>

----

### Editing

Updating features directly from the web browser.

How do I know if I can edit features?

- Rest supported operations
- ArcGIS Online/Portal settings
- ArcGIS Server manager
- FeatureLayer.capabilities

----

### Editing

- FeatureLayer.applyEdits()
- Editor widget
- FeatureTable widget

----

### Editing demos

----

### 2020 DevSummit Technical Sessions

![DevSummit sessions blog](Images/devsummit-blog.png)

28 videos focused on developing with the JS API!
<a href="https://esriurl.com/ds2020jsblog"><code>https://esriurl.com/ds2020jsblog<code></a>

----
<!-- .slide: data-background="../reveal.js/img/bg-5.png" -->