describe('#load()', function() {
    it('should load the image', function(done) {
        var cropbox = new Cropbox('#plugin');
        cropbox.getCb().addEventListener('cb.loaded', function() {
            done();
        });
        cropbox.load('assets/image.png');
    });
});
