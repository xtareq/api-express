
// make username unique
module.exports= (con,type)=>{
    return con.define('user',{
        name:type.STRING,
        username:{
            allowNull:false,
            unique:true,
            type:type.STRING
        },
        password:type.STRING
    })
}