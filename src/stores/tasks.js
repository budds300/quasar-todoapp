import { defineStore } from 'pinia';
import api from 'src/apis/api';

export const useCounterStore = defineStore('counter', {
  state: () => ({
     text: null,
    day: null,
    reminder: 0,

  }),

  getters: {
    getText: (state) => state.text,
    getText: (state) => state.day,
    getText: (state) => state.reminder,

    },

    actions: {

        async fetchTasks(){
         await api.get("tasks").then(data=>data.data).then(r =>r.data)

         },
         async deleteTask(id){
           const res = await api.delete(`/tasks/${id}`)
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
             reminder : this.reminder ===true?1:0,
           }
          const res = await api.post('/tasks',newTask)

          this.tasks=[...this.tasks,res.data]

                 this.text=ref(null)
                 this.day=ref(null)
                 this.reminder=0
         },
         async toggleReminder(id){
           const taskToToggle= await this.fetchTasks(id)
            let 
           const updateTask={...taskToToggle,reminder:!taskToToggle.reminder}

           console.log(updateTask)
           const res =await fetch(`http://localhost:8000/api/tasks/${id}`,{
             method:'PUT',
             headers:{
               "Content-type":"application/json"
             },
             body:JSON.stringify(updateTask)
           })
           const {data}= await res.json()
           this.tasks=this.tasks.map(task=>task.id===id?{...task,reminder:data.reminder}:task)
         }



       }
      }

  )


