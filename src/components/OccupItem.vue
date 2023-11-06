<style scoped>
</style>
<template>
  <div class="col-12">
    <div class="card shadow p-2 py-4 mb-3">
      <div class="d-flex">
        <div class="px-3">
          <pie-chart
            :data="[
              ['Empty', 44],
              ['Occupied', 23]
            ]"
            width="170px"
            height="170px"
            class=""
          ></pie-chart>
        </div>
        <div class="container">
          <div class="row">
            <h4 class="greeting fw-bold">{{ greeting }}</h4>
            <p class="small">comes handy with a pie!</p>
          </div>
          <div class="row">
            <div class="col-6">
              <h5>Dogs in shelter</h5>
              <p>{{ numberOfDogs }}</p>
            </div>
            <div class="col-6">
              <h5>Available Slots</h5>
              <p>100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const greeting = ref('Shelter occupancy component')
const numberOfDogs = ref(0) // Initialize with 0

// Assuming getUserToken is defined and accessible
// Uncomment the next line if you need to use an authorization token
// const token = getUserToken()

let loadDogs = function () {
  fetch(`${import.meta.env.VITE_SERVER}/office/cani`, {
    method: 'GET',
    headers: {
      // Uncomment the next line and replace `getUserToken` with the actual token if required
      // Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(function (data) {
      // Adjust this depending on the shape of the data returned by your server
      numberOfDogs.value = data.data.length // If the server returns an array of dogs
      console.log(data)
    })
    .catch(function (error) {
      console.error('Failed to load dogs:', error)
    })
}

// Call loadDogs on component mount
onMounted(loadDogs)
</script>
