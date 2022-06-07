import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import FacebookPicture from './Components/FacebookPicture'
//import FacebookFriendsPicture from './Components/FacebookFriendsPicture'
import FacebookGetPhotos from './Components/FacebookGetPhotos'


function App() {

   // new line start
   // current state and a function that updates it
  /*const [profileData, setProfileData] = useState(null)

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
    */
    
  const [firstName, setFirstName] = useState('');

  const [usernameData, setUsernameData] = useState(null)
  const [databaseValues, setDatabaseValues] = useState(null)

  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [accessToken, setAccessToken] = useState();

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
  function listDatabaseUsers(){
    axios({
      method: "GET",
      url:"/database"
    })
    .then((response) => {
      const res = response
      console.log(res.data)
      setDatabaseValues(res)
    })
    .catch((error) => {
    if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }    
    })
  }
  function deleteDatabase(){
    axios({
      method: "GET",
      url:"/database_drop"
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
  function responseFacebook(response) {
    console.log('FACEBOOK OAUTH RESPONSE',response);
    setData(response);
    /* login boolean for condfitional display */
    if (response.accessToken) {
      setAccessToken(response.accessToken);
      setLogin(true);
      /**testing, post the access token data response to database*/
      axios({
        method: "POST",
        url:"/username",
        data:{response}
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
    } else {
      setLogin(false);
    }
  }

  //const [photoData, setPhotoData] = useState(false)
  const [photoData, setPhotosData] = useState();

  function responseFacebookMePhotos(response) {
      console.log('facebook me photos uploaded',response);
      //setPhotoData(response)
      if (login) {

        // try to get photos, keep it simple for now on the frontend
        //async function fetchFacebookGetPhotos () {
          try{
            axios
                .get(`https://graph.facebook.com/me/photos/?fields=images&type=uploaded&access_token=${accessToken}`)
                .then((resp) => {
                    console.log('TESTING to get photo IDs...')
                    console.log(resp.data.data)
                    setPhotosData(resp.data)
                })
          } catch (err) {
              console.log('error', err)
          }
        

        // manually call the fecth function 
        //fetchFacebookGetPhotos();

        // with PhotoData now set, try and insert into collection?
        axios({
          method: "POST",
          url:"/user_photos",
          data:{'response':photoData,
                'accessToken':accessToken}
        })
        .then((response) => {
          const res = response.data
          console.log(res)
          //setPhotoData(true);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })
      } else {
        console.log('login is FALSE',response)
      }
    } 

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        <h1 class="welcome"> <strong>Welcome to React-Flask-Mongo Dev App 🦾 ⚡️ 🐊</strong> </h1>
        <hr></hr>
        </p>

          {!login &&
            <div class='login_button'>
              <FacebookLogin
                appId="292301126304936"
                autoLoad={true}
                fields="name,email,picture"
                scope="public_profile, email, user_friends, user_photos, user_birthday"
                callback={responseFacebook}
                icon="fa-facebook" />
            </div>
          }

          {login && 
            <div>
              <h3 class="welcome"> <strong><em>1. May you be well... </em> 😌</strong> </h3>
              <p> Okay! logged in as <i>Meta Developer Test User</i>: {data.name}</p>
              <div>
                <FacebookPicture user_id={'me'} width={'320'} height={'320'} token={accessToken}/>
              </div> 
              <hr></hr>
            </div>
          }

         {/* new line start */}

        <p>1. Enter username value / refresh page for fb access token:</p> 
        <input type='text' name="fn" onChange={e => setFirstName(e.target.value)} /> 
        {firstName && <div><button onClick={() => postUsername( {firstName})}>Enter</button></div>}       
        {/*{firstName && <div>
          <button onClick={() => getUsername({firstName})}>Enter</button>
          {usernameData && <div>
            username is: <code>{usernameData.un}</code>
          </div>
          </div>
        }*/}
         {/* end of new line */}

         {/* new line start */}
          <p>2. read db scheme (click to read updated)</p>
          
          <button onClick={() => listDatabaseUsers()}>Show DB Users</button>
          {databaseValues && 
          <div>db vals
            <em>{databaseValues.data.map(databasevalue =><div>{databasevalue.accessToken} - {databasevalue.email}</div>)}</em>
            </div>
          }
          {/*{databaseValues && 
            <div>
            <em>{databaseValues.output.map(databasevalue =><div>{databasevalue}</div>)}</em>
            </div>
            }
          end of new line */}

         {/* new line start */}
          <p> 3. delete the db collection for <code>users</code>? </p>
          <button onClick={() => deleteDatabase()}>Click here</button>
         {/* end of new line */}

        {login && 
        <div>
          <p class="welcome"> 4. facebook get photos into db collection for user (TBD)
          </p>
          {/*  Click <a href={"https://graph.facebook.com/me/photos?type=uploaded&access_token=" + accessToken} target="_blank">here</a>*/}
            <div>
            {/*  <FacebookGetPhotos token={accessToken}/> */}
            </div>
            <hr></hr>
        </div>
        }

        {login &&
        <div>
          {/* new line start */}
          <p> 5. insert facebook photos to db collection </p>
          <button onClick={() => responseFacebookMePhotos()}>Click here</button>
         {/* end of new line */}



        </div>
        }

      </header>
    </div>
  );
}

export default App;