import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAccess = (menuName) => {
    const [haveadd, haveaddupdate] = useState(true);
    const [haveedit, haveeditupdate] = useState(true);
    const [havedelete, havedeleteupdate] = useState(true);  

    const navigate = useNavigate();

    const updateState = ()=>{
        haveaddupdate(false);
        haveeditupdate(false);
        havedeleteupdate(false);
    }

    useEffect(()=>{
        const userRole = localStorage.getItem('role') !=null ? localStorage.getItem('role') :'';
        console.log(userRole);
        if(userRole !=''){
            fetch('http://localhost:3000/roleaccess?role='+userRole+'&menu='+menuName).then((res)=>{
                if(!res.ok){
                    alert('You are not autorized to access this menu:'+menuname);
                    updateState();
                    navigate('/')
                }
                return res.json();
            }).then((data)=>{
                if(data.length > 0){
                    const obj = data[0];
                haveaddupdate(obj.haveadd);
                haveeditupdate(obj.haveedit);
                havedeleteupdate(obj.havedelete);
                }else{
                    alert('You are not autorized to access this menu:'+menuname);
                    updateState();
                    navigate('/');
                }
            }).catch((err)=>{
                updateState();
                console.log(err);
            })
        }
    }, [menuName])


    return {haveadd, haveedit, havedelete};
}
 
export default useAccess;