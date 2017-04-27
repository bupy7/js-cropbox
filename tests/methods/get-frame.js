describe('#getFrame()', function() {
    it('should returns HTMLElement', function() {
        var cropbox = new Cropbox('#plugin');
        expect(cropbox.getFrame()).to.be.equal(document.querySelector('#plugin .frame-cropbox'));
    });
});
