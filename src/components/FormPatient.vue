<template>
  <div>
    <h1>Ingreso de Pacientes</h1>
    <div class="text-center">
    <v-main>
      <v-row>

        
          <v-card class="pa-5 headline cyan lighten-5">
            <v-card-title class="headline cyan darken-2 mb-7" primary-title>
            </v-card-title>
              <v-text-field label="nombre" type="text" :value="currentPatient.data.name" @input="updateName" solo/>
              <v-text-field label="e-mail" type="text" :value="currentPatient.data.email" @input="updateEmail" solo/>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="submitForm">{{!!currentPatient.id ? 'Actualizar':'Crear'}}</v-btn>
            </v-card-actions>
          </v-card>
        
      </v-row>
    </v-main>
  </div>
  </div>
</template>
<script>

import {mapState, mapActions} from 'vuex'

export default {
  computed: {
    ...mapState(['currentPatient'])
  },
  methods: {
    ...mapActions(['updateName', 'updateEmail', 'postPatient', 'updatePatient']),
    submitForm(){
      if(this.currentPatient.id){
        //si tiene id, llama a la funcion que actualiza los datos
        this.updatePatient(this.currentPatient.id)
      }else{
        this.postPatient()
      }
    }
  }
}
</script>