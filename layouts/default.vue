<template>
  <div>

    <Nav />

    <div class="container-fluid mt-5">
      <div class="mt-3">
        <Nuxt />
      </div>
    </div>

  </div>
</template>


<script>
  import Nav from '../components/Nav'
  export default {
    components:{
      Nav
    }

  }
</script>
