import UserPropriertor from "../models/UserProprietor";
import propertie_views from "./propertie_views";
interface UserPropriertorView{
    id:number;
    name: string;
    telephone: string;
    email:string;
    password:string;
    properties:PropertiesView[];
}
interface PropertiesView{
    id:number;
    name:string;
    about:string;
    instructions:string;
    latitude:number;
    longitude:number;
}

export default{
  render(userProprietor: UserPropriertor):UserPropriertorView{
    return{
      id:userProprietor.id,
      name:userProprietor.name,
      telephone:userProprietor.telephone,
      password:userProprietor.password,
      email:userProprietor.email,
      properties:propertie_views.renderMany(userProprietor.properties)
      
    };
    
  },
  renderMany(usersPropierter:UserPropriertor[]):UserPropriertorView[]{
    
    return usersPropierter.map(UserPropriertor=>{
        console.log(usersPropierter);
        return this.render(UserPropriertor)});

  },
  print(object:any){
    console.log(object)
  }
}
