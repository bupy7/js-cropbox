describe('#getResize()', function() {
    it('should returns HTMLElement', function() {
        var cropbox = new Cropbox('#plugin');
        assert.equal(cropbox.getResize(), document.querySelector('#plugin .resize-cropbox'));
    });
});
