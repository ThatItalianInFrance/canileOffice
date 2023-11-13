<script setup>
import { ref, watch } from 'vue';

let news = ref([])
let searchTerm = ref('')

let loadNews = function () {
  // check = JSON.parse(localStorage.getItem('user'))
  // console.log('ciccio' + check.token)
  fetch(`${import.meta.env.VITE_SERVER}/office/news`, {
    method: 'GET',
    // withCredentials: true,
    // credentials: 'include',
    headers: {
      // Authorization: `Bearer ${getUserToken()}`,
      'Content-Type': 'application/json'
    }
  }) // par défaut, fetch() fait une requête GET
    .then(function (response) {
      return response.json()
    })
    .then(function (foo) {
      news.value = foo.data;
      news.value = news.value.filter(news => news.title.toLowerCase().includes(searchTerm.value.toLowerCase()));

      console.log(news.value)
      // console.log(cani)
    })
}

watch(searchTerm, () => { //newSearchTerm, oldSearchTerm
  loadNews(searchTerm.value);
})

loadNews();
</script>

<template>
  <main>
    <div class="card shadow">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div class="">
            <h3 class="fw-bold">News List</h3>
            <p>Overview of news articles</p>
          </div>
          <div class="my-auto">
            <button class="btn btn-outline-success mx-2" type="button">New Article</button>
            <button class="btn btn-outline-secondary">All news</button>
          </div>
        </div>

        <table class="table table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Date Start</th>
              <th scope="col">Date End</th>
              <th scope="col">Content</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in news" :key="item.id">
              <td>{{ item.id }}</td>
              <td><router-link :to="{ path: '/news/' + item.id }">{{ item.title }}</router-link></td>
              <td>{{ item.date_start }}</td>
              <td>{{ item.date_end }}</td>
              <td>{{ item.content }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Custom styles for the news list table */
.table-hover tbody tr:hover {
  background-color: #f5f5f5;
}

.thead-dark th {
  background-color: #343a40;
  color: #fff;
}
</style>
