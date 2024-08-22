import axios from 'axios';
import {useEffect, useState } from "react";

function CustomerCrud()
{
  const [id, setId] = useState('');
  const [name, setName] = useState("");
  const [age, setAge] = useState(""); 
  const [customers, setUsers] = useState([]);

useEffect(() => {
  (async () => await Load())();
  }, []);


  async function  Load()
  {
     const result = await axios.get("http://localhost:8080/api/persons/getAllPersons");
         setUsers(result.data);
         console.log(result.data);
  }
 
     async function save(event)
    {
        event.preventDefault();
    try
        {
         await axios.post("http://localhost:8080/api/persons/save",
        {
          id:id,
          name: name,
          age: age
        });
          alert("Customer Registation Successfully");
          setId("");
          setName("");
          setAge("");
          Load();
        }
    catch(err)
        {
          alert("User Registation Failed");
        }
   }

   async function editCustomer(customers)
   {
    setName(customers.name);
    setAge(customers.age);
    setId(customers.id);
   }

   async function DeleteCustomer(id)
   {
        await axios.delete("http://localhost:8080/api/persons/deleteperson/" + id); 
        alert("Employee deleted Successfully");
        Load();
   }

   async function update(event)
   {
    event.preventDefault();

   try
       {
        await axios.put("http://localhost:8080/api/persons/update/",
       {
        id: id,
        name: name,
        age: age
       
       });
         alert("Registation Updated");
         setId("");
         setName("");
         setAge("");
         Load();
       }
   catch(err)
       {
         alert("User Registation Failed");
       }
  }
  return (
    <div>
       <h1>Customer Details</h1>
       <div class="container mt-4" >
          <form>
              <div class="form-group">
               <input  type="text" class="form-control" id="id" hidden
               value={id}
               onChange={(event) =>
                {
                  setId(event.target.value);      
                }} 
               />
                <label>Name</label>
                <input  type="text" class="form-control" id="name"
                value={name}
                onChange={(event) =>
                  {
                    setName(event.target.value);      
                  }}
                />
              </div>
              <div class="form-group">
                <label>Age</label>
                <input  type="text" class="form-control" id="age" 
                 value={age}
                  onChange={(event) =>
                    {
                      setAge(event.target.value);      
                    }}
                />
              </div>

              <div>
              <button   class="btn btn-primary mt-4"  onClick={save}>Register</button>
              <button   class="btn btn-warning mt-4"  onClick={update}>Update</button>
              </div>   
            </form>
          </div>

<table class="table table-dark" align="center">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      
      <th scope="col">Option</th>
    </tr>
  </thead>
       {customers.map(function fn(customer)
       {
            return(
            <tbody>
                <tr>
                <th scope="row">{customer.id} </th>
                <td>{customer.name}</td>
                <td>{customer.age}</td>     
                <td>
                    <button type="button" class="btn btn-warning"  onClick={() => editCustomer(customer)} >Edit</button>  
                    <button type="button" class="btn btn-danger" onClick={() => DeleteCustomer(customer.id)}>Delete</button>
                </td>
                </tr>
            </tbody>
            );
            })}
            </table>
       </div>
            );
        }
 
export default CustomerCrud;
