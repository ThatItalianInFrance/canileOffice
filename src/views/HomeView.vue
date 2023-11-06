<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import OccupItem from '../components/OccupItem.vue'
import RemindersItem from '../components/RemindersItem.vue'
</script>

<template>
  <main>
    <div class="container-fluid my-3">
      <div class="row">
        <div class="col-6">
          <OccupItem />

        </div>
        <div class="col-12">
          <RemindersItem />

        </div>
      </div>
    </div>
  </main>
</template>
