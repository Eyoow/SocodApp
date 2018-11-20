const fields = [
    {type:"text", isRequired:true, name:"name", placeholder:"firstname lastname", label:"Name:"},
    {type:"text", isRequired:true, name:"user_name", placeholder:"socodlover", label:"User name:"},
    {type:"text", isRequired:true, name:"street_address", placeholder:"123 main st", label:"Address:"},
    {type:"number", isRequired:true, name:"zipcode", placeholder:"12345",label:"Zipcode:"},
    {type:"date", isRequired:true, name:"birthdate", placeholder:"mm/dd/yyyy", label:"Birthdate:"},
    {type:"radio", isRequired:false, name:"male", label:"M"},
    {type:"radio", isRequired:false, name:"female", label:"F"},
    // {type:"password", isRequired:true, name:"password", placeholder:"muhamadisthebest", label:"Password:"},
    {type: "email", isRequired:true, name:"email", placeholder:"socod@gmail.com",label:"Email:"},
    // {type:"url", isRequired:true, name:"picture", placeholder:"http://mypic.com",label:"Picture:"},
    {type:"checkbox", isRequired:false, name:"isrider",label:"I am a rider"},
    {type:"checkbox", isRequired:false, name:"isdriver",label:"I am a driver"}
    
    ];

module.exports = fields;

