import React, {useState} from 'react'

const Add = () => {
    

    const [fields, setFields] = useState({
        fname: '',
        lname: '',
        email: '',
        country: '',
        phone: '',
        about: ''
    }); 
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { 
                    fname: e.target.fname.value,
                    lname: e.target.lname.value,
                    email: e.target.email.value,
                    country: e.target.country.value, 
                    phone: e.target.phone.value, 
                    about: e.target.about.value 
                }
            )
        };
        fetch('http://localhost:5000/api/add', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.error) {
                    setError(true);
                    setErrorMsg(data.message);
                    return false;
                } else {
                    setFields({
                        fname: '',
                        lname: '',
                        email: '',
                        country: '',
                        phone: '',
                        about: ''
                    });
                }
            
            });

            
    } 

    return (
    <>
    <div className="container">
        <div className="row ">
            <div className="col-12 p-2 text-center">
            <h1>Add Contact</h1>
            </div>
            <div className="col-6 p-4 mx-auto">
            {
                (success) ?
                <div className="col-12 m-3">
                <div className="alert alert-success">Data is added successfully</div>
                </div>
                : <></>
            }
            {
                (error) ?
                <div className="col-12 m-3">
                <div className="alert alert-danger">{errorMsg}</div>
                </div>
                : <></>
            }
            <form method="POST" onSubmit={handleSubmit} className="form-1">
                <div className="form-group">
                    <label htmlFor="fname">First Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="fname" name="fname" onChange={(e) => setFields(e.target.value)} value={fields.fname} placeholder="Enter First Name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="lname">Last Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="lname" name="lname" onChange={(e) => setFields(e.target.value)} value={fields.lname} placeholder="Enter Last Name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email <span className="text-danger">*</span></label>
                    <input type="email" className="form-control" id="email" name="email" onChange={(e) => setFields(e.target.value)} value={fields.email} placeholder="Enter email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input type="text" className="form-control" id="country" name="country" onChange={(e) => setFields(e.target.value)} value={fields.country} placeholder="Enter Country"  />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="number" className="form-control" id="phone" name="phone" onChange={(e) => setFields(e.target.value)} value={fields.phone} placeholder="Enter Phone Number"  />
                </div>
                <div className="form-group">
                    <label htmlFor="about">About</label>
                    <textarea className="form-control" id="about" name="about" onChange={(e) => setFields(e.target.value)} placeholder="Type Here..."  >{fields.about}</textarea>
                </div>
               
                <button type="submit" className="btn btn-primary mt-4">Submit</button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Add;
