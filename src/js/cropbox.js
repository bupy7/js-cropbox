var Cropbox = (function(window, document){
    "use strict";

    // const
    var VERSION = '0.9.0',
        EVENT_MOUSE_DOWN = 'mousedown',
        EVENT_MOUSE_MOVE = 'mousemove',
        EVENT_MOUSE_UP = 'mouseup',
        EVENT_RESIZE = 'resize',
        EVENT_LOAD = 'load',
        EVENT_CB_CROPPED = 'cb.cropped',
        EVENT_CB_RESET = 'cb.reset',
        EVENT_CB_DISABLED_CTRLS = 'cb.disabledCtrls',
        EVENT_CB_ENABLED_CTRLS = 'cb.enabledCtrls',
        EVENT_CB_LOADED = 'cb.loaded';

    var publicMethods = {
        zoomIn: function(){
            this._ratio *= 1.01;
            var width = this._sourceImage.width * this._ratio,
                height = this._sourceImage.height * this._ratio;
            this._zoom(width, height);
            this._refrashPosFrame(this._frame.offsetLeft, this._frame.offsetTop);
        },
        zoomOut: function(){
            var oldRatio = this._ratio;
            this._ratio *= 0.99;
            var width = this._sourceImage.width * this._ratio,
                height = this._sourceImage.height * this._ratio;
            if (width >= this._frame.clientWidth && height >= this._frame.clientHeight) {
                this._zoom(width, height);
                this._refrashPosFrame(this._frame.offsetLeft, this._frame.offsetTop);
            } else {
                this._ratio = oldRatio;
            }
        },
        /**
         * @param {String} src
         */
        load: function(src){
            this._sourceImage.src = src;
        },
        reset: function(){
            this._clearData();
            this._resetVariant();
            this._hideWorkarea();
            this._disableControls();
            this._trigger(EVENT_CB_RESET);
        },
        crop: function(){
            var x = this._frame.offsetLeft - this._image.offsetLeft,
                y = this._frame.offsetTop - this._image.offsetTop,
                frameWidth = this._frame.clientWidth,
                frameHeight = this._frame.clientHeight,
                canvas = document.createElement('canvas');
            canvas.width = frameWidth;
            canvas.height = frameHeight;
            canvas
                .getContext('2d')
                .drawImage(
                    this._image,
                    0,
                    0,
                    this._sourceImage.width,
                    this._sourceImage.height,
                    -x,
                    -y,
                    this._image.clientWidth,
                    this._image.clientHeight
                    );
            var data = {
                sWidth: this._sourceImage.width,
                sHeight: this._sourceImage.height,
                x: x,
                y: y,
                dWidth: this._image.clientWidth,
                dHeight: this._image.clientHeight,
                ratio: this._ratio,
                width: frameWidth,
                height: frameHeight,
                image: canvas.toDataURL('image/png')
            };
            this._trigger(EVENT_CB_CROPPED, {data: data});
        },
        /**
         * @returns {Array}
         */
        getData: function(){
            return this._data;
        },
        /**
         * @returns {HtmlElement}
         */
        getCb: function(){
            return this._cb;
        },
        /**
         * @returns {HtmlElement}
         */
        getMembrane: function(){
            return this._membrane;
        },
        /**
         * @returns {HtmlElement}
         */
        getImage: function(){
            return this._image;
        },
        /**
         * @returns {HtmlElement}
         */
        getFrame: function(){
            return this._frame;
        },
        /**
         * @returns {HtmlElement}
         */
        getWorkarea: function(){
            return this._workarea;
        },
        /**
         * @returns {HtmlElement}
         */
        getResize: function(){
            return this._resize;
        },
        /**
         * @returns {String}
         */
        getVersion: function() {
            return VERSION;
        }
    };
    var protectedMethods = {
        /**
         * @param {Object} o
         */
        _configurate: function(o){
            /**
             * @type {Object}
             */
            this.dO = {
                variants: [
                    {
                        width: 200,
                        height: 200,
                        minWidth: 200,
                        minHeight: 200,
                        maxWidth: 350,
                        maxHeight: 350
                    }
                ]
            };
            /**
             * @type {HTMLElement}
             */
            this._cb = null;
            /**
             * @type {Array}
             */
            this._data = [];
            /**
             * @type {HTMLElement}
             */
            this._frame = null;
            /**
             * @type {HTMLElement}
             */
            this._image = null;
            /**
             * @type {HTMLElement}
             */
            this._workarea = null;
            /**
             * @type {HTMLElement}
             */
            this._membrane = null;
            /**
             * @type {HTMLElement}
             */
            this._resize = null;
            /**
             * @type {Object}
             */
            this._frameState = {};
            /**
             * @type {Object}
             */
            this._imageState = {};
            /**
             * @type {Object}
             */
            this._resizeState = {};
            /**
             * @type {Image}
             */
            this._sourceImage = new Image();
            /**
             * @type {float}
             */
            this._ratio = 1;
            /**
             * @type {Array}
             */
            this._variants = [];
            /**
             * @type {integer}
             */
            this._indexVariant = 0;
            /**
             * @type {Boolean}
             */
            this._disabledControls = false;

            // init
            this._cb = typeof o.cb == 'string' ? document.querySelector(o.cb) : o.cb;
            this._variants = o.variants || this.dO.variants;
            this._image = this._cb.querySelector('.image-cropbox');
            this._frame = this._cb.querySelector('.frame-cropbox');
            this._workarea = this._cb.querySelector('.workarea-cropbox');
            this._membrane = this._cb.querySelector('.membrane-cropbox');
            this._resize = this._cb.querySelector('.resize-cropbox');
        },
        _initEvents: function(){
            // move frame
            this._attachFrameMouseDownEvent();
            this._attachFrameMouseMoveEvent();
            this._attachFrameMouseUpEvent();
            // resize frame
            this._attachResizeMouseDownEvent();
            this._attachResizeMouseMoveEvent();
            this._attachResizeMouseUpEvent();
            // move image
            this._attachImageMouseDownEvent();
            this._attachImageMouseMoveEvent();
            this._attachImageMouseUpEvent();
            // workarea resize
            this._attachResizeWorkareaEvent();
            // load image
            this._attachLoadEvent();
            // image cropped
            this._attachCroppedEvent();
        },
        _initFrame: function(){
            var variant = this._getCurrentVariant(),
                left = this._workarea.clientWidth / 2 - variant.width / 2,
                top = this._workarea.clientHeight / 2 - variant.height / 2;
            this._frame.style.width = variant.width + 'px';
            this._frame.style.height = variant.height + 'px';
            this._frame.style.backgroundImage = 'url("' + this._sourceImage.src + '")';
            this._refrashPosFrame(left, top);
        },
        _initImage: function(){
            var left = this._image.clientWidth / 2 - this._workarea.clientWidth / 2,
                top = this._image.clientHeight / 2 - this._workarea.clientHeight / 2;
            this._refrashPosImage(-left, -top);
        },
        _initRatio: function(){
            var variant = this._getCurrentVariant(),
                wRatio = variant.width / this._sourceImage.width,
                hRatio = variant.height / this._sourceImage.height;
            if (wRatio > hRatio) {
                this._ratio = wRatio;
            } else {
                this._ratio = hRatio;
            }
            this._zoom(this._sourceImage.width * this._ratio, this._sourceImage.height * this._ratio);
        },
        /**
         * @param {number} left
         * @param {number} top
         */
        _refrashPosFrame: function(left, top){
            var imgLeft = this._image.offsetLeft,
                imgTop = this._image.offsetTop,
                x = imgLeft - left,
                y = imgTop - top;
            if (x > 0) {
                x = 0;
                left = imgLeft;
            } else if (this._image.clientWidth + imgLeft < left + this._frame.clientWidth) {
                x = this._frame.clientWidth - this._image.clientWidth;
                left = imgLeft + this._image.clientWidth - this._frame.clientWidth;
            }
            if (y > 0) {
                y = 0;
                top = imgTop;
            } else if (this._image.clientHeight + imgTop < top + this._frame.clientHeight) {
                y = this._frame.clientHeight - this._image.clientHeight;
                top = imgTop + this._image.clientHeight - this._frame.clientHeight;
            }
            this._frame.style.left = left + 'px';
            this._frame.style.top = top + 'px';
            this._frame.style.backgroundPosition = x + 'px ' + y + 'px';
        },
        /**
         * @param {number} width
         * @param {number} height
         */
        _refrashSizeFrame: function(width, height){
            var imgLeft = this._image.offsetLeft,
                imgTop = this._image.offsetTop,
                frameLeft = this._frame.offsetLeft,
                frameTop = this._frame.offsetTop,
                frameWidth = this._frame.clientWidth,
                frameHeight = this._frame.clientHeight,
                variant = this._getCurrentVariant(),
                maxWidth = variant.maxWidth,
                maxHeight = variant.maxHeight,
                minWidth = variant.minWidth,
                minHeight = variant.minHeight;
            // set max width and min width
            if (width > frameWidth && typeof maxWidth == 'undefined') {
                maxWidth = frameWidth;
            } else if (width < frameWidth && typeof minWidth == 'undefined') {
                minWidth = frameWidth;
            }
            if (height > frameHeight && typeof maxHeight == 'undefined') {
                maxHeight = frameHeight;
            } else if (height < frameHeight && typeof minHeight == 'undefined') {
                minHeight = frameHeight;
            }
            // check max and min width
            if (width > maxWidth) {
                width = maxWidth;
            } else if (width < minWidth) {
                width = minWidth;
            }
            if (this._image.clientWidth + imgLeft < frameLeft + width) {
                width = this._image.clientWidth + imgLeft - frameLeft;
            }
            // check max and min height
            if (height > maxHeight) {
                height = maxHeight;
            } else if (height < minHeight) {
                height = minHeight;
            }
            if (this._image.clientHeight + imgTop < frameTop + height) {
                height = this._image.clientHeight + imgTop - frameTop;
            }
            this._frame.style.width = width + 'px';
            this._frame.style.height = height + 'px';
        },
        /**
         * @param {number} left
         * @param {number} top
         */
        _refrashPosImage: function(left, top){
            this._image.style.left = left + 'px';
            this._image.style.top = top + 'px';
        },
        /**
         * @param {number} width
         * @param {number} height
         */
        _zoom: function(width, height){
            this._image.style.width = width + 'px';
            this._image.style.height = height + 'px';
            this._frame.style.backgroundSize = width + 'px ' + height + 'px';
        },
        _showWorkarea: function(){
            this._workarea.style.display = 'block';
        },
        _hideWorkarea: function(){
            this._workarea.style.display = 'none';
        },
        _resetVariant: function(){
            this._indexVariant = 0;
        },
        _getCurrentVariant: function(){
            return this._variants[this._indexVariant];
        },
        _nextVariant: function(){
            if (this._variants.length <= this._indexVariant + 1) {
                this._indexVariant = 0;
                this._stop();
            }
            ++this._indexVariant;
            this._initRatio();
            this._initImage();
            this._initFrame();
        },
        _clearData: function(){
            this._data = [];
        },
        /**
         * @param {Object} data
         */
        _addData: function(data){
            this._data.push(data);
        },
        _start: function(){
            this._enableControls();
            this._clearData();
            this._resetVariant();
            this._showWorkarea();
            this._initRatio();
            this._initImage();
            this._initFrame();
        },
        _stop: function(){
            this._disableControls();
            this._hideWorkarea();
        },
        _disableControls: function(){
            this._disabledControls = true;
            this._trigger(EVENT_CB_DISABLED_CTRLS);
        },
        _enableControls: function(){
            this._disabledControls = false;
            this._trigger(EVENT_CB_ENABLED_CTRLS);
        },
        _trigger: function(name, data){
            var event = null;
            if (window.CustomEvent) {
                event = new CustomEvent(name, {detail: data});
            } else {
                event = document.createEvent('CustomEvent');
                event.initCustomEvent(name, true, true, data);
            }
            this._cb.dispatchEvent(event);
        }
    };
    var events = {
        _attachLoadEvent: function(){
            var self = this;
            this._sourceImage.addEventListener(EVENT_LOAD, function(){
                self._image.addEventListener(EVENT_LOAD, function(){
                    self._start();
                });
                self._image.src = this.src;
                self._trigger(EVENT_CB_LOADED);
            });
        },
        _attachFrameMouseDownEvent: function(){
            var self = this;
            this._frame.addEventListener(EVENT_MOUSE_DOWN, function(event){
                self._frameState.dragable = true;
                self._frameState.mouseX = event.clientX;
                self._frameState.mouseY = event.clientY;
            });
        },
        _attachFrameMouseMoveEvent: function(){
            var self = this;
            this._frame.addEventListener(EVENT_MOUSE_MOVE, function(event){
                if (self._frameState.dragable) {
                    var leftOld = self._frame.offsetLeft,
                        topOld = self._frame.offsetTop,
                        left = event.clientX - self._frameState.mouseX + leftOld,
                        top = event.clientY - self._frameState.mouseY + topOld;
                    self._frameState.mouseX = event.clientX;
                    self._frameState.mouseY = event.clientY;
                    self._refrashPosFrame(left, top);
                }
            });
        },
        _attachFrameMouseUpEvent: function(){
            var self = this;
            document.addEventListener(EVENT_MOUSE_UP, function(event){
                event.preventDefault();
                event.stopPropagation();
                self._frameState.dragable = false;
            });
        },
        _attachResizeMouseDownEvent: function(){
            var self = this;
            this._resize.addEventListener(EVENT_MOUSE_DOWN, function(event){
                event.stopImmediatePropagation();
                self._resizeState.dragable = true;
                self._resizeState.mouseX = event.clientX;
                self._resizeState.mouseY = event.clientY;
            });
        },
        _attachResizeMouseMoveEvent: function(){
            var self = this;
            document.addEventListener(EVENT_MOUSE_MOVE, function(event){
                if (self._resizeState.dragable) {
                    var widthOld = self._frame.clientWidth,
                        heightOld = self._frame.clientHeight,
                        width = event.clientX - self._resizeState.mouseX + widthOld,
                        height = event.clientY - self._resizeState.mouseY + heightOld;
                    self._resizeState.mouseX = event.clientX;
                    self._resizeState.mouseY = event.clientY;
                    self._refrashSizeFrame(width, height);
                }
            });
        },
        _attachResizeMouseUpEvent: function(){
            var self = this;
            document.addEventListener(EVENT_MOUSE_UP, function(event){
                event.preventDefault();
                event.stopPropagation();
                self._resizeState.dragable = false;
            });
        },
        _attachImageMouseDownEvent: function(){
            var self = this;
            this._membrane.addEventListener(EVENT_MOUSE_DOWN, function(event){
                self._imageState.dragable = true;
                self._imageState.mouseX = event.clientX;
                self._imageState.mouseY = event.clientY;
            });
        },
        _attachImageMouseMoveEvent: function(){
            var self = this;
            this._membrane.addEventListener(EVENT_MOUSE_MOVE, function(event){
                if (self._imageState.dragable) {
                    var leftOld = getComputedStyle(self._image).left,
                        topOld = getComputedStyle(self._image).top,
                        left = event.clientX - self._imageState.mouseX + parseFloat(leftOld),
                        top = event.clientY - self._imageState.mouseY + parseFloat(topOld);
                    self._imageState.mouseX = event.clientX;
                    self._imageState.mouseY = event.clientY;
                    self._refrashPosImage(left, top);

                    self._frameState.mouseX = event.clientX;
                    self._frameState.mouseY = event.clientY;
                    self._refrashPosFrame(
                        parseFloat(getComputedStyle(self._frame).left),
                        parseFloat(getComputedStyle(self._frame).top)
                    );
                }
            });
        },
        _attachImageMouseUpEvent: function(){
            var self = this;
            this._membrane.addEventListener(EVENT_MOUSE_UP, function(event){
                event.preventDefault();
                event.stopPropagation();
                self._imageState.dragable = false;
            });
        },
        _attachResizeWorkareaEvent: function(){
            var self = this;
            window.addEventListener(EVENT_RESIZE, function(){
                self._initRatio();
                self._initImage();
                self._initFrame();
            });
        },
        _attachCroppedEvent: function(){
            var self = this;
            this._cb.addEventListener(EVENT_CB_CROPPED, function(event){
                self._addData(event.detail.data);
                self._nextVariant();
            });
        }
    };

    /**
     * @param {HTMLElement|String|Object} cb
     * @param {Object} [o]
     * @returns {Cropbox}
     */
    function Cropbox(cb, o){
        if (typeof cb == 'object') {
            o = cb;
        } else {
            o = Object.assign(o || {}, {cb: cb});
        }
        this._configurate(o);
        this._initEvents();
    }

    Cropbox.prototype = Object.assign(Cropbox.prototype, publicMethods, protectedMethods, events);

    return Cropbox;
})(window, document);
