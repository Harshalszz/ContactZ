const ContactList = (arg) => {
    return ( <>
        <h1>Hello</h1>
        <h2>{arg.heading}</h2>
        <h3>{arg.name}</h3>
        <button onClick={arg.clickHandler}>Click Me</button>
        <h1></h1>
        <ul>
            {arg.arr.map((item)=>(
                <div key={item.id} style={{borderWidth:"5px",borderColor:"red"}}>
                    <h4>{item.name}</h4>
                    <li>{item.email}</li>
                    <li>{item.age}</li>
                    <button onClick={()=>{arg.removeHandler(item.id)}}>remove</button>
                </div>
            ))}
        </ul>
    </> );
}

export default ContactList;