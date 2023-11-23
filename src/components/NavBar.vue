<style scoped>
.bgprimary {
  background: #ddfcf3;
}

.logo {
  height: 50px;
}
</style>

<template>
  <nav class="navbar fixed-top bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img src="http://localhost:8000/logo.png" class="logo">
      </a>
      <button
    class="btn btn-primary d-md-none"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#sidebar"
    aria-controls="sidebar"
  >
  <i class="bi bi-list"></i>
  </button>
    </div>
  </nav>
</template>

<script setup>
let navbar_height;
document.addEventListener("DOMContentLoaded", function () {
  // add padding top to show content behind navbar
  navbar_height = document.querySelector('.navbar').offsetHeight;
  document.body.style.paddingTop = navbar_height + 'px';
});
// DOMContentLoaded  end
</script>
