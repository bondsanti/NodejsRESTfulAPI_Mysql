const bcryptjs = require('bcryptjs');
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

  exports.showdata = async(req,res,next)=>{
    // //เขียนแบบที่ 1
    // res.status(200).json({
    //   data:req.params.id
    // })

    //เขียนแบบที่ 2
    // const id = req.params.id
    //     res.status(200).json({
    //       data:id
    //     })

    //เขียนแบบที่ 3 
    //  const { id }= req.params

    //  const userByid = await models.User.findByPk(id,{
    //   attributes: {exclude:['password']},
    //  })
    
    //     res.status(200).json({
    //       data:userByid
    //     })

    //แบบที่ 4 Full
    try {
      const { id }= req.params;

      const userByid = await models.User.findByPk(id,{
       attributes: {exclude:['password']},
      })

      if (!userByid) {
        const error = new Error('ไม่พบผู้ใช้งาน');
        error.statusCode= 404;
        throw error;
      }
     
         res.status(200).json({
           data:userByid
         })
         
    } catch (error) {

      res.status(error.statusCode).json({
        error:{
          message:error.message
        }
      })

    }

  }

  exports.insert = async(req, res, next)=>{
         
        try {
          
          const {name,email,password} = req.body;

          //check email reg
          const checkEmail = await models.User.findOne({where:{email:email}});
          if (checkEmail) {
            const error = new Error('Email ซ้ำ!! Email นี้ลงทะเบียนแล้ว');
            error.statusCode= 400;
            throw error;
          }

          //hash password
          const salt = await bcryptjs.genSalt(8);
          const passwordHash = await bcryptjs.hash(password,salt);

          //insert
          const user = await models.User.create({
            //db,body
            name : name,
            email : email,
            password : passwordHash
          })

          res.status(201).json({
            message:"insert complete",
            data:{
              id : user.id
            }
          })

        } catch (error) {
          res.status(error.statusCode).json({
            error:{
              message:error.message
            }
          })
        }
        
 
   }

  exports.update = async(req, res, next)=>{
         
    try {
      
      const {id,name,email,password} = req.body;

      //check id
      if (req.params.id!== id) {
        const error = new Error('เกิดข้อผิดพลาด id ไม่ถูกต้อง');
        error.statusCode= 400;
        throw error;
      }

      //hash password
      const salt = await bcryptjs.genSalt(8);
      const passwordHash = await bcryptjs.hash(password,salt);

      //update
      const user = await models.User.update({
        name : name,
        email : email,
        password : passwordHash
      },{
        where:{
        id:id
          }
        })

      res.status(200).json({
        data:{
          message:"update complete"
        }
      })

    } catch (error) {
      res.status(error.statusCode).json({
        error:{
          message:error.message
        }
      })
    }
  }


  exports.delete = async(req, res, next) =>{
         
    try {
      const { id }= req.params;

      const userByid = await models.User.findByPk(id)

      if (!userByid) {
        const error = new Error('ไม่พบผู้ใช้งาน');
        error.statusCode= 404;
        throw error;
      }

      //delete
      const user = await models.User.destroy({where:{id:id}})

      res.status(200).json({
        data:{
          message:"delete complete"
        }
      })

    } catch (error) {
      res.status(error.statusCode).json({
        error:{
          message:error.message
        }
      })
    }
  }
    

