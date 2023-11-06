<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserToken } from '/utils'

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
      // document.getElementById('thumbnail').src = getImageUrl(cane.id)
      document.getElementById('thumbnail').src = base64Image
      document.getElementById('thumbnail').innerHTML = newImage.outerHTML

      console.log(base64Image)
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

let loadCane = async function (id) {
  if (id == 0) {
    console.log('id 0')
    return
  }
  let response = await fetch(`${import.meta.env.VITE_SERVER}/office/cane/${id}`) // par défaut, fetch() fait une requête GET
  let json = await response.json()
  cane.value = json.data
}
loadCane(id)
function getImageUrl(id) {
  return `${import.meta.env.VITE_SERVER}/cani/${id}.jpg`
}

let saveCane = async function () {
  if (base64Image != '') cane.value.image = base64Image
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
  // router.push({ path: '/listacani' })
}
</script>
<style scoped>
.bgbody {
  background: #ecebff;
}
.bgtest {
  background: hsla(141, 54%, 86%, 1);

  background: linear-gradient(
    90deg,
    hsla(141, 54%, 86%, 1) 0%,
    hsla(333, 73%, 85%, 1) 50%,
    hsla(211, 58%, 79%, 1) 100%
  );

  background: -moz-linear-gradient(
    90deg,
    hsla(141, 54%, 86%, 1) 0%,
    hsla(333, 73%, 85%, 1) 50%,
    hsla(211, 58%, 79%, 1) 100%
  );

  background: -webkit-linear-gradient(
    90deg,
    hsla(141, 54%, 86%, 1) 0%,
    hsla(333, 73%, 85%, 1) 50%,
    hsla(211, 58%, 79%, 1) 100%
  );

  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#CAEFD7", endColorstr="#F5BFD7", GradientType=1 );
}
/* * {
  border: solid red 1px;
} */
.posrel {
  position: relative;
}

.camera-icon-label {
  position: absolute;
  bottom: 0px; /* Adjust the distance from the bottom as needed */
  right: 0%; /* Position it in the middle horizontally */
  transform: translateX(-50%); /* Center horizontally */
}

.image-container {
  width: 250px; /* Adjust the size as needed */
  height: 250px; /* Same as width */
  overflow: hidden;
  border-radius: 50%;
}

.circular-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<template>
  <section id="new_card">
    <div class="container-fluid my-3">
      <div class="card">
        <div class="row">
          <div class="col-4 m-auto my-4">
            <div class="card shadow p-4">

              <div class="image-container shadow m-auto mb-3" width="">
                <img
                v-if="cane.hasImg"
                id="thumbnail"
                :src="getImageUrl(cane.id)"
                class="img circular-image"
                width=""
                style=""
                />
            </div>
            <div class="text-center">

              <h1 class="m-auto">{{ cane.nome }}</h1>
              <small class="small">I'm born on</small>
              <h5 class="m-auto">{{ cane.birth }}</h5>
              <small> My character is </small>
              <h4 class="m-auto">{{ cane.carattere }}</h4>
              <p v-if="cane.morsicatore === 'yes'">I can bite and show aggressiveness</p>
              <p v-else>I don't usually bite unless provoked</p>
            </div>
          </div>
          </div>
          <div class="col-6"></div>
        </div>
      </div>
    </div>
  </section>
  <main class="bgbody vh-100">
    <div class="container-fluid">
      <div class="row">
        <div class="col-auto">
          <form>
            <div class="mb-3 container rounded bgtest" style="">
              <h1>{{ cane.nome }}</h1>
              <div class="p-2">
                <div class="container">
                  <div class="posrel">
                    <div class="image-container shadow m-auto mb-3" width="">
                      <img
                        v-if="cane.hasImg"
                        id="thumbnail"
                        :src="getImageUrl(cane.id)"
                        class="img circular-image"
                        width=""
                        style=""
                      />
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
                    <!-- <img src="https://placedog.net/500/500" alt="" /> -->
                  </div>
                </div>
                <div class="container p-1">
                  <div class="row">
                    <div class="col-4">
                      <label for="nome" class="col-form-label fw-bold">My name</label>
                    </div>
                    <div class="col-8">
                      <input type="text" class="form-control" id="nome" v-model="cane.nome" />
                    </div>
                  </div>
                </div>
                <div class="container p-1">
                  <div class="row">
                    <div class="col-4">
                      <label for="carattere" class="col-form-label fw-bold">character</label>
                    </div>
                    <div class="col-8">
                      <input type="text" class="form-control" id="nome" v-model="cane.carattere" />
                    </div>
                  </div>
                </div>
                <div class="container p-1">
                  <div class="row">
                    <div class="col-4">
                      <label for="morsicatore" class="col-form-label fw-bold">Bites</label>
                    </div>
                    <div class="col-8">
                      <input
                        type="text"
                        class="form-control"
                        id="nome"
                        v-model="cane.morsicatore"
                      />
                    </div>
                  </div>
                </div>
                <div class="container p-1">
                  <div class="row">
                    <div class="col-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- accordion -->
        <div class="col-auto">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <span>Personal data</span>
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body bgtest">
                  <form>
                    <div class="container p-1">
                      <div class="row">
                        <div class="col-4">
                          <label for="birth" class="col-form-label fw-bold"> Birth: </label>
                        </div>
                        <div class="col-8">
                          <input type="date" class="form-control" id="birth" v-model="cane.birth" />
                        </div>
                      </div>
                      <div class="container p-1">
                        <div class="row">
                          <div class="col-4">
                            <label for="razza" class="col-form-label fw-bold">Kind</label>
                          </div>
                          <div class="col-8">
                            <input
                              type="text"
                              class="form-control"
                              id="razza"
                              v-model="cane.razza"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="container p-1">
                        <div class="row">
                          <div class="col-4">
                            <label for="taglia" class="col-form-label fw-bold">Size</label>
                          </div>
                          <div class="col-8">
                            <input
                              type="text"
                              class="form-control"
                              id="carattere"
                              v-model="cane.taglia"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="container p-1">
                        <div class="row">
                          <div class="col-4">
                            <label for="sesso" class="col-form-label fw-bold">Sex</label>
                          </div>

                          <div class="col-8">
                            <input
                              type="text"
                              class="form-control"
                              id="carattere"
                              v-model="cane.sesso"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-4"></div>

                        <div class="col-4"></div>
                      </div>
                      <div class="container p-1">
                        <div class="row">
                          <div class="col-4">
                            <label for="mantello" class="col-form-label fw-bold">Coat</label>
                          </div>

                          <div class="col-8">
                            <input
                              type="text"
                              class="form-control"
                              id="carattere"
                              v-model="cane.mantello"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="container p-1">
                        <div class="row">
                          <div class="col-4">
                            <label for="chip" class="form-label fw-bold">Chip</label>
                          </div>

                          <div class="col-8">
                            <input type="text" class="form-control" id="chip" v-model="cane.chip" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- accordion -->

        <div class="col-auto">
          <!-- accordion -->
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
                >
                  <span>Health data</span>
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse" data-bs-parent="#accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header"></h2>

                  <div class="accordion-body bgtest">
                    <form>
                      <div class="container p-1">
                        <div class="row">
                          <div class="col-4">
                            <label for="sterilizzazione" class="col-form-label fw-bold"
                              >Neutering</label
                            >
                          </div>
                          <div class="col-8">
                            <input
                              type="text"
                              class="form-control"
                              id="carattere"
                              v-model="cane.sterilizzazione"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="container p-1">
                        <div class="row">
                          <div class="col-4">
                            <label for="terapia" class="col-form-label fw-bold">Therapy</label>
                          </div>
                          <div class="col-8">
                            <input
                              type="text"
                              class="form-control"
                              id="terapia"
                              v-model="cane.terapia"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="container p-1">
                        <div class="row">
                          <div class="col-4">
                            <label for="patologie" class="col-form-label fw-bold"
                              >Pathologies</label
                            >
                          </div>
                          <div class="col-8">
                            <input
                              type="text"
                              class="form-control"
                              id="patologie"
                              v-model="cane.patologie"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="container p-1">
                        <div class="row">
                          <div class="col-4">
                            <label for="alive" class="col-form-label fw-bold">Alive</label>
                          </div>
                          <div class="col-8">
                            <input
                              type="text"
                              class="form-control"
                              id="alive"
                              v-model="cane.alive"
                            />
                          </div>
                        </div>
                      </div>

                      <button type="button" class="btn btn-primary mt-3" @click.prevent="saveCane">
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- accordion -->
        </div>

        <div class="col-auto">
          <!-- accordion -->
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#CollapseSix"
                  aria-expanded="true"
                  aria-controls="CollapseSix"
                >
                  <h3>Shelter data</h3>
                </button>
              </h2>
              <div
                id="CollapseSix"
                class="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              ></div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#CollapseEight"
                  aria-expanded="false"
                  aria-controls="CollapseEight"
                >
                  Accordion Item #3
                </button>
              </h2>
              <div
                id="CollapseEight"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
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
