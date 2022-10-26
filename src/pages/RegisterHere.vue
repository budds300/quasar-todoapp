<template>
  <q-page class="bg-white  row justify-center  ">
    <div class="column">
      <div class="row">
       
      </div>
      <div class="column q-pt-md">
        <q-card square bordered class="q-mx-xl relative-center items-center shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="name" type="name" placeholder="Name" />
              <q-input square filled clearable v-model="email" type="email" placeholder="Email" />
              <q-input square filled clearable v-model="password" type="password" placeholder="Password" />
              <q-input square filled clearable v-model="password" type="password" placeholder="Confirm Password" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-blue-7" size="lg" class="full-width" label="Login" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <a class="text-blue-9" href="/login">Not reigistered? Created an Account</a>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
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
    onSubmit(){
      
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>