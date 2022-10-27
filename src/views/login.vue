<template>
<div id="app">
   <b-card class="p-2">
      <div class="login-page">
         <div class="container">
            <div class="row">
               <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
                  <div class="card login">
                     <h1><img src="../assets/sidah.png" style="width: 150px; height: 150px;" /></h1>
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
export default{
   name:'todoItem',
   data(){
      return{
         emailLogin: null,
         passwordLogin: null
      }
   },
   methods:{
      login(){
         let data ={
            email: this.emailLogin,
            password: this.passwordLogin
         }
         axios.post("http://localhost:8000/login", data, {
            
            headers:{
               'x-api-key': 'smkyaj'
            }
         })

         
         .then(({data}) => {
            console.log(data)
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("email", data.data.user.email);
            if (data.data.roles === 1){
               console.log('satu')
                 this.$router.push('/dashboard')
            }else{
               console.log('dua')
                 this.$router.push('/tamu')
            }
            
         })

         .catch(error=>{
            console.log(error)
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Something went wrong!',
            })
         })
      }
   }
}
</script>