
// ako zovemo module sa jednim argumentom, onda znači da na postojeći dodajemo novu direktivu
angular.module("customDirectives", ["customServices"])
.directive("triButton", function (logService) {
    return {
        scope: { counter: "=counter" },
        link: function (scope, element, attrs) {
            element.on("click", function (event) {
                logService.log("button click: " + event.target.innerText);
                scope.$apply(function () {
                    scope.counter++;
                });
            });
        }
    }
});