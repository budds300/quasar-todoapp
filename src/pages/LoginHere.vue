<template>
  <q-page class="bg-white row justify-center ">
    <div class="column">
      <div class="row">

      </div>
      <div class="row column q-pt-xl" >
        <q-card square bordered class="q-mx-xl relative-center items-center shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md" @submit="submit">
              <q-input square filled clearable v-model="email" type="email" placeholder="Email" />
              <q-input square filled clearable v-model="password" type="password" placeholder="Password" />
              <q-btn unelevated color="light-blue-7" size="lg" class="full-width" label="Login" type="submit" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <a class="text-blue-9" href="/auth/register/">Not reigistered? Created an Account</a>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>


import {  ref } from 'vue'
import { useQuasar } from 'quasar'
import {useCounterStore} from '../stores/showcase'
import { mapState } from 'pinia'
import { useRouter } from 'vue-router'
import router from 'src/router'
const email = ref('')
const password = ref('')
const userStore = useCounterStore()
export default {
  // name: 'Login'/,

  data () {
    const $router = useRouter()
    const $q = useQuasar()
    return {
      email: '',
      password: ''
    }
  },

   methods:{
    async submit(){
      try {
    // Get the tokens/cookies

    await userStore.getSanctumCookie()
    // Login user
    await userStore.login(this.email, this.password)
    const user = await userStore.fetchUser()
    console.log(user)
    userStore.setUser(user.data)
    this.$router.push('/')
      }
      catch(error){
    this.$q.dialog({
      title: 'Login failed',
      message: 'Your login was unsuccessful. Please make sure that your details are correct.',
      persistent: true
    })
  }


  }
}
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
