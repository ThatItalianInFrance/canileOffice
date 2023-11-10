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
 console.log("selectedfile", selectedfile);
 if (selectedfile.length > 0) {
  const [imageFile] = selectedfile
  const fileReader = new FileReader()
  fileReader.onload = () => {
   base64Image.value = fileReader.result
   const newImage = document.createElement('img')
   newImage.src = base64Image.value
   newImage.style = 'max-height: 500px; max-width:500px'
   document.getElementById('thumbnail').innerHTML = newImage.outerHTML

   console.log("base64Image",base64Image)
   // console.log(fileReader.readAsDataURL(imageFile));
  }
  fileReader.readAsDataURL(imageFile)
 }
}

let food = ref({
 id: 0,
 name: '',
 type: '',
 description: ''
})

let initFields = function(id){
 food.value.id = 0;
 food.value.name = "";
 food.value.type = "";
 food.value.description = "";
 food.value.hasImg = false;

 addOrEdit.value = id;
}

let loadFood = async function (id) {
 initFields(id);

 if (id == 0) {
  console.log('id 0')
  return
 }
 let response = await fetch(`${import.meta.env.VITE_SERVER}/office/food/${id}`) // par défaut, fetch() fait une requête GET
 let json = await response.json()
 food.value = json.data
}
loadFood(id)

function  getImageUrl(idImg) {
  const timestamp = new Date().getTime();
  return `${import.meta.env.VITE_SERVER}/food/${idImg}.jpg?timestamp=${timestamp}`;
}

let saveFood = async function (id) {
 if (base64Image.value != '') food.value.image = base64Image
 console.log("food.value.image", food.value.image);
 if (id == 0) {
  console.log("new food");
  await fetch(`${import.meta.env.VITE_SERVER}/office/food`, {
   method: 'POST',
   headers: {
    // 'Authorization': `Bearer ${check.token}`,
    'Content-Type': 'application/json'
   },
   body: JSON.stringify(food.value)
  })
 } else {
  await fetch(`${import.meta.env.VITE_SERVER}/office/food/${id}`, {
   method: 'PUT',
   headers: {
    // 'Authorization': `Bearer ${check.token}`,
    'Content-Type': 'application/json'
   },
   body: JSON.stringify(food.value)
  })
  // console.log(image.value);
 }
 router.push({ path: '/food' })
}

watch(route, (newSearchTerm, oldSearchTerm) => {
 loadFood(route.params.id)
})

</script>

<template>
 <main>
  <div class="container mt-5">
   <div class="row">
    <div class="col-lg-8 mx-auto">

     <div class="card shadow">
      <RouterLink class="nav-link active btn btn-primary button" to="/food" style="width: 130px;">
        <span class="material-symbols-outlined">arrow_back</span> Food list
      </RouterLink>
      <div class="card-body">
       <h1 class="card-title text-center mb-4">{{ addOrEdit != "0" ? "Edit" : "New"}} Food</h1>
       <div class="row">
        <div class="col-6">
         <form @submit.prevent="saveFood(route.params.id)">
          <div class="mb-3">
           <label for="foodname" class="form-label">Food Name</label>
           <input type="text" class="form-control" id="foodname" v-model="food.name" placeholder="Enter food name" />
          </div>
          <div class="mb-3">
           <label for="type" class="form-label">Type</label>
           <input type="text" class="form-control" id="type" v-model="food.type" placeholder="Enter type" />
          </div>
          <div class="mb-3">
           <label for="description" class="form-label">Description</label>
           <input type="textarea" class="form-control" id="description" v-model="food.description" placeholder="Enter description" />
          </div>
          <div class="text-center">
           <button type="submit" class="btn btn-primary mt-3">{{ addOrEdit != "0" ? "Save Changes" : "Add food" }}</button>
          </div>
         </form>
        </div>
        <div class="col-6">
         <div class="mx-auto my-5">
          <div id="thumbnail" class="text-center">
            <img
              v-if="food.hasImg"
              id="thumbnail"
              :src="getImageUrl(id)"
              class="img circular-image image-to-download imageSelect"
              max-width=""
              style=""
            />
           <img v-else src="https://placehold.co/200" alt="Placeholder" style="max-height: 500px; max-width: 500px"
            class="img-thumbnail rounded-circle" />
          </div>
          <label for="image" class="camera-icon-label">
            <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 512 512">
              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M220.6 121.2L271.1 96 448 96v96H333.2c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24H64V128H192c9.9 0 19.7-2.3 28.6-6.8zM0 128V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H160V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM168 304a88 88 0 1 1 176 0 88 88 0 1 1 -176 0z"
              />
            </svg>
            <input
              type="file"
              class="col-form-control d-none"
              id="image"
              @change="onChangeImage"
            />
          </label>
         </div>
        </div>
       </div>
      </div>
      <div v-if="addOrEdit != '0'" class="card-footer text-muted text-center">
      <RouterLink class="nav-link active btn btn-primary button" to="/food/edit/0">
        <span class="material-symbols-outlined">add</span> New food
      </RouterLink>
      </div>
     </div>
    </div>
   </div>
  </div>
 </main>
</template>

<style scoped>
/* Additional custom styles if needed */
.card {
 background: #fff;
 border-radius: 10px;
 overflow: hidden;
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

.button{
display: flex; justify-content: center; align-items: center;
}
</style>
