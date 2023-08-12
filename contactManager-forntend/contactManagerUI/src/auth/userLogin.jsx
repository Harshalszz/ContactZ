import  './urStyle.css';
import axios from 'axios';


export default function UserLogin(){

    const submitButtonHandler = async (e) => {

        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries())

        console.log(formJson);

        const res = await axios.post('http://localhost:5001/api/users/login', formJson);
        console.log("respose", res);


    }



    return (
        <>
        
            <div className="container">
                <div className="login">

             
                <header>Login Form</header>
                <form method="post" action="#" className="form" onSubmit={submitButtonHandler}>
                    
                    <div className="input-box">
                        <label>Email Address</label>
                        <input type="email" name="email" placeholder="Enter email address" required="" />
                    </div>
                    <div className="input-box address">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Enter Password" required="" />
                    </div>
                    <button type='submit'>Submit</button>
                </form>
                </div>
            </div>
        </>

    );
}