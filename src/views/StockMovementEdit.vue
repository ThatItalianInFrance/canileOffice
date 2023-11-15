<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

let addOrEdit = ref(['']); // If != 0 - Edit item, else - Add item
let id = route.params.id;

let base64Image = ref()
function onChangeImage(evt) {
  const selectedfile = evt.target.files
  if (selectedfile.length > 0) {
    const [imageFile] = selectedfile
    const fileReader = new FileReader()
    fileReader.onload = () => {
      base64Image.value = fileReader.result
      const newImage = document.createElement('img')
      newImage.src = base64Image.value
      newImage.style = 'max-height: 500px; max-width:500px'
      document.getElementById('thumbnail').innerHTML = newImage.outerHTML

      console.log("base64Image", base64Image)
      // console.log(fileReader.readAsDataURL(imageFile));

    }
    fileReader.readAsDataURL(imageFile)
  }
}

let stock = ref({
  id: 0,
  name: '',
  type: '',
  description: ''
})

let initFields = function (id) {
  stock.value.name = "";
  stock.value.type = "";
  stock.value.description = "";
  stock.value.hasImg = false;

  addOrEdit.value = id;
}

let loadStock = async function (id) {
  initFields(id)

  if (id == 0) {
    console.log('id 0')
    return
  }
  let response = await fetch(`${import.meta.env.VITE_SERVER}/office/stock/${id}`) // par défaut, fetch() fait une requête GET
  let json = await response.json()
  stock.value = json.data
}
loadStock(id)

function getImageUrl(id) {
  const timestamp = new Date().getTime();
  return `${import.meta.env.VITE_SERVER}/stock/${id}.jpg?timestamp=${timestamp}`;
}


let saveStock = async function (id) {
  if (base64Image.value != '') stock.value.image = base64Image
  console.log("stock.value.image", stock.value.image);
  if (id == 0) {
    console.log("new stock");
    await fetch(`${import.meta.env.VITE_SERVER}/office/stock_events`, {
      method: 'POST',
      headers: {
        // 'Authorization': `Bearer ${check.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stock.value)
    })
  } else {
    await fetch(`${import.meta.env.VITE_SERVER}/office/stock_events/${id}`, {
      method: 'PUT',
      headers: {
        // 'Authorization': `Bearer ${check.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stock.value)
    })
    // console.log(image.value);
  }
  router.push({ path: '/stock' })
}



let deleteStock = async function (id) {
  if (confirm("Are you sure delete this food? ")) {
    console.log("delete", id);

    await fetch(`${import.meta.env.VITE_SERVER}/office/stock_events/${id}`, {
      method: 'DELETE',
      headers: {
        // 'Authorization': `Bearer ${check.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stock.value)
    })
    router.push({ path: '/stock' })
  }
  console.log("delete canceled");
}

watch(route, () => {
  loadStock(route.params.id)
})

watch(route, () => {
  loadFood(route.params.id)
})

</script>

<template>
  <main>
    <div class="card shadow">
      <div class="d-flex justify-content-between align-items-center p-3">
        <RouterLink class="nav-link active btn btn-primary button" to="/Stock" style="width: 130px;">
          <span class="material-symbols-outlined">arrow_back</span> StockMovement list
        </RouterLink>
        <button v-if="addOrEdit != '0'" @click="deleteFood(route.params.id)"
          class="btn btn-toggle justify-content-between d-flex align-items-center rounded bg-danger">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
      <div class="card-body">
        <h1 class="card-title text-center mb-4">{{ addOrEdit != "0" ? "Edit" : "Add" }} StockMovement</h1>
        <div class="row">
          <div class="col-6">
            <form @submit.prevent="saveStock(route.params.id)">
              <div class="mb-3">
                <label for="foodname" class="form-label">StockMovement Name</label>
                <input type="text" class="form-control" id="foodname" v-model="stock.name"
                  placeholder="Enter StockMovement name" />
              </div>
              <div class="mb-3">
                <label for="type" class="form-label">StockMovement Type</label>
                <input type="text" class="form-control" id="type" v-model="stock.type"
                  placeholder="Enter StockMovement type" />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">StockMovement Description</label>
                <input type="textarea" class="form-control" id="description" v-model="stock.description"
                  placeholder="Enter StockMovement description" />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">StockMovement Quantity</label>
                <input type="textarea" class="form-control" id="description" v-model="stock.quantity"
                  placeholder="Enter StockMovement quantity" />
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary mt-3">{{ addOrEdit != "0" ? "Save Changes" : "Add stock"
                }}</button>
              </div>
            </form>
          </div>
          <div class="col-6">
            <div class="mx-auto my-5">
              <div id="thumbnail" class="text-center">
                <img v-if="stock.hasImg" id="thumbnail" :src="getImageUrl(id)" style="max-height: 500px; max-width: 500px"
                  class="img-thumbnail" />
                <img v-else src="https://placehold.co/200" alt="Placeholder" style="max-height: 500px; max-width: 500px"
                  class="img-thumbnail rounded-circle" />
              </div>
              <label for="image" class="camera-icon-label">
                <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 512 512">
                  <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path
                    d="M220.6 121.2L271.1 96 448 96v96H333.2c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24H64V128H192c9.9 0 19.7-2.3 28.6-6.8zM0 128V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H160V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM168 304a88 88 0 1 1 176 0 88 88 0 1 1 -176 0z" />
                </svg>
                <input type="file" class="col-form-control d-none" id="image" @change="onChangeImage" />
              </label>
            </div>
          </div>
          <div v-if="addOrEdit != '0'" class="card-footer text-muted text-center">
            <!-- Arrow previous stock -->
            <RouterLink class="nav-link active btn btn-primary button" to="/stock/edit/0">
              <span class="material-symbols-outlined">add</span> New stock
            </RouterLink>
            <!-- Arrow next stock -->
          </div>
        </div>
      </div>
      <div class="card-footer text-muted text-center">stock ID: {{ route.params.id }}</div>
    </div>
  </main>
</template>

<style scoped>
/* Additional custom styles if needed */
.card {
  background: #fff;
  border-radius: 10px;
}

.form-control {
  border-radius: 5px;
}

.btn-primary {
  background-color: #004085;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.card-footer {
  font-size: 0.8rem;
}

/* To make the image preview rounded */
#thumbnail img {
  max-height: 300px;
  max-width: 300px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
