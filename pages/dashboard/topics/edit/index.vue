<template>
  <div>

    <h2>Update Topic Title</h2>

    <form @submit.prevent="update">

      <div class="form-group mt-5">
        <input type="text" class="form-control" :class="{ 'is-invalid' : errors.title }" v-model="topic.title">
        <div  class="invalid-feedback" v-if="errors.title">
          {{errors.title[0]}}
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Update</button>
    </form>

    <p class="mt-5">
      <nuxt-link to="/dashboard/topics">Back to topics</nuxt-link>
    </p>


  </div>
</template>

<script>
  export default {
    data(){
      return {
        topic:{
          title:''
        }
      }
    },
    async asyncData({$axios,params}){
      const response = await $axios.get('topics/'+params.id);
      return {
        topic: response.data.data
      }
    },
    methods: {
      async update(){
        try {
          await this.$axios.patch('topics/'+this.$route.params.id,this.topic);
          this.$router.push('/dashboard/topics')
        } catch (e) {
          alert('something wrong')
        }

      }
    }
  }
</script>


