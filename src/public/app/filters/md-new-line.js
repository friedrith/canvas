app.filter('mdNewLine', function () {
    return function (input) {
        if (input) {
            var result = input.replace(/\n/g, '  \n');
            return result;
        } else {
            return input;
        }

        // console.log(input, input.indexOf('\n'), result);

    };
});
