$(document).ready(function()


{  

    
    $("button").on("click", function (event){
  event.preventDefault();
  event.stopPropagation();
 var user_name = $("input[name='user_name']").val();
   

    $.get("/api/user_name/"+ user_name,(res)=>{
       

        if(res.taken =="true"){
            alert("user name is taken");
        
        }
        else{
            alert("user name is available");
            // $.post("/api/user", form,(res)=> alert("user profile created"));
        }
    });
});
});