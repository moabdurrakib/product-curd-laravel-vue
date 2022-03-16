require('./bootstrap');

import Swal from 'sweetalert2/dist/sweetalert2.min.js'
import 'sweetalert2/dist/sweetalert2.min.css'

window.Swal = Swal;
const toast = Swal.mixin({
    toast:true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar:true
});
 window.toast = toast;

import { createApp } from "vue";
import router from "./router"
import  App from "./components/App.vue"
createApp(App).use(router).mount("#app")
