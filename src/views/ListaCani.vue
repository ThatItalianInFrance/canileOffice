<script setup>
// REMEBER TO IMPORT REF
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { getUserToken } from '/utils'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// let check = JSON.parse(localStorage.getItem('user'))
// console.log(check.token)

// ref must be used for responsive data - use .value to assign or read
let dogs = ref([])
let searchTerm = ref('')

let loadDogs = function (searchTerm) {
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
      dogs.value = foo.data;
      dogs.value = dogs.value.filter(dog => dog.nome.toLowerCase().includes(searchTerm.toLowerCase()));

      console.log(dogs.value)
      // console.log(cani)
    })
}

watch(searchTerm, (newSearchTerm, oldSearchTerm) => {
  loadDogs(searchTerm.value);
})

loadDogs()
console.log(dogs.value)
</script>

<template>
  <main class="container-fluid my-4">
    <h3>Dogs list</h3>
    <p>Overview of registered dogs</p>
    <div class="input-group mb-3">
      <input v-model="searchTerm" placeholder="Enter dog name..." class="form-control">
      <div class="input-group-append">
        <span class="input-group-text">
          <i class="bi bi-search"></i><!-- Assuming you're using Bootstrap Icons -->
        </span>
      </div>
    </div>
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Chip</th>
          <th scope="col">Biter</th>
          <th scope="col">Breed</th>
          <th scope="col">Size</th>
          <th scope="col">Sex</th>
          <th scope="col">Character</th>
          <th scope="col">Age / birth</th>
          <th scope="col">Health Issues</th>
          <th scope="col">Alive</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dog in dogs" :key="dog.id">
          <td><router-link :to="{ path: '/cani/edit/' + dog.id }">{{ dog.nome }}</router-link></td>

          <td>{{ dog.chip }}</td>
          <td :class="dog.morsicatore === 'yes' ? 'status-inactive' : 'status-active'">
            {{ dog.morsicatore }}
          </td>



          <td>{{ dog.razza }}</td>
          <td>{{ dog.taglia }}</td>
          <td>{{ dog.sesso }}</td>
          <td>{{ dog.carattere }}</td>
          <td>{{ dog.birth }}</td>
          <td>{{ dog.patologie }}</td>
          <td class="status-active">{{ dog.alive }}</td>

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
}
</style>