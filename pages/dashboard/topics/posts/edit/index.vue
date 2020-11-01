<template>
  <div>
    <h2>Update Post</h2>

    <form @submit.prevent="updatePost">

      <div class="form-group mt-5">
        <textarea class="form-control" cols="20" rows="10" :class="{ 'is-invalid' : errors.body }" v-model="post.body">

        </textarea>
        <div  class="invalid-feedback" v-if="errors.body">
          {{errors.body[0]}}
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
  export default{
    data(){
      return {
        post: {
          body:''
        }
      }
    },
    async asyncData({$axios,params}){
        try{
          let response = await $axios.get('topics/'+params.topic_id+'/posts/'+params.post_id);
          return {
            post: response.data.data
          }
        }catch (e) {

        }
    },
    methods:{
        async updatePost(){
          try {
            await this.$axios.patch('topics/' + this.$route.params.topic_id + '/posts/'+ this.$route.params.post_id,this.post);
            this.$router.push('/dashboard/topics/'+this.$route.params.topic_id);
            this.$swal.fire('Post updated','','success');
          }catch (e) {
            console.log(e);
            this.$swal.fire('Server Error','','error')
          }
        }
    }

  }
</script>
