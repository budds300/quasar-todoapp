<template>
  <q-page class="bg-white row justify-center">
    <div class="column">
      <div class="row">
        <h3 class="text-center">Register</h3>
      </div>
      <div class="column q-pt-xl">
        <q-card
          square
          bordered
          class="q-mx-xl relative-center items-center shadow-1"
        >
          <q-card-section>
            <q-form class="q-gutter-md" @submit="onSubmit">
              <input type="hidden" name="_token" v-bind:value="csrf" />
              <q-input
                square
                filled
                clearable
                v-model="name"
                stack-lable
                type="name"
                placeholder="Name"
              />
              <q-input
                square
                filled
                clearable
                v-model="email"
                stack-lable
                type="email"
                placeholder="Email"
              />
              <q-input
                square
                filled
                clearable
                v-model="password"
                stack-lable
                type="password"
                placeholder="Password"
              />
              <q-input
                square
                filled
                clearable
                v-model="password_confirmation"
                stack-lable
                type="password"
                placeholder="Confirm Password"
              />
              <q-btn
                unelevated
                color="light-blue-7"
                size="lg"
                type="submit"
                class="full-width"
                label="Register"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md"> </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <a class="text-blue-9" href="/auth/login"
              >Not reigistered? Created an Account</a
            >
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useCounterStore } from "../stores/showcase";
import { useRouter } from "vue-router";



const userStore = useCounterStore();

export default {
  // name: 'Login'/,

  data() {
    const $router = useRouter()
    const $q = useQuasar()
    return {
      // csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      name: ref(""),
      email: ref(""),
      password: ref(""),
      password_confirmation: ref(""),
    };
  },
  methods: {
    // ...mapActions(['signUp']),
    async onSubmit(){
      try {
    // Get the tokens/cookies

    await userStore.getSanctumCookie()
    // Login user
    await userStore.registerUser(this.email, this.password)
    
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
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
