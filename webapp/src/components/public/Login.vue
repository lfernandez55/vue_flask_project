<template>
    <div id="login">
        <h1>Loginz {{input.username}}</h1>
        <input type="text"  v-model="input.username" placeholder="Username" />
        <input type="password"  v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="login()">Login</button>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "jojo",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                console.log("aaaa")
                console.log(this.input.username)
                console.log("xxx")
                // this.$router.replace({ name: "secure" });
                if(this.input.username != "" && this.input.password != "") {
                    if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                        this.$emit("authenticated", true);
                        //this.$router.replace({ name: "secure" });
                    } else {
                        console.log("The username and / or password is incorrect");
                    }
                } else {
                    console.log("A username and password must be present");
                }
            }
        }
    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 50px;
        padding: 20px;
    }
</style>