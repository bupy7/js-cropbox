js-cropbox
==========

A lightweight and simple js extension to crop your image.

[Demo](http://bupy7.github.io/js-cropbox/)

Install
-------

Via [NPM](https://www.npmjs.com/):

```
npm install js-cropbox
```

Usage
-----

**Include:**

```html
<link href="build/cropbox.min.css" rel="stylesheet">
<script type="text/javascript" src="build/cropbox.min.js"></script>
```

**Create the skeleton:**

```html
<div id="plugin">
    <div class="workarea-cropbox">
        <div class="bg-cropbox">
            <img class="image-cropbox">
            <div class="membrane-cropbox"></div>
        </div>
        <div class="frame-cropbox">
            <div class="resize-cropbox"></div>
        </div>
    </div>
</div>
<input id="file-input" type="file" accept="image/*">
<button id="btn-crop" type="button">Crop</button>
<button id="btn-reset" type="button">Reset</button>
<button id="btn-scale-out" type="button">-</button>
<button id="btn-scale-in" type="button">+</button>
<br>
<div id="cropped-container"></div>
<textarea id="cropped-data"></textarea>
```

**Configuration of plugin:**

```js
var cropbox = new Cropbox('#plugin', {
    variants: [
        {
            width: 200,
            height: 200,
            minWidth: 180,
            minHeight: 200,
            maxWidth: 350,
            maxHeight: 350
        },
        {
            width: 150,
            height: 200
        }
    ]
});
// scaling
var scaleInBtn = document.querySelector('#btn-scale-in');
scaleInBtn.addEventListener('click', function(){
    cropbox.scale(1.05);
});
var scaleOutBtn = document.querySelector('#btn-scale-out');
scaleOutBtn.addEventListener('click', function(){
    cropbox.scale(0.95);
});
cropbox.getMembrane().addEventListener('wheel', function(event){
    if (event.deltaY < 0) {
        cropbox.scale(1.01);
    } else {
        cropbox.scale(0.99);
    }
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
});
// image loading from a file
var fileInput = document.querySelector('#file-input');
fileInput.addEventListener('change', function(){
    var fileReader = new FileReader();
    fileReader.readAsDataURL(this.files[0]);
    fileReader.addEventListener('load', function(event){
        cropbox.load(event.target.result);
    });
});
// reset
var resetBtn = document.querySelector('#btn-reset');
resetBtn.addEventListener('click', function(){
    cropbox.reset();
});
// crop
var cropBtn = document.querySelector('#btn-crop');
cropBtn.addEventListener('click', function(){
    cropbox.crop();
});
// the cropped event
cropbox.getCb().addEventListener('cb.cropped', function(event){
    // add image to the container
    var img = document.createElement('img');
    img.src = event.detail.data.image;
    img.setAttribute('style', 'margin-right: 5px; margin-bottom: 5px');
    img.className = 'img-thumbnail';
    document.querySelector('#cropped-container').appendChild(img);
    // update inforamtion about crop
    document.querySelector('#cropped-data').value = JSON.stringify(cropbox.getData());
});
// the reset event
function resetHandler(){
    // clear the container
    document.querySelector('#cropped-container').innerHTML = '';
    // clear information about crop
    document.querySelector('#cropped-data').value = '';
};
cropbox.getCb().addEventListener('cb.reset', resetHandler);
// the loaded event
cropbox.getCb().addEventListener('cb.loaded', resetHandler);
// the disabled/enabled event
function disabledHandler(){
    scaleInBtn.setAttribute('disabled', 'disabled');
    scaleOutBtn.setAttribute('disabled', 'disabled');
    cropBtn.setAttribute('disabled', 'disabled');
};
disabledHandler();
cropbox.getCb().addEventListener('cb.disabledCtrls', disabledHandler);
cropbox.getCb().addEventListener('cb.enabledCtrls', function(){
    scaleInBtn.removeAttribute('disabled');
    scaleOutBtn.removeAttribute('disabled');
    cropBtn.removeAttribute('disabled');
});
```

Options
-------

### {String|HTMLElement} `cb`

The main html element of cropbox container.

You can set it option as first argument of the construct method of `Cropbox`
class or as option:

**As a first argument:**

```js
var cropbox = new Cropbox('#plugin');
```

**As an option:**

```js
var cropbox = new Cropbox({
    cb: '#plugin'
});
```

### {Object} `[variants]`

Variants of crop image. Supported a few crop settings.

By default variants content following settings:

```js
variants = [
    {
        width: 200,
        height: 200,
        minWidth: 200,
        minHeight: 200,
        maxWidth: 350,
        maxHeight: 350
    }
]
```

**Required:**
- `width` - Width of frame crop (px).
- `height`  - Height of frame crop (px).

**Optional:**
- `minWidth` - Minimal width of frame crop for resize it (px).
- `maxWidth` - Maximum width of frame crop for resize it (px).
- `minHeight` - Minimal height of frame crop for resize it (px).
- `maxHeight` - Maximum height of frame crop for resize it (px).

You can set both one options `max`(`min`)`Width`/`max`(`min`)`Height` and all
for resize frame crop.

Methods
-------

### `scale(step)`

Scale an image.

**Arguments:**

- {Number} `step`: Step number for scale an image.

### `load(src)`

Load an image for cropping.

**Arguments:**

- {String} `src`: Data URL or absolute URL to load an image.

### `reset()`

Reset the crop history.

### `crop()`

Crop an image.

### `getData()`

**Returns:**
An `Array` contain the cropped data where index is the index of variants of crop image.

### `getCb()`

**Returns:**
An `HTMLElement` the main cropbox element.

### `getMembrane()`

**Returns:**
An `HTMLElement` the membrane element.

### `getImage()`

**Returns:**
An `HTMLElement` the image element.

### `getFrame()`

**Returns:**
An `HTMLElement` the frame element.

### `getWorkarea()`

**Returns:**
An `HTMLElement` the workarea element.

### `getResize()`

**Returns:**
An `HTMLElement` the resize control element.

### `getVersion()`

**Returns:**
An `String` version cropbox.

Events
------

### `cb.cropped`

The event running after to crop an image.

In the event transfering property `data` containing data about a cropped image.
You can use it via `event` argument as `event.detail.data`.

**Example usage:**

```js
cropbox.getCb().addEventListener('cb.cropped', function(event){
    console.log(event.detail.data);
});
```

### `cb.reset`

The event running after to reset crop history.

### `cb.disabledCtrls`

The event running after to disable controls.

### `cb.enabledCtrls`

The event running after to enable controls.

### `cb.loaded`

The event running after to load an image.

License
-------

js-cropbox is released under the BSD 3-Clause License.
