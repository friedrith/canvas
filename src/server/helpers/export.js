const phantom = require('phantom');
const path = require('path');
const fs = require('fs-extra');

const config = require('./../../../package.json').config;

var tmpDirPath = path.join(__dirname, '../../../', config.tmp);

fs.ensureDirSync(tmpDirPath);

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

        // page.zoomFactor = 0.2;

                    return page.property('paperSize', {
                        width: '50cm',
                        height: '35cm',
                        orientation: 'landscape',
                        border: '1cm'
                    });
    }).then(function () {
        return pPage
        .open("http://"+process.env.HOSTNAME+":"+process.env.PORT+"/#/canvas/value-proposition/print/"+link);
    }).then(function () {
        setTimeout(function () {

            var filename = path.join(tmpDirPath, 'export.pdf');

            pPage.render(filename);
            console.log('exporting '+link);

            callback && callback(filename);
        }, 3000);
    });
}

module.exports = {
    valuePropositionCanvasToPdf: valuePropositionCanvasToPdf
}
