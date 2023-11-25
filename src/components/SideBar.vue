<script setup>
const logOut = function () {
  
  if (confirm('Are you sure you want to Log Out?')) {
    localStorage.removeItem('user')
    // Save it!
    console.log('User Logged out');
    window.location.href = '/login'
} else {
  // Do nothing!
  console.log('Thing was not saved to the database.');
  return
}
}

const toggleSidebar = function (){
    const sidebar = document.getElementById('sidebar');
    const bsOffcanvas = new bootstrap.Offcanvas(sidebar);
    bsOffcanvas.hide();
  }

</script>


<template class="">

  <div class="d-lg-block d-md-block d-none">
    <ul class="list-unstyled ps-0">
      <button class="btn btn-danger" @click="logOut()">log OUT</button>
      <li class="mb-1">
        <button class="d-flex btn btn-toggle align-items-center rounded collapsed w-100" aria-expanded="true">
          <RouterLink class="nav-link active router-link" to="/listanimal">
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
        <button class="btn btn-toggle align-items-center rounded w-100" aria-expanded="false">
          <RouterLink to="/listabox" class="nav-link active router-link "><span class="material-symbols-outlined">
              travel_explore
            </span> Structure </RouterLink>
        </button>
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
          <RouterLink class="nav-link active router-link" to="/Stock"><span class="material-symbols-outlined">
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




  <div class="offcanvas offcanvas-start" tabindex="-1" id="sidebar">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Sidebar</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <button class="btn btn-danger" @click="logOut()">log OUT</button>
      <ul class="list-unstyled ps-0">
        <li class="mb-1">
          <button
            class="d-flex btn btn-toggle align-items-center rounded collapsed w-100"
            aria-expanded="true" data-bs-dismiss="offcanvas"
          >
            <RouterLink class="nav-link active router-link" to="/listanimal" >
              <span class="material-symbols-outlined"> lists </span> Dogs
            </RouterLink>
          </button>
        </li>
        <li class="mb-1">
          <button
            class="btn btn-toggle align-items-center rounded collapsed w-100"
            aria-expanded="true"
            data-bs-dismiss="offcanvas"
          >
            <RouterLink class="nav-link active router-link" to="/listausers"
              ><span class="material-symbols-outlined"> person_search </span> Users
            </RouterLink>
          </button>
        </li>

        <li class="mb-1">
          <button class="btn btn-toggle align-items-center rounded w-100" aria-expanded="false" data-bs-dismiss="offcanvas">
            <RouterLink to="/listabox" class="nav-link active router-link"
              ><span class="material-symbols-outlined"> travel_explore </span> Structure
            </RouterLink>
          </button>
        </li>
        <li class="mb-1">
          <button class="btn btn-toggle align-items-center rounded w-100" aria-expanded="false" data-bs-dismiss="offcanvas">
            <RouterLink to="/planning" class="nav-link active router-link"
              ><span class="material-symbols-outlined"> edit_calendar </span> Planning
            </RouterLink>
          </button>
        </li>
        <li class="mb-1">
          <button
            class="d-flex btn btn-toggle align-items-center rounded w-100"
            aria-expanded="true"
            data-bs-dismiss="offcanvas"
          >
            <RouterLink class="nav-link active router-link" to="/Stock"
              ><span class="material-symbols-outlined"> food_bank </span> Stock
            </RouterLink>
          </button>
          <div class="collapse" id="food-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li class="nav-item">
                <RouterLink class="nav-link active" to="/food"
                data-bs-dismiss="offcanvas"
                  ><span class="material-symbols-outlined"> food_bank </span> Food</RouterLink
                >
              </li>
              <li class="nav-item">
                <a
                  href="/news"
                  class="link-body-emphasis d-inline-flex text-decoration-none rounded"
                >
                  <RouterLink class="nav-link active" to="/food/edit/0"
                  data-bs-dismiss="offcanvas"
                    ><span class="material-symbols-outlined">food_bank </span> New food</RouterLink
                  >
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li class="mb-1">
          <button
            class="d-flex btn btn-toggle align-items-center rounded w-100"
            aria-expanded="true"
            data-bs-dismiss="offcanvas"
          >
            <RouterLink class="nav-link active router-link" to="/news"
              ><span class="material-symbols-outlined"> news </span> News
            </RouterLink>
          </button>
        </li>
        <li class="mb-1">
          <button
            class="d-flex btn btn-toggle align-items-center rounded w-100"
            aria-expanded="true"
            data-bs-dismiss="offcanvas"
          >
            <RouterLink class="nav-link active router-link" to="/shelter/1"
              ><span class="material-symbols-outlined"> home </span> Shelter
            </RouterLink>
          </button>
        </li>
      </ul>
    </div>
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
