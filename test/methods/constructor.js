describe('#constructor()', function() {
    it('should create new instance', function() {
        var cropbox = new Cropbox('#plugin');
        assert.instanceOf(cropbox, Cropbox);
    });
});
