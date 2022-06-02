import { useState } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {

   // new line start
   // current state and a function that updates it
  const [profileData, setProfileData] = useState(null)

  function getData() {
    axios({
      method: "GET",
      url:"/profile",
    })
    .then((response) => {
      const res = response.data
      setProfileData(({
        profile_name: res.name,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
    //end of new line 

  const [firstName, setFirstName] = useState('');

  const [usernameData, setUsernameData] = useState(null)

  function postUsername(un_val){
    axios({
      method: "POST",
      url:"/username",
      data: {
        username_value: un_val['firstName']
      }
    })
    .then((response) => {
      const res = response.data
      console.log(res)
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })

  }
  function getUsername(un_val){
    axios({
      method: "GET",
      url:"/username",
      params: {
        username_value: un_val
      }
    })
    .then((response) => {
      const res = response.data
      setUsernameData(({
        //un: res.un
        un:res.firstName
      }))
      console.log(res)
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  }

  const [databaseValues, setDatabaseValues] = useState(null)

  function listDatabaseUsers(){
    axios({
      method: "GET",
      url:"/database"
    })
    .then((response) => {
      const res = response.data
      setDatabaseValues(res)
      console.log(databaseValues.database)
    })
    .catch((error) => {
    if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }    
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload... (<a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >Learn React
        </a>)
        
        <hr></hr>
        </p>

         {/* new line start */}

        <p>1. (DEMO) Pass a parameter to backend:</p> 
        
        <input type='text' name="fn" onChange={e => setFirstName(e.target.value)} />        
        {/* */}
        {firstName && <div>
          <button onClick={() => getUsername({firstName})}>Enter</button>
          {usernameData && <div>
            username is: <code>{usernameData.un}</code>
            </div>
          }
          </div>
        }
         {/* end of new line */}

         {/* new line start */}
        <p>2. add username to database </p>
        <button onClick={() => postUsername( {firstName})}>Enter</button>
         {/* end of new line */}

         {/* new line start */}

         
        <p>3. read db scheme</p>
        
        <button onClick={() => listDatabaseUsers()}>Show DB Users</button>
        {databaseValues && <div>
          <em>{databaseValues.output.map(databasevalue =><div>{databasevalue}</div>)}</em>
          </div>

        }

        <p> 5. delete the db (TBD)</p>

         {/* end of new line */}
      </header>
    </div>
  );
}

export default App;