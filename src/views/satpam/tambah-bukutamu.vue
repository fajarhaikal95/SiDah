<template>
  <div style="text-align: left">
    <b-card title="Tambah Data Buku Tamu" style="max-width: 600px" class="mb-2">
      
      <b-form @submit.prevent="submitBukutamu"> 

        <b-form-group label="Nama Tamu" class="mb-2">          
          <b-form-select v-model="tamuSelect" class="mb-2" required @change="selectTamu">
            <b-form-select-option :value="null" selected>
              pilih tamu
            </b-form-select-option>
            <b-form-select-option v-for="data in listTable" :key="data.id_tamu" :value="data.id_tamu">
              {{ data.nama_tamu != null ? data.nama_tamu : "-" }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>

        <b-form-group label="Instansi Tamu:" class="mb-2">
          <b-form-input type="text" placeholder="instansi" disabled v-model="instansiTambah">
          </b-form-input>
        </b-form-group>

        <b-form-group label="Nomor Telpon:" class="mb-2">
          <b-form-input type="text" placeholder="no_telpon" disabled v-model="noTelponTambah">
          </b-form-input>
        </b-form-group>

        <b-form-group label="Tujuan" class="mb-2">
          <b-form-select v-model="tujuanSelect" class="mb-2" required>
            <b-form-select-option :value="null">
              Please select an option
            </b-form-select-option>
            <b-form-select-option value="1">
              Kepala Sekolah
            </b-form-select-option>
            <b-form-select-option value="2">
              Kurikulum
            </b-form-select-option>
            <b-form-select-option value="3">
              Kesiswaan
            </b-form-select-option>
            <b-form-select-option value="4">
              Hubungan Industri
              </b-form-select-option>
            <b-form-select-option value="5">
              Sarana Prasarana
            </b-form-select-option>
            <b-form-select-option value="6">
              Tata Usaha
              </b-form-select-option>
            <b-form-select-option value="7">
              Umum
            </b-form-select-option>
            <b-form-select-option value="8">
              Guru
            </b-form-select-option>
            <b-form-select-option value="9">
              Wali Kelas
            </b-form-select-option>
          </b-form-select>
        </b-form-group>

        <b-form-group label="Keterangan" class="mb-2">
          <b-form-textarea id="textarea" v-model="keteranganTambah" placeholder="Enter something..." rows="1" max-rows="4">
          </b-form-textarea>
        </b-form-group>

        <b-form-group label="Tanda Tangan" class="mb-2">
          <b-form-textarea id="textarea" v-model="ttdTambah" placeholder="Enter something..." rows="1" max-rows="4">
          </b-form-textarea>
        </b-form-group>

        <b-form-group>
          <b-button type="submit" variant="primary" class="mx-2">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form-group>
      </b-form>
    </b-card>
  </div>
</template>

<script>
  import axios from "axios"
  import Swal from "sweetalert2"

  export default {
    name: "todoItem",

    data() {
      return {
        tanggal: null,
        idTamu:null,
        tamuSelect: null,
        instansiTambah: null,
        noTelponTambah: null,
        tujuanSelect: null,
        keteranganTambah: null,
        ttdTambah: null,
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
          });
      },
      selectTamu() {
        axios
        .get(`http://localhost:8000/detailtamu/${this.tamuSelect}`)
        .then(({ data }) => {
            this.instansiTambah = data.data.instansi;
            this.noTelponTambah = data.data.no_telpon;
            this.idTamu = this.tamuSelect;
          })
          .catch(() => {
          });
      },

      submitBukutamu() {   
             // JS Submit Buku Tamu  

        let newDate = '';
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1;
        var date = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        newDate = `${year}-${month}-${date}`

        let data = {
          tanggal: newDate,
          id_tamu: this.idTamu,
          id_tujuan: this.tujuanSelect,
          ket_tujuan: this.keteranganTambah,
          tanda_tangan: this.ttdTambah,
        };


        axios
          .post("http://localhost:8000/buku_tamu", data)

          .then(() => {
            Swal.fire( "Berhasi !", "Data Berhasil di Input!", "success",)
            .then(()=>{
              window.close()
            });
            this.getUserData();
            
          })

          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.message,
            });
          });
      },
    },
  };
</script>
