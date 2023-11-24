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
      users.value = users.value.filter(user => user.us_username.toLowerCase().includes(searchTerm.toLowerCase()));
      console.log(users.value)
    })
}

let deleteUser = async function (id) {
  if (id == 0) {
    console.log('id 0')
    return
  }
  let response = await fetch(`${import.meta.env.VITE_SERVER}/office/user/${id}`) // par défaut, fetch() fait une requête GET
  let json = await response.json()
  console.log(json.data)
  if (!json.data) {
    json.data = {}
  }

}


watch(searchTerm, (newSearchTerm, oldSearchTerm) => {
  loadUsers(searchTerm.value);
})

loadUsers(searchTerm.value)
</script>

<template>
  <main>
    <div class="card shadow">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div class="">
            <h3 class="fw-bold">User List</h3>
            <p>Overview of registered users</p>
          </div>
          <div class="my-auto mb-3">
            <RouterLink class="nav-link active btn btn-primary button mb-3 p-1" to="/users/edit/0">
              <span class="material-symbols-outlined">add</span> New user
            </RouterLink>
            <button class="btn btn-outline-secondary mx-2" type="button">...</button>
            <button class="btn btn-outline-secondary">All users</button>
          </div>
        </div>
<div class="table-responsive">

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
            <tr v-for="user in users" :key="user.us_id">
              <td><router-link :to="{ path: '/users/edit/' + user.us_id }">{{ user.us_username }}</router-link></td>
              <td>{{ user.us_email }}</td>
              <td>{{ user.us_role }}</td>
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
