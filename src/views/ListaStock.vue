<script setup>
// REMEBER TO IMPORT REF
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { getUserToken } from '/utils'
import 'bootstrap-icons/font/bootstrap-icons.css';

// let check = JSON.parse(localStorage.getItem('user'))
// console.log(check.token)

// ref must be used for responsive data - use .value to assign or read 
let stock = ref([])
let searchTerm = ref('')

let loadStock = function () {
  // check = JSON.parse(localStorage.getItem('user'))
  // console.log('ciccio' + check.token)
  fetch(`${import.meta.env.VITE_SERVER}/office/stock`, {
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
      stock.value = foo.data;
      // stock.value = stock.value.filter(stock => stock.toLowerCase().includes(searchTerm.value.toLowerCase()));

      console.log(stock.value)
      // console.log(cani)
    })
}

watch(searchTerm, () => {//newSearchTerm, oldSearchTerm
  loadStock();
})

loadStock()
console.log(stock.value)

</script>

<template>
  <main>
    <div class="card shadow">
      <div class="card-body">
        <div class="d-flex justify-content-between ">
          <div>
            <h3>Stock list</h3>
            <p>Overview of registered stock</p>
          </div>
          <div>
            <RouterLink class="nav-link active btn btn-primary button mb-3" style="width: 220px; height:40px"
              to="/stock/edit/0">
              <span class="material-symbols-outlined">add</span> New stock movement
            </RouterLink>
            <RouterLink class="nav-link active btn btn-danger button mb-3" style="width: 220px; height:40px"
              to="/stock/edit/0">
              <span class="material-symbols-outlined">delete</span> Delete stock /!\
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
        <div class="table-responsive">

        <table class="table table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Description</th>
              <th scope="col">Q.ty in stock</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in stock" :key="item.id">
              <td>{{ item.id }}</td>
              <td><router-link :to="{ path: '/stock/edit/' + item.id }">{{ item.name }}</router-link></td>
              <td>{{ item.type }}</td>
              <td>{{ item.description }}</td>
              <td>compute data from stock_events</td>
            </tr>
            <!-- Additional rows as needed -->
          </tbody>
        </table>
      </div>
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
