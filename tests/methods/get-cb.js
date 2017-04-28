describe('#getCb()', function() {
    it('should returns HTMLElement', function() {
        var cropbox = new Cropbox('#plugin');
        expect(cropbox.getCb()).to.be.equal(document.querySelector('#plugin'));
    });
});
