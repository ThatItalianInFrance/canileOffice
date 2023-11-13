<script setup>
// REMEBER TO IMPORT REF
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { getUserToken } from '/utils'
import 'bootstrap-icons/font/bootstrap-icons.css';

// let check = JSON.parse(localStorage.getItem('user'))
// console.log(check.token)

// ref must be used for responsive data - use .value to assign or read 
let foods = ref([])
let searchTerm = ref('')

let loadFood = function () {
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
      foods.value = foo.data;
      foods.value = foods.value.filter(food => food.name.toLowerCase().includes(searchTerm.value.toLowerCase()));

      console.log(food.value)
      // console.log(cani)
    })
}

watch(searchTerm, () => {//newSearchTerm, oldSearchTerm
  loadFood();
})

loadFood()
console.log(foods.value)

</script>

<template>
  <main>
    <div class="card shadow">
      <div class="card-body">
        <div style="display:flex; justify-content: space-between; align-items: center;">
          <div>
            <h3>Food list</h3>
            <p>Overview of registered food</p>
          </div>
          <div>
            <RouterLink class="nav-link active btn btn-primary button mb-3" style="width: 220px; height:40px"
              to="/food/edit/0">
              <span class="material-symbols-outlined">add</span> New food
            </RouterLink>
            <RouterLink class="nav-link active btn btn-danger button mb-3" style="width: 220px; height:40px"
              to="/food/edit/0">
              <span class="material-symbols-outlined">delete</span> Delete food
            </RouterLink>
          </div>
        </div>
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
            <tr v-for="food in foods" :key="food.id">
              <td>{{ food.id }}</td>
              <td><router-link :to="{ path: '/food/edit/' + food.id }">{{ food.name }}</router-link></td>
              <td>{{ food.type }}</td>
              <td>{{ food.description }}</td>
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

.button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
