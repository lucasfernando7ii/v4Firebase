<template>
  <div id="app">
<h1>Aprendendo VueJS + Firebase</h1>

<label>Tarefa: </label><input type="text" v-model="tarefa"/><br/>
<label>Autor: </label><input type="text" v-model="autor"/><br/>
<button @click="cadastrar">Cadastrar</button>
  </div>
</template>

<script>
import firebase from './services/firebaseConnection';
export default {
  name: 'App',
  data(){
    return{
      tarefa:'',
      autor:'',
    }
  },
  methods:{
    async cadastrar(){
      await firebase.firestore().collection('posts')
      .doc('123')
      .set({
        tarefa: this.tarefa,
        autor: this.autor,

      })
      .then(()=>{
        console.log('Cadastrado com sucesso');
      })
      .catch((error)=>{
        console.log('Gerou erro' + error)
      })
    }
  }
}
</script>

<style scoped>

</style>
