<script setup>
// REMEBER TO IMPORT REF
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getUserToken } from '/utils'

// let check = JSON.parse(localStorage.getItem('user'))
// console.log(check.token)

// ref must be used for responsive data - use .value to assign or read
let products = ref([])

let loadProducts = function () {
  // check = JSON.parse(localStorage.getItem('user'))
  // console.log('ciccio' + check.token)
  fetch(`${import.meta.env.VITE_SERVER}/office/cani`, {
    method: 'GET',
    // withCredentials: true,
    // credentials: 'include',
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
      'Content-Type': 'application/json'
    }
  }) // par défaut, fetch() fait une requête GET
    .then(function (response) {
      return response.json()
    })
    .then(function (cani) {
      products.value = cani.data
      console.log(products.value)
      // console.log(cani)
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
          <th scope="col">Morsicatore</th>
          <th scope="col">Taglia</th>
          <th scope="col">Sesso</th>
          <th scope="col">Mantello</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="product in products" :key="product.id">
          <th scope="row">{{ product.id }}</th>
          <td> <router-link :to="{ path: '/cani/edit/' + product.id }">{{ product.nome }}</router-link>
          </td>
          <td>{{ product.morsicatore }}</td>
          <td>{{ product.taglia }}</td>
          <td>{{ product.sesso }}</td>
          <td>{{ product.mantello }}</td>
        </tr>

      </tbody>
    </table>

  </main>
</template>
<script></script>
