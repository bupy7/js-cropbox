describe('.constructor(cb, o)', function() {
    it('first argument is selector', function() {
        var cropbox = new Cropbox('#plugin');
        expect(cropbox).to.be.instanceOf(Cropbox);
    });
    /**
     * @since 0.10.0
     */
    it('arguments: the selector and options', function() {
        var variants = [{
                width: 150,
                height: 150
            }],
            cropbox = new Cropbox('#plugin', {
                variants: variants
            });
        expect(cropbox).to.be.instanceOf(Cropbox);
        expect(cropbox.getVariants()).to.deep.equal(variants);
    });
    /**
     * @since 0.10.0
     */
    it('first argument is HTMLElement', function() {
        var element = document.getElementById('plugin'),
            cropbox = new Cropbox(element);
        expect(cropbox).to.be.instanceOf(Cropbox);
    });
    /**
     * @since 0.10.0
     */
    it('first argument is HTMLElement and second argument is options', function() {
        var element = document.getElementById('plugin'),
            variants = [{
                width: 150,
                height: 150
            }],
            cropbox = new Cropbox(element, {
                variants: variants
            });
        expect(cropbox).to.be.instanceOf(Cropbox);
        expect(cropbox.getVariants()).to.deep.equal(variants);
    });
});
