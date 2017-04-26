describe('#getWorkarea()', function() {
    it('should returns HTMLElement', function() {
        var cropbox = new Cropbox('#plugin');
        assert.equal(cropbox.getWorkarea(), document.querySelector('#plugin .workarea-cropbox'));
    });
});
