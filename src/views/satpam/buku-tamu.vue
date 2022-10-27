<template>
  <div class="about container">

<sidebar-menu :menu="menu" :collapsed="true" :width="'230px'"/> <!-- Bagian SideBar -->

    <div class="d-flex justify-content-between my-3"> <!-- Bagian Header -->
      <h1>
        <img src="../../assets/sidah.png" width="75px" height="75px" class="mx-3"/>Data Buku Tamu
      </h1>
      <div
        onclick="window.open('/tambah-bukutamu', 'newwindow', 'width=450,height=750'); return false;"
      >
        <b-button
          variant="success"
          style="position: relative; top: 20px; height: 40px">
          Add Data +
        </b-button>
      </div>
    </div>

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

    <div style="overflow-x: auto; font-size: 12px"> <!-- Bagian Tabel Buku Tamu  -->
      <table class="table">
        <thead>
          <tr style="background-color: #c2c1c1">
            <th scope="col">Id</th>
            <th scope="col">Kode Tamu</th>
            <th scope="col">Tanggal</th>
            <th scope="col">Nama</th>
            <th scope="col">Instansi</th>
            <th scope="col">No Telpon</th>
            <th scope="col">Tujuan</th>
            <th scope="col">Keterangan</th>
            <th scope="col">TTD</th>
            <th scope="col" colspan="2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in listTable" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ data.kode_tamu != null ? data.kode_tamu : "-" }}</td>
            <td>{{ data.tanggal != null ? data.tanggal : "-" }}</td>
            <td>{{ data.tamu != null ? data.tamu.nama_tamu : "-" }}</td>
            <td>{{ data.tamu != null ? data.tamu.instansi : "-" }}</td>
            <td>{{ data.tamu != null ? data.tamu.no_telpon : "-" }}</td>
            <td>{{ data.tujuan != null ? data.tujuan.nama_tujuan : "-" }}</td>
            <td>{{ data.ket_tujuan != null ? data.ket_tujuan : "-" }}</td>
            <td>
              <!--{{data.tanda_tangan != null ? data.tanda_tangan : "-"}} -->
            </td>
            <td>
              <div
                class="d-flex justify-content-center"
                style="position: relative; text-align: center"
              >
                <b-button variant="warning" @click="modalUpdate(data.id_tamu)"
                  ><i class="fa-solid fa-pen-to-square"></i
                ></b-button>
                <b-button variant="primary" class="mx-1" @click="modalDelete(data.id_tamu)"
                  ><i class="fa-solid fa-trash"></i
                ></b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

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
// import Swal from "sweetalert2"

export default {
  name: "todoItem",
  
  data() {
    return {
      idBukuTamu: null,

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
        .get("http://localhost:8000/buku_tamu", {
          headers: {
            "x-api-key": "smkyaj",
          },
        })
        .then(({ data }) => {
          this.listTable = data.data;
          console.log(data.data);
        });
    },    

    modalDelete(id) { // JS Delete Tamu
        this.$bvModal.show("modal-delete");
        this.idBukuTamu = id;
        console.log(this.idTamu, "ini id tamu");
      },
    Delete() {      // JS Delete Tamu
        console.log(this.idBukuTamu, "ini delete");
        let data = {
          id: this.idBukuTamu,
        };
        axios
          .delete("http://localhost:8000/buku_tamu", {
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
}
</script>
