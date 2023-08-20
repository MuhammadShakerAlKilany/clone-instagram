import {ajax} from "./ajax.js"
$("form").on("submit", async function (event) {
    event.preventDefault()
    event.stopPropagation()
    // console.log(this.checkValidity())
    if(!this.checkValidity()){
            this.classList.add('was-validated')
            $("#formMs").html("")
    }else if(this.checkValidity()){
        $("#submitButton").html(`<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>Loading...
        `).prop('disabled', true);
        $("#formMs").html("")
        this.classList.remove('was-validated')
                const data = new FormData()
            //     data.append("userName",$("#userName").val())
                data.append("email",$("#email").val())
                data.append("password",$("#Password").val())
            
             const userData =  await ajax("/api/v1/users/login",data)
             console.log(userData)
             if(userData._id){
                localStorage.setItem("user_Id",userData._id)
                location.replace("home.html")
             }else{
                $("#submitButton").html(`login`).prop('disabled', false);
                $("#formMs").html("Email or Password is rong")
             }
            
             

    }

        // console.log($("#formFile").prop('files')[0])
        // console.log(newUserData)
      
    
})