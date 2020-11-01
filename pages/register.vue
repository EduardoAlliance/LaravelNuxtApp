<template>
  <div class="col-xs-12 col-6  offset-sm-3">
    <form @submit.prevent="submit">
      <div class="form-group">
        <label >Name</label>
        <input type="text" class="form-control" :class="{ 'is-invalid' : errors.name }" v-model="register.name" autofocus >
        <div  class="invalid-feedback" v-if="errors.name">
          {{errors.name[0]}}
        </div>
      </div>
      <div class="form-group">
        <label >Email address</label>
        <input type="email" class="form-control" :class="{ 'is-invalid' : errors.email }" v-model.trim="register.email" autofocus >
        <div  class="invalid-feedback" v-if="errors.email">
          {{errors.email[0]}}
        </div>
      </div>
      <div class="form-group">
        <label >Password</label>
        <input type="password" class="form-control" :class="{ 'is-invalid' : errors.password }" v-model.trim="register.password" >
        <div  class="invalid-feedback" v-if="errors.password">
          {{errors.password[0]}}
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
  export default {
    auth:false,
    data(){
      return {
        register: {
          name:'',
          email:'',
          password:''
        }
      }
    },
    methods: {
      async submit(){
        try {
          await this.$axios.$post('register',this.register);

          await this.$auth.loginWith('local',{
            data: {
              email: this.register.email,
              password: this.register.password
            }
          });
          this.$router.push({
            path : this.$route.query.redirect || "/dashboard/topics"
          })
        }catch (e) {

        }
      }
    }
  }
</script>
