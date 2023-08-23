<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { reactive } from 'vue'

// const nome = ref("")
console.log('products edit page script setup run')
const route = useRoute()
let id = route.params.id
console.log(id)

// id == 0 ? () => id = 1 : "";

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

let txt = ref()
let carattere = ref()
let nome = ref()
let birth = (ref())
let chip = ref()
let terapia = ref()
let patologie = ref()
let alive = ref()

let image = ref()
let products = ref({})



function format (date) {  
  if (!(date instanceof Date)) {
    throw new Error('Invalid "date" argument. You must pass a date instance')
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
console.log(`${year}-${month}-${day}`);
  return `${year}-${month}-${day}`
}


// const check = JSON.parse(localStorage.getItem('user'))
let loadProduct = async function (id) {
  if (id == 0) {
    console.log('id 0')
    products.value = [{ nome: nome.value, carattere: carattere.value, birth: birth.value }]

    return
  }
  fetch(`https://canileserver.onrender.com/office/cani/${id}`) // par défaut, fetch() fait une requête GET
    .then(function (response) {
      return response.json()
    })
    .then(function (contacts) {
      console.log(contacts)
      products.value = contacts
      console.log(products.value.nome)
      
      console.log(birth)
      console.log(products.value.nome)
      // console.log(contacts[0].image) 
      nome.value = products.value.nome
      carattere.value = products.value.carattere
      birth.value = format(new Date(products.value.birth))
      chip.value = products.value.chip
      terapia.value = products.value.terapia
      patologie.value = products.value.patologie
      alive.value = products.value.alive
      image.value = products.value.image
      // nome.value = nome;

    })
}
loadProduct(id)
function getImageUrl(product) {
  return `http://localhost:8000/cani/${id}.jpg`;
}
console.log(products.value)

let SaveProduct = async function (product) {
  if (base64Image != "") products.value.image = base64Image;
  // console.log(products.value.image)
  // nome.value = nome;
  console.log(nome.value)
  if (id == 0) {
    console.log('id000')
    if (!txt.value) {
      txt.value = 'toto'
    } else {


    }
    products.value = fetch('https://canileserver.onrender.com/office/cani/', {
      method: 'POST',
      headers: {
        // 'Authorization': `Bearer ${check.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: nome.value,
        carattere: carattere.value,
        birth: (birth.value),
        chip: chip.value,
        terapia: terapia.value,
        patologie: patologie.value,
        alive: alive.value,
        image: products.value.image,
        // price: price.value,
      })
    })
    console.log(
      JSON.stringify({
        nome: nome.value,
        carattere: carattere.value,
        // price: price.value,
        image: image.value
      })
    )
    console.log(nome.value)
  } else {
    product = await fetch('https://canileserver.onrender.com/office/cani/'+id, {
      method: 'PUT',
      headers: {
        // 'Authorization': `Bearer ${check.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: products.value.nome,
        carattere: products.value.carattere,
        birth: (birth.value),
        chip: chip.value,
        terapia: terapia.value,
        patologie: patologie.value,
        alive: alive.value,
        image: products.value.image,
        // price: price.value,
      })
    })
    console.log(image.value);
  }
  console.log('saveproduct fired')
  console.log(product)
  console.log(image)
  console.log(nome.value)
  // console.log(desc.value)
  // window.location.href = '/'
}
</script>

<template>
  <main>
    <div class="container">
      <div class="row my-3">
        <div class="col-lg-6">
          <h1>Scheda cane</h1>
          <form>
            <div class="mb-3">
              <label for="nome" class="form-label">Nome Cane</label>
              <input type="text" class="form-control" id="nome" v-model="nome" />
            </div>
            <div class="mb-3">
              <label for="carattere" class="form-label">carattere</label>
              <input type="text" class="form-control" id="carattere" v-model="carattere" />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea
                class="form-control"
                id="description"
                rows="3"
                v-model="id"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">Image (.jpg seulement)</label>
              <input type="file" class="form-control" id="image" @change="onChangeImage" />
            </div>
            
            <button type="button" class="btn btn-primary mt-3" @click.prevent="SaveProduct">
              Enregistrer
            </button>
          </form>
        </div>
        <div class="col-lg-6 my-5">

          <div id="thumbnail"></div>
          <td><img v-if="products.hasImg" :src="getImageUrl(products)"
                    style="max-height: 500px; max-width:500px" /></td>
          <!-- <img src="https://placedog.net/500/500" alt="" /> -->
        </div>



        <div class="col-lg-6">
          <!-- accordion -->
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
                  <h3>dati anagrafici</h3>
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <form>
                    <div class="mb-3">
                      <label for="birth" class="form-label"><h4>

                        Nascita: {{ new Date(products.birth).toLocaleDateString() }}
                      </h4>
                    </label>
                      <input type="date" class="form-control" id="birth" v-model="birth" />
                    </div>
                    <div class="mb-3">
                      <label for="chip" class="form-label">chip</label>
                      <input type="text" class="form-control" id="chip" v-model="chip" />
                    </div>

                    <div class="mb-3">
                      <label for="alive" class="form-label">alive</label>
                      <input type="text" class="form-control" id="alive" v-model="alive" />
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
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
                >
                  <h3>dati sanitari</h3>
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse  "
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#CollapseSeven"
                        aria-expanded="false"
                        aria-controls="CollapseSeven"
                      >
                        Terapie
                      </button>
                    </h2>
                    <div
                      id="CollapseSeven"
                      class="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <form>
                          <div class="mb-3">
                            <label for="terapia" class="form-label">terapia</label>
                            <input
                              type="text"
                              class="form-control"
                              id="terapia"
                              v-model="terapia"
                            />
                          </div>
                          <div class="mb-3">
                            <label for="patologie" class="form-label">patologie</label>
                            <input
                              type="text"
                              class="form-control"
                              id="patologie"
                              v-model="patologie"
                            />
                          </div>
                          <div class="mb-3">
                            <label for="alive" class="form-label">alive</label>
                            <input type="text" class="form-control" id="alive" v-model="alive" />
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
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#CollapseSix"
                  aria-expanded="true"
                  aria-controls="CollapseSix"
                >
                  <h3>dati Canile</h3>
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
