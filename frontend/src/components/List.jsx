import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export default function List() {

    const [list, setList] = useState([]);
    const [editid, setEditid] = useState('');
    const [success, setSuccess] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        getEditData(id)
        setShow(true);
    }

    const [fields, setFields] = useState({
        fname: '',
        lname: '',
        email: '',
        country: '',
        phone: '',
        about: ''
    }); 

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    useEffect(() => {
        fetch('http://localhost:5000/api/list', {
            method: 'GET',
        }).then((res) => {
            return res.json();
        })
            .then((data) => {
            setList(data.users);
        });
    },[]);

    const getEditData = (id) => {
        fetch('http://localhost:5000/api/edit/'+id, {
            method: 'GET',
        }).then((res) => {
            return res.json();
        })
            .then((data) => {
                console.log(data);
                setFields(data.user);
                setEditid(data.user._id);
        });
    }

    const handleUpdate = async(e) => {
        e.preventDefault();
        const data = JSON.stringify(
            { 
                fname: e.target.fname.value,
                lname: e.target.lname.value,
                email: e.target.email.value,
                country: e.target.country.value, 
                phone: e.target.phone.value, 
                about: e.target.about.value 
            }
        )
        console.log(data);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        };
        fetch('http://localhost:5000/api/update/'+editid, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.error) {
                    setError(true);
                    setErrorMsg(data.message);
                }
            });
            setSuccess(true);
            setShow(false)
    } 


    return (
    <>
        <div className="container">
            <div className="row">
            <div className="col-12 p-2 text-center">
                <h1>List Contacts</h1>
            </div>
            {
                (success) ?
                <div className="col-12 m-3">
                <div className="alert alert-success">Data is updated successfully</div>
                </div>
                : <></>
            }
                {
                    list.map((item, i) => 
                        <div key={i} className="col-4 p-4 card m-2">
                            <div className="card-body">
                                <h5 className="card-title">{item.fname} {item.lname} {item._id}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{item.email}</h6>
                                <p className="card-text">{item.about}</p>
                                <span>Phone - {item.phone}</span><br/>
                                <span>Country - {item.country}</span>
                                <div className="btn-group d-block mt-3" >
                                <Button onClick={() => handleShow(item._id)} variant="primary" >Edit Contact</Button>
                                </div>
                            </div>
                        </div>
                    )
                }
                
            </div>
        </div>
        

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container">
            <div className="row">
            
            {
                (error) ?
                <div className="col-12 m-3">
                <div className="alert alert-danger">{errorMsg}</div>
                </div>
                : <></>
            }
                <div className="col-12 p-4">
                <form method="POST" onSubmit={handleUpdate} className="form-1">
                    <input type="hidden" value={fields._id} name="id" />
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
                        <input type="text" className="form-control" id="about" name="about" onChange={(e) => setFields(e.target.value)} placeholder="Type Here..."  value={fields.about} />
                    </div>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Update Changes
                    </Button>
                    </Modal.Footer>
                    </form>
                </div>
            </div>
        </div>
        </Modal.Body>
      </Modal>
        
    </>
  )
}
