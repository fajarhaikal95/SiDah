<template>
    <div class="about container">

        <sidebar-menu :menu="menu" style="width: 250px;"/> <!-- Bagian SideBar -->

        <div class="d-flex justify-content-between my-5"> <!-- Bagian Header -->
            <h1><img src="../assets/sidah.png" alt="Image 1" width="75px" height="75px" class="mx-3" />Data Buku Tamu</h1> 
            <b-button variant="success" @click="$bvModal.show('modal-scoped')" style=" position: relative; top:20px; height: 40px;">
              Add Data +
            </b-button>               
        </div>
           
        <b-modal id="modal-scoped" class="m-2"> <!--  Bagian Modal Form Tamu  -->
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
  
      <table class="table"> <!-- Bagian Tabel Buku Tamu  -->
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nama</th>
              <th scope="col">Instansi</th>
              <th scope="col">No Telpon</th>
              <th scope="col">Tujuan</th>
              <th scope="col">Keterangan</th>
              <th scope="col">TTD</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, i) in listTable " :key="i"> 
              <td>{{i+1}}</td>
              <td>{{data.nama_tamu}}</td>
              <td>{{data.instansi}}</td>
              <td>{{data.no_telpon}}</td>
              <td>Kepala Sekolah</td>
              <td>Keperluan Dinas</td>
              <td>url:asdasdasd/asadsasd</td>
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
                  },                    

          ],
          listTable: []
        }
      },            
    
      mounted() {
        this.getUserData()
      },

      methods: {
        getUserData() {
          axios.get('http://localhost:8000/tamu', {
            headers:{
              'x-api-key':'smkyaj'
            }
          })
          .then(({data}) => {
             this.listTable = data.data 
            console.log(data)
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
  