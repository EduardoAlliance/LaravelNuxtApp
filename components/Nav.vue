<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Nuxt App</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" >
          <nuxt-link exact-active-class="active" class="nav-link" to="/" >Home</nuxt-link>
      </li>
      <li class="nav-item" v-if="authtenticated">
        <nuxt-link class="nav-link" to="/dashboard/topics" >Topics</nuxt-link>
      </li>

    </ul>

    <template v-if="!authtenticated">
      <ul class="navbar-nav ml-auto" >
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/login" >Login</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/register" >Register</nuxt-link>
        </li>
      </ul>
    </template>

    <template v-if="user">
      <ul class="navbar-nav ml-auto" >
        <li class="nav-item">
          <nuxt-link to="/dashboard/profile" class="nav-link">{{user.name}}</nuxt-link>
        </li>
        <li class="nav-item">
          <a @click.prevent="logout" class="nav-link"  >Logout</a>
        </li>

      </ul>
    </template>


  </div>
</nav>
</template>

<script>
  export default {
    methods:{
      logout(){
        this.$auth.logout()
      }
    }
  }
</script>
