import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseUrl = 'https://us-central1-pacienthosp.cloudfunctions.net/patients';

export default new Vuex.Store({
  state: {
    patients: [],
  },
  mutations: {
    //tomar los pacientes que le pasemos
    SET_PATIENTS(state, data){state.patients = data}
  },
  actions: {
    //llama a los pacientes que estan en la API
    setPatients({commit}){
      axios.get(`${baseUrl}/patients`)
      .then((response)=>{
        commit('SET_PATIENTS', response.data)
      })
    }
  },
  modules: {
  }
})
