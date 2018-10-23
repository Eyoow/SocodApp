$(document).ready(function()

{   $("#register").on("submit", function (event){
  event.preventDefault();
  event.stopPropagation();
  var form = $(this);

    $.get("/api/user_name/"+ form.user_name,(res)=>{
        if(res.taken){
            alert("user name is taken");
            break;
        }
        else{
            $.post("/api/user", form,(res)=> alert("user profile created"));
        }
    });
});
});