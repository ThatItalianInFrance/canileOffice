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

      </li>
      <li class="mb-1">
        <button class="d-flex btn btn-toggle align-items-center rounded w-100" aria-expanded="true">
          <RouterLink class="nav-link active router-link" to="/news"><span class="material-symbols-outlined">
              news
            </span> News </RouterLink>
        </button>

      </li>
      <li class="mb-1">
        <button class="d-flex btn btn-toggle align-items-center rounded w-100" aria-expanded="true">
          <RouterLink class="nav-link active router-link" to="/shelter/1"><span class="material-symbols-outlined">
              home
            </span> Shelter </RouterLink>
        </button>
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
