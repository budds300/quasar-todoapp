<template>
  <q-page class="bg-white  row justify-center  ">
    <div class="column">
      <div class="row">
       
      </div>
      <div class="column q-pt-xl">
        <q-card square bordered class="q-mx-xl relative-center items-center shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="name" type="name" placeholder="Name" />
              <q-input square filled clearable v-model="email" type="email" placeholder="Email" />
              <q-input square filled clearable v-model="password" type="password" placeholder="Password" />
              <q-input square filled clearable v-model="confirm_password" type="password" placeholder="Confirm Password" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-blue-7" size="lg" class="full-width" label="Login" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <a class="text-blue-9" href="/#/auth/login">Not reigistered? Created an Account</a>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'src/boot/axios'

export default {
  // name: 'Login'/,
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    }
  },
  methods:{
    async onSubmit(){
      e.preventDefault()
      if(!this.name){
        alert('Kindly fill in some details')
      }
       else if(!this.email){
        alert('Kindly fill in some details')
      }
      else if(!this.password){
        alert('Kindly fill in some details')
      }
     else  if(!this.confirm_password){
        alert('Kindly fill in some details')
      }
      else if(!this.confirm_password !==this.password){
       alert('Kindly fill in some details')

      }
      await axios.post('http://127.0.0.1:8000')

    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>