import { url, ajax } from "./ajax.js"

const user_Id = localStorage.getItem("user_Id")
// console.log(user_Id)
if (!user_Id) {
    location.replace("login.html")
} 
$(document).ready(function () {
    // pushPosts()
    (async function pushPosts() {
        document.body.dataset.bsTheme = localStorage.getItem("mod") ||"dark";
        
        const data = await ajax("/api/v1/posts") || []
        const users = await ajax("/api/v1/users") || []
     
        console.log(data)
        let itemsProcessedPost = 0;
        let itemsProcessedUser = 0;
        users.forEach(async function(user){
            if(++itemsProcessedUser<5){
                
                const pathIsFollow =`/api/v1/users/follows/${user._id}/${user_Id}`
                const {isfollow} = await ajax(pathIsFollow)
                if(user._id!=user_Id){
    
                    createUserSuggestion(user,isfollow)
                }
            }
        })
     await data.forEach(async function (post) {
         
            const pathIsLove = `/api/v1/posts/loves/${post._id}/${user_Id}`
            const pathIsFollow =`/api/v1/users/follows/${post?.userId}/${user_Id}`
            const dataUser = await ajax(`/api/v1/users/${post?.userId}`)
            const {isLove} = await ajax(pathIsLove)
            const {isfollow} = await ajax(pathIsFollow)
            createPost(post,dataUser,isLove,isfollow)
            console.log(isLove) 
            itemsProcessedPost++
            console.log(itemsProcessedPost) 
            if(itemsProcessedPost==data.length){

                conroler()

            }

           
        })
         
    })()
    function conroler(){
        $("[data-islove]").each(function(){
                   
            $(this).on("click",async function(){
                 if($(this).attr("data-isLove")=="false"){
                     await ajax(`/api/v1/posts/loves/patch/${$(this).attr("data-id")}/${user_Id}`,false,"post")
                     $(this).addClass("text-danger")
                     $(this).attr("data-isLove","true")
                 }else{
                     await ajax(`/api/v1/posts/loves/delete/${$(this).attr("data-id")}/${user_Id}`,false,"post")
                     $(this).removeClass("text-danger")
                     $(this).attr("data-isLove","false")
                 }
                })
            if($(this).attr("data-isLove")!="false"){
                $(this).addClass("text-danger")
                
            }
        })

        $("[data-isfollow]").each(function(){
         $(this).on("click",async function(){
             if($(this).attr("data-isfollow")=="false"){
                await ajax(`/api/v1/users/follows/patch/${$(this).attr("data-id")}/${user_Id}`,false,"post")
              $(this).html("following")
                 
              $(`[data-id="${$(this).attr("data-id")}"]`).html("following")
              $(this).attr("data-isfollow","true")
             }else{
                 await ajax(`/api/v1/users/follows/delete/${$(this).attr("data-id")}/${user_Id}`,false,"post")
                 $(this).html("follow")
                 $(`[data-id="${$(this).attr("data-id")}"]`).html("follow")
                 $(this).attr("data-isfollow","false")
             }
            })
        if($(this).attr("data-isfollow")!="false"){
            $(this).html("following")
            
        }
        if($(this).attr("data-id")==user_Id){
            $(this).html("")
            
        }
        })
    }
    function createPost(post,user,isLove,isfollow,append=true) {
        console.log(post)
        const divPost = jQuery("<div>").html(`
    <h4 class="card-title">
        <article class="d-flex my-2 "><img
                src="${url}/api/v1/users/photo/${user?._id}"
                style="width:44px; height: 44px;" class="rounded-circle">
            <span style="font-size:14px;" class="ms-0 align-self-center">
                <p class=" mb-0  ms-1 text-center">${user?.userName}</p>
            </span> <button class="btn btn-link  "
                style="text-decoration: none;font-size: 12px;" data-isfollow="${isfollow}" data-id="${user?._id}">follow</button>
        </article>
    </h4>
    <img class=" card-img mb-3 " style=" min-height: 150px;" src="${url}/api/v1/posts/photo/${post?._id}">
        <div class="fs-5 d-flex justify-content-between"><div><i class="fa-regular fa-message"></i> <i class="fa-regular fa-heart " data-isLove="${isLove}" data-id="${post._id}" style="cursor: pointer;"></i> <i class="fa-regular fa-paper-plane"></i></div> <i class="fa-regular fa-bookmark"></i></div>
    <p class="card-text">${post?.caption}.</p>
`).addClass(" w-100 pb-3 mx-auto card border-top-0  border-start-0  border-end-0")
if(append){

    $("#postsSection").append(divPost)
}else{
    $("#postsSection").prepend(divPost)
}
    
    }
    function createUserSuggestion(user,isfollow){
       
        const divUser =  jQuery("<div>").html(`<article class="d-flex my-2 "><img
        src="${url}/api/v1/users/photo/${user?._id}"
        style="width:44px; height: 44px;" class="rounded-circle">
    <span style="font-size:14px;" class="ms-0 align-self-end w-50">
        <p class=" mb-0  ms-1">${user?.userName}</p>
        <p class="  text-muted mb-0 ms-1">${user?.userName}</p>
    </span> <button class="btn btn-link  "
        style="text-decoration: none;font-size: 12px;" data-isfollow="${isfollow}" data-id="${user?._id}">follow</button>
  </article>`)
   $("#userSuggestion").append(divUser)
    }


    // console.log(document.body.dataset.bsTheme)
    // imgUserFun()
    // async function imgUserFun(){
    //   const imgUser = ajax()

    $("#imgProfile").attr("src", `${url}/api/v1/users/photo/${user_Id}`);
    // }

    $("#sideBar button").addClass("btn text-start fs-5  shadow-none my-1 d-flex flex-row icon-btn")
    $("#sideBar button span").addClass("d-lg-block d-none ms-5 ")
    $("#sideBar button i").addClass("fs-4 position-absolute float-start")
    $("#sideBar button img").addClass("position-absolute  float-start")
    $("#sideBar button").hover((ev) => {
        // console.log(ev.currentTarget.childNodes[0])
        $(ev.currentTarget).children()[0].classList.remove("fs-4")
        $(ev.currentTarget).children()[0].classList.add("fs-3")
    }, (ev) => {
        // console.log(ev.currentTarget.childNodes[0])
        $(ev.currentTarget).children()[0].classList.remove("fs-3")
        $(ev.currentTarget).children()[0].classList.add("fs-4")
    })
    $("#sideBar button").hover((ev) => {
        // console.log(ev.currentTarget.childNodes[0])

        // console.log($(ev.currentTarget).children("img"))
        $(ev.currentTarget).children("img").addClass("img-icon-hover")
    }, (ev) => {
        $(ev.currentTarget).children("img").removeClass("img-icon-hover")
    })
    // const icon = [

    //     "./icons/Create.svg", "https://images.pexels.com/photos/1557652/pexels-photo-1557652.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"]
    // const lightIcon = [

    //     "./icons/lightCreate.svg", "https://images.pexels.com/photos/1557652/pexels-photo-1557652.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"]
    $("#mod,#modNav").click(function () {
        document.body.dataset.bsTheme = document.body.dataset.bsTheme == "dark" ? "light" : "dark";
        localStorage.setItem("mod",document.body.dataset.bsTheme)
        // switchModColoer(document.body.dataset.bsTheme)

    })
    // switchModColoer(document.body.dataset.bsTheme)
    // function switchModColoer(modColoer) {

    //     switch (modColoer) {
    //         case "light":
    //             // $("#sideBar button img").each((i, ele) => {

    //             //     ele.setAttribute("src", lightIcon[i])
    //             // })
    //             break;

    //         case "dark":
    //             // $("#sideBar button img").each((i, ele) => {

    //             //     ele.setAttribute("src", icon[i])
    //             // })
    //             break;

    //         default:
    //             break;
    //     }
    // }
   
    $("#bgAdd").click(function (ele) { $("#bgAdd").removeClass("d-block").addClass("d-none") })
    $("#buttonCreate,#buttonCreateFooter").click(function () { $("#bgAdd").removeClass("d-none").addClass("d-block") })

    $("#formAddPost").on("click", async function (event) {
        // event.preventDefault()
        event.stopPropagation()
    })
    $("#formAddPost").on("submit", async function (event) {
        console.log("spmet")
        event.preventDefault()
        event.stopPropagation()
        console.log(this.checkValidity())
        this.classList.remove('was-validated')
        if (this.checkValidity()) {
            $("#submitAdd").html(`<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>Loading...
            `).prop('disabled', true);
            const data = new FormData()
            data.append("userId", user_Id)
            data.append("caption", $("#formAddControlTextarea1").val())
            //     data.append("password",$("#Password").val())
            data.append("imgPost", $("#formFileSm").prop('files')[0])
            const newPostData = await ajax("/api/v1/posts", data)
            const dataUser = await ajax(`/api/v1/users/${user_Id}`)
            console.log(newPostData)
            createPost(newPostData,dataUser,false,false,false)
            //  localStorage.setItem("user_Id",newUserData._id)
            conroler()
            // console.log($("#formFileSm").prop('files')[0])
            // console.log(newPostData)
            $("#submitAdd").html(`login`).prop('disabled', false);
            $("#bgAdd").removeClass("d-block").addClass("d-none")
            $("#formAddControlTextarea1").val("")
            $("#formFileSm").val('')
            
        }else{

            this.classList.add('was-validated')
        }
        
        
    })

    
})
