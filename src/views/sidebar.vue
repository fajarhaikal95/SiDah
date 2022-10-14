<template>
    <div>
        <VueSidebarMenuAkahon />
        <b-button variant="success" id="berhasil">
              Add Data +
            </b-button>
    </div>
  </template>
  
  <script>
    import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";
    
    export default {
    name:'todoItem',
      components: {VueSidebarMenuAkahon},
      data() {
        return {}
      }
      // berhasil(){
      //    Swal.fire(
      //      'Good job!',
      //      'You clicked the button!',
      //      'success'
      //    )
      //  }
    }
  </script>