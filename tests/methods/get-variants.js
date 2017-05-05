describe('.getVariants()', function() {
    it('should returns array', function() {
        var variants = [{
                width: 100,
                height: 110
            }, {
                width: 200,
                height: 250
            }],
            cropbox = new Cropbox('#plugin', {
                variants: variants
            });
        expect(cropbox.getVariants()).to.deep.equal(variants);
    });
});
