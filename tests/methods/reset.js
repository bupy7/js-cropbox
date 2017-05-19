describe('.reset()', function() {
    it('should reset', function(done) {
        var cropbox = new Cropbox('#plugin');
        cropbox.getCb().addEventListener('cb:ready', function() {
            cropbox.crop();
        });
        cropbox.getCb().addEventListener('cb:cropped', function() {
            expect(cropbox.getData()).to.not.empty;
            cropbox.reset();
        });
        cropbox.getCb().addEventListener('cb:reset', function() {
            expect(cropbox.getData()).to.be.empty;
            done();
        });
        cropbox.load('assets/image.png');
    });
});
