<template>
  <div>
    <ul>
      <li :key="patient.id" v-for="patient in patients">
        {{patient.data.name}}
        {{patient.data.email}}
        <button class="button btn-success" @click="removePatient(patient.id)">Borrar</button>
        <button class="button btn-success" @click="editPatient(patient.id)">Editar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  methods: {
    //
    ...mapActions(['setPatients', 'deletePatient', 'setCurrentPatient']),
    removePatient(id){
      let ok = confirm('¿estas seguro?')
      if(ok){
        this.deletePatient(id)
      }
    },
    editPatient(id){
      //primero establecer el juguete actual
      this.setCurrentPatient(id)
    }
  },
  computed: {
    //traemos la propiedad que esta en el "state" del store.index
    ...mapState(['patients'])
  },
  created(){
    this.setPatients()
  }
}
</script>