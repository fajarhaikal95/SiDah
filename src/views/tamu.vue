<template>
    <div class="about container">
        <sidebar-menu :menu="menu" /> <!-- ini Sidebar ya -->
        <div class="d-flex justify-content-between my-2">
            <h1><b-img thumbnail fluid src="../assets/sidah.png" alt="Image 1"></b-img>Data Tamu</h1>
            
          
  
  <!-- ------------------------------------ Bagian Modal Form Tamu ------------------------------------------- --> 
            <b-button variant="success" @click="$bvModal.show('modal-scoped')">Add Data +</b-button>
            <b-modal id="modal-scoped" class="m-2">
                <template #modal-header="{}"> 
                  <h5>Tambah Data Tamu</h5>
                </template>
  
                <template #default="{}">
                    <div>
                        <b-form>
  
                          <b-form-group label="Nama Tamu" class="mb-2">
                            <b-form-input
                              type="text"
                              placeholder="Nama"
                              required
                            ></b-form-input>
                          </b-form-group>
  
                          <b-form-group label="Instansi Tamu:" class="mb-2">
                            <b-form-input
                              type="text"
                              placeholder="Instansi"
                              required
                            ></b-form-input>
                          </b-form-group>
  
                          <b-form-group label="Kontak:" class="mb-2">
                            <b-form-input
                              type="number"
                              placeholder="Kontak"
                              required
                            ></b-form-input>
                          </b-form-group>
                          
                          <b-form-group>                    
                            <b-button type="submit" variant="primary" class="mr-10">Submit</b-button>
                            <b-button type="reset" variant="danger">Reset</b-button>
                          </b-form-group>  
                        </b-form>
                    </div>
                </template>
                            
            </b-modal>
        </div>
  
  <!-- -------------------------------------Bagian Tabel Tamu--------------------------------------------------  -->
      <table class="table">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Nama</th>
        <th scope="col">Instansi</th>
        <th scope="col">No Telpon</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, i) in listTable " :key="i"> 
        <td>{{i+1}}</td>
        <td>{{data.name}}</td>
        <td>Dinas Kota Depok</td>
        <td>08987654321</td>
      </tr>
    </tbody>
  </table>
    </div>
  </template>
  
  <script> 
    import axios from "axios"
    // import Swal from "sweetalert2"
  
  export default {
    name:'todoItem',
    data() {
      return {
        menu: [
                      {
                          header: true,
                          title: 'Main Navigation',
                          hiddenOnCollapse: true
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
                          // child: [
                          //     {
                          //         href: '/charts/sublink',
                          //         title: 'Sub Link'
                          //     }
                          // ]
                      },
                      {
                          href: '/bukutamu',
                          title: 'Buku Tamu',
                          icon: 'fa-solid fa-user-pen',
                          // child: [
                          //     {
                          //         href: '/charts/sublink',
                          //         title: 'Sub Link'
                          //     }
                          // ]
                      }
                  ],
        listTable: []
      }
    },
    
    
  
    mounted() {
      this.getUserData()
    },
    methods: {
      getUserData() {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(({data}) => {
          this.listTable = data 
          console.log(this.listTable)
        })
      },
      // berhasil(){
      //   Swal.fire(
      //     'Good job!',
      //     'You clicked the button!',
      //     'success'
      //   )
      // }
    }
  }
    </script>
  
  