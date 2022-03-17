<script setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

let products = ref([])

onMounted(async() => {
    getProducts()
})

const newProduct =()=> {
    router.push('/product/new')
}

const getProducts = async() => {
    let response =await axios.get("/api/get_all_product")
    products.value = response.data.products
}

const ourImage = (img) => {
    return  "/upload/"+img
}

const onEdit = (id) =>{
    router.push('/product/edit/'+id)
}

const deleteProduct = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You can't go back",
        icon: "warning",
        showCancelButton:true,
        showConfirmButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonText:'#d33',
        confirmButtonText: "Yes, delete it!"
    })
    .then((result) =>{
        if(result.value){
        axios.get('/api/delete_product/'+id)
        .then(()=>{
            Swal.fire(
                'Delete',
                'Product delete successfully',
                'success'
            )
            getProducts()
        })
        .catch(()=>{

        })
        }
    })
}

</script>
<template>
    <div class="container">
        <div class="products__list table  my-3">

            <div class="customers__titlebar dflex justify-content-between align-items-center">
                <div class="customers__titlebar--item">
                    <h1 class="my-1">Products</h1>
                </div>
                <div class="customers__titlebar--item">
                    <button class="btn btn-secondary my-1" @click="newProduct" >
                        Add Product
                    </button>
                </div>
            </div>

            <div class="table--heading mt-2 products__list__heading " style="padding-top: 20px;background:#FFF">
                <!-- <p class="table--heading--col1">&#32;</p> -->
                <p class="table--heading--col1">image</p>
                <p class="table--heading--col2">
                    Product
                </p>
                <p class="table--heading--col4">Type</p>
                <p class="table--heading--col3">
                    Inventory
                </p>
                <!-- <p class="table--heading--col5">&#32;</p> -->
                <p class="table--heading--col5">actions</p>
            </div>

            <!-- product 1 -->
            <div class="table--items products__list__item" v-for="item in products" :key="item.id" v-if="products.length > 0" >
                <div class="products__list__item--imgWrapper">
                    <img class="products__list__item--img" :src="ourImage(item.photo)"  style="height: 40px;" v-if="item.photo">
                </div>
                <p class="table--items--col2">
                    {{ item.name}}
                </p>
                <p class="table--items--col2">
                    {{ item.type }}
                </p>
                <p class="table--items--col3">
                    {{ item.quantity }}
                </p>
                <div>
                    <button class="btn-icon btn-icon-success" @click="onEdit(item.id)" >
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="btn-icon btn-icon-danger"   @click="deleteProduct(item.id)">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <div class="table--items products__list__item" v-else>
                <p> Product not found</p>
            </div>
        </div>
    </div>
</template>


