describe('onCbEnabledCtrls', function() {
    it('should trigger', function(done) {
        var cropbox = new Cropbox('#plugin');
        cropbox.getCb().addEventListener('cb:enabledCtrls', function() {
            done();
        });
        cropbox.load('assets/image.png');
    });
});
