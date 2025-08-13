<script setup>
import { ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { getUserToken } from '/utils'
import html2pdf from 'html2pdf.js'

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
      // document.getElementById('thumbnail').src = getImageUrl(dog.id)
      document.getElementById('thumbpdf').src = base64Image
      document.getElementById('thumbnail').src = base64Image
      // document.getElementById('thumbnail').innerHTML = newImage.innerHTML
      // document.getElementById('thumbpdf').innerHTML = newImage.outerHTML
      // document.getElementById('thumbpdf').innerHTML = newImage.outerHTML
    }
    fileReader.readAsDataURL(imageFile)
  }
}
let dog = ref({})



dog.value.actions = [
  { id: 1, actionType: 'Adoption Visit', date: '2023-01-01', time: '12.00', status: 'Completed' },
  { id: 2, actionType: 'Vet Visit', date: '2023-02-15', time: '12.00', status: 'Pending' },
  { id: 4, actionType: 'Parasite Check', date: '2023-04-20', time: '12.00', status: 'Pending' },
  { id: 5, actionType: 'Training Session', date: '2023-05-05', time: '12.00', status: 'Completed' },
  { id: 6, actionType: 'Walk in the Park', date: '2023-06-15', time: '12.00', status: 'Pending' },
  { id: 7, actionType: 'Dental Checkup', date: '2023-07-10', time: '12.00', status: 'Completed' }
  // ... (other actions for Dog 1) ...
];

dog.value.attachments = [
  { id: 1, type: 'image', url: getImageUrl(id), name: 'Dog Image 1' },
  { id: 2, type: 'image', url: 'https://placehold.co/50', name: 'Dog Image 2' },
  { id: 3, type: 'document', url: 'https://example.com/medical-record.pdf', name: 'Medical Record' },
  { id: 4, type: 'image', url: 'https://placehold.co/50', name: 'Dog Image 3' },
  { id: 5, type: 'document', url: 'https://example.com/training-certificate.pdf', name: 'Training Certificate' },
  // Add more attachments as needed
];

let cane = ref({})
let kind = ref({})
let shelter = ref({})
let box = ref({})
let boxes = ref({})
let idcaneValue;
let attachments = ref({})
let loadCane = async function (id) {
  if (id == 0) {
    return
  }
  let response = await fetch(`${import.meta.env.VITE_SERVER}/office/animal/${id}`) // par défaut, fetch() fait une requête GET
  let json = await response.json()
  cane.value = json.data
  attachments.value = json.files
}
console.log(attachments.value);
console.log(cane.value);
let loadKind = async function (id) {
  if (id == 0) {
    return
  }
  let response = await fetch(`${import.meta.env.VITE_SERVER}/office/kind/`) // par défaut, fetch() fait une requête GET
  let json = await response.json()
  kind.value = json.data
}

let shelterAssign = function () {
  // this.shelter.value.bo_id = this.box.value.db_id;
  box.value.db_id = shelter.value.bo_id;
  console.log('change');
}


let loadBoxCani = async function (id) {
  if (id == 0) {
    return
  }
  let response = await fetch(`${import.meta.env.VITE_SERVER}/office/dogsbox/${id}`) // par défaut, fetch() fait une requête GET
  let json = await response.json()
  console.log(json.data)
  if (!json.data) {
    json.data = {}
  }
  shelter.value = json.data
  console.log(shelter.value.bo_id)
  idcaneValue = shelter.value.bo_id
  loadBox(shelter.value.bo_id)

  console.log(idcaneValue)
}

let loadBox = async function (id) {
  if (id == 0) {
    console.log('id 0')
    return
  }
  let response = await fetch(`${import.meta.env.VITE_SERVER}/office/box/${id}`) // par défaut, fetch() fait une requête GET
  let json = await response.json()
  console.log(json.data)
  if (!json.data) {
    json.data = {}
  }
  box.value = json.data
  console.log(box.value)
}

let loadStalli = async function (id) {
  if (id == 0) {
    console.log('id 0')
    return
  }
  let response = await fetch(`${import.meta.env.VITE_SERVER}/office/box/`) // par défaut, fetch() fait une requête GET
  let json = await response.json()
  console.log(json.data)
  if (!json.data) {
    json.data = {}
  }
 
  boxes.value = json.data
  console.log(boxes.value)
}

loadBoxCani(id)
console.log(shelter)

loadKind(id)
console.log(kind)

loadStalli(id)
console.log(boxes)

// loadBox(id)
// console.log(box)
// console.log(idcaneValue)
loadCane(id)
function getImageUrl(id) {
  return `${import.meta.env.VITE_SERVER}/dogs/${id}.jpg`
}
let formData = ref({});
let uploadFile = async function () {
  formData.value = new FormData(); 
  
  formData.value.keepExtensions = true;
  formData.value.options = {
    filter: function ({name, originalFilename, mimetype}) {
  console.log(name);
  
  formData.value.options.originalFilename = originalFilename    
  // keep only images
      // return mimetype && mimetype.includes("image");
    }
  };
console.log('thui');
formData.value.append("fileupload", fileupload.files[0]);
// console.log(formData);

console.log(formData.value);
    fetch(`${import.meta.env.VITE_SERVER}/office/dog/${id}`, {
    method: "PUT", 
    // headers: {
    //     // 'Authorization': `Bearer ${check.token}`,
    //     'Content-Type': 'multipart/form-data'
    //   },
    body: formData.value
  }); 
  // router.push({ path: '/listanimal' })

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
    await fetch(`${import.meta.env.VITE_SERVER}/office/dogsbox/${id}`, {
      method: 'POST',
      headers: {
        // 'Authorization': `Bearer ${check.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shelter.value)
    })
  } else {
    await fetch(`${import.meta.env.VITE_SERVER}/office/dog/${id}`, {
      method: 'PUT',
      headers: {
        // 'Authorization': `Bearer ${check.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cane.value)
    })
    console.log(shelter.value);
    await fetch(`${import.meta.env.VITE_SERVER}/office/dogsbox/${id}`, {
      method: 'PUT',
      headers: {
        // 'Authorization': `Bearer ${check.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shelter.value),
    })

    console.log(box.value);
    console.log(shelter.value);
    // console.log(image.value)
    router.push({ path: '/listanimal' })
  }
}

const opt = {
  html2canvas: {
    useCORS: true
    // allowTaint: false,
    // proxy: 'http://localhost:8000/'
  }
}

let printToPdf = async function () {
  await nextTick() // Wait for the next DOM update cycle
  let img
  // update URLs to load cached cross-originated images
  for (img of document.getElementsByClassName('image-to-replace')) {
    img.style.backgroundImage = img.style.backgroundImage.replace(
      '?placeholder=',
      '?withheaders=yes'
    )
  }

  const element = document.getElementById('element-to-print')
  if (element) {
    console.log('Element is ready to print', element)
    html2pdf()
      .set(opt)
      .from(element)
      .toPdf()
      .get('pdf')
      .then(function (pdf) {
        window.open(pdf.output('bloburl')) // Open the PDF in a new window/tab
      })
  } else {
    console.log('Element is not ready to print')
  }
}
</script>

<template>
  <div class="card bgbody shadow">
    <div class="card-body">
      <div class="row mb-2">
        <div class="col d-flex justify-content-end">
          <button type="button"
            class="btn btn-secondary me-2"
            @click="printToPdf()">Print</button>
          <button type="button"
            class="btn btn-primary"
            @click.prevent="saveCane">Save</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div class="rounded bgtest p-3"
            style="">
            <div class="pb-3">

              <h1>{{ cane.do_name }}</h1>
              <div class="position-relative">
                <div class="image-container m-auto mb-3"
                  width="">
                  <img 
                    id="thumbnail"
                    :src="getImageUrl(cane.do_id)"
                    class="img-fluid circular-image image-to-download shadow"
                    width="250px"
                    style="" />
                </div>

                <label for="image"
                  class="camera-icon-label">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    height="3em"
                    viewBox="0 0 512 512">
                    <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                      d="M220.6 121.2L271.1 96 448 96v96H333.2c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24H64V128H192c9.9 0 19.7-2.3 28.6-6.8zM0 128V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H160V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM168 304a88 88 0 1 1 176 0 88 88 0 1 1 -176 0z" />
                  </svg>
                  <input type="file"
                    class="col-form-control d-none"
                    id="image"
                    @change="onChangeImage" />
                </label>
                <!-- <img src="https://placedog.net/500/500" alt="" /> -->
              </div>
              <div class="row mb-1">
                <div class="col-4">
                  <label for="do_name"
                    class="col-form-label fw-bold">Name</label>
                </div>
                <div class="col-8">
                  <input type="text"
                    class="form-control"
                    id="do_name"
                    v-model="cane.do_name" />
                </div>
              </div>
              <div class="row mb-1">
                <div class="col-4">
                  <label for="do_attitude"
                    class="col-form-label fw-bold">character</label>
                </div>
                <div class="col-8">
                  <input type="text"
                    class="form-control"
                    id="do_attitude"
                    v-model="cane.do_attitude" />
                </div>
              </div>
 
              <div class="row mb-1">
                <div class="col-6">
                  <label for="do_biter"
                    class="col-form-label fw-bold">Biter</label>
                </div>
                <div class="col-6">
                  <div class="d-flex mt-2">
                    <div class="form-check mx-2 my-auto">
                      <input class="form-check-input"
                        type="radio"
                        name="do_biter"
                        id="biterRadio1"
                        value="1"
                        v-model="cane.do_biter" />
                      <label class="form-check-label"
                        for="bitereRadio1"> Yes </label>
                    </div>
                    <div class="form-check form-check mx-2 my-auto">
                      <input class="form-check-input"
                        type="radio"
                        name="do_biter"
                        id="biterRadio2"
                        value="0"
                        v-model="cane.do_biter" />
                      <label class="form-check-label"
                        for="biterRadio2"> No </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-1">
                <div class="col-6">
                  <label for="onhome"
                    class="col-form-label fw-bold">Display on Home</label>
                </div>
                <div class="col-6">
                  <div class="d-flex mt-2">
                    <div class="form-check mx-2 my-auto">
                      <input class="form-check-input"
                        type="radio"
                        name="do_onhome"
                        id="onHomeRadio1"
                        value="1"
                        v-model="cane.do_onhome" />
                      <label class="form-check-label"
                        for="onHomeRadio1"> Yes </label>
                    </div>
                    <div class="form-check form-check mx-2 my-auto">
                      <input class="form-check-input"
                        type="radio"
                        name="do_onhome"
                        id="onHomeRadio2"
                        value="0"
                        v-model="cane.do_onhome" />
                      <label class="form-check-label"
                        for="onHomeRadio2"> No </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr class="">
            <div class="my-3">
              <input id="fileupload" type="file" name="fileupload" />
<button type="button" id="upload-button" @click.prevent="uploadFile" > Upload </button>
<button type="button"
            class="btn btn-primary"
            @click="uploadFile">Save</button>
              <h4 class="fw-bold">Attachments</h4>
              
              <div v-for="item in attachments" :key="item.id">
                re
                {{ item }}
              </div>
              <ul class="list-group">
                <li class="list-group-item my-2"
                  v-for="attachment in dog.attachments"
                  :key="attachment.id">
                  <img v-if="attachment.type === 'image'"
                    :src="attachment.url"
                    alt="Attachment"
                    class="img img-thumbnail" width="50">
                  <span v-else-if="attachment.type === 'document'"
                    class="icon-doc">📄</span>
                  <!-- Add more conditions for other types of attachments -->
                  <a :href="attachment.url"
                    target="_blank">{{ attachment.name }}</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-4">
              <div class=""
                id="accordionExample">
                <div class="item">
                  <h2 class="header">
                    <span>Personal data</span>
                  </h2>
                  <div class="row mb-1">
                    <div class="col-4">
                      <label for="do_birth"
                        class="col-form-label fw-bold">Birth: </label>
                    </div>
                    <div class="col-8">
                      <input type="date"
                        class="form-control"
                        id="do_birth"
                        v-model="cane.do_birth" />
                    </div>
                  </div>
                  <div class="row mb-1">
                    <div class="col-4">
                      <label for="razza"
                        class="col-form-label fw-bold">Kind</label>
                    </div>
                    <div class="col-8">
                      <select class="form-control"
                        name="kind"
                        v-model="cane.ki_id">
                        <option v-for="item in kind"
                          :key="item.ki_id"
                          :value="item.ki_id">
                          {{ item.ki_name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-1">
                    <div class="col-4">
                      <label for="do_size"
                        class="col-form-label fw-bold">Size</label>
                    </div>
                    <div class="col-8">
                      <input type="text"
                        class="form-control"
                        id="do_size"
                        v-model="cane.do_size" />
                    </div>
                  </div>
                  <div class="row mb-1">
                    <div class="col-4">
                      <label for="do_sex"
                        class="col-form-label fw-bold">Sex</label>
                    </div>
                    <div class="col-8">
                      <div class="d-flex mt-2">
                        <div class="form-check mx-2 my-auto">
                          <input type="radio"
                            class="form-check-input"
                            name="do_sex"
                            id="sex1"
                            v-model="cane.do_sex"
                            value="Male" />
                          <label class="form-check-label"
                            for="sex1"> Male </label>
                        </div>

                        <div class="form-check form-check mx-2 my-auto">
                          <input class="form-check-input"
                            type="radio"
                            name="do_sex"
                            id="sex2"
                            v-model="cane.do_sex"
                            value="Female" />
                          <label class="form-check-label"
                            for="sex2"> Female </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row mb-1">
                    <div class="col-4">
                      <label for="do_coat"
                        class="col-form-label fw-bold">Coat</label>
                    </div>
                    <div class="col-8">
                      <input type="text"
                        class="form-control"
                        id="do_coat"
                        v-model="cane.do_coat" />
                    </div>
                  </div>
                  <div class="row mb-1">
                    <div class="col-4">
                      <label for="chip"
                        class="form-label fw-bold">Chip</label>
                    </div>
                    <div class="col-8">
                      <input type="text"
                        class="form-control"
                        id="do_chip"
                        v-model="cane.do_chip" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- HEaLTH data  -->
            <div class="col-md-4">
              <div class=""
                id="accordionExample">
                <div class="item">
                  <h2 class="header">
                    <span>Health Data</span>
                  </h2>
                  <div class="row mb-1">
                <div class="col-6">
                  <label for="do_biter"
                    class="col-form-label fw-bold">Neutering</label>
                </div>
                <div class="col-6">
                  <div class="d-flex mt-2">
                    <div class="form-check mx-2 my-auto">
                      <input class="form-check-input"
                        type="radio"
                        name="do_neutering"
                        id="neuteringRadio1"
                        value="1"
                        v-model="cane.do_neutering" />
                      <label class="form-check-label"
                        for="neuteringRadio1"> Yes </label>
                    </div>
                    <div class="form-check form-check mx-2 my-auto">
                      <input class="form-check-input"
                        type="radio"
                        name="do_neutering"
                        id="neuteringRadio2"
                        value="0"
                        v-model="cane.do_neutering" />
                      <label class="form-check-label"
                        for="neuteringRadio2"> No </label>
                    </div>
                  </div>
                </div>
              </div>
                  <div class="row mb-1">
                    <div class="col-4">
                      <label for="therapy"
                        class="col-form-label fw-bold">Therapy</label>
                    </div>
                    <div class="col-8">
                      <input type="text"
                        class="form-control"
                        id="do_therapy"
                        v-model="cane.do_therapy" />
                    </div>
                  </div>
                  <div class="row mb-1">
                    <div class="col-4">
                      <label for="pathologies"
                        class="col-form-label fw-bold">Pathologies</label>
                    </div>
                    <div class="col-8">
                      <input type="text"
                        class="form-control"
                        id="do_pathologies"
                        v-model="cane.do_pathologies" />
                    </div>
                  </div>
                  <div class="row mb-1">
                    <div class="col-4">
                      <label for="taglia"
                        class="col-form-label fw-bold">Food</label>
                    </div>
                    <div class="col-8">
                      <input type="text"
                        class="form-control"
                        id="food"
                        placeholder="link to food table" />
                    </div>
                  </div>
                  <div class="row mb-1">
                    <div class="col-4">
                      <label for="sesso"
                        class="col-form-label fw-bold">Alive</label>
                    </div>
                    <div class="col-8">
                      <div class="d-flex mt-2">
                        <div class="form-check mx-2 my-auto">
                          <input class="form-check-input"
                            type="radio"
                            name="do_alive"
                            id="aliveRadio1"
                            value="1"
                            v-model="cane.do_alive" /> 
                          <label class="form-check-label"
                            for="aliveRadio"> Yes </label>
                        </div>
                        <div class="form-check form-check mx-2 my-auto">
                          <input class="form-check-input"
                            type="radio"
                            name="do_alive"
                            id="aliveRadio2"
                            value="0"
                            v-model="cane.do_alive" />
                          <label class="form-check-label"
                            for="aliveRadio"> No </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class=""
                id="">
                <div class="">
                  <h2>Shelter data</h2>
                </div>
                <form>
                  <div class="container p-1">
                    <div class="row mb-1">
                      <div class="col-5">
                        <label for="birth"
                          class="col-form-label fw-bold">Shelter section</label>
                      </div>
                      <div class="col-7">
                        {{ shelter.bo_id }} 
                        <select class="form-control"
                          name="box"
                          v-model="shelter.bo_id">
                          <option v-for="item in boxes"
                            :key="item.bo_id"
                            :value="item.bo_id"
                            :model="shelter.bo_id"
                            >
                            {{ item.bo_block }} - {{ item.bo_number }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="row mb-1">
                      <div class="col-4">
                        <label for="birth"
                          class="col-form-label fw-bold"> Entry date </label>
                      </div>
                      <div class="col-8">
                        <input type="date"
                          class="form-control"
                          id="date_in"
                          v-model="shelter.db_datein" />
                      </div>
                    </div>
                    <div class="row mb-1">
                      <div class="col-4">
                        <label for="birth"
                          class="col-form-label fw-bold"> Exit date </label>
                      </div>
                      <div class="col-8">
                        <input type="date"
                          class="form-control"
                          id="date_out"
                          v-model="shelter.db_dateout" />
                      </div>
                    </div>
                    <div class="row mb-1">
                      <div class="col-4">
                        <label for="owner"
                          class="col-form-label fw-bold">Owner</label>
                      </div>
                      <div class="col-8">
                        <input type="text"
                          class="form-control"
                          id="food"
                          placeholder="link to User / Charged" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <hr class="" />
          <div class="row my-4">
            <div class="col-12">
              <div class="card shadow p-2">
                <h4 class="header"><span>Actions data</span></h4>
                <table class="table table-hover">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">Action Type</th>
                      <th scope="col"
                        class="text-center col-2">Date | Time</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="action in dog.actions"
                      :key="action.id">
                      <td>
                        <div class="">
                          <input type="checkbox"
                            name=""
                            id=""
                            class="mx-2" />
                          {{ action.actionType }}
                        </div>
                      </td>
                      <td>
                        <small class="mx-2">{{ action.date }} </small>|<small class="mx-2"> {{ action.time
                        }}</small>
                      </td>

                      <td :class="action.status === 'Completed' ? 'status-completed' : 'status-pending'
                        ">
                        {{ action.status }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid d-none">
    <div class="card p-5"
      id="element-to-print">
      <h1 class="fw-bold">Dog Details Card</h1>
      <div class="row">
        <div class="col-6">
          <!-- Left column for dog details -->
          <div class="image-container shadow mb-3"
            width="">
            <div class="image-to-replace">
              <img alt=""
                style=""
                :src="getImageUrl(cane.do_id)"
                id="thumbpdf" />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label"
              style="font-weight: bold">Name:</label>
            <p id="dogName">{{ cane.do_name }}</p>
          </div>
          <div class="mb-3">
            <label class="form-label"
              style="font-weight: bold">Character:</label>
            <p id="dogChar">{{ cane.do_carattere }}</p>
          </div>
          <div class="mb-3">
            <label class="form-label"
              style="font-weight: bold">Breed:</label>
            <p id="dogBreed">{{ cane.do_razza }}</p>
          </div>
          <div class="mb-3">
            <label class="form-label"
              style="font-weight: bold">Age:</label>
            <p id="dogAge">{{ cane.do_birth }}</p>
          </div>
          <div class="mb-3">
            <label class="form-label"
              style="font-weight: bold">Sex:</label>
            <p id="dogSex">{{ cane.do_sex }}</p>
          </div>
        </div>
        <div class="col-6">
          <!-- Right column for additional details -->
          <div class="shadow mb-3"
            width="">
            <img v-if="cane.hasImg"
              id="thumbnail"
              src="https://placehold.co/300"
              class=""
              width=""
              style="" />
          </div>
          <div class="mb-3">
            <label class="form-label"
              style="font-weight: bold">Color:</label>
            <p id="dogColor">{{ cane.mantello }}</p>
          </div>
          <div class="mb-3">
            <label class="form-label"
              style="font-weight: bold">Microchip Number:</label>
            <p id="dogMicrochip">{{ cane.chip }}</p>
          </div>
          <div class="mb-3">
            <label class="form-label"
              style="font-weight: bold">Health issues:</label>
            <p id="dogMicrochip">{{ cane.patologie }}</p>
          </div>
          <div class="mb-3">
            <label class="form-label"
              style="font-weight: bold">Neutered</label>
            <p id="dogVaccinations">{{ cane.sterilizzazione }}</p>
          </div>
          <div class="mb-3">
            <label class="form-label"
              style="font-weight: bold">Additional Notes:</label>
            <p id="dogNotes">[Additional Notes or Medical History]</p>
          </div>
        </div>
      </div>
    </div>
    <section id="new_card">
      <div class="container-fluid my-3">
        <div class="card">
          <div class="row">
            <div class="col-4 m-auto my-4">
              <div class="card shadow p-4">
                <div class="image-container shadow m-auto mb-3"
                  width="">
                  <img v-if="cane.hasImg"
                    id="thumbnail"
                    :src="getImageUrl(cane.id)"
                    class="img circular-image"
                    width=""
                    style="" />
                </div>
                <div class="text-center">
                  <h1 class="m-auto">{{ cane.name }}</h1>
                  <small class="small">I'm born on</small>
                  <h5 class="m-auto">{{ cane.birth }}</h5>
                  <small> My character is </small>
                  <h4 class="m-auto">{{ cane.carattere }}</h4>
                  <p v-if="cane.morsicatore === 'yes'">I can bite and show aggressiveness</p>
                  <p v-else>I don't usually bite unless provoked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.thead-dark th {
  /* background-color: #343a40;
  color: #fff; */
  font-size: 16px;
}

.bgbody {
  background: #ecebff;
}

.bgtest {
  background: hsla(141, 54%, 86%, 1);

  background: linear-gradient(90deg,
      hsla(141, 54%, 86%, 1) 0%,
      hsla(333, 73%, 85%, 1) 50%,
      hsla(211, 58%, 79%, 1) 100%);
  background: linear-gradient(90deg,
      hsla(141, 54%, 86%, 1) 0%,
      hsla(333, 73%, 85%, 1) 50%,
      hsla(211, 58%, 79%, 1) 100%);

  background: -moz-linear-gradient(90deg,
      hsla(141, 54%, 86%, 1) 0%,
      hsla(333, 73%, 85%, 1) 50%,
      hsla(211, 58%, 79%, 1) 100%);
  background: -moz-linear-gradient(90deg,
      hsla(141, 54%, 86%, 1) 0%,
      hsla(333, 73%, 85%, 1) 50%,
      hsla(211, 58%, 79%, 1) 100%);

  background: -webkit-linear-gradient(90deg,
      hsla(141, 54%, 86%, 1) 0%,
      hsla(333, 73%, 85%, 1) 50%,
      hsla(211, 58%, 79%, 1) 100%);
  background: -webkit-linear-gradient(90deg,
      hsla(141, 54%, 86%, 1) 0%,
      hsla(333, 73%, 85%, 1) 50%,
      hsla(211, 58%, 79%, 1) 100%);

  filter: progid: DXImageTransform.Microsoft.gradient(startColorstr="#CAEFD7", endColorstr="#F5BFD7", GradientType=1);
  filter: progid: DXImageTransform.Microsoft.gradient(startColorstr="#CAEFD7", endColorstr="#F5BFD7", GradientType=1);
}

/* * {
  border: solid red 1px;
} */

.camera-icon-label {
  position: absolute;
  bottom: 0px;
  /* Adjust the distance from the bottom as needed */
  right: 0%;
  /* Position it in the middle horizontally */
  transform: translateX(-50%);
  /* Center horizontally */
}

/* .image-container {
  width: 300px;
  height: 300px;
  overflow: hidden;
  border-radius: 50%;
} */

.circular-image {
  width: 100%;
  /* height: 100%; */
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 50%;
}
</style>
