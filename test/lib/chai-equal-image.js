chai.use(function(_chai, utils) {
    /**
     * @param {Image} expectedImg
     */
    _chai.Assertion.addMethod('equalImage', function(expectedImg) {
        function getBase64(img) {
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL('image/png');
            return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
        }
        var actualImg = utils.flag(this, 'object');
        new _chai.Assertion(getBase64(actualImg)).to.be.equal(getBase64(expectedImg));
    });
});
