describe('#getFrame()', function() {
    it('should returns HTMLElement', function() {
        var cropbox = new Cropbox('#plugin');
        assert.equal(cropbox.getFrame(), document.querySelector('#plugin .frame-cropbox'));
    });
});
