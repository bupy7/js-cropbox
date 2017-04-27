describe('#load()', function() {
    it('should load the image', function(done) {
        var cropbox = new Cropbox('#plugin'),
            oImg = document.createElement('img');
        oImg.onload = function() {
            cropbox.getCb().addEventListener('cb.loaded', function() {
                expect(cropbox.getImage()).to.be.equalImage(oImg);
                done();
            });
            cropbox.load(oImg.src);
        };
        oImg.src = 'assets/image.png';
    });
});
