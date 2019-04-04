//�������ӳ�,��һ��ģ����Ҫ���� �����ģ�鼴��
const mysql=require('mysql');
var pool=mysql.createPool({
    host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    user     : process.env.ACCESSKEY,
    password : process.env.SECRETKEY,
    database : 'app_' + process.env.APPNAME,
    connectionLimit:20,
    multipleStatements: true
});


//�������ӳض���
module.exports=pool;