before(function() {
    if (window.__html__) {
        document.body.innerHTML = window.__html__['tests/fixtures/body.html'];
    }
});
