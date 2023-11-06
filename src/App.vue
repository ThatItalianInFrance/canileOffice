<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue'
import NavBar from './components/NavBar.vue'
// import HelloWorld from './components/HelloWorld.vue'

// console.log(import.meta.env)
</script>

<template>
  <div class="">
    <div class="row">
      <div class="col-12">
        <NavBar />
      </div>
    </div>
    <div class="">
      
      <div class="row m-0">
        <div class="col-2 p-0"><SideBar /></div>
        <div class="col-10"><RouterView /></div>
        
      </div>
    </div>
  </div>

  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
</template>

<style scoped></style>
