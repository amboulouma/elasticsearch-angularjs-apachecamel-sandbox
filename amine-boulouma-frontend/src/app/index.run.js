export function runBlock ($rootScope, deviceDetector, $state) {
  'ngInject';

    // Detecting browser
    var detectedBrowser = deviceDetector.browser;
    $rootScope.isChromeOrFirefox = detectedBrowser == 'chrome' || detectedBrowser == 'firefox';


    $rootScope.$on('$viewContentLoaded', function(event, a, b, c){
        console.log("Loading");
    });
}
