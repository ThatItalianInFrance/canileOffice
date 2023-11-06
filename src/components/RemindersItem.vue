<style scoped>
/* Custom styles for the table */
.table-hover tbody tr:hover {
  background-color: #f5f5f5;
}

.thead-dark th {
  background-color: #343a40;
  color: #fff;
}

.priority-high {
  font-weight: bold;
  color: #d9534f; /* Bootstrap 'danger' color */
}

.priority-medium {
  font-weight: bold;
  color: #f0ad4e; /* Bootstrap 'warning' color */
}

.priority-low {
  font-weight: bold;
  color: #5cb85c; /* Bootstrap 'success' color */
}

.status-pending {
  color: #f0ad4e; /* Bootstrap 'warning' color */
  font-weight: bold;
}

.status-completed {
  color: #5cb85c; /* Bootstrap 'success' color */
  font-weight: bold;
}

.status-progress {
  color: #5bc0de; /* Bootstrap 'info' color */
  font-weight: bold;
}

</style>
<template>
  <div class="card p-4 shadow">
    <div class="d-flex justify-content-between">
      <div class="">
        <h3 class="fw-bold">To-do Reminder</h3>
        <p>Just in case you forgot :p</p>
      </div>
      <div class="my-auto">
        <button class="btn btn-outline-secondary mx-2" type="button">...</button>
        <button class="btn btn-outline-secondary">All reminders</button>
      </div>
    </div>
    
    <table class="table table-hover">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Action</th>
      <th scope="col">Subject</th>
      <th scope="col">Date</th>
      <th scope="col">Priority</th>
      <th scope="col">Status</th>
      <th scope="col">Assigned Dog</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Review</td>
      <td>Dog Adoption Application</td>
      <td>2023-10-01</td>
      <td class="priority-high">High</td>
      <td class="status-pending">Pending</td>
      <td>Buddy</td>
    </tr>
    <tr>
      <td>Update</td>
      <td>Shelter Capacity</td>
      <td>2023-10-02</td>
      <td class="priority-medium">Medium</td>
      <td class="status-completed">Completed</td>
      <td>Max</td>
    </tr>
    <tr>
      <td>Check</td>
      <td>Food Inventory</td>
      <td>2023-10-03</td>
      <td class="priority-low">Low</td>
      <td class="status-progress">In Progress</td>
      <td>Charlie</td>
    </tr>
    <!-- Additional rows as needed -->
  </tbody>
</table>

  </div>
</template>
<script setup></script>
