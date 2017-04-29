describe('.getResize()', function() {
    it('should returns HTMLElement', function() {
        var cropbox = new Cropbox('#plugin');
        expect(cropbox.getResize()).to.be.equal(document.querySelector('#plugin .resize-cropbox'));
    });
});
