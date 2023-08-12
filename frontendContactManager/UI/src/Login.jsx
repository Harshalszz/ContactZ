import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
    const [userId, idchange] = useState('');
    const [password, pwchange] = useState('');

    const navigate = useNavigate();
    const validate = true;

    useEffect(()=>{
        localStorage.clear();
    })

    const handlesubmit =(e)=>{

        console.log('login');
        e.preventDefault();

        if(validate){

            fetch('http://localhost:3000/user?userId='+userId+'&password='+password).then((res)=>{
                if(!res.ok){
                    alert('login failed');
                }else{
                    return res.json();
                }
            }).then((res) =>{
                console.log(res);
                if(res.length>0){
                    const user =res[0];
                    if(user.isActive === false){
                        alert('User is not verified, please contact the administrator');
                    }else{
                        localStorage.setItem('username',user.userId);
                        localStorage.setItem('role',user.role);
                        navigate('/')
                    }
                    console.log(user);
                }else{
                    alert('login failed');
                }
            }).catch(err=>{
                console.log(err.message);
            });

        }else{
            alert('Please enter valid credentials');
        }

    }

    const registerPage = ()=>{
        navigate('/register');
    }
    return (<>
        <form className="container" onSubmit={handlesubmit}>
            <div className="row">
                <div className="offset-lg-2 col-lg-8">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Regsiteration</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span className="text-danger">*</span></label>
                                <input value={userId}  onChange={e => idchange(e.target.value)} className="form-control"></input>
                            </div>
                            
                            <div className="form-group">
                                <label>Password<span className="text-danger">*</span></label>
                                <input value={password} type="password" onChange={e => pwchange(e.target.value)} className="form-control"></input>
                            </div>
                           
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-success" type="submit">Login</button>
                            <button className="btn btn-primary" type="submit" onClick={registerPage}>New User?</button>
                            <Link className="btn btn-primary" to="/register">New User?</Link>
                        </div>

                    </div>

                </div>
            </div>

        </form>
    </>);
}

export default Login;