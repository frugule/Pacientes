import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseUrl = 'https://us-central1-pacienthosp.cloudfunctions.net/patients';

function emptyPatient(){
  return {
    id: null,
    data: {
      name: '',
      email: ''
    }
  }
}

export default new Vuex.Store({
  state: {
    patients: [],
    currentPatient: emptyPatient(),
    overlay: false
  },
  mutations: {
    SET_EMPTY_PATIENT(state) {
      state.currentPatient.id = null
      const empty = emptyPatient()
      Object.keys(empty.data).forEach(key => {
        state.currentPatient.data[key] = empty.data[key]
      })
    },
    //tomar los pacientes que le pasemos
    SET_PATIENTS(state, data){state.patients = data},
    SET_CURRENT_PATIENT(state, patient){ state.currentPatient = patient},
    UPDATE_NAME(state, name){state.currentPatient.data.name = name},
    UPDATE_EMAIL(state, email){state.currentPatient.data.email = email},
    OVERLAY_ON(state){state.overlay = true},
    OVERLAY_OFF(state){state.overlay = false}
    

  },
  actions: {
    //llama a los pacientes que estan en la API
    setPatients({commit}){
      commit('OVERLAY_ON')
      axios.get(`${baseUrl}/patients`)
      .then((response)=>{
        commit('SET_PATIENTS', response.data)
        commit('SET_EMPTY_PATIENT')
      }).finally(() => {commit('OVERLAY_OFF')})
    },
    setCurrentPatient({ commit, getters }, id){
      //vamos a buscar el paciente a la API
      //buscar si tenemos el paciente en la lista actual
      let targetPatient = getters.searchPatientById(id)
      if (targetPatient) {
        //si lo encuentra actualizar el currentPatient con esos datos
        commit('SET_CURRENT_PATIENT', targetPatient)
      }else{
        //si no llamar a axios
        axios.get(`${baseUrl}/patient/${id}`)
        .then((response) =>{
          commit('SET_CURRENT_PATIENT', response.data)
        })
      }
    },
    postPatient({dispatch, state}){
      axios.post(`${baseUrl}/patient`, state.currentPatient.data)
      .then(()=>{
        dispatch('setPatients')
      })
    },
    deletePatient({dispatch}, id){
      axios.delete(`${baseUrl}/patient/${id}`)
        .then(() => {
        //trae los datos de la lista(envia los datos)
        
        dispatch('setPatients')
        })
    },
    updatePatient({ state, dispatch }, id){
      axios.put(`${baseUrl}/patient/${id}`, state.currentPatient.data)
      .then(() => {
        dispatch('setPatients')
      })
    },
    updateName({commit}, name){
      commit('UPDATE_NAME', name)
    },
    updateEmail({commit}, email){
      commit('UPDATE_EMAIL', email)
    }

  },
  getters: {
    //
    searchPatientById:(state) => (id) => {
      return state.patients.find((patient)=>{ return patient.id === id })
    }
  }
})
