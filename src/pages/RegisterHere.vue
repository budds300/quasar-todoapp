<template>
  <q-page class="bg-white  row justify-center  ">
    <div class="column">
      <div class="row">
        <h3 class="text-center">Register</h3>
      </div>
      <div class="column q-pt-xl">
        <q-card square bordered class="q-mx-xl relative-center items-center shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md" @submit="onSubmit">
              <q-input square filled clearable v-model="name"  stack-lable type="name" placeholder="Name" />
              <q-input square filled clearable v-model="email"  stack-lable type="email" placeholder="Email" />
              <q-input square filled clearable v-model="password"  stack-lable type="password" placeholder="Password" />
              <q-input square filled clearable v-model="confirm_password" stack-lable  type="password" placeholder="Confirm Password" />
              <q-btn unelevated color="light-blue-7" size="lg" type="submit" class="full-width" label="Register" />
            </q-form>
            </q-card-section>
          <q-card-actions class="q-px-md">
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
import { mapActions } from 'pinia'

import { reactive, ref } from 'vue'
import { useQuasar } from 'quasar'
import useCounterStore from '../stores/showcase'
import { useRouter } from 'vue-router'

const router = useRouter()
const $q = useQuasar()

const userStore= useCounterStore

export default {
  // name: 'Login'/,
  
  data () {
    return {
       name :ref(''),  
        email: ref(''),
       password: ref(''),
       confirm_password: ref(''),
   
      
    }
  },
  methods:{
    // ...mapActions(['signUp']),
     async onSubmit(){
      try {
    // Get the tokens/cookies
    await userStore.getSanctumCookie()
    // Register User
    await userStore.register(
      this.firstName ,
      this.lastName ,
      this.email ,
      this.password ,
      this.confirm_password
    )
   
  } catch (error) {
    $q.loading.hide()
    $q.dialog({
      title: 'Registration failed',
      message: 'Your registration was unsuccessful. Please make sure that your details are correct.',
      persistent: true
    })
  }
      
      
      
      return response
    }
    
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
