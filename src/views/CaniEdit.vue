<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { reactive } from 'vue'

const name = ref("")
console.log('products edit page script setup run')
const route = useRoute()
let id = route.params.id
console.log(id)

// id == 0 ? () => id = 1 : "";


let txt = ref()
let desc = ref()
let price = ref()
let products = ref({})
// const check = JSON.parse(localStorage.getItem('user'))
let loadProduct = function (id) {

  if (id == 0) {
    console.log('id 0')
    products.value = [
      { id: 'new id', name: 'new name', description: 'new description', price: 'new price' }
    ]
    return
  }
  fetch(`http://localhost:8000/office/cani/${id}`) // par défaut, fetch() fait une requête GET
    .then(function (response) {
      return response.json()
    })
    .then(function (contacts) {
      console.log(contacts)
      products.value = contacts
    })
}
loadProduct(id)
console.log(products.value)

let SaveCane = async function (product) {

  console.log(txt.value);
  if (id == 0) {
    if (!txt.value) {
  txt.value = 'toto'
} else {
  
}
    // product = await fetch('http://localhost:8000/office/products/', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${check.token}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     name: txt.value,
    //     description: desc.value,
    //     price: price.value
    //   })
    // })
   
   
  } else {



    // product = await fetch('http://localhost:8000/office/products/'+id, {
    //   method: 'PUT',
    //   headers: {
    //     'Authorization': `Bearer ${check.token}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     name: txt.value,
    //     description: desc.value,
    //     price: price.value
    //   })
    // })
    
  }
  console.log('saveproduct fired')
  console.log(product)
  console.log(txt.value)
  console.log(desc.value)
  // window.location.href = '/'
  
}


</script>

<template>
  <main class="container my-5" message="stocazzo">
    <h1 class="my-5">Edit Product Page</h1>

    <div v-for="product in products" :key="product.id">
      <div class="container">
        <div class="row">
          <div class="col-2">
            <h4>New values</h4>

            <div>
              <input
                type="text"
                v-model="name"
                Placeholder="text"
                class="hidden"
                style="visibility: hidden"
              />
           
            </div>
            <div><input type="text" v-model="txt" placeholder="text" class="" id="textinput" required/></div>
            <div><input type="text" v-model="desc" Placeholder="description" class="" /></div>
            <div><input type="text" v-model="price" Placeholder="price" class="" /></div>
            <button class="btn btn-success" @click="SaveCane()">edit</button>
            <button class="btn btn-danger" onclick="">cancel</button>
          </div>
          <div class="col-6">
            <h4>Old values</h4>
            <div class="my-2 bg-primary-subtle">{{ product.id }}</div>
            <div class="my-2 bg-primary-subtle">{{ product.nome }}</div>
            <div class="my-2 bg-primary-subtle">{{ product.carattere }}</div>
            <!-- <div class="my-2 bg-primary-subtle">{{ product.price }}</div> -->
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>

</script>