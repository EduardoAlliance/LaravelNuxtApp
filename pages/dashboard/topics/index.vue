<template>
  <div>
    <nuxt-link class="nav-link" to="/dashboard/topics/create" >Create Topic</nuxt-link>

    <div v-for="(topic,index) in topics" :key="index" class="bg-light mt-5 mb-5 p-2">

      <div class="d-flex">

        <h2 class="d-inline">
          <n-link :to="{name: 'dashboard-topics-id', params: {id: topic.id} }">{{topic.title}}</n-link>
        </h2>

        <div v-if="authtenticated" class="m-1 d-inline ml-auto">
          <div v-if="user.id === topic.user.id">

            <nuxt-link :to="{name:'dashboard-topics-edit', params: {id: topic.id} }"  class="btn btn-primary">Edit <i class="fa fa-edit"></i></nuxt-link>
            <button @click="deleteTopic(topic.id)"   class="btn btn-danger">Delete <i class="fa fa-trash"></i></button>

          </div>
        </div>

      </div>




      <p class="text-muted">{{topic.created_at}} by {{topic.user.name}}</p>


      <table class=" table ">
        <tr>
          <th class="col-11"></th>
          <th class="col-1"></th>
        </tr>
        <tr  v-for="(post,index) in topic.posts" :key="index">
          <th>{{post.body}}
            <p class="text-muted">{{post.created_at}} by {{post.user.name}}</p></th>
          <th align="center">
            <button class="btn btn-secondary" @click="likePost(post)"><i class="fa fa-thumbs-up"></i> <span class="badge badge-light">{{post.likes.counts}}</span> </button>
          </th>
        </tr>
      </table>


    </div>


    <pagination class="justify-content-center" :data="pagination" @pagination-change-page="getResults"></pagination>


  </div>
</template>

<script>
  export default{
    data(){
      return{
        topics: [],
        pagination:{},
        page:1
      }
    },
    async asyncData({$axios}){
      let response = await $axios.get('topics');
      return {
        topics: response.data.data,
        pagination: response.data.meta
      }
    },
    methods: {
      // Our method to GET results from a Laravel endpoint
      async getResults(page=1) {
        try {
          this.page = page;
          await this.$axios.get('topics?page=' + this.page).then(res => {
            this.topics=  res.data.data;
            this.pagination= res.data;
          });

        }catch (e) {

        }
      },
      async deleteTopic(topicId){

          await this.$swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {

              try {
                 this.$axios.delete('topics/'+topicId);
                this.getResults(this.page);
                 this.$swal.fire('Deleted!',
                  'Your file has been deleted.',
                  'success');

              }catch (e) {

              }

            }
          });


      },
      async likePost(post){
        let loggedUser = this.$store.getters['user'];

        //no puede dar like a su post
        if(post.user.id === loggedUser.id){
          this.$swal.fire('You cant like yout own post','','warning')
          return;
        }

        //usuario  ya dio like al post
        if(post.likes.users){

          if(post.likes.users.some( user => user.id === loggedUser.id )){
            this.$swal.fire('You have already liked this post','','warning')
          }else{
            //post like
            await this.$axios.post('posts/'+post.id+'/likes');
            this.getResults(this.page)
          }
        }

      }
    }
  }
</script>
