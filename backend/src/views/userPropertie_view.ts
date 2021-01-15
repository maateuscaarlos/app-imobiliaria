import UserPropriertor from "../models/UserProprietor";
import propertie_views from "./propertie_views";
interface UserPropriertorView{
    id:number;
    name: string;
    telephone: string;
    email:string;
    password:string;
}

export default{
  render(userProprietor: UserPropriertor):UserPropriertorView{
    return{
      id:userProprietor.id,
      name:userProprietor.name,
      telephone:userProprietor.telephone,
      password:userProprietor.password,
      email:userProprietor.email,
    };
    
  },
  renderMany(usersPropierter:UserPropriertor[]):UserPropriertorView[]{
    
    return usersPropierter.map(UserPropriertor=>this.render(UserPropriertor));

  },
}