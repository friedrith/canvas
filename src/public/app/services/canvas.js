app.factory('canvas', function ($rootScope, $timeout) {

    var segment = {
        name: 'Customer segment name',
        job: '',
        gains: '',
        pains: ''
    };

    var valueProposition = {
        product: '',
        gainCreators: '',
        painRelievers: ''
    };

    return {
        segment: segment,
        valueProposition: valueProposition,
        init: function () {
            segment.name = '';
            segment.job = '';
            segment.gains = '';
            segment.pains = '';
            valueProposition.product = '';
            valueProposition.gainCreators = '';
            valueProposition.painRelievers = '';
        },
        set: function (newValue) {
            segment.name = newValue.segment.name;
            segment.job = newValue.segment.job;
            segment.gains = newValue.segment.gains;
            segment.pains = newValue.segment.pains;
            valueProposition.product = newValue.valueProposition.product;
            valueProposition.gainCreators = newValue.valueProposition.gainCreators;
            valueProposition.painRelievers = newValue.valueProposition.painRelievers;
        },
        serialize: function  () {
            return JSON.stringify({
                segment: segment,
                valueProposition: valueProposition
            });
        }
    };
});
