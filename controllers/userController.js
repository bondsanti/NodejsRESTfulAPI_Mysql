const models =  require('../models/index');

// exports.index = function(req, res, next) {
//     res.status(200).json({
//       msg:"รายการข้อมูล Users"
//     })
//   }

exports.index = async(req, res, next) =>{
    
   //เรียกข้อมูลมาทั้งหมด
  //const users = await models.User.findAll()


  // เรียกข้อมูลมาทั้งหมด โดยระบุฟิวด์
  // const users = await models.User.findAll({
  //   attributes:['id','name','email','createdate'],
  //   order:[['id','desc']]
  // })

    //เรียกข้อมูลมาทั้งหมด ยกเว้นฟิวด์
  // const users = await models.User.findAll({
  //   attributes: {exclude:['password']},
  //   order:[['id','desc']]
  // })

  //ระบุเงื่อนไข where
  // const users = await models.User.findAll({
  //   attributes: {exclude:['password']},
  //   where:{email:'john@gmail.com'},
  //   order:[['id','desc']]
  // })

  //เขียนในรูปแบบ sql เดิม ๆ
  const sql='select * from users order by id desc'
  const users = await models.sequelize.query(sql,{
    type:models.sequelize.QueryTypes.SELECT
  });




  res.status(200).json({
      data:users
    })

  }