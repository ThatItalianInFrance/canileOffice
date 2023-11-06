<script setup>
// REMEBER TO IMPORT REF
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getUserToken } from '/utils'

// let check = JSON.parse(localStorage.getItem('user'))
// console.log(check.token)

// ref must be used for responsive data - use .value to assign or read
let dogs = ref([])

let loadDogs = function () {
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
    .then(function (foo) {
      dogs.value = foo.data
      console.log(dogs.value)
      // console.log(cani)
    })
}

loadDogs()
console.log(dogs.value)
</script>

<template>
  <main class="container-fluid my-4">
    <h3>Dogs list</h3>
    <p>Overview of registered dogs</p>
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Size</th>
          <th scope="col">Character</th>
          <th scope="col">Age / birth</th>
          <th scope="col">Date Added</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dog in dogs" :key="dog.id">
          <td><router-link :to="{ path: '/cani/edit/' + dog.id }">{{ dog.nome }}</router-link></td>
          <td>{{ dog.email }}</td>
          <td>Administrator</td>
          <td class="status-active">Active</td>
          <td>2023-08-01</td>
        </tr>
        <tr>
          <td>John Smith</td>
          <td>john.smith@example.com</td>
          <td>User</td>
          <td class="status-pending">Pending</td>
          <td>2023-07-15</td>
        </tr>
        <tr>
          <td>Emily Johnson</td>
          <td>emily.johnson@example.com</td>
          <td>Editor</td>
          <td class="status-inactive">Inactive</td>
          <td>2023-06-20</td>
        </tr>
        <!-- Additional rows as needed -->
      </tbody>
    </table>



  </main>
</template>
<style scoped>
/* Custom styles for the user list table */
.table-hover tbody tr:hover {
  background-color: #f5f5f5;
}

.thead-dark th {
  background-color: #343a40;
  color: #fff;
}

/* Define or redefine status classes as needed */
.status-active {
  font-weight: bold;
  color: #5cb85c;
  /* Bootstrap 'success' color */
}

.status-pending {
  font-weight: bold;
  color: #f0ad4e;
  /* Bootstrap 'warning' color */
}

.status-inactive {
  font-weight: bold;
  color: #d9534f;
  /* Bootstrap 'danger' color */
}</style>