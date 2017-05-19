describe('onCbDisabledCtrls', function() {
    it('should trigger', function(done) {
        var cropbox = new Cropbox('#plugin');
        cropbox.getCb().addEventListener('cb:disabledCtrls', function() {
            done();
        });
        cropbox.getCb().addEventListener('cb:ready', function() {
            cropbox.reset();
        });
        cropbox.load('assets/image.png');
    });
});
