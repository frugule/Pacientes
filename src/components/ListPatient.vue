<template>
  <div>
    <ul>
      <li :key="patient.id" v-for="patient in patients">
        {{patient.data.name}}
        {{patient.data.email}}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  methods: {
    //
    ...mapActions(['setPatients'])
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