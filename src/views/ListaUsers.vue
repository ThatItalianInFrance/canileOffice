<script setup>
// REMEBER TO IMPORT REF
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import 'bootstrap-icons/font/bootstrap-icons.css';


// let check = JSON.parse(localStorage.getItem('user'))
// console.log(check.token)

// ref must be used for responsive data - use .value to assign or read
let users = ref([])
let searchTerm = ref('')

let loadUsers = function (searchTerm) {
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
    .then(function (foo) {
      users.value = foo.data
      users.value = users.value.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
      console.log(users.value)
      // console.log(cani)
    })
}

watch(searchTerm, (newSearchTerm, oldSearchTerm) => {
  loadUsers(searchTerm.value);
})

loadUsers()
console.log(users.value)
</script>

<template>
 
  <div class="card p-4 shadow">
    <div class="d-flex justify-content-between">
      <div class="">
        <h3 class="fw-bold">User List</h3>
        <p>Overview of registered users</p>
      </div>
      <div class="my-auto">
        <button class="btn btn-outline-secondary mx-2" type="button">...</button>
        <button class="btn btn-outline-secondary">All users</button>
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
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Status</th>
          <th scope="col">Date Added</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td><router-link :to="{ path: '/users/edit/' + user.id }">{{ user.username }}</router-link></td>
          <td>{{ user.email }}</td>
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
  </div>






</template>
<script></script>
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
  color: #5cb85c; /* Bootstrap 'success' color */
}

.status-pending {
  font-weight: bold;
  color: #f0ad4e; /* Bootstrap 'warning' color */
}

.status-inactive {
  font-weight: bold;
  color: #d9534f; /* Bootstrap 'danger' color */
}
</style>