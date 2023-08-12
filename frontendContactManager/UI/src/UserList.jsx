import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const [rolelist, rolelistupdate] = useState([]);

    const [id, idchange] = useState('');
    const [userId, userIdchange] = useState('');
    const [name, namechange] = useState('');
    const [role, rolechange] = useState('');
    const [email, emailchange] = useState('');
    const [mobile, mobilechange] = useState('');
    const [password, pwchange] = useState('');
    const [address, addresschange] = useState('');
    const [isActive, activechange] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let userrole = localStorage.getItem('role') != null ? localStorage.getItem('role').toString() : '';
        if(userrole !='admin'){
            navigate('/');
        }

        fetch('http://localhost:3000/user').then((res) => {
            return res.json();
        }).then((response) => {
            setUserList(response);
        }).catch((err) => {
            console.error(err);
        });

        loadRoles();
    }, []);

    const updateUser = (id)=>{

        fetch('http://localhost:3000/user/'+id).then((res)=>{
            if(!res.ok){
                return false;
            }
            return res.json();
        }).then((res)=>{
            idchange(res.id);
            userIdchange(res.userId)
            namechange(res.name);
            emailchange(res.email);
            pwchange(res.password);
            rolechange(res.role);
            mobilechange(res.mobile);
            addresschange(res.address); 
            activechange(res.isActive);

        }).catch((err)=>{
            console.log(err);
        })

    }

    const handleSubmit =(e)=>{

        e.preventDefault();

        const roleObj = {id, userId, password, email, mobile, address, isActive,role,name}

        fetch('http://localhost:3000/user/'+id,{
            method:'PUT',
            headers:{
            'content-type': 'application/json'
            },
            body:JSON.stringify(roleObj)
        }).then((res)=>{
            alert('succesfully updated')
        }).catch((err)=>{
            console.log(err);
        })

        navigate(0);

    }


    const loadRoles = ()=>{
        fetch('http://localhost:3000/role').then((res)=>{
            return res.json();
        }).then((response) => {
            rolelistupdate(response);
        }).catch((err)=>{
            console.error(err);
        })
    }

    return (
        <>
            <div className="container">
                <div className="card-header">
                    <h1>User List</h1>

                </div>
                <div className="card-body">


                    <h1></h1>
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList &&
                                userList.map((item) => (
                                    <tr key={item.id}>
                                        <th scope="row">{item.userId}</th>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>
                                        <td>{item.isActive ? 'Active' : 'InActive'}</td>
                                        <td>
                                            {/* <button onClick={() => editItem(item.id)} className="btn btn-primary">Update</button> */}
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                onClick={()=>{updateUser(item.id)}}
                                            >
                                                Update
                                            </button>


                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>


                </div>

            </div>



            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Update User
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>User Name : {userId}</label>
                            </div>

                            <div className="form-group">
                                <label>Role</label>
                                <select value={role} onChange={e => rolechange(e.target.value)} className="form-control">
                                    <option value="">Select Role</option>
                                    {rolelist &&
                                        rolelist.map((item) => (
                                            <option value={item.code} key={item.code}>{item.name}</option>
                                        ))}

                                </select>
                            </div>

                            <div className="m-3"></div>

                            <div className="form-check">
                                <label>Is Active</label>
                                <input checked={isActive === true ? 'checked' : ''} onChange={e => activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default UserList;