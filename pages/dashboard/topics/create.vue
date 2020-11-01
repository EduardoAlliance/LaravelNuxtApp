<template>
  <div class="col-xs-12 col-6  offset-sm-3">
    <h2>Create new topic</h2>
    <hr>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label >Topic title</label>
        <input type="text" class="form-control" :class="{ 'is-invalid' : errors.title }" v-model="topic.title" autofocus >
        <div  class="invalid-feedback" v-if="errors.title">
          {{errors.title[0]}}
        </div>
      </div>
      <div class="form-group">
        <label >Body</label>
        <textarea class="form-control" :class="{ 'is-invalid' : errors.body }" v-model="topic.body"></textarea>
        <div  class="invalid-feedback" v-if="errors.body">
          {{errors.body[0]}}
        </div>
      </div>

      <p v-if="success" class="text-success">Topic successfully added</p>
      <p v-if="error" class="text-danger">{{error}}</p>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        topic:{
          title:'',
          body:''
        },
        success:false,
        error:false
      }
    },
    methods:{
      async submit(){
        try{
          this.error = '';
          await this.$axios.post('topics',this.topic);

          this.success = true;

          this.topic.title = '';
          this.topic.body = ''

        }catch (e) {
          if(e.response.status === 404){
            this.error = e
          }
        }
      }
    }
  }
</script>
