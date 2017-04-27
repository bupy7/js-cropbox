describe('#getMembrane()', function() {
    it('should returns HTMLElement', function() {
        var cropbox = new Cropbox('#plugin');
        expect(cropbox.getMembrane()).to.be.equal(document.querySelector('#plugin .membrane-cropbox'));
    });
});
