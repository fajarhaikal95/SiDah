<template>
    <div class="about container">

        <sidebar-menu :menu="menu" :collapsed="true" :width="'230px'"/> <!-- Bagian SideBar -->
        
        <H1>INI NANTI ISINYA PAKE CHART</H1>
        <div class="embed-responsive embed-responsive-21by9">
        </div><b-button @click="openModalLogout">logout</b-button>
    </div>
  </template>
  
  <script> 
    import axios from "axios"
    import Swal from 'sweetalert2'
  
    export default {
      name:'dashboardPage',

      data() {
        return {
          menu: [
                  {
                    header: true,
                    title: 'Main Navigation',
                    hiddenOnCollapse: true,
                  },
                  {
                    href: '/dashboard',
                    title: 'Dashboard',
                    icon: 'fa-solid fa-house-user'
                  },
                  {
                    href: '/tamu',
                    title: 'Tamu',
                    icon: 'fa-solid fa-user-tag',
                  },
                  {
                    href: '/bukutamu',
                    title: 'Buku Tamu',
                    icon: 'fa-solid fa-user-pen',
                  },
                  {
                    href: '',
                    title: 'Logout',
                    icon: 'fa-solid fa-right-from-bracket',
                    components: import(this.$bvModal.show='openModalLogout'),
                  },
          ],
        }
      },            

      methods: {
        openModalLogout(){
          Swal.fire({
            title: 'Apakah Ingin Logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya, Logout!'
            }).then((result) => {
                  if (result.isConfirmed) {
                  //  do logout function
                  this.runLogout()
                  }
            })
        },
        runLogout(){
          const data = {
            email: localStorage.getItem('email'),
            password: 'maulana123'
          }

          axios.get('http://localhost:8000/logout', data)
          .then(()=> {
            localStorage.clear();
            this.$router.push('/');
          })
          .catch(err => {
            console.log(err.response, "error...");
          })
        }
      }
    }
    </script>
  