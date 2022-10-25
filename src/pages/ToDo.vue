<template>
  <q-page class="bg-grey-3 column">
    

      <div class=" q-pa-sm bg-primary" >

<q-form
  @submit="addTask"
  @reset="onReset"
  class="q-gutter-md "
>
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
  <q-toggle v-model="reminder" :toggle-order="t?1:0" class=" q-px-sm" label="reminder" color="white" />
  <div>
    <q-btn label="Submit" type="submit" color="black"/>
    <q-btn label="Reset" type="reset" color="primary" flat class="q-mt-sm" />
  </div>
</q-form>

</div>


    <!-- <div class=" q-pa-sm bg-primary">
           <q-input
           v-model="newTask"
           @keyup.enter="addTask"
        filled
        bg-color="white"
        class="col"
        placeholder="Add task"
        dense>
       
        <template v-slot:append>
          <q-btn round dense flat icon="add" @click="addTask" />
        </template>
      </q-input>
    </div> -->
       <q-list
       separator
       bordered>
      <q-item
        tag="label"
        class="bg-white"
        clickable
        :key="task.id"
        @click.prevent="toggleReminder(task.id)"
        v-ripple
        :class="{'done bg-blue-1':task.reminder}"
        v-for="(task) in tasks">
       
        <q-item-section>
          <q-item-label>{{task.text}}</q-item-label>
          <q-item-label caption>
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label >{{task.day}}</q-item-label>
          
        </q-item-section>
        <q-item-section
       
        side
        >
        <q-btn
        @click.capture.stop="deleteTask(task.id)" 
          flat
          round
          color="primary"
          icon="delete"
          />
        
        </q-item-section>
        <q-item-section
        side
        >
        <q-btn
        @click.capture.stop="dialog=true" 
          flat
          round
          color="primary"
          icon="update"
          class="q-pt-lg"
          />
          <div class="q-pa-md">
  
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are currently not connected to any network.</span>
        </q-card-section>

        <q-card-section class="row items-center">
          <q-toggle v-model="cancelEnabled" label="Cancel button enabled" />
        </q-card-section>

        <!-- Notice v-close-popup -->
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup="cancelEnabled" :disable="!cancelEnabled" />
          <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
        </q-item-section>

      </q-item>
    </q-list>
  </q-page>
</template>
<script>

import { ref } from 'vue'
import { useQuasar } from 'quasar'
import axios from 'src/boot/axios'
export default{

  name: 'ToDo',
  data(){
    
    const text = ref(null)
    const day = ref(null)
    const reminder = false
    const $q = useQuasar()
    return{
      text,
      day,
      reminder,
      

      
      
      tasks:[]
    }
  },
  async created(){
    this.tasks= await this.fetchTasks()
    console.log(this.tasks)
  },
  methods:{
   async fetchTasks(){
    const res = await fetch("http://127.0.0.1:8000/api/tasks")
    const  {data}= await res.json()
    return data
    },

    async deleteTask(id){
      const res = await fetch(`http://127.0.0.1:8000/api/tasks/${id}`,{
        method:'DELETE'
      })
      this.$q.dialog({
        dark: true,
        title: 'Confirm',
        message: 'Are you sure you want to delete this task?',
        cancel: false,
        persistent: true
      }).onOk(() => {
        res.status === 200 ? this.tasks= this.tasks.filter((task)=>task.id !==id) :alert('Error deletin task')
        this.$q.notify('Task Deleted')
      })
    
    },
    async addTask(e){
      e.preventDefault()
      if(!this.text){
        alert('Kindly fill in some details')
      }
      if(!this.day){
        alert('Kindly fill in some details')
      }
      const newTask={
        text : this.text,
        day : this.day,
        reminder : this.reminder,
      }
      console.log(newTask)
     const res = await fetch('http://127.0.0.1:8000/api/tasks/',{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(newTask)
     })
     const {data}= await res.json()
     this.tasks=[...this.tasks,data]

     this.$q.notify({
       color: 'green-4',
       textColor: 'white',
       icon: 'cloud_done',
       message: 'Task added'
     })
            this.text=ref(null)
            this.day=ref(null)
            this.reminder=false
    },
    async toggleReminder(id){
      const taskToToggle= await this.fetchTasks(id)
      const updateTask={...taskToToggle,reminder:!taskToToggle.reminder}
      console.log(taskToToggle)
      
      await fetch(`http://127.0.0.1:8000/api/tasks/${id}`,{
        method:'PUT',
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(updateTask)
      }).then(data => data.json())
      
      this.tasks=this.tasks.map(task=>task.id===id?{...task,reminder:data.reminder}:task)
    }
   


  }

}
</script>
<style >
.done >.q-item__label{
    text-decoration:line-through;

}
</style>
