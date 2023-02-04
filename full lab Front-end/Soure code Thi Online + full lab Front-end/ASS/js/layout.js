var app = angular.module("myapp", ["ngRoute"]);
app.config(function ($routeProvider) {
 $routeProvider
 .when("/view/home", {
    templateUrl: "subjects.html"
    })
    .when("/view/about", {
    templateUrl: "about.html"
    })
    .when("/view/contact", {
    templateUrl: "contact.html"
    })
    .when("/view/feedback", {
    templateUrl: "feedback.html"
    })
    .when("/view/faq", {
    templateUrl: "faq.html"
   })
   .when("/view/changepass", {
   templateUrl: "changepass.html"
   })
   .when("/view/updateinfo", {
   templateUrl: "updateinfo.html"
   })
.when("/view/quiz/:id/:name", {
templateUrl: "quiz.html",
controller: "quiz123"
})
.otherwise({
redirectTo: "/view/home"
});
});
app.controller("quiz123", function($scope, $http, $routeParams){
  $scope.quizId = $routeParams.id;
  $scope.quizName = $routeParams.name;
   $http.get("db/Quizs/"+$scope.quizId+".js").then(function(response){
       $scope.listQuizs = response.data;
       $scope.summark = ((Math.ceil($scope.listQuizs.length / 1) - 1) * 1);
     },function(response){
         alert("lỗi")
     }
     );
     // phân trang Quizz
     $scope.begin = 0;
     $scope.first = function(){
       $scope.begin = 0;
     }
     $scope.prev = function(){
       if($scope.begin > 0){
         $scope.begin -= 1;
       }

     }
     $scope.next = function(){
         $scope.begin += 1;

     }
     $scope.last = function(){
         $scope.begin = $scope.summark;
     }
    
    // kết thúc phân trang Quizz
 });
app.controller("myctrl", function($scope, $http){
    $scope.listMonHocs = [];
    $http.get("db/Subjects.js").then(function(response){
      $scope.listMonHocs = response.data;
      $scope.sum = ((Math.ceil($scope.listMonHocs.length / 8) - 1) * 8);
    });
    $scope.begin = 0;
  $scope.first = function(){
    $scope.begin = 0;
  }
  $scope.prev = function(){
    if($scope.begin > 0){
      $scope.begin -= 8;
    }
  }
  $scope.next = function(){
    if($scope.begin < $scope.sum){
      $scope.begin += 8;
    }
  }
  $scope.last = function(){
      $scope.begin = $scope.sum;
  }
        $scope.mark = 0;
        var checkTraLoi = $scope.traLoi = {checked: ""};
        $scope.subMit = function(){
            var a =  $("#cauTraLoi").val();
            var b =  $("#dapAn").val();
            if(parseInt(a) == parseInt(b)){
                Swal.fire(
                  'Chính xác!',
                  'Bạn trả lời đúng!',
                  'success'
                )
                $scope.mark = $scope.mark + 1;
            }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Không trùng khớp',
                  text: 'Bạn trả lời sai!' 
                })
            }
        }


        var indexS = localStorage.getItem('index'); //index Student Login
        $http.get("db/Students.js").then(function(response){
          $scope.students = response.data;
          $scope.student = angular.copy($scope.students[indexS]);
        });
        $scope.update = function(){
          $scope.students[indexS] = angular.copy($scope.student);
          localStorage.setItem('name', $scope.student.fullname);
         Swal.fire(
                  'Thành Công',
                  'Cập nhật thành công!',
                  'success'
         )
         console.log($scope.students[indexS]);
         console.log($scope.students);
        }
        if(indexS == null ){
                $scope.checkLogin = "TÀI KHOẢN";
                $scope.checkLogin1 = 0;
              }else {
                $scope.checkLogin = localStorage.getItem('name');
                $scope.checkLogin1 = 1;
        }
        $scope.logout = function(){
          localStorage.clear();
          location.replace("layout.html");
      }
      $scope.change = function(){
        console.log($scope.student.passwordHT);
          if($scope.students[indexS].password == $scope.student.passwordHT){
            if($scope.student.passwordCf == $scope.student.passwordNew){
              $scope.students[indexS].password = angular.copy($scope.student.passwordNew);
              Swal.fire(
                'Thành Công',
                'Đổi mật khẩu thành công!',
                'success'
              ) 
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Mật khẩu không trùng khớp',
                text: 'Mật khẩu mới và mật khẩu xác nhận phải trùng khớp!' 
              })
            }
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Không trùng khớp',
              text: 'Sai mật khẩu!' 
            })
          }

        
       console.log($scope.students);
      }
  });
  var upgradeTime = 600;
var seconds = upgradeTime;
function timer() {
  var days        = Math.floor(seconds/24/60/60);
  var hoursLeft   = Math.floor((seconds) - (days*86400));
  var hours       = Math.floor(hoursLeft/3600);
  var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
  var minutes     = Math.floor(minutesLeft/60);
  var remainingSeconds = seconds % 60;
  function pad(n) {
    return (n < 10 ? "0" + n : n);
  }
  document.getElementById('countdown').innerHTML =  pad(minutes) + ":" + pad(remainingSeconds);
  if (seconds == 0) {
    clearInterval(countdownTimer);
    document.getElementById('countdown').innerHTML = "Completed";
  } else {
    seconds--;
  }
}
var countdownTimer = setInterval('timer()', 1000);

  
  

