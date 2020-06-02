<!-- .slide: data-background="../reveal.js/img/bg-1.png" -->
<!-- .slide: class="title" -->
</br></br>
<h1 style="text-align: left; font-size: 80px;">Working with FeatureLayers in the ArcGIS API for JavaScript</h1>
<p style="text-align: left; font-size: 30px;">Bjorn Svensson and Anne Fitz</p>
<p style="text-align: left; font-size: 30px;">slides: <a href="https://git.io/Jfipd"><code>https://git.io/Jfipd<code></a></p>

----
<!-- .slide: data-background="../reveal.js/img/bg-3.png" -->
### Agenda

- Adding a FeatureLayer
- Rendering
- Labeling
- Querying
- Editing Features

----

### Adding a FeatureLayer to your map

**FeatureLayer sources**

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

Demo - I'm thinking we should show the demo of a normal feature layer and then apply a definition expression to show how the featurelayer changes

Restrict data retrieved from the feature service

- to work with a subset of features
- to remove features with null attributes.

```js
layer.definitionExpression = "STATE_NAME = 'California'";
```

----

### Rendering

A renderer defines how the FeatureLayer is drawn.

|[SimpleRenderer](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-SimpleRenderer.html)| [ClassBreaksRenderer](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-ClassBreaksRenderer.html)| [UniqueValueRenderer](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-UniqueValueRenderer.html) |
|----------|----------|----------|
| [![SimpleRenderer](Images/simple-renderer.png)](https://developers.arcgis.com/javascript/latest/sample-code/visualization-location-simple/index.html) | [![ClassBreaksRenderer](Images/classbreaks-renderer.png)](https://developers.arcgis.com/javascript/latest/sample-code/visualization-classbreaks/index.html) | [![UniqueValueRenderer](Images/uniquevalue-renderer.png)](https://developers.arcgis.com/javascript/latest/sample-code/visualization-location-types/index.html) |

| [HeatmapRenderer](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-HeatmapRenderer.html) | [DotDensityRenderer](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-DotDensityRenderer.html) | [DictionaryRenderer](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-DictionaryRenderer.html) |
|----------|----------|----------|
| [![HeatmapRenderer](Images/heatmap-renderer.png)](https://developers.arcgis.com/javascript/latest/sample-code/visualization-heatmap-scale/index.html) | [![DotDensityRenderer](Images/dotdensity-renderer.png)](https://developers.arcgis.com/javascript/latest/sample-code/visualization-dot-density/index.html) | [![DictionaryRenderer](Images/dictionary-renderer.png)](https://developers.arcgis.com/javascript/latest/sample-code/visualization-dictionary/index.html) |

----

### Rendering demos

----

### Labeling

----

### Labeling demos

----

### Server-side querying

----

### Client-side querying

----

### Querying demos

----

### Editing

----

### Editing demos

----