function login() {
    var username = $("#login-username").val();
    var password = $("#login-password").val();
    if(username == ""){
        // demo.errorMsg('top','center','username');
        alert("username is empty");
        return false;
    }
    if(password == ""){
        // demo.errorMsg('top','center','password');
        alert("password is empty");
        return false;
    }

    $.post("/users", {

        username:username,
        password:password
    }).done(function(data) {
            if(data.status == "success"){
                window.location.href = "/dashboard"

            }else{
                alert("Either Username or password is incorrect");
                // demo.showNotificationDanger('top','center');
            }
    });
}