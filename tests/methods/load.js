describe('.load(src)', function() {
    it('should load the image', function(done) {
        var cropbox = new Cropbox('#plugin'),
            oImg = document.createElement('img');
        cropbox.getCb().addEventListener('cb:ready', function() {
            expect(cropbox.getImage()).to.be.equalImage(oImg);
            done();
        });
        oImg.onload = function() {
            cropbox.load(oImg.src);
        };
        oImg.src = 'assets/image.png';
    });
});
