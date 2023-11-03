<style scoped>
.bgprimary {
  background: #ddfcf3;
}
* {border: solid red 1px;
}
</style>

<template class="vh-100">
  <div class="bgprimary">
    <nav class="navbar navbar-expand-lg bgprimary">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- sidenav -->
        <div class="flex-shrink-0 p-3 bgprimary" style="width: 280px">
          <a
            href="/"
            class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
          >
            <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
            <span class="fs-2 fw-semibold">Animal Shelter</span>
          </a>
          <ul class="list-unstyled ps-0">
            <li class="mb-1">
              <button
                class="btn btn-toggle align-items-center rounded collapsed fs-3"
                data-bs-toggle="collapse"
                data-bs-target="#home-collapse"
                aria-expanded="true"
              >
                <span class="material-symbols-outlined"> pets </span>
                Dogs
              </button>
              <div class="collapse" id="home-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li class="nav-item">
                    <RouterLink class="nav-link active fs-4" to="/listacani"
                      ><span class="material-symbols-outlined"> lists </span>Dog List</RouterLink
                    >
                  </li>
                  <li class="nav-item">
                    <RouterLink class="nav-link active fs-4" to="/cani/edit/0"
                      ><span class="material-symbols-outlined"> pet_supplies </span>New
                      dog</RouterLink
                    >
                  </li>
                </ul>
              </div>
            </li>
            <li class="mb-1">
              <button
                class="btn btn-toggle align-items-center rounded collapsed fs-3"
                data-bs-toggle="collapse"
                data-bs-target="#home1-collapse"
                aria-expanded="true"
              >
                <span class="material-symbols-outlined"> account_circle </span>
                Users
              </button>
              <div class="collapse" id="home1-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li class="nav-item">
                    <RouterLink class="nav-link active fs-4" to="/listausers"
                      ><span class="material-symbols-outlined"> person_search </span> Users
                      List</RouterLink
                    >
                  </li>
                  <li class="nav-item">
                    <RouterLink class="nav-link active fs-4" to="/users/edit/0"
                      ><span class="material-symbols-outlined"> person_add </span> New
                      User</RouterLink
                    >
                  </li>
                </ul>
              </div>
            </li>
            <li class="mb-1">
              <button
                class="btn btn-toggle align-items-center rounded collapsed fs-3"
                data-bs-toggle="collapse"
                data-bs-target="#structure-collapse"
                aria-expanded="false"
              >
                <span class="material-symbols-outlined"> living </span>
                Structure
              </button>
              <div class="collapse" id="structure-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li class="nav-item">
                    <RouterLink to="/about" class="nav-link active fs-4"
                      ><span class="material-symbols-outlined"> travel_explore </span
                      >Map</RouterLink
                    >
                  </li>
                  <li class="nav-item">
                    <RouterLink class="nav-link active fs-4" to="/listabox"
                      ><span class="material-symbols-outlined"> pet_supplies </span>Box
                      List</RouterLink
                    >
                  </li>
                </ul>
              </div>
            </li>
            <li class="mb-1">
              <button
                class="btn btn-toggle align-items-center rounded collapsed fs-3"
                data-bs-toggle="collapse"
                data-bs-target="#dashboard-collapse"
                aria-expanded="false"
              >
                <span class="material-symbols-outlined"> calendar_month </span>
                Planning
              </button>
              <div class="collapse" id="dashboard-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li class="nav-item">
                    <RouterLink to="/about" class="nav-link active fs-4"
                      ><span class="material-symbols-outlined">
edit_calendar
</span>Planning setup</RouterLink
                    >
                  </li>
                  
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
<script></script>
<style scoped></style>
