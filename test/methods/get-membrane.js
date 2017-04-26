describe('#getMembrane()', function() {
    it('should returns HTMLElement', function() {
        var cropbox = new Cropbox('#plugin');
        assert.equal(cropbox.getMembrane(), document.querySelector('#plugin .membrane-cropbox'));
    });
});
