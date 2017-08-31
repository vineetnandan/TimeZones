var timeZoneApp = angular.module("timeZoneApp", []);

timeZoneApp.controller("ctrl", function($scope, $http, $timeout) {
  var timeZones;
  $scope.selectedTimeZoneValue = "";
  $scope.showSelectedTime = false;
  $scope.date = new Date();
  $http
    .get(
      "https://raw.githubusercontent.com/dmfilipenko/timezones.json/master/timezones.json"
    )
    .success(function(response) {
      $scope.timeZones = response;
    });

  function showTime() {
    var selectedZone = $scope.selectedTimeZoneValue;
    if($scope.selectedTimeZoneValue){
      showTimeZoneTime(selectedZone);
    }
    $timeout(showTime,1000);
  }

  $timeout(showTime,1000);

  var showTimeZoneTime = function(selectedZone){
    for (var i = 0; i < $scope.timeZones.length; i++) {
      if ($scope.timeZones[i].value == selectedZone.trim()) {
        var offset = $scope.timeZones[i].offset;
        var utctime = toUTCDate(new Date()).getTime();
        var localtimemillis = utctime + offset * 3600000;
        var d = new Date(localtimemillis);
        $scope.showdate = d.toLocaleString();
        $scope.showSelectedTime = true;
      }
    }
  }

  var toUTCDate = function(date) {
    var _utc = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
    $scope.dateToUTCDate = _utc;
    $scope.date = new Date();
    return _utc;
  };

  var dateToUTCDate = function() {
    var date = new Date();
    toUTCDate(date);
    $timeout(dateToUTCDate, 1000);
  };
  $timeout(dateToUTCDate, 1000);
});
