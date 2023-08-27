<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
let id = route.params.id

let base64Image = ''
function onChangeImage(evt) {
  const selectedfile = evt.target.files
  if (selectedfile.length > 0) {
    const [imageFile] = selectedfile
    const fileReader = new FileReader()
    fileReader.onload = () => {
      base64Image = fileReader.result
      const newImage = document.createElement('img')
      newImage.src = base64Image
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

// function format(date) {
//   if (!(date instanceof Date)) {
//     throw new Error('Invalid "date" argument. You must pass a date instance')
//   }

//   const year = date.getFullYear()
//   const month = String(date.getMonth() + 1).padStart(2, '0')
//   const day = String(date.getDate()).padStart(2, '0')
//   console.log(`${year}-${month}-${day}`);
//   return `${year}-${month}-${day}`
// }

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
  if (base64Image != '') user.value.image = base64Image
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
    <div class="container">
      <div class="row my-3">
        <div class="col-lg-6">
          <h1>Scheda user</h1>
          <form>
            <button type="button" class="btn btn-primary mt-3" @click.prevent="saveUser">
              Enregistrer
            </button>
            <div class="mb-3">
              <label for="id" class="form-label">Id user</label>
              <input type="text" class="form-control" id="id" v-model="user.id" />
            </div>
            <div class="mb-3">
              <label for="username" class="form-label">Nome user</label>
              <input type="text" class="form-control" id="username" v-model="user.username" />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">email</label>
              <input type="text" class="form-control" id="email" v-model="user.email" />
            </div>

            <div class="mb-3">
              <label for="tipo" class="form-label">tipo</label>
              <input type="text" class="form-control" id="tipo" v-model="user.tipo" />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">password</label>
              <input type="text" class="form-control" id="password" v-model="user.password" />
            </div>


            <div class="mb-3">
              <label for="image" class="form-label">Image (.jpg seulement)</label>
              <input type="file" class="form-control" id="image" @change="onChangeImage" />
            </div>
          </form>
        </div>
        <div class="col-lg-6 my-5">
          <div id="thumbnail"></div>
          <td>
            <img
              v-if="user.hasImg"
              :src="getImageUrl(user)"
              style="max-height: 500px; max-width: 500px"
            />
          </td>
          <!-- <img src="https://placedog.net/500/500" alt="" /> -->
        </div>
      </div>
    </div>
  </main>
</template>
