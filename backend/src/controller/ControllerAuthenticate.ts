import {Request,Response} from 'express';
import bcript from 'bcryptjs';
import jwt from 'jsonwebtoken';

import auth from '../config/auth';

import {getRepository} from 'typeorm';
import UserProprietor from '../models/UserProprietor';

class AuthenticateController{

   
  async authenticate(req:Request,res:Response){
      
      const {email, password} = req.body;
      const authRepository = getRepository(UserProprietor);

      const userProprietor = await authRepository.findOneOrFail({where:{email}});
      
      if(!userProprietor) return res.sendStatus(401);

      const isValidPassword = bcript.compareSync(password,userProprietor.password);

      if(!isValidPassword) return res.sendStatus(401);

      const token = jwt.sign({id:userProprietor.id,name:userProprietor.name},auth.jwt.secret,{expiresIn:'1d'});
           
      return res.json({
        userProprietor,
        token
      });
    
  }
  
}
export default new AuthenticateController();