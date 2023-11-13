<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

let addOrEdit = ref(''); // If != 0 - Edit item, else - Add item
let id = route.params.id;

let base64Image = ref();
function onChangeImage(evt) {
  const selectedfile = evt.target.files;
  if (selectedfile.length > 0) {
    const [imageFile] = selectedfile;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      base64Image.value = fileReader.result;
    };
    fileReader.readAsDataURL(imageFile);
  }
}

let news = ref({
  id: "",
  title: '',
  date_start: '',
  date_end: '',
  content: '',
});

let titleForm = ref();
let initFields = function (id) {
  news.value.title = '';
  news.value.date_start = '';
  news.value.date_end = '';
  news.value.content = '';
  titleForm.value = id;
};

initFields(id);
let loadNews = async function (id) {
  
  if (id == 0) {
    console.log('id 0');
    return;
  }
  let response = await fetch(`${import.meta.env.VITE_SERVER}/office/news/${id}`);
  let json = await response.json();
  news.value = json.data;
};

loadNews(id);

let saveNews = async function () {
  if (id == 0) {
    await fetch(`${import.meta.env.VITE_SERVER}/office/news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(news.value),
    });
  } else {
 console.log(id);

    await fetch(`${import.meta.env.VITE_SERVER}/office/news/${news.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(news.value),
    });
  }
  router.push({ path: '/news' });
};

watch(route, (newSearchTerm, oldSearchTerm) => {
  loadNews(id);
});
</script>

<template>
  <main>
    <div class="card shadow">
      <div class="card-body">
        <h1 class="card-title text-center mb-4">{{ titleForm !== '0' ? 'Edit' : 'Add' }} News</h1>
        <div class="row">

          <div class="col-6">
            <form @submit.prevent="saveNews">
              <div class="mb-3">
                <label for="newsname" class="form-label">news Name</label>
                <input type="text" class="form-control" id="newsname" v-model="news.title" placeholder="Enter news name" />
              </div>
              <div class="mb-3">
                <label for="type" class="form-label">Date start</label>
                <input type="date" class="form-control" id="type" v-model="news.date_start" placeholder="Enter date" />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Date End</label>
                <input type="date" class="form-control" id="type" v-model="news.date_end" placeholder="Enter date" />
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <input type="text" class="form-control" id="type" v-model="news.content" placeholder="Enter news content" />
              </div>
              <div class="text-center">
                <button type="button" class="btn btn-primary" @click.prevent="saveNews">Save</button>
              </div>
            </form>
          </div>




        </div>
      </div>
      <div class="card-footer text-muted text-center">News ID: {{ news.id }}</div>
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
