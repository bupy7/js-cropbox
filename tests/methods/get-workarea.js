describe('#getWorkarea()', function() {
    it('should returns HTMLElement', function() {
        var cropbox = new Cropbox('#plugin');
        expect(cropbox.getWorkarea()).to.be.equal(document.querySelector('#plugin .workarea-cropbox'));
    });
});
