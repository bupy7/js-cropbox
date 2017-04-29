describe('.scale(step)', function() {
    it('should scale', function(done) {
        var cropbox = new Cropbox('#plugin', {
            variants: [
                {
                    width: 150,
                    height: 200
                }
            ]
        });
        cropbox.getCb().addEventListener('cb.loaded', function() {
            for (var i = 0; i !== 2; i++) {
                cropbox.scale(1.05);
            }
            cropbox.scale(0.95);
            cropbox.crop();
        });
        cropbox.getCb().addEventListener('cb.cropped', function(event) {
            var data = event.detail.data;
            // not test value
            delete data.image;
            var expectedData = {
                dHeight: 209,
                dWidth: 290,
                height: 200,
                ratio: 0.5802631578947369,
                sHeight: 361,
                sWidth: 500,
                width: 150,
                x: 63,
                y: 0
            };
            expect(data).to.deep.equal(expectedData);
            done();
        });
        cropbox.load('assets/image.png');
    });
});
