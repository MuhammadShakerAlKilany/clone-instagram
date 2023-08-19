import {ajax} from "./ajax.js"

$(document).ready(function () {
    
    $("a").attr("target", "_blank")
    const Passwords = $("#Password")


    $("#PasswordRepeat").on("change", function () {
        const isVal = $("#PasswordRepeat").val() == $("#Password").val()
        if (!isVal) {
            $("#PasswordRepeat").addClass("is-invalid")

        } else {
            $("#PasswordRepeat").removeClass("is-invalid")
        }
    })


    Passwords.on("change", function () {
        console.log("from passward")
        const isVal = $(this).val() == $("#userName").val()


        console.log(isVal)
        if (isVal) {
            Passwords.addClass("is-invalid")


        } else {
            Passwords.removeClass("is-invalid")
        }
    })
    $("form").on("submit", async function (event) {
        // $("#email").removeClass("is-invalid")
        event.preventDefault()
        event.stopPropagation()
        if(this.checkValidity()){
            const data = new FormData()
            data.append("userName",$("#userName").val())
            data.append("email",$("#email").val())
            data.append("password",$("#Password").val())
            data.append("avatar",$("#formFile").prop('files')[0])
            try{

                const newUserData =  await ajax("/api/v1/users",data,"post",true )
                console.log(newUserData.ms=="email not accepted")
                if(newUserData.ms=="email not accepted"){
                     $("#email").addClass("is-invalid")
                }
                console.log(newUserData)
                localStorage.setItem("user_Id",newUserData._id)
                location.replace("home.html")
            }catch(err){
                console.log(err)
                   
            }
        }

            

            // console.log($("#formFile").prop('files')[0])
            // console.log(newUserData)
          
        this.classList.add('was-validated')
    })
})

