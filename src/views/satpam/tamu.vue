<template>
  <div class="about container">

<sidebar-menu :menu="menu" :collapsed="true" :width="'230px'"/> <!-- Bagian SideBar -->

    <div class="d-flex justify-content-between my-3"> <!-- Bagian Header -->
      <h1>
        <img src="../../assets/sidah.png" alt="Image 1" width="75px" height="75px" class="mx-3" />
        Data Tamu
      </h1>
      <b-button variant="success" @click="$bvModal.show('modal-scoped')" style="position: relative; top: 20px; height: 40px" >
        Add Data +
      </b-button>
    </div>

    <table class="table"> <!-- Bagian Tabel Tamu  -->
      <thead>
        <tr style="background-color: #c2c1c1">
          <th scope="col">Id</th>
          <th scope="col">Nama</th>
          <th scope="col">Instansi</th>
          <th scope="col">No Telpon</th>
          <th scope="col">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, i) in listTable" :key="i">
          <td>{{ i + 1 }}</td>
          <!-- <td>{{data.id_tamu}}</td> -->
          <td>{{ data.nama_tamu }}</td>
          <td>{{ data.instansi }}</td>
          <td>{{ data.no_telpon }}</td>
          <td>
            <div class="d-flex justify-content-center" style="position: relative; text-align: center">
              <b-button variant="warning" @click="modalUpdate(data.id_tamu)">
                <i class="fa-solid fa-pen-to-square"></i>
              </b-button>

              <b-button variant="primary" class="mx-1" @click="modalDelete(data.id_tamu)">
                <i class="fa-solid fa-trash"></i>
              </b-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <b-modal id="modal-scoped" class="m-2" hide-footer> <!--  Bagian Modal Tambah Form Tamu  -->
      <template #modal-header="{}">
        <h5>Tambah Data Tamu</h5>
      </template>
      <template #default="{}">
        <div>
          <b-form @submit.prevent="submit">
            <b-form-group label="Nama Tamu" class="mb-2">
              <b-form-input
                v-model="namaTamu"
                type="text"
                placeholder="Nama"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group label="Instansi Tamu:" class="mb-2">
              <b-form-input
                v-model="instansi"
                type="text"
                placeholder="Instansi"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group label="No Telpon:" class="mb-2">
              <b-form-input
                v-model="noTelpon"
                type="number"
                placeholder="Kontak"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-button type="submit" variant="primary" class="mx-2"
                >Submit</b-button>
              <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
            </b-form-group>
          </b-form>
        </div>
      </template>
    </b-modal>

    <b-modal id="modal-update" class="m-2" hide-footer> <!--  Bagian Modal Update Form Tamu  -->
      <template #modal-header="{}">
        <h5>Edit Data Tamu</h5>
      </template>
      <template #default="{}">
        <div>
          <b-form @submit.prevent="update">
            <b-form-group label="Nama Tamu" class="mb-2">
              <b-form-input
                v-model="namaTamuEdit"
                type="text"
                placeholder="Nama"
                required
              >
              </b-form-input>
            </b-form-group>

            <b-form-group label="Instansi Tamu:" class="mb-2">
              <b-form-input
                v-model="instansiEdit"
                type="text"
                placeholder="Instansi"
                required
              >
              </b-form-input>
            </b-form-group>

            <b-form-group label="No Telpon:" class="mb-2">
              <b-form-input
                v-model="noTelponEdit"
                type="number"
                placeholder="Kontak"
                required
              >
              </b-form-input>
            </b-form-group>

            <b-form-group>
              <b-button type="submit" variant="primary" class="mx-2"
                >Update</b-button
              >
              <b-button @click="$bvModal.hide('modal-update')" variant="danger"
                >Cencel</b-button
              >
            </b-form-group>
          </b-form>
        </div>
      </template>
    </b-modal>

    <b-modal id="modal-delete" class="m-2" hide-footer> <!--  Bagian Modal Delete Data  -->
      <template #modal-header="{}">
        <h5>Delete Data</h5>
      </template>
      <template #default="{}">
        <h3>Are sure want to delete ?</h3>
        <b-button variant="warning" @click="$bvModal.hide('modal-delete')"
          ><i class="fa-solid fa-xmark"></i
        ></b-button>
        <b-button variant="success" @click="Delete()" class="mx-2"
          ><i class="fa-solid fa-check"></i
        ></b-button>
      </template>
    </b-modal>
    
  </div>
</template>

<script>
  import axios from "axios";
  import Swal from "sweetalert2";

  export default {
    name: "todoItem",
    data() {
      return {
        idTamu: null,
        namaTamu: null,
        instansi: null,
        noTelpon: null,
        namaTamuEdit: null,
        instansiEdit: null,
        noTelponEdit: null,

        menu: [
          {
            header: true,
            title: "Main Navigation",
            hiddenOnCollapse: true,
          },
          {
            href: "/dashboard",
            title: "Dashboard",
            icon: "fa-solid fa-house-user",
          },
          {
            href: "/tamu",
            title: "Tamu",
            icon: "fa-solid fa-user-tag",
          },
          {
            href: "/bukutamu",
            title: "Buku Tamu",
            icon: "fa-solid fa-user-pen",
          },
          {
            href: "/#",
            title: "Logout",
            icon: "fa-solid fa-right-from-bracket",
          },
        ],
        listTable: [],
      };
    },

    mounted() {
      this.getUserData();
    },

    methods: {
      getUserData() {
        axios
          .get("http://localhost:8000/tamu", {
            headers: {
              "x-api-key": "smkyaj",
            },
          })
          .then(({ data }) => {
            this.listTable = data.data;
            console.log(data.data);
          });
      },

      submit() {        // JS Tambah Tamu 
        let data = {
          nama_tamu: this.namaTamu,
          instansi: this.instansi,
          no_telpon: this.noTelpon,
        };
        axios
          .post("http://localhost:8000/tamu", data, {
            headers: {
              "x-api-key": "smkyaj",
            },
          })

          .then(({ data }) => {
            console.log(data);
            Swal.fire("Good job!", "You clicked the button!", "success");
            this.getUserData();
            this.$bvModal.hide("modal-scoped");
          })

          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      },

      modalUpdate(id) { // JS Update Tamu
        this.$bvModal.show("modal-update");
        this.idTamu = id;
        console.log(this.idTamu, "ini id tamu");
        axios
          .get(`http://localhost:8000/detailtamu/${this.idTamu}`)
          .then(({ data }) => {
            console.log(data);
            this.namaTamuEdit = data.data.nama_tamu;
            this.instansiEdit = data.data.instansi;
            this.noTelponEdit = data.data.no_telpon;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      update() {        // JS Update Tamu
        let data = {
          id_tamu: this.idTamu,
          nama_tamu: this.namaTamuEdit,
          instansi: this.instansiEdit,
          no_telpon: this.noTelponEdit,
        };
        axios
          .put("http://localhost:8000/tamu", data)
          .then(({ data }) => {
            console.log(data);
            Swal.fire("Good job!", "You clicked the button!", "success");
            this.getUserData();
            this.$bvModal.hide("modal-update");
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      },

      modalDelete(id) { // JS Delete Tamu
        this.$bvModal.show("modal-delete");
        this.idTamu = id;
        console.log(this.idTamu, "ini id tamu");
      },
      Delete() {        // JS Delete Tamu
        console.log(this.idTamu, "ini delete");
        let data = {
          id_tamu: this.idTamu,
        };
        axios
          .delete("http://localhost:8000/tamu", {
            data: data,
          })

          .then((response) => {
            console.log(response);
            // this.getUserData()
            this.$bvModal.hide("modal-delete");
          });
        this.getUserData().catch((error) => {
          console.log(error);
        });
      },
    },
  };
</script>
