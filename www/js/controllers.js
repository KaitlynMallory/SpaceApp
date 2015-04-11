/**
 * Created by Sandeep on 29/08/14.
 */
angular.module('com.htmlxprs.imageShare.controllers',[])

    .controller('HomeController',['$scope','$rootScope','USER','$state',function($scope,$rootScope,USER,$state){

        $rootScope.$on('event:file:selected',function(event,data){
            console.log("file passed to in home controller ");
            //console.log(data);
            //document.getElementById("pano").src = data.image;

            //console.log(data.image)

        });

        $scope.user={};
    $scope.next=function(){
        USER.name=$scope.user.name;
        $state.go('chat');
    }
}])
    .controller('ChatController',['$scope','$rootScope',function($scope,$rootScope){



}]);