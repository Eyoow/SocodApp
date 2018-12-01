const fields = [
    {type:"text", isRequired:true, name:"name", placeholder:"firstname lastname", label:"Name"},
    {type:"text", isRequired:true, name:"user_name", placeholder:"socodlover", label:"Username"},
    {type:"text", isRequired:true, name:"street_address", placeholder:"123 main st", label:"Address"},
    {type:"number", isRequired:true, name:"zipcode", placeholder:"12345",label:"Zipcode"},
    {type:"date", isRequired:true, name:"birthdate", placeholder:"mm/dd/yyyy", label:"DOB"},
    {type:"radio", isRequired:false, name:"male", value:"true", label:"M"},
    {type:"radio", isRequired:false, name:"female", value:"true",label:"F"},
    // {type:"password", isRequired:true, name:"password", placeholder:"muhamadisthebest", label:"Password:"},
    {type: "email", isRequired:true, name:"email", placeholder:"socod@gmail.com",label:"Email"},
    // {type:"url", isRequired:true, name:"picture", placeholder:"http://mypic.com",label:"Picture:"},
    {type:"checkbox", isRequired:false, name:"isrider",value:"true",label:"Rider"},
    {type:"checkbox", isRequired:false, name:"isdriver",value:"true",label:"Driver"}
    
    ];

module.exports = fields;

