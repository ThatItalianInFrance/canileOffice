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
  fetch(`${import.meta.env.VITE_SERVER}/office/users`, {
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
    .then(function (users) {
      products.value = users.data
      console.log(products.value)
      // console.log(cani)
    })
}

loadProducts()
console.log(products.value)
</script>

<template>
  <main class="container-fluid my-4">
    <h3>Lista Utenti</h3>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">User name</th>
          <th scope="col">email</th>
          <th scope="col">tipo</th>
       
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="product in products" :key="product.id">
          <th scope="row">{{ product.id }}</th>
          <td> <router-link :to="{ path: '/users/edit/' + product.id }">{{ product.username }}</router-link>
          </td>
          <td>{{ product.email }}</td>
          <td>{{ product.tipo }}</td>

        </tr>

      </tbody>
    </table>

  </main>
</template>
<script></script>
