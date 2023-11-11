<script setup>
// REMEBER TO IMPORT REF
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { getUserToken } from '/utils'
import 'bootstrap-icons/font/bootstrap-icons.css';

// let check = JSON.parse(localStorage.getItem('user'))
// console.log(check.token)

// ref must be used for responsive data - use .value to assign or read 
let dogs = ref([])
let searchTerm = ref('')

let loadDogs = function () {
  // check = JSON.parse(localStorage.getItem('user'))
  // console.log('ciccio' + check.token)
  fetch(`${import.meta.env.VITE_SERVER}/office/food`, {
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
      dogs.value = foo.data;
      dogs.value = dogs.value.filter(dog => dog.name.toLowerCase().includes(searchTerm.value.toLowerCase()));

      console.log(dogs.value)
      // console.log(cani)
    })
}
loadDogs();
watch(searchTerm, () => {//newSearchTerm, oldSearchTerm
  loadDogs();
})


console.log(dogs.value)
</script>

<template>
  <main>
    <div class="card shadow">
      <div class="card-body">
        <h3>Food list</h3>
        <p>Overview of registered food</p>
        <div class="input-group mb-3">
          <div class="input-group-append">
            <span class="input-group-text">
              <i class="bi bi-search"></i><!-- Assuming you're using Bootstrap Icons -->
            </span>
          </div>
          <input v-model="searchTerm" placeholder="Enter food name..." class="form-control">
        </div>
        <table class="table table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Desciption</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dog in dogs" :key="dog.id">
              <td>{{ dog.id }}</td>
              <td><router-link :to="{ path: '/food/edit/' + dog.id }">{{ dog.name }}</router-link></td>
              <td>{{ dog.type }}</td>
              <td>{{ dog.description }}</td>
            </tr>
            <!-- Additional rows as needed -->
          </tbody>
        </table>
      </div>
    </div>
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
}
</style>
