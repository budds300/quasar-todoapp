<template>
  <q-page class="bg-grey-3 column">
    <div class="q-pa-sm bg-primary">
      <q-form @submit="addTask" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="text"
          placeholder="Task *"
          bg-color="white"
          class="col"
          no-reset-focus
          lazy-rules
        />
        <!-- :rules="[ val => val && val.length > 0 || 'Please type something']" -->
        <q-input
          class="col"
          filled
          type="date"
          v-model="day"
          placeholder="Date *"
          bg-color="white"
          no-reset-focus
          lazy-rules
        />
        <!-- :rules="[
      val => val !== null && val !== '' || 'Please Choose a date',

    ]" -->
        <q-toggle
          v-model="reminder"
          :toggle-order="t ? 1 : 0"
          class="q-px-sm"
          label="reminder"
          color="white"
        />
        <div>
          <q-btn label="Submit" type="submit" color="black" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-mt-sm"
          />
        </div>
      </q-form>
    </div>
    <q-list separator bordered>
      <q-item
        tag="label"
        class="bg-white"
        v-ripple
        :key="task.id"
        @click.prevent="userStore.toggleReminder(task.id)"
        :class="{ 'done bg-blue-1': task.reminder }"
        v-for="task in userStore.tasks"
      >
        <q-item-section>
          <q-item-label>{{ task.text }}</q-item-label>
          <q-item-label caption> </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.day }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            flat
            round
            color="primary"
            icon="delete"
            @click.capture.stop="deleteTask(task.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
<script>
import { useQuasar } from "quasar";
import { useCounterStore } from "src/stores/showcase";
const userStore = useCounterStore();
export default {
  name: "ToDo",
  data() {
    const $q = useQuasar();
    userStore.fetchTasks();
    return {
      text: "",
      day: "",
      reminder: false,
      userStore,

    };
  },
  methods: {
    async deleteTask(id) {
    try{
      await userStore.deleteTask(id)
      this.$q
        .dialog({
          dark: true,
          title: "Confirm",
          message: "Are you sure you want to delete this task?",
          cancel: false,
          persistent: true,
        })
        .onOk(() => {
         userStore.tasks = userStore.tasks.filter((task) => task.id !== id)
          this.$q.notify("Task Deleted");
        });
    }
    catch(error){
      if (error) throw error;
    }
    },
    async addTask() {
      if(!this.text){
        alert("Kindly fill in the fields correctly")
      }
      else if (!this.day){
        alert('Kindly fill in the date field')
      }
      else{
          try {
          await userStore.addTask({text:this.text,day:this.day,reminder:this.reminder,});
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Task added",
          });
            this.text=""
           this.day=""
           this.reminder=false
        }
        catch (error) {
          this.$q.dialog({
        title: 'Something went wrong',
        message: 'Something went wrong. Please try again.',
        persistent: true
      })
        }
        }
      },
    },
};
</script>
<style>
.done > .q-item__label {
  text-decoration: line-through;
}
</style>
