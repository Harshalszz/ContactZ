import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddCustomer from "./AddCustomer";
import useAccess from "./useAccess";

const Customer = () => {
    const [customerList, setCustomers] = useState([]);
    const navigation = useNavigate();
    const {haveadd, haveedit, havedelete} = useAccess('customer')

    useEffect(() => {

        fetch('http://localhost:3000/customer').then((res) => {
            return res.json();
        }).then((response) => {
            console.log(response)
            setCustomers(response);
        }).catch((error) => {
            console.log(error);
        })

    }, []);

    const editItem = (id) => {
        console.log(id)

        if(haveedit){
            navigation('/customer/edit/' + id);
        }else{
            alert('Do not have edit permission')
        }

        

    }

    const addCustomer = ()=>{
        if(haveadd){
            navigation('/customer/create')
        }
    }

    const removeItem = (id) => {

        console.log(id);
        if(havedelete){

            if (window.confirm('Are you sure you want to')) {
                fetch('http://localhost:3000/customer/' + id, {
                    method: 'DELETE',
                }).then((res) => {
                    alert('Delete successfully');
                    navigation(0);
                }).catch((err) => {
                    console.log(err);
                })
            }else{
                navigation('/customer');
            }
    
            
        }else{
            alert('You not having access for Remove.');
        }

        

    }



    return (<>
        <div className="container">
            <div className="card-header">
                <h1>Customer Page</h1>

            </div>
            <div className="card-body">
                <div>

                    {/* <Link className="btn btn-success" to="/customer/create">Add Customer</Link> */}
                    <button onClick={() => { addCustomer() }} className="btn btn-success">Add Customer </button>
                </div>

                <h1></h1>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Area</th>
                            <th scope="col">Credit Limit</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerList &&
                            customerList.map((item) => (
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.area}</td>
                                    <td>{item.creditlimit}</td>
                                    <td>
                                        <button onClick={() => editItem(item.id)} className="btn btn-primary">Edit</button>
                                        <a className="btn btn-danger " onClick={() => { removeItem(item.id) }}>Delete</a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>


            </div>

        </div>



    </>);
}

export default Customer;