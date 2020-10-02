<template>
  <div id="login">
   

    <header>
        <p>Messeage returned from server: </p>
        <div id="msg"></div>
    </header>
    <div>
        <h3>After a successful login this returns a token</h3>
        
        <p>Username: <input type="text" id="uname" value="lfernandez"></p> 
        <p>Password: <input type="text" id=pword value="white"></p>
        <button @click="login()">Login</button> 
        <button onclick="greeting()">Greeting</button> 
    </div>
    <div>
        <p>Accounts in DB:</p>
        <ul>
            <li>credentials: lfernandez, white; role: admin,agent</li>
            <li>credentials: momoman, black; role: member</li>
        </ul>
        <button onclick="getResource('/api/any')">Get resource available to any logged in user</button>
        <button onclick="getResource('/api/admin')">Get resource available to admin</button>
        <button onclick="getResource('/api/member')">Get resource available to member</button>
        <button onclick="getResource('/api/admin_member')">Get resource available to admin and member</button>
        <button onclick="postMe('/api/profile')">Profile</button>
    
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      tokenGlobal: "",
      msg: "",
    };
  },
  methods: {
   login() {
            console.log("in resource...");
            let username = document.getElementById('uname').value;
            let password = document.getElementById('pword').value;
            fetch('http://127.0.0.1:5000/api/token', {
                method: "GET"
                ,
                headers: {
                    "Content-Type": "text/plain",
                    'Authorization': 'Basic ' + btoa(username + ":" + password),
                },
                //credentials: "same-origin"
                credentials: "include"
            })
                .then((response) => {
                    return response.json();
                })
                .then((resp) => {
                    console.log(resp)
                    this.tokenGlobal = resp.token
                    console.log(this.tokenGlobal)
                    this.message("Token returned and stored in local var (also look for it the console)" )
                })
                .catch((err) => {
                    // Code called when an error occurs during the request
                    this.message(err)
                    alert('Error: ' + err.message);
                });
        },

        greeting() {
            console.log("in resource...");
            let username = document.getElementById('uname').value;
            let password = document.getElementById('pword').value;
            fetch('/greeting', {
                method: "GET"
                ,
                headers: {
                    "Content-Type": "text/plain",
                    'Authorization': 'Basic ' + btoa(username + ":" + password),
                },
                //credentials: "same-origin"
                credentials: "include"
            })
                .then((response) => {
                    return response.json();
                })
                .then((resp) => {
                    console.log(resp)
                    this.tokenGlobal = resp.token
                    console.log(this.tokenGlobal)
                    this.message("Token returned and stored in local var (also look for it the console)" )
                })
                .catch((err) => {
                    // Code called when an error occurs during the request
                    this.message(err)
                    alert('Error: ' + err.message);
                });
        },

        getResource(url) {
            console.log("in resource...");
            let username = this.tokenGlobal;
            let password = 'unused';
            // let username = document.getElementById('uname').value;
            // let password = document.getElementById('pword').value;
            fetch(url, {
                method: "GET"
                ,
                headers: {
                    "Content-Type": "text/plain",
                    'Authorization': 'Basic ' + btoa(username + ":" + password),
                },
                //credentials: "same-origin"
                credentials: "include"
            })
                .then((response) => {
                    return response.json();
                })
                .then((resp) => {
                    console.log(resp)
                    this.message(resp)
                })
                .catch((err) => {
                    // Code called when an error occurs during the request
                    this.message(err)
                    alert('Error: ' + err.message);
                });
        },

        postMe(url) {
            console.log("in postMe...");
            let username = this.tokenGlobal;
            let password = 'unused';
            // let username = document.getElementById('uname').value;
            // let password = document.getElementById('pword').value;
            let data = {
                firstname: "LukiePie"
            }
            fetch(url, {
                method: "PUT"
                ,
                headers: {
                    // "Content-Type": "text/plain",
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(username + ":" + password),
                },
                //credentials: "same-origin"
                credentials: "include",
                body: JSON.stringify(data)
            })
                .then((response) => {
                    return response.json();
                })
                .then((resp) => {
                    console.log(resp)
                    this.message(resp)
                })
                .catch((err) => {
                    // Code called when an error occurs during the request
                    this.message(err)
                    alert('Error: ' + err.message);
                });
        },


        message(msg){
            document.getElementById('msg').innerHTML=JSON.stringify(msg)
        }
  },
};
</script>

<style scoped>

</style>