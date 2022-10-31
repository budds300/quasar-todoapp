<template>
  <q-page class="bg-white row justify-center ">
    <div class="column">
      <div class="row">

      </div>
      <div class="row column q-pt-xl">
        <q-card square bordered class="q-mx-xl relative-center items-center shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="email" type="email" placeholder="Email" />
              <q-input square filled clearable v-model="password" type="password" placeholder="Password" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-blue-7" size="lg" class="full-width" label="Login" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <a class="text-blue-9" href="#/auth/register">Not reigistered? Created an Account</a>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'pinia';
export default {
  // name: 'Login'/,
  data () {
    return {
      email: '',
      password: ''
    }
  }, methods:{
    ...mapActions({
      signIn: 'auth/signIn'
    }),
    submit(){
      this.signIn(this.form)
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
