describe('.getData()', function() {
    it('should get data', function(done) {
        var cropbox = new Cropbox('#plugin');
        cropbox.getCb().addEventListener('cb.loaded', function() {
            cropbox.crop();
        });
        cropbox.getCb().addEventListener('cb.cropped', function() {
            expect(cropbox.getData()).to.not.empty;
            done();
        });
        cropbox.load('assets/image.png');
    });
});
