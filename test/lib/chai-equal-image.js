chai.use(function(_chai, utils) {
    /**
     * @param {Image|String} expectedImg
     */
    _chai.Assertion.addMethod('equalImage', function(expectedImg) {
        function getBase64(img) {
            var dataUrl = null;
            if (typeof img === 'object') {
                var canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                dataUrl = canvas.toDataURL('image/png');
            } else {
                dataUrl = img;
            }
            return dataUrl.replace(/^data:image\/(png|jpg);base64,/, '');
        }
        var actualImg = utils.flag(this, 'object');
        new _chai.Assertion(getBase64(actualImg)).to.be.equal(getBase64(expectedImg));
    });
});
