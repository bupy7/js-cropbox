describe('#constructor()', function() {
    it('should create new instance', function() {
        var cropbox = new Cropbox('#plugin');
        expect(cropbox).to.be.instanceOf(Cropbox);
    });
});
