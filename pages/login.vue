<template>
  <div class="col-xs-12 col-6  offset-sm-3">
    <form @submit.prevent="submit">
      <div class="form-group">
        <label >Email address</label>
        <input type="email" class="form-control" :class="{ 'is-invalid' : errors.email }" v-model.trim="login.email" autofocus >
        <div  class="invalid-feedback" v-if="errors.email">
          {{errors.email[0]}}
        </div>
      </div>
      <div class="form-group">
        <label >Password</label>
        <input type="password" class="form-control" :class="{ 'is-invalid' : errors.password }" v-model.trim="login.password" >
        <div  class="invalid-feedback" v-if="errors.password">
          {{errors.password[0]}}
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  export default {
    auth:false,
    data(){
      return {
        login: {
          email:'',
          password:''
        }
      }
    },
    methods: {
      async submit(){
         try {
           let response = await this.$auth.loginWith('local',{data: this.login});

           console.log('response', response);

           this.$router.push({
             path : this.$route.query.redirect || "/dashboard/topics/"
           })

         }catch (e) {
           console.log('Error Response', e.response)
         }
      }
    }
  }
</script>
