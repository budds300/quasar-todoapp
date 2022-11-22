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
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
              <q-input
                square
                filled
                clearable
                v-model="email"
                stack-lable
                type="email"
                placeholder="Email"
                :rules="[(val) => !!val || 'Email is missing', isValidEmail()]"
              />
              <q-input
                square
                filled
                clearable
                v-model="password"
                stack-lable
                type="password"
                placeholder="Password"
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Kindly fill in your Password',
                ]"
              />
              <q-input
                square
                filled
                clearable
                v-model="password_confirmation"
                stack-lable
                type="password"
                placeholder="Confirm Password"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
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
    const $router = useRouter();
    const $q = useQuasar();
    return {
      // csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    isValidEmail() {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(this.email) || "Invalid email";
    },
    // ...mapActions(['signUp']),
    async onSubmit() {
      try {
        // Get the tokens/cookies
        await userStore.getSanctumCookie();
        // register user
        await userStore.registerUser(
          this.name,
          this.email,
          this.password,
          this.password_confirmation
        );
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Registration Successfull",
        });
        this.$router.push("/auth/login");
      } catch (error) {
        this.$q.dialog({
          title: "Registration failed",
          message:
            "Your Registration was unsuccessful. Please make sure that your details are correct.",
          persistent: true,
        });
      }
    },
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
