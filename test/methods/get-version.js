describe('#getVersion()', function() {
    it('should returns a version', function() {
        var cropbox = new Cropbox('#plugin');
        assert.isString(cropbox.getVersion());
    });
});
