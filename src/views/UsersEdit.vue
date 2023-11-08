<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
let id = route.params.id

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

      console.log(base64Image)
      // console.log(fileReader.readAsDataURL(imageFile));
    }
    fileReader.readAsDataURL(imageFile)
  }
}

let user = ref({
  id: 0,
  nome: '',
  carattere: '',
  birth: '',
  chip: '',
  terapia: '',
  patologie: '',
  alive: '',
  image: '',
  morsicatore: ''
})

let loadUser = async function (id) {
  if (id == 0) {
    console.log('id 0')
    return
  }
  let response = await fetch(`${import.meta.env.VITE_SERVER}/office/user/${id}`) // par défaut, fetch() fait une requête GET
  let json = await response.json()
  user.value = json.data
}
loadUser(id)
function getImageUrl(id) {
  return `${import.meta.env.VITE_SERVER}/cani/${id}.jpg`
}

let saveUser = async function () {
  if (base64Image.value != '') user.value.image = base64Image
  if (id == 0) {
    await fetch(`${import.meta.env.VITE_SERVER}/office/user`, {
      method: 'POST',
      headers: {
        // 'Authorization': `Bearer ${check.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user.value)
    })
  } else {
    await fetch(`${import.meta.env.VITE_SERVER}/office/user/${id}`, {
      method: 'PUT',
      headers: {
        // 'Authorization': `Bearer ${check.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user.value)
    })
    // console.log(image.value);
  }
  router.push({ path: '/listausers' })
}
</script>

<template>
  <main>
    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="card shadow">
            <div class="card-body">
              <h1 class="card-title text-center mb-4">Edit User</h1>
              <div class="row">
                <div class="col-6">
                  <form @submit.prevent="saveUser">
                    <div class="mb-3">
                      <label for="username" class="form-label">User Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="username"
                        v-model="user.username"
                        placeholder="Enter user name"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        v-model="user.email"
                        placeholder="Enter email"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="tipo" class="form-label">role</label>
                      <input
                        type="text"
                        class="form-control"
                        id="tipo"
                        v-model="user.tipo"
                        placeholder="Enter type"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        v-model="user.password"
                        placeholder="Enter password"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="image" class="form-label">Profile Image (.jpg only)</label>
                      <input type="file" class="form-control" id="image" @change="onChangeImage" />
                    </div>
                    <div class="text-center">
                      <button type="submit" class="btn btn-primary mt-3">Save Changes</button>
                    </div>
                  </form>
                </div>
                <div class="col-6">
                  <div class="mx-auto my-5">
                    <div id="thumbnail" class="text-center">
                      <img
                        v-if="base64Image"
                        :src="base64Image"
                        style="max-height: 500px; max-width: 500px"
                        class="img-thumbnail"
                      />
                      <img
                        v-else
                        src="https://placehold.co/200"
                        alt="Placeholder"
                        style="max-height: 500px; max-width: 500px"
                        class="img-thumbnail rounded-circle"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer text-muted text-center">User ID: {{ user.id }}</div>
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
</style>
