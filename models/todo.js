


module.exports= (con,type)=>{
    return con.define('todo',{
        todo:type.TEXT,
        completed:{
            type:type.BOOLEAN,
            defaultValue:false
        },
        userId:{
            allowNull:false,
            type:type.INTEGER
        }
    })
}