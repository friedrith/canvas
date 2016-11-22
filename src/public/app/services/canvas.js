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

    var target = 'all';

    var empty = true;

    return {
        segment: segment,
        valueProposition: valueProposition,
        getTarget: function () {
            return target;
        },
        isEmpty: function () {
            return empty;
        },
        setTarget: function (newTarget) {
            target = newTarget;
        },
        init: function () {
            segment.name = '';
            segment.job = '';
            segment.gains = '';
            segment.pains = '';
            valueProposition.product = '';
            valueProposition.gainCreators = '';
            valueProposition.painRelievers = '';
            target = '';
            empty = true;
        },
        set: function (newValue) {
            segment.name = newValue.segment.name;
            segment.job = newValue.segment.job;
            segment.gains = newValue.segment.gains;
            segment.pains = newValue.segment.pains;
            valueProposition.product = newValue.valueProposition.product;
            valueProposition.gainCreators = newValue.valueProposition.gainCreators;
            valueProposition.painRelievers = newValue.valueProposition.painRelievers;
            target = newValue.target;
            empty = false;
        },
        serialize: function  () {
            return {
                segment: segment,
                valueProposition: valueProposition,
                target: target
            };
        }
    };
});
