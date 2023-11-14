<template class="">
  <div class="">
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <button class="d-flex btn btn-toggle align-items-center rounded collapsed" aria-expanded="true">
          <RouterLink class="nav-link active" to="/listacani">
            <span class="material-symbols-outlined"> lists </span> Dogs
          </RouterLink>
        </button>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed w-100" aria-expanded="true">
          <RouterLink class="nav-link active router-link" to="/listausers"><span class="material-symbols-outlined">
              person_search </span> Users
          </RouterLink>
        </button>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse"
          data-bs-target="#structure-collapse" aria-expanded="false">
          <span class="material-symbols-outlined"> living </span>
          Structure
        </button>
        <div class="collapse" id="structure-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li class="nav-item">
              <RouterLink to="/about" class="nav-link active "><span class="material-symbols-outlined">
                  travel_explore
                </span> Map</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link active fs-4" to="/listabox"><span class="material-symbols-outlined">
                  pet_supplies </span> Box
                List</RouterLink>
            </li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded w-100" aria-expanded="false">
          <RouterLink to="/planning" class="nav-link active router-link "><span class="material-symbols-outlined">
              edit_calendar
            </span> Planning </RouterLink>
        </button>
      </li>
      <li class="mb-1">
        <button class="d-flex btn btn-toggle align-items-center rounded w-100" aria-expanded="true">
          <RouterLink class="nav-link active router-link" to="/food"><span class="material-symbols-outlined">
              food_bank
            </span> Stock </RouterLink>
        </button>
        <div class="collapse" id="food-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li class="nav-item">
              <RouterLink class="nav-link active" to="/food"><span class="material-symbols-outlined">
                  food_bank
                </span> Food</RouterLink>
            </li>
            <li class="nav-item">
              <a href="/news" class="link-body-emphasis d-inline-flex text-decoration-none rounded">
                <RouterLink class="nav-link active" to="/food/edit/0"><span class="material-symbols-outlined">food_bank
                  </span> New food</RouterLink>
              </a>
            </li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <a href="/news" class="link-body-emphasis d-inline-flex text-decoration-none rounded">
          <RouterLink class="nav-link active" to="/news"><span class="material-symbols-outlined">news
            </span> News</RouterLink>
        </a>
      </li>
      <li class="mb-1">
        <RouterLink class="nav-link active" to="/shelter/1"><span class="material-symbols-outlined">home
          </span>Shelter</RouterLink>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0" data-bs-toggle="collapse"
          data-bs-target="#home-collapse" aria-expanded="true">
          Home
        </button>
        <div class="collapse show" id="home-collapse" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li>
              <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Overview</a>
            </li>
            <li>
              <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Updates</a>
            </li>
            <li>
              <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Reports</a>
            </li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
          data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          Dashboard
        </button>
        <div class="collapse" id="dashboard-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li>
              <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Overview</a>
            </li>
            <li>
              <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Weekly</a>
            </li>
            <li>
              <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Monthly</a>
            </li>
            <li>
              <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Annually</a>
            </li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
          data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
          Orders
        </button>
        <div class="collapse" id="orders-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li>
              <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">New</a>
            </li>
            <li>
              <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Processed</a>
            </li>
            <li>
              <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Shipped</a>
            </li>
            <li>
              <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Returned</a>
            </li>
          </ul>
        </div>
      </li>
      <li class="border-top my-3"></li>
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
          data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
          Account
        </button>
        <div class="collapse" id="account-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li>
              <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">New...</a>
            </li>
            <li>
              <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Profile</a>
            </li>
            <li>
              <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Settings</a>
            </li>
            <li>
              <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Sign out</a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.bgprimary {
  background: #ddfcf3;
}


/* * {
  border: solid red 1px;
} */

.material-symbols-outlined {
  font-size: 20px;
}

.collapse {
  padding-left: 25px;
}

.router-link {
  width: 100%;
  text-align: left;
  padding: 5px 0;
}
</style>
