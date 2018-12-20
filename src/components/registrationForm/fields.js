const fields = [
    {type:"text", require:"true", name:"name", placeholder:"firstname lastname", label:"Name"},
    {type:"text", require:"true", name:"user_name", placeholder:"socodlover", label:"Username"},
    {type:"text", require:"true", name:"street_address", placeholder:"123 main st", label:"Address"},
    {type:"number", require:"true", name:"zipcode", placeholder:"12345",label:"Zipcode"},
    {type:"date", require:"true", name:"birthdate", placeholder:"mm/dd/yyyy", label:"DOB"},
    {type:"checkbox", require:"false", name:"male", value:"M", label:"M"},
    {type:"checkbox", require:"false", name:"female", value:"F",label:"F"},
    // {type:"password", require:"true", name:"password", placeholder:"muhamadisthebest", label:"Password:"},
    {type: "email", require:"true", name:"email", placeholder:"socod@gmail.com",label:"Email"},
    // {type:"url", require:"true", name:"picture", placeholder:"http://mypic.com",label:"Picture:"},
    {type:"checkbox", require:"false", name:"isrider", value:true,label:"Rider"},
    {type:"checkbox", require:"false", name:"isdriver", value:true,label:"Driver"}
    
    ];

module.exports = fields;

