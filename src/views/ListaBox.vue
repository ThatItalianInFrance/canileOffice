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
  fetch(`${import.meta.env.VITE_SERVER}/office/stalli`, {
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
  <main>
    <div class="card shadow">
      <div class="card-body">
        <h3>Lista Box</h3>
<div class="table-responsive">

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">numero</th>
              <th scope="col">blocco</th>

            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="product in products" :key="product.id">
              <th scope="row">{{ product.id }}</th>
              <td> <router-link class="btn btn-dark" :to="{ path: '/box/edit/' + product.id }">{{ product.numero
              }}</router-link>
              </td>
              <td>{{ product.blocco }}</td>


            </tr>

          </tbody>
        </table>
      </div>
      </div>
    </div>
  </main>
</template>
<script></script>
