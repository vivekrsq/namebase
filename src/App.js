import Header from "./components/Header";
import { useState } from "react";
import {Buffer} from 'buffer';
Buffer.from('anything','base64');
function App() {
  const [records, setRecords] = useState({
    type: "",
    host: "",
    value: "",
    ttl: ""
  })

  let onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setRecords({...records, [name] : value})
  }


let handleSubmit = (e)=>{
  e.preventDefault();
  const credentials = Buffer.from(`587a87d68d13ce981eb3fd6753f30d1b96489a51cc002e917556c17ee4292960:c8064a8641bd513fb05f3f1df9f1d3efda61d912447f550bc8d28ff508997c2e`);
  const encodedCredentials = credentials.toString('base64');
  const authorization = `Basic ${encodedCredentials}`;
  fetch('/api/v0/dns/domains/wowman/nameserver', {
    method: 'GET',
    headers: {
      Authorization: authorization,
      
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    // body: { "records": [JSON.stringify(records)], "deleteRecords": []}
  })
  .then(res=>res.json())
  .then(data=>console.log(data))
  console.log(records);
}


  return (
    <>
    <Header />
    <div className="container my-4">
    <form className="row g-3" onSubmit={handleSubmit}>
  
  <div className="col-md-2">
    <label htmlFor="inputCity" className="form-label">IP</label>
    <input type="text" className="form-control" value={records.value} onChange={onChangeHandler} name="value" id="inputCity"/>
  </div>
  <div className="col-md-2">
    <label htmlFor="inputState" className="form-label">Type</label>
    <select id="inputState" className="form-select" value={records.type} onChange={onChangeHandler} name="type">
      <option selected>Choose...</option>
      <option value="A">A</option>
    </select>
  </div>
  <div className="col-md-2">
    <label htmlFor="inputZip" className="form-label">TTL</label>
    <input type="text" className="form-control" value={records.ttl} onChange={onChangeHandler} name="ttl" id="inputZip"/>
  </div>
  <div className="col-md-2">
    <label htmlFor="inputZip" className="form-label">Host</label>
    <input type="text" className="form-control" value={records.host} onChange={onChangeHandler} name="host" id="inputZip2"/>
  </div>
  
  <div className="col-12 d-flex">
    <button type="submit" className="btn btn-primary">Update</button>
  </div>
</form>

    </div>
    </>
  );
}

export default App;
