<script setup>
import { ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'

let user = ref({})

const userLogIn = async function () {
  console.log('welcome to the LOGIN FORM')
  let name = document.getElementById('username').value
  let pwd = document.getElementById('password').value

  let response = await fetch('https://canile.wywiwyg.net/office/login', {
    method: 'POST',
    headers: {

      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: name, password: pwd })
  })
  let user = await response.json();
  // console.log({ user });
  if (user) {
    // console.log(user);
    localStorage.setItem('token', JSON.stringify(user.data) );
    window.location.href = "/";
  } else {
    console.log("no user in localstorage");
  }
}

const logOut = function () {
  // let user = {};
  localStorage.removeItem('token');
  window.location.href = "/login";

}

</script>

<!-- <template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="form" method="POST" action="login">
            <h2 class="my-3">Login</h2>
            <h5 class="my-3">please insert your username and your password</h5>
            <p class="my-3">this form is secured by https encryption and SHA1 hashing</p>
            <p>BEWARE OF REST API METHOD FOR HASHED PWD MATCH ((SHA1()//PASSWORD()))</p>
            <div class="my-3">
              <input type="text" name="name" id="name" placeholder="insert username" />
            </div>
            <div class="my-3">
              <input type="password" name="pass" id="pass" placeholder="insert password" />
            </div>
            <button class="btn btn-info" @click="userLogIn()">log in</button>
            <button class="btn btn-danger" @click="logOut()">log OUT</button>
          </div>
        </div>
        <div class="col-6">
          <h2>Login status: </h2>
          <div class="status" id="stats"></div>
        </div>
      </div>

    </div>
  </main>
</template> -->


<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="userLogIn">
              <div class="form-group">
                <label for="username" class="small">Username:</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
              </div>
              <div class="form-group">
                <small for="password">Password:</small>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <button type="submit" class="btn btn-primary my-3">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>