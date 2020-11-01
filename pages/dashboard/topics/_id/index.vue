<template>
  <div class="mb-5">
    <div v-if="topic">

      <p class="mt-5">
        <nuxt-link to="/dashboard/topics"><i class="fa fa-back"></i> Back to topics</nuxt-link>
      </p>

      <div class="bg-light mt-5 mb-5 p-2">
        <h2>{{topic.title}}</h2>

        <small class="text-muted mb-2">{{topic.created_at}} by {{topic.user.name}}</small>

        <table class="table">

         <thead>
         <tr>
           <td scope="col" class="col-sm-9 col-md-10">Posts</td>
           <td scope="col" class="col-sm-3 col-md-2" align="center">Actions</td>
         </tr>
         </thead>

         <tbody>
         <tr  v-for="(post,index) in topic.posts" :key="index">
           <td>
             <p>{{post.body}}</p>
             <small class="text-muted mb-2">{{post.created_at}} by {{post.user.name}}</small>
           </td>
           <td align="center">
             <div v-if="user.id === post.user.id">
               <nuxt-link :to="{name: 'dashboard-topics-posts-edit', params: {post_id: post.id, topic_id: topic.id  }  }" class=" btn btn-primary" >
                 <i class="fa fa-edit"></i>
               </nuxt-link>
               <button class=" btn btn-danger" @click="deletePost(index,post.id)" >
                 <i class="fa fa-trash"></i>
               </button>
             </div>
           </td>
         </tr>
         </tbody>
        </table>

      </div>

      <div class="mt-5-ml-5" v-if="authtenticated">
        <form @submit.prevent="createPost" >
          <div class="form-group">
            <h4 for="">Add a new post</h4>
            <textarea class="form-control" v-model="post.body" id="" cols="20" rows="10" :class="{ 'is-invalid' : errors.body }" ></textarea>
            <div  class="invalid-feedback" v-if="errors.body">
              {{errors.body[0]}}
            </div>
          </div>
          <button class="btn btn-primary" type="submit">Add Post</button>
        </form>
      </div>

    </div>


    <div v-if="!topic">
        <h2 class="text-center">Topic not found</h2>
    </div>


  </div>
</template>

<script>
  export default {
    data(){
      return {
        topic: '',
        post:{
          body:''
        }
      }
    },
    async asyncData( {$axios, params} ){
        try{
          let response = await $axios.get('topics/' + params.id);
          return {
            topic: response.data.data
          }
        }catch (e) {

        }
    },
    methods:{
      async createPost(){
        try{
          let res = await this.$axios.post('topics/'+this.topic.id+'/posts',this.post);

          let post = res.data.data;
          this.topic.posts.push(post);
          this.post.body = '';

        }catch (e) {
          console.log(e);
          this.$swal.fire('Server Error','','error')
        }


      },
      async deletePost(index,id){
        try{
          let res = await this.$axios.delete('topics/'+this.topic.id+'/posts/'+id);
          this.topic.posts.splice(index,1);
        }catch (e) {
          this.$swal.fire('Server Error','','error')

        }
      }
    }
  }
</script>
