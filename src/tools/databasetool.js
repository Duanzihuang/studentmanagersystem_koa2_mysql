var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "studentmanagersystem"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

/**
 * 查找一条记录
 * @param {*} tname 表名
 * @param {*} params 条件对象
 */
const findOne = (tname,params) => {
    // sql 语句
    let sql = `select * from ${tname} where `

    for(key in params){
        sql += `${key}="${params[key]}" and `
    }

    sql+= "101=101"

    return new Promise((resolve,reject)=>{
        connection.query(sql,(err,result)=>{
            if(err){
                reject(err)
                return
            }

            resolve(result)
        })
    })
}

/**
 * 插入一条记录
 * @param {*} tname 表名
 * @param {*} params 条件对象
 */
const insertOne = (tname,params) => {
    let sql = `insert into ${tname} (`
    for(key in params){
        sql+=`${key},`
    }
    sql = sql.substring(0,sql.length-1)

    sql+=' ) VALUES ( '
    for(key in params){
        sql+=`"${params[key]}",`
    }
    sql = sql.substring(0,sql.length-1)

    sql+=' )'
    
    return new Promise((resolve,reject)=>{
        connection.query(sql,(err,result)=>{
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

/**
 * 模糊查询列表
 * @param {*} tname 表名
 * @param {*} params 条件对象
 */
const findList =  (tname,params) => {
    let sql = `select * from ${tname}`

    if (params){
        sql+=' where '
    }

    for(const key in params){
        sql += `${key} like '%${params[key]}%' and` 
    }

    if (params){
        sql+= ' 111 = 111'
    }

    return new Promise((resolve,reject)=>{
        connection.query(sql,(err,result)=>{
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

/**
 * 更新一条记录
 * @param {*} tname 表名
 * @param {*} condition 条件
 * @param {*} params 参数
 */
const updateOne = (tname,condition,params) => {
    let sql = `update ${tname} set `

    for(const key in params){
        sql += `${key} = "${params[key]}" ,` 
    }

    sql = sql.substring(0,sql.length-1)

    if (condition){
        sql+= " where "
        for(const key in condition){
            sql += `${key} = "${condition[key]}" and `
        }
        sql+= " 1=1 "
    }

    return new Promise((resolve,reject)=>{
        connection.query(sql,(err,result)=>{
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

/**
 * 删除一条记录
 * @param {*} tname 表名
 * @param {*} condition 条件
 */
const deleteOne = (tname,condition) => {
    let sql = `delete from ${tname} `

    if (condition){
        sql+= " where "
        for(const key in condition){
            sql += `${key} = "${condition[key]}" and `
        }
        sql+= " 1=1 "
    }

    return new Promise((resolve,reject)=>{
        connection.query(sql,(err,result)=>{
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

module.exports = {
    findOne,
    updateOne,
    insertOne,
    deleteOne,
    findList
}
