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
      newImage.style = "max-height: 500px; max-width:500px"
      document.getElementById('thumbnail').innerHTML = newImage.outerHTML

      console.log(base64Image);
      // console.log(fileReader.readAsDataURL(imageFile));
    }
    fileReader.readAsDataURL(imageFile)
  }
}

let cane = ref({
  id: 0,
  nome: '',
  carattere: '',
  birth: '',
  chip: '',
  terapia: '',
  patologie: '',
  alive: '',
  image: '',
});



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


let loadCane = async function (id) {
  if (id == 0) {
    console.log('id 0')
    return;
  }
  let response = await fetch(`${import.meta.env.VITE_SERVER}/office/cane/${id}`) // par défaut, fetch() fait une requête GET
  let json = await response.json();
  cane.value = json.data

}
loadCane(id)
function getImageUrl(id) {
  return `${import.meta.env.VITE_SERVER}/cani/${id}.jpg`;
}

let saveCane = async function () {
  if (base64Image != "") cane.value.image = base64Image;
  if (id == 0) {
    await fetch(`${import.meta.env.VITE_SERVER}/office/cane`, {
      method: 'POST',
      headers: {
        // 'Authorization': `Bearer ${check.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cane.value)
    })
  } else {
    await fetch(`${import.meta.env.VITE_SERVER}/office/cane/${id}`, {
      method: 'PUT',
      headers: {
        // 'Authorization': `Bearer ${check.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cane.value)
    })
    // console.log(image.value);
  }
  router.push({ path: '/listacani' })
}
</script>

<template>
  <main>
    <div class="container">
      <div class="row my-3">
        <div class="col-lg-6">
          <h1>Scheda cane</h1>
          <form>
            <button type="button" class="btn btn-primary mt-3" @click.prevent="saveCane">
              Enregistrer
            </button>
            <div class="mb-3">
              <label for="nome" class="form-label">Nome Cane</label>
              <input type="text" class="form-control" id="nome" v-model="cane.nome" />
            </div>
            <div class="mb-3">
              <label for="carattere" class="form-label">carattere</label>
              <input type="text" class="form-control" id="carattere" v-model="cane.carattere" />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Id</label>
              <div>{{ cane.id }}</div>
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">Image (.jpg seulement)</label>
              <input type="file" class="form-control" id="image" @change="onChangeImage" />
            </div>


          </form>
        </div>
        <div class="col-lg-6 my-5">

          <div id="thumbnail"></div>
          <td><img v-if="cane.hasImg" :src="getImageUrl(cane)" style="max-height: 500px; max-width:500px" />
          </td>
          <!-- <img src="https://placedog.net/500/500" alt="" /> -->
        </div>



        <div class="col-lg-6">
          <!-- accordion -->
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <h3>dati anagrafici</h3>
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <form>
                    <div class="mb-3">
                      <label for="birth" class="form-label">
                        <h4>

                          Nascita: {{ new Date(cane.birth).toLocaleDateString() }}
                        </h4>
                      </label>
                      <input type="date" class="form-control" id="birth" v-model="cane.birth" />
                    </div>
                    <div class="mb-3">
                      <label for="chip" class="form-label">chip</label>
                      <input type="text" class="form-control" id="chip" v-model="cane.chip" />
                    </div>


                  </form>
                </div>
              </div>
            </div>
          </div>
          <!-- accordion -->
        </div>
        <div class="col-lg-6">
          <!-- accordion -->
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                  <h3>dati sanitari</h3>
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse  " data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#CollapseSeven" aria-expanded="false" aria-controls="CollapseSeven">
                        Terapie
                      </button>
                    </h2>
                    <div id="CollapseSeven" class="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <form>
                          <div class="mb-3">
                            <label for="terapia" class="form-label">terapia</label>
                            <input type="text" class="form-control" id="terapia" v-model="cane.terapia" />
                          </div>
                          <div class="mb-3">
                            <label for="patologie" class="form-label">patologie</label>
                            <input type="text" class="form-control" id="patologie" v-model="cane.patologie" />
                          </div>
                          <div class="mb-3">
                            <label for="alive" class="form-label">alive</label>
                            <input type="text" class="form-control" id="alive" v-model="cane.alive" />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- accordion -->
        </div>

        <div class="col-lg-6">
          <!-- accordion -->
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                  data-bs-target="#CollapseSix" aria-expanded="true" aria-controls="CollapseSix">
                  <h3>dati Canile</h3>
                </button>
              </h2>
              <div id="CollapseSix" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#CollapseEight" aria-expanded="false" aria-controls="CollapseEight">
                  Accordion Item #3
                </button>
              </h2>
              <div id="CollapseEight" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It is hidden by default,
                  until the collapse plugin adds the appropriate classes that we use to style each
                  element. These classes control the overall appearance, as well as the showing and
                  hiding via CSS transitions. You can modify any of this with custom CSS or
                  overriding our default variables. It's also worth noting that just about any HTML
                  can go within the <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
          </div>
          <!-- accordion -->
        </div>
      </div>
    </div>




  </main>
</template>
