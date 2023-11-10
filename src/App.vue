<script setup>
import { RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue'
import NavBar from './components/NavBar.vue'
// import HelloWorld from './components/HelloWorld.vue'

// console.log(import.meta.env)
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <NavBar />
      </div>
    </div>

    <div class="row">
      <div class="col-2 bg-body-tertiary">
        <SideBar />
      </div>
      <div class="col-10 py-3 px-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
