app.directive("canvasBusinessModel", function(user) {
  return {
    restrict: "E",
    replace: true,
    transclude: true,
    templateUrl: '/app/components/canvas/canvas-business-model/canvas-business-model.html',
    link: function(scope, element, attrs, ngModel) {

        scope.showPartnersEditor = false;
        scope.showActivitiesEditor = false;
        scope.showResourcesEditor = false;
        scope.showValuePropositionEditor = false;
        scope.showRelationshipsEditor = false;
        scope.showChannelsEditor = false;
        scope.showSegmentsEditor = false;
        scope.showCostsEditor = false;
        scope.showRevenuesEditor = false;

    }
  };
});
