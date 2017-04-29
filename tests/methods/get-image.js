describe('.getImage()', function() {
    it('should returns Image', function() {
        var cropbox = new Cropbox('#plugin');
        expect(cropbox.getImage()).to.be.equal(document.querySelector('#plugin img'));
    });
});
