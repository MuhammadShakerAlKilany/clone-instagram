import { ajax } from "./ajax.js"

$(document).ready(function() {

  $("a").attr("target", "_blank")
  const Passwords = $("#Password")


  $("#PasswordRepeat").on("change", function() {
    const isVal = $("#PasswordRepeat").val() == $("#Password").val()
    if (!isVal) {
      $("#PasswordRepeat").addClass("is-invalid")

    } else {
      $("#PasswordRepeat").removeClass("is-invalid")
    }
  })


  Passwords.on("change", function() {
    console.log("from passward")
    const isVal = $(this).val() == $("#userName").val()


    console.log(isVal)
    if (isVal) {
      Passwords.addClass("is-invalid")


    } else {
      Passwords.removeClass("is-invalid")
    }
  })
  $("form").on("submit", async function(event) {
    // $("#email").removeClass("is-invalid")
    event.preventDefault()
    event.stopPropagation()
    if (this.checkValidity()) {
      $("#submitButton").html(`<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>Loading...
        `).prop('disabled', true);
      this.classList.remove('was-validated')
      const data = new FormData()
      data.append("userName", $("#userName").val())
      data.append("email", $("#email").val())
      data.append("password", $("#Password").val())
      data.append("avatar", $("#formFile").prop('files')[0])
      try {

        const newUserData = await ajax("/api/v1/users", data, "post", true)
        $("#submitButton").html(`login`).prop('disabled', false);
        if (newUserData.ms == "email not accepted") {
          console.log(newUserData.ms == "email not accepted")
          $("#email").addClass("is-invalid")
        } else {

          localStorage.setItem("user_Id", newUserData._id)
          location.replace("home.html")
        }
        console.log(newUserData)
      } catch (err) {
        console.log(err)

      }
    } else {
      this.classList.add('was-validated')
    }



    // console.log($("#formFile").prop('files')[0])
    // console.log(newUserData)



  })
  $("#repeatPasswordEye i, #PasswordEye i").click(function() {
    $(this).toggleClass("fa-eye fa-eye-slash")
    console.log($(this).parent().siblings().children('input').attr("type", function(i, type) {

      type = type == "password" ? "text" : "password";
      return type

    }))
  })

})

