

<template>
  <div>
    <nav class="navbar navbar-expand-lg">
     

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- sidenav -->
        <div class="flex-shrink-0 p-3 bg-white" style="width: 280px">
          <a
            href="/"
            class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
          >
            <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
            <span class="fs-2 fw-semibold">Canile di Mortara</span>
          </a>
          <ul class="list-unstyled ps-0">
            <li class="mb-1">
              <button
                class="btn btn-toggle align-items-center rounded collapsed fs-3"
                data-bs-toggle="collapse"
                data-bs-target="#home-collapse"
                aria-expanded="true"
              >
                Cani
              </button>
              <div class="collapse show" id="home-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small" >
                  <li><RouterLink to="/" class="fs-5">Home</RouterLink></li>
                  <li><RouterLink to="/about" class="fs-5">mappa</RouterLink></li>
                  <li class="nav-item " ><RouterLink class="nav-link active "  to="/listacani">Lista Cani</RouterLink></li>
                  <li class="nav-item " ><RouterLink class="nav-link active "  to="/cani/edit/0">Lista Cani</RouterLink></li>
                
                  <li><a href="/cani/edit/0" class="link-dark rounded nav-link active" ><h3>Nuovo Cane</h3></a></li>
                  <li><a href="#" class="link-dark rounded"><p class="fs-5"> Nuovo Cane</p></a></li>
                  <li><a href="#" class="link-dark rounded">Updates</a></li>
                  <li><a href="#" class="link-dark rounded">Reports</a></li>
                </ul>
              </div>
            </li>
            <li class="mb-1">
              <button
                class="btn btn-toggle align-items-center rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#dashboard-collapse"
                aria-expanded="false"
              >
                Dashboard
              </button>
              <div class="collapse" id="dashboard-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li><a href="#" class="link-dark rounded">Overview</a></li>
                  <li><a href="#" class="link-dark rounded">Weekly</a></li>
                  <li><a href="#" class="link-dark rounded">Monthly</a></li>
                  <li><a href="#" class="link-dark rounded">Annually</a></li>
                </ul>
              </div>
            </li>
            <li class="mb-1">
              <button
                class="btn btn-toggle align-items-center rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#orders-collapse"
                aria-expanded="false"
              >
                Orders
              </button>
              <div class="collapse" id="orders-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li><a href="#" class="link-dark rounded">New</a></li>
                  <li><a href="#" class="link-dark rounded">Processed</a></li>
                  <li><a href="#" class="link-dark rounded">Shipped</a></li>
                  <li><a href="#" class="link-dark rounded">Returned</a></li>
                </ul>
              </div>
            </li>
            <li class="border-top my-3"></li>
            <li class="mb-1">
              <button
                class="btn btn-toggle align-items-center rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#account-collapse"
                aria-expanded="false"
              >
                Account
              </button>
              <div class="collapse" id="account-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li><a href="#" class="link-dark rounded">New...</a></li>
                  <li><a href="#" class="link-dark rounded">Profile</a></li>
                  <li><a href="#" class="link-dark rounded">Settings</a></li>
                  <li><a href="#" class="link-dark rounded">Sign out</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <!-- sidenav -->
      </div>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        width="3"
      >
        <span class="navbar-toggler-icon"></span>
        <a>Menu</a>
      </button>
    </nav>
  </div>
</template>
<script>


</script>
<style scoped></style>
