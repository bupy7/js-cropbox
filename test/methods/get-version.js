describe('#getVersion()', function() {
    it('should returns a version', function() {
        var cropbox = new Cropbox('#plugin');
        expect(cropbox.getVersion()).to.be.a('string');
    });
});
