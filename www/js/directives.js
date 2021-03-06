/**
 * Created by Sandeep on 29/08/14.
 */
angular.module('com.htmlxprs.imageShare.directives',[]).directive('browseFile',['$rootScope','USER','FIREBASE_REF',function($rootScope,USER,FIREBASE_REF){
    return {
        scope:{

        },
        replace:true,
        restrict:'AE',
        link:function(scope,elem,attrs){

            scope.browseFile=function(){
                document.getElementById('browseBtn').click();
            }

            angular.element(document.getElementById('browseBtn')).on('change',function(e){
            //BEGIN
            /*   var file=e.target.files[0];

               angular.element(document.getElementById('browseBtn')).val('');

               var fileReader=new FileReader();

               fileReader.onload=function(event){
                   $rootScope.$broadcast('event:file:selected',{image:event.target.result,sender:USER.name});
                   var f = new Firebase('https://testhosting123.firebaseio.com/'+ 'image/'  + '/filePayload');
                   var filePayload = event.target.result;
                   f.set(filePayload, function() {
                       console.log("uploaded");

                   });

               }

               fileReader.readAsDataURL(file); */
                //END
                var f = e.target.files[0];
                var reader = new FileReader();
                reader.onload = (function(theFile) {
                    return function(e) {
                        var filePayload = e.target.result;

                        // Generate a location that can't be guessed using the file's contents and a random number
                        var hash = CryptoJS.SHA256(Math.random() + CryptoJS.SHA256(filePayload));
                        firebaseRef='https://testhosting123.firebaseio.com/';
                        var f = new Firebase(firebaseRef + 'ruo/' + hash + '/filePayload');
                        //spinner.spin(document.getElementById('spin'));
                        // Set the file payload to Firebase and register an onComplete handler to stop the spinner and show the preview
                        f.set(filePayload, function() {
                            //spinner.stop();
                            //document.getElementById("pano").src = e.target.result;
                            //$('#file-upload').hide();
                            // Update the location bar so the URL can be shared with others
                           //window.location.hash = hash;
                            //window.location =f;
                            //console.log(window.location.hash);
                        });
                        f.on('value', function(snap) {

                            console.log("in onload");
                            var payload = snap.val();
                            console.log(payload);
                            if (payload != null) {
                                //document.getElementById("pano").src = payload;
                                $rootScope.$broadcast('event:file:selected',{image:payload,sender:USER.name});

                                //document.getElementById("pano2").src = payload;

                            } else {
                                console.log("failed");
                               // $('#body').append("Not found");
                            }
                            //spinner.stop();
                        });
                    };
                })(f);
                reader.readAsDataURL(f);
            });

        },
        templateUrl:'views/browse-file.html'
    }
}]).directive('chatList',['$rootScope','SOCKET_URL',function($rootScope,SOCKET_URL){
    return{
        replace:true,
        restrict:'AE',
        scope:{

        },
        link:function(scope,elem,attrs){

            var socket=io(SOCKET_URL);

            scope.messages=[];

            $rootScope.$on('event:file:selected',function(event,data){
                console.log(data);
                socket.emit('event:new:image',data);



                /*f.set({image: event.target.result}, function() {
                 console.log("saved in"+ FIREBASE_REF);
                 }); */

                scope.$apply(function(){
                    scope.messages.unshift(data);
                });

            });

            socket.on('event:incoming:image',function(data){

                scope.$apply(function(){
                    scope.messages.unshift(data);
                });

            });

        },
        templateUrl:'views/chat-list.html'
    }
}]);