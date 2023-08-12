import './urStyle.css';
import axios from "axios";

export default function UserRegistration() {
    const submitButtonHandler = async (e) => {

        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries())

        console.log(formJson);

        const res = await axios.post('http://localhost:5001/api/users/register', formJson);
        console.log("respose", res);


    }

    return (
        <>
            {/* Hello world */}
            {/*-Coding By CodingLab | www.codinglabweb.com-*/}
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            {/*<title>Registration Form in HTML CSS</title>*/}
            {/*-Custom CSS File-*/}
            <link rel="stylesheet" href="style.css" />
            <section className="container">
                <header>Registration Form</header>
                <form method="post" action="#" className="form" onSubmit={submitButtonHandler}>
                    <div className="input-box">
                        <label>Full Name</label>
                        <input type="text" name="name" placeholder="Enter full name" required="" />
                    </div>
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
            </section>
        </>

    );
}