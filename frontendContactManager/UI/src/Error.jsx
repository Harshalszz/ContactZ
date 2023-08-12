import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();
    const goBack =()=>{
        navigate('/');
    }
    return (<>
    <div className="justify-content-center m-3">
    <div className="card text-center">
            <div className="card-header">Error</div>
            <div className="card-body">
                <h3 className="card-title">404 Not Found</h3>
                <p className="card-text">
                    With supporting text below as a natural lead-in to additional content.
                </p>
                <a onClick={()=>{goBack()}} className="btn btn-primary">
                    Go to Home
                </a>
            </div>
            
        </div>

    </div>
        


    </>);
}

export default Error;