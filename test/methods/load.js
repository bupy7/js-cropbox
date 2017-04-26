describe('#load()', function() {
    it('should load the image', function(done) {
        var cropbox = new Cropbox('#plugin'),
            oImg = document.createElement('img');
        oImg.onload = function() {
            cropbox.getCb().addEventListener('cb.loaded', function() {
                var img1Data = getBase64Image(oImg),
                    img2Data = getBase64Image(cropbox.getImage());
                assert.equal(img1Data, img2Data);
                done();
            });
            cropbox.load(oImg.src);
        };
        oImg.src = 'assets/image.png';
    });
});
