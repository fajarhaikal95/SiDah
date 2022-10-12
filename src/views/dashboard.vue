<template>
    <div class="about container">
        <sidebar-menu :menu="menu"/> <!-- ini Sidebar ya -->
        <div class="d-flex justify-content-between my-2">
            <h2>Buku Tamu Digital SMK YAJ</h2>
  
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
  
  <!-- -------------------------------------Bagian Tabel Buku Tamu---------------------------------------------  -->
      <table class="table">
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
        <td>{{data.name}}</td>
        <td>Dinas Kota Depok</td>
        <td>08987654321</td>
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
    import image from "../assets/sidah.png"
  
  export default {
    name:'todoItem',
              props: {

              // Sidebar Collapse state
              collapsed: {
                type: Boolean,
                default: false
              },

              // Sidebar width (expanded)
              width: {
                type: String,
                default: '150px'
              },

              // Sidebar width (collapsed)
              widthCollapsed: {
                type: String,
                default: '50px'
              },

              // Keep only one child opened at a time (first level only)
              showOneChild: {
                type: Boolean,
                default: false
              },

              // Keep all child open
              showChild: {
                type: Boolean,
                default: false
              },

              // Sidebar right to left
              rtl: {
                type: Boolean,
                default: false
              },

              // Make sidebar relative to the parent (by default the sidebar is relative to the viewport)
              relative: {
                type: Boolean,
                default: false
              },

              // Hide toggle collapse btn
              hideToggle: {
                type: Boolean,
                default: false
              },

              // Sidebar theme (available themes: 'white-theme')
              theme: {
                type: String,
                default: ''
              },

              // Disable hover on collapse mode
              disableHover: {
                type: Boolean,
                default: false
              }
          },
    data() {
      return {
        menu: [
                      {
                          header: true,
                          title: 'Main Navigation',
                          hiddenOnCollapse: true,
                          image: image
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
  