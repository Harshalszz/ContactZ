import { useState } from "react";
import ContactList from "./ContactList";

const Contact = () => {
    const [avengerList, setAvengerList] = useState([{id:1,name: 'tony', age:20, email : 'tony@gmail.com' },
    {id:2,name: 'chirs', age:22, email : 'chris@gmail.com' },
    {id:3,name: 'law', age:23, email : 'law@gmail.com' }]);

    const name = 'Harshal';
    //let avengerList = ;

    const clickHandler =()=>{
        alert("button click")
    }

    const removeHandler = (id) =>{
        console.log(id);
        let newAvengerList = avengerList.filter(a => a.id != id);
        setAvengerList(newAvengerList);
    }

    return ( <>
        <ContactList heading = "Contact Testing" name ={name} clickHandler={clickHandler} arr= {avengerList} removeHandler={removeHandler}/>
    </> );
}
 
export default Contact;