<template>
<div id="app">
<b-card class="p-2">
   <div class="login-page">
      <transition name="fade">
         <div v-if="!registerActive" class="wallpaper-login"></div>
      </transition>
      <div class="wallpaper-register"></div>

      <div class="container">
         <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
               <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">
                  <h1 class="mt-4">Sign In</h1>
                  <form class="form-group p-4">
                     <input v-model="emailLogin" type="email" class="form-control mb-4" placeholder="Email" required>                     
                     <input v-model="passwordLogin" type="password" class="form-control mb-4" placeholder="Password" required> 
                     <router-link to="/dashboard"><b-button variant="primary" class="mb-4">Submit</b-button></router-link>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</b-card>
</div>
</template>
