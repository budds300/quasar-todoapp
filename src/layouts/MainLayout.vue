<template>
  <q-layout view="lHh Lpr lFf">
    <q-header >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

      </q-toolbar>

      <div class="q-px-md q-pt-xl q-mb-md">

        <div class="text-h3">Todo</div>
        <div class="text-subtitle1">{{ todaysDate }}</div>
      </div>
      <q-img class="header-img absolute-top" src="../statics/background.jpg" />
    </q-header>


    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="600"
      >
        <q-scroll-area style="height: calc(100% - 192px); margin-top: 192px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item
              clickable
              v-ripple
              to="/"
              exact>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
                Todo
              </q-item-section>
            </q-item>

            <q-item

              clickable
              v-ripple
              to="/help"
              exact>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Help
              </q-item-section>
            </q-item>
            <q-item

              clickable
              v-ripple
              @click="logout"
              exact>
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>

              <q-item-section>
                Logout
              </q-item-section>
            </q-item>


          </q-list>
        </q-scroll-area>

        <!-- <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px"> -->
          <q-img class=" absolute-top primary" src="../statics/background.jpg" style="height: 192px" >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <i class="bi bi-person-circle  text-h3"></i>
            </q-avatar>
            <div class="text-weight-bold">Name:</div>
            <div>username</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import {date} from 'quasar'
import { useCounterStore } from 'src/stores/showcase'
import { route } from 'quasar/wrappers'
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
// import EssentialLink from 'components/EssentialLink.vue'
const useStore=useCounterStore()
const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    // EssentialLink
  },

  setup () {
    const $router = useRouter()
    const $q = useQuasar();
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },computed:{
    todaysDate(){
      let timeStamp=Date.now()
      return date.formatDate(timeStamp,'dddd D MMMM')
    }
  },
  methods:{
   async logout(){
     const users = await useStore.fetchUser()
      await useStore.logOut()
      useStore.clearUser(users)
      this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "You have Successfully Logged Out",
        });
     this.$router.push('/auth/login')
    }
  }


})
</script>
<style >
.header-img {
height:100%;
z-index: -1;
opacity:0.2;
filter:grayscale(100%)
}
</style>
