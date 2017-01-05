const phantom = require('phantom');


function valuePropositionCanvasToPdf (link, callback) {
    var pInstance = null;
    var pPage = null;
    phantom
    .create()
    .then(function (instance) {
        pInstance = instance;
        return instance.createPage();
    })
    .then(function (page) {
        pPage = page;
        // return pPage.property('zoomFactor', 0.1);

//            return pPage.property('viewportSize', {width: 1200, height: 900 });
//    }).then(function () {

        page.zoomFactor = 0.2;

                    return page.property('paperSize', {
                        width: '50cm',
                        height: '35cm',
                        orientation: 'landscape',
                        border: '1cm'
                    });
    }).then(function () {
        return pPage
        .open("http://localhost:8888/#/canvas/value-proposition/print/"+link);
    }).then(function () {
        setTimeout(function () {
            pPage.render("export.pdf");

            callback && callback(filename);
        }, 3000);
    });
}

module.exports = {
    valuePropositionCanvasToPdf: valuePropositionCanvasCtrl
}
