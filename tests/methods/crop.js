describe('.crop()', function() {
    it('should crop', function(done) {
        var cropbox = new Cropbox('#plugin', {
                variants: [
                    {
                        width: 200,
                        height: 200,
                        minWidth: 200,
                        minHeight: 200,
                        maxWidth: 350,
                        maxHeight: 350
                    },
                    {
                        width: 150,
                        height: 200
                    }
                ]
            }),
            expectedData = [
                {
                    sWidth: 500,
                    sHeight: 361,
                    x: 38,
                    y: 0,
                    dWidth: 277,
                    dHeight: 200,
                    ratio: 0.554016620498615,
                    width: 200,
                    height: 200
                },
                {
                    sWidth: 500,
                    sHeight: 361,
                    x: 63,
                    y: 0,
                    dWidth: 277,
                    dHeight: 200,
                    ratio: 0.554016620498615,
                    width: 150,
                    height: 200
                }
            ],
            i = 0;
        cropbox.getCb().addEventListener('cb:ready', function() {
            cropbox.crop();
        });
        cropbox.getCb().addEventListener('cb:cropped', function(event) {
            var data = event.detail.data;
            // not test value
            delete data.image;
            expect(data).to.deep.equal(expectedData[i++]);
            if (i >= 2) {
                done();
            } else {
                cropbox.crop();
            }
        });
        cropbox.load('assets/image.png');
    });
});
