import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
    const [userId, idchange] = useState('');
    const [name, namechange] = useState('');
    const [role, rolechange] = useState('');
    const [email, emailchange] = useState('');
    const [mobile, mobilechange] = useState('');
    const [password, pwchange] = useState('');
    const [address, addresschange] = useState('');
    const [isActive, activechange] = useState(false);

    const regobj = { userId, name, role, email, mobile, password, address, isActive };

    let validate = true;
    const navigate=useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        functionvalidate();
        if (validate) {
            fetch("http://localhost:3000/user", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(regobj)
            }).then(res => {
                alert('Registered successfully', 'Please contact admin for activation');
                toast.success('Registered successfully', 'Please contact admin for activation');
                <ToastContainer/>
                navigate('/login');
            }).catch((err) => {
                console.log(err.message);
            })
        } else {
            alert('Please enter valid info data & proceed')
            toast.warning('Please enter valid data & proceed');
            <ToastContainer/>
        }
    };

    const validateemail = (emailvalue) => {
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(emailvalue)) {
        } else {
            alert('Please enter a valid email address');
            toast.warning('Please Enter valid Email.');
            <ToastContainer/>
        }
    }

    const validateuser = (username) => {
        fetch("http://localhost:3000/user/" + username).then(res => {
            if(!res.ok){
                return false;
            }
            return res.json();
        }).then(resp => {
            if (Object.keys(resp).length > 0) {
                validate=false;
                alert('username already present');
                toast.warning('username already exists.');
                <ToastContainer/>
                idchange('');
            } 
        });
    }


    const functionvalidate = () => {
        if (userId.length === 0) {
            validate = false;
           
        }
        if (name.length === 0) {
            validate = false;
        }
        if (email.length === 0) {
            validate = false;
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

            } else {
                validate = false;
            }
        }
        if (password.length === 0) {
            validate = false;
        }
    }

    return (
        <div>
            <div>

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
                                        <input value={userId} onBlur={e=>validateuser(e.target.value)} onChange={e => idchange(e.target.value)} className="form-control"></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Name<span className="text-danger">*</span></label>
                                        <input value={name} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Email<span className="text-danger">*</span></label>
                                        <input value={email} onBlur={e => validateemail(e.target.value)} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Password<span className="text-danger">*</span></label>
                                        <input value={password} type="password" onChange={e => pwchange(e.target.value)} className="form-control"></input>
                                    </div>
                                    <div className="form-group">
                                        <label>mobile</label>
                                        <input value={mobile} onChange={e => mobilechange(e.target.value)} className="form-control"></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea value={address} onChange={e => addresschange(e.target.value)} className="form-control"></textarea>

                                    </div>

                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-success" type="submit">Register</button>
                                    <Link className="btn btn-primary" to="/login">Already Registered?</Link>
                                </div>

                            </div>

                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Register;