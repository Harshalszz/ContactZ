import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAccess from "./useAccess";

const EditCustomer = () => {
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [area, setArea] = useState('Chennai');
    const [creditlimit, setCreditlimit] = useState(0);
    const { cId } = useParams();

    const navigation = useNavigate();
    const { haveadd, haveedit, havedelete } = useAccess('customer');


    useEffect(() => {

        if (haveedit) {
            fetch('http://localhost:3000/customer/' + cId).then((res) => {
                return res.json();
            }).then(res => {
                setId(res.id);
                setName(res.name);
                setArea(res.area);
                setCreditlimit(res.creditlimit);
            }).catch((err) => {
                console.log(err);
            })
            console.log(cId)
        }else{
            alert('Do not have permission to edit');
            navigation('/customer')
        }



    }, [haveedit])

    const handlesubmit = (e) => {

        e.preventDefault();

        const customer = { id, name, area, creditlimit }

        fetch('http://localhost:3000/customer/' + cId, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(customer)
        }).then((res) => {
            alert('customer edited successfully');
            navigation('/customer');

        }).catch((err) => {
            console.log(err);
        })


    }

    return (<>
        <h1></h1>
        <form className="container" onSubmit={handlesubmit}>
            <div className="row">
                <div className="offset-lg-2 col-lg-8">
                    <div className="card">
                        <div className="card-header">
                            <h2>Edit Customer</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Code</label>
                                <input disabled={true} value={cId} onChange={e => setId(e.target.value)} className="form-control"></input>
                            </div>
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
                                <input onChange={e => setCreditlimit(e.target.value)} value={creditlimit} className="form-control"></input>
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

export default EditCustomer;