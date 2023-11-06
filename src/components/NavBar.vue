<style scoped>
.bgprimary {
  background: #ddfcf3;
}

/* * {
  border: solid red 1px;
} */
</style>

<template>
  <div class="container">

    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Fixed top</a>
      </div>
    </nav>
  </div>
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
