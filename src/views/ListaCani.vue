<script setup>
// REMEBER TO IMPORT REF
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// let check = JSON.parse(localStorage.getItem('user'))
// console.log(check.token)

// ref must be used for responsive data - use .value to assign or read
let products = ref([])

let loadProducts = function () {
  // check = JSON.parse(localStorage.getItem('user'))
  // console.log('ciccio' + check.token)
  fetch('http://localhost:8000/office/cani', {
    method: 'GET',
    // withCredentials: true,
    // credentials: 'include',
    // headers: {
    //   Authorization: `Bearer ${check.token}`,
    //   'Content-Type': 'application/json'
    // }
  }) // par défaut, fetch() fait une requête GET
    .then(function (response) {
      return response.json()
    })
    .then(function (contacts) {
      products.value = contacts
      console.log(products.value)
      console.log(contacts)
    })
}

loadProducts()
console.log(products.value)
</script>

<template>
  <main class="container-fluid my-4">
<h3>Lista Cani</h3>

  <table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Nome</th>
      <th scope="col">Carattere</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody class="table-group-divider" >
    <tr v-for="product in products" :key="product.id">
      <th scope="row" >{{ product.id }}</th>
      <td>  <router-link :to="{path:'/cani/edit/'+product.id}">{{ product.nome }}</router-link>
         </td>
      <td>{{ product.carattere }}</td>
      <td>@mdo</td>
    </tr>
    
  </tbody>
</table>

</main>
</template>
<script></script>
