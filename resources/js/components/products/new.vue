<script  setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
let form = ref({

    name: '',
    description: '',
    photo: '',
    type: '',
    quantity: '',
    price: ''
})

const  router = useRouter()

const getPhoto = () =>{
    let photo = "/upload/image.png"
    if ( form.value.photo) {
        if (form.value.photo.indexOf('base64') != -1){
            photo = form.value.photo
        }else{
            photo = '/upload/'+form.value.photo
        }
    }
    return  photo
}

const updatePhoto = (e) => {

    let file = e.target.files[0];
    let reader = new FileReader();
    let limit = 1024 * 1024 * 2;
    if (file['size'] > limit ){
        return false
    }
    reader.onloadend = (file) => {
        form.value.photo = reader.result;
    }
    reader.readAsDataURL(file);
}

const saveProduct = () => {

    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('description', form.value.description)
    formData.append('photo', form.value.photo)
    formData.append('type', form.value.type)
    formData.append('quantity', form.value.quantity)
    formData.append('price', form.value.price)

    axios.post("/api/add_product/", formData)
    .then((response)=> {
        form.value.name ='',
        form.value.description ='',
        form.value.photo = '',
        form.value.type = '',
        form.value.quantity = '',
        form.value.price = '',

        router.push('/')

        toast.fire({
            icon:"success",
            title: "product add successfully"
        })

    })
    .catch((error)=> {

    })
}


</script>
<template>
    <div class="container">
        <div class="products__create ">

            <div class="products__create__titlebar dflex justify-content-between align-items-center">
                <div class="products__create__titlebar--item">

                    <h1 class="my-1">Add Product</h1>
                </div>
                <div class="products__create__titlebar--item">

                    <button class="btn btn-secondary ml-1"  @click="saveProduct()">
                       Save
                    </button>
                </div>
            </div>

            <div class="products__create__cardWrapper mt-2">
                <div class="products__create__main">
                    <div class="products__create__main--addInfo card py-2 px-2 bg-white">
                        <p class="mb-1">Name</p>
                        <input type="text" class="input" v-model="form.name">

                        <p class="my-1">Description (optional)</p>
                        <textarea cols="10" rows="5" class="textarea"  v-model="form.description"></textarea>

                        <div class="products__create__main--media--images mt-2">
                            <ul class="products__create__main--media--images--list list-unstyled">
                                <li class="products__create__main--media--images--item">
                                    <div class="products__create__main--media--images--item--imgWrapper">
                                        <img class="products__create__main--media--images--item--img" alt="" :src="getPhoto()" />
                                    </div>
                                </li>
                                <!-- upload image small -->
                                <li class="products__create__main--media--images--item">
                                    <form class="products__create__main--media--images--item--form">
                                        <label class="products__create__main--media--images--item--form--label" for="myfile">Add Image</label>
                                        <input class="products__create__main--media--images--item--form--input" type="file" id="myfile"  @change="updatePhoto">
                                    </form>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>
                <div class="products__create__sidebar">
                    <!-- Product Organization -->
                    <div class="card py-2 px-2 bg-white">

                        <!-- Product unit -->
                        <div class="my-3">
                            <p>Product type</p>
                            <input type="text" class="input" v-model="form.type" >
                        </div>
                        <hr>

                        <!-- Product invrntory -->
                        <div class="my-3">
                            <p>Inventory</p>
                            <input type="text" class="input"  v-model="form.quantity">
                        </div>
                        <hr>

                        <!-- Product Price -->
                        <div class="my-3">
                            <p>Price</p>
                            <input type="text" class="input"  v-model="form.price">
                        </div>
                    </div>

                </div>
            </div>
            <!-- Footer Bar -->
            <div class="dflex justify-content-between align-items-center my-3">
                <p ></p>
                <button class="btn btn-secondary"  @click="saveProduct()">Save</button>
            </div>

        </div>


    </div>

</template>
