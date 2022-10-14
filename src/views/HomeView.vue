

<template>
<div id="app">
   <b-card class="p-2">
      <div class="login-page">
         <div class="container">
            <div class="row">
               <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
                  <div class="card login">
                     <h1 class="mt-4">Sign In</h1>
                     <form class="form-group p-4">
                        <input v-model="emailLogin" type="email" class="form-control mb-4" placeholder="Email" required>                     
                        <input v-model="passwordLogin" type="password" class="form-control mb-4" placeholder="Password" required> 
                        <b-button @click="login()" variant="primary" class="mb-4">Submit</b-button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </b-card>
</div>
</template>

<script>
import axios from "axios"
import Swal from 'sweetalert2'

export default {
  data: () => {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      });
    },
  },
};
</script>