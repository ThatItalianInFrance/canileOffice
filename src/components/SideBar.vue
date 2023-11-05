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
</style>

<template class="vh-100">
  <div class="bgprimary">
    <div class="flex-shrink-0 p-3" style="width: 280px">
      <ul class="list-unstyled ps-0">
        <li class="mb-1">
          
            <button
              class="d-flex btn btn-toggle align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#home-collapse"
              aria-expanded="true"
            >
              <span class="material-symbols-outlined"> pets </span>
              <div class="px-2">Dogs</div>
            </button>
          
          <div class="collapse" id="home-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li class="nav-item">
                <RouterLink class="nav-link active" to="/listacani"
                  ><span class="material-symbols-outlined"> lists </span>Dog List</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link active" to="/cani/edit/0"
                  ><span class="material-symbols-outlined"> pet_supplies </span>New dog</RouterLink
                >
              </li>
            </ul>
          </div>
        </li>
        <li class="mb-1">
          <button
            class="btn btn-toggle align-items-center rounded collapsed"
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
                <RouterLink class="nav-link active" to="/listausers"
                  ><span class="material-symbols-outlined"> person_search </span> Users
                  List</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link active" to="/users/edit/0"
                  ><span class="material-symbols-outlined"> person_add </span> New User</RouterLink
                >
              </li>
            </ul>
          </div>
        </li>
        <li class="mb-1">
          <button
            class="btn btn-toggle align-items-center rounded collapsed"
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
                <RouterLink to="/about" class="nav-link active"
                  ><span class="material-symbols-outlined"> travel_explore </span>Map</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link active fs-4" to="/listabox"
                  ><span class="material-symbols-outlined"> pet_supplies </span>Box List</RouterLink
                >
              </li>
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
            <span class="material-symbols-outlined"> calendar_month </span>
            Planning
          </button>
          <div class="collapse" id="dashboard-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li class="nav-item">
                <RouterLink to="/about" class="nav-link active"
                  ><span class="material-symbols-outlined"> edit_calendar </span>Planning
                  setup</RouterLink
                >
              </li>
            </ul>
          </div>
        </li>
        <li class="mb-1">
          <button
            class="btn btn-toggle d-inline-flex align-items-center rounded border-0"
            data-bs-toggle="collapse"
            data-bs-target="#home-collapse"
            aria-expanded="true"
          >
            Home
          </button>
          <div class="collapse show" id="home-collapse" style="">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >Overview</a
                >
              </li>
              <li>
                <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >Updates</a
                >
              </li>
              <li>
                <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >Reports</a
                >
              </li>
            </ul>
          </div>
        </li>
        <li class="mb-1">
          <button
            class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#dashboard-collapse"
            aria-expanded="false"
          >
            Dashboard
          </button>
          <div class="collapse" id="dashboard-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >Overview</a
                >
              </li>
              <li>
                <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >Weekly</a
                >
              </li>
              <li>
                <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >Monthly</a
                >
              </li>
              <li>
                <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >Annually</a
                >
              </li>
            </ul>
          </div>
        </li>
        <li class="mb-1">
          <button
            class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#orders-collapse"
            aria-expanded="false"
          >
            Orders
          </button>
          <div class="collapse" id="orders-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >New</a
                >
              </li>
              <li>
                <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >Processed</a
                >
              </li>
              <li>
                <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >Shipped</a
                >
              </li>
              <li>
                <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >Returned</a
                >
              </li>
            </ul>
          </div>
        </li>
        <li class="border-top my-3"></li>
        <li class="mb-1">
          <button
            class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#account-collapse"
            aria-expanded="false"
          >
            Account
          </button>
          <div class="collapse" id="account-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >New...</a
                >
              </li>
              <li>
                <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >Profile</a
                >
              </li>
              <li>
                <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >Settings</a
                >
              </li>
              <li>
                <a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded"
                  >Sign out</a
                >
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script></script>
<style scoped></style>
