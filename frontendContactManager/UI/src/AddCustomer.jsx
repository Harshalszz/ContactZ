import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
    const [name,setName] = useState('');
    const [area, setArea] = useState('');
    const [creditlimit, setCreditLimit] = useState('');

    const navigation = useNavigate();

    const handlesubmit = (e) =>{
        e.preventDefault();

        console.log(name,area,creditlimit);

        const customer = {name,area,creditlimit};

        fetch('http://localhost:3000/customer',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(customer)
        }).then((res)=>{
            alert('Added customer successfully');
            navigation('/customer');
        }).catch((err)=>{
            console.log(err);
        })

    }

    return (<>
        <form className="container" onSubmit={handlesubmit}>
            <div className="row">
                <div className="offset-lg-2 col-lg-8">
                    <div className="card">
                        <div className="card-header">
                            <h2>Create Customer</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Name</label>
                                <input value={name} onChange={e => setName(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Area</label>
                                {/* <input className="form-control"></input> */}
                                <select onChange={e => setArea(e.target.value)} value={area} className="form-control">
                                    <option value="Chennai">Chennai</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Hydrabad">Hydrabad</option>
                                    <option value="Banglore">Banglore</option>
                                    <option value="Delhi">Delhi</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Creditlimit</label>
                                <input onChange={e => setCreditLimit(e.target.value)} value={creditlimit} className="form-control"></input>
                            </div>

                        </div>
                        <div className="card-footer">
                            <button className="btn btn-success" type="submit">Save</button>
                        </div>

                    </div>

                </div>
            </div>

        </form>

    </>);
}

export default AddCustomer;