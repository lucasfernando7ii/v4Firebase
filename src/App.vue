<template>
  <div id="app">
<h1>Aprendendo VueJS + Firebase</h1>

<label>ID: </label><input type="text" v-model="idPost"/><br/>

<label>Tarefa: </label><input type="text" v-model="tarefa"/><br/>

<label>Autor: </label><input type="text" v-model="autor"/><br/>

<button @click="cadastrar">Cadastrar</button>
<button @click="buscarPosts">Buscar Posts</button>
<button @click="atualizarPost">Atualizar Post</button>
<button @click="excluirPost">Deletar Post</button>
<hr/>
<ul>
  <li v-for="post in posts" :key="post.id"> 
  ID: {{post.id}} <br/>
  tarefa: {{ post.tarefa }} <br/>
  Autor: {{ post.autor }}
  <br/>
  <br/>
  </li>
</ul>


  </div>
</template>

<script>
import firebase from './services/firebaseConnection';
export default {
  name: 'App',
  data(){
    return{
      idPost:'',
      tarefa:'',
      autor:'',
      posts:[],
    }
  },
  async created(){
    await firebase.firestore().collection('posts')
    .onSnapshot((doc)=>{
      this.posts = [];

      doc.forEach((item)=>{
        this.posts.push({
          id: item.id,
          tarefa: item.data().tarefa,
          autor: item.data().autor,
        });

      });
    })

  },
  methods:{
    async cadastrar(){
      await firebase.firestore().collection('posts')
      .add({
        tarefa: this.tarefa,
        autor: this.autor,

      })
      .then(()=>{
        this.autor = '';
        this.tarefa ='';
        console.log('Cadastrado com sucesso');
      })
      .catch((error)=>{
        console.log('Gerou erro' + error)
      })
    },
    async buscarPosts(){
      this.posts = [];
      /*await firebase.firestore().collection('posts')
      .doc('123')
      .get()
      .then((snapshot)=>{
        this.tarefa = snapshot.data().tarefa;
        this.autor = snapshot.data().autor;
      })
      .catch((error)=>{
        console.log('Erro ao buscar' + error)
      })*/

      await firebase.firestore().collection('posts')
      .get()
      .then((snapshot)=>{
        snapshot.forEach((doc)=>{
          this.posts.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
            autor: doc.data().autor
          });
        })
      })
      .catch((error)=>{
        console.log('Erro ao buscar:'+ error)
      });
    },
   async atualizarPost(){
      await firebase.firestore().collection('posts').doc(this.idPost)
      .update({
        tarefa: this.tarefa,
        autor: this.autor,
      })
      .then(()=>{
        console.log('Atualizado com sucesso')
        this.autor = '';
        this.tarefa = '';
        this.idPost = '';
      })
      .catch((error)=>{
        console.log('Erro ao editar: ' + error)
      })
    },
    async excluirPost(){

      if(this.idPost === '') return;

      await firebase.firestore().collection('posts').doc(this.idPost)
      .delete()
      .then(()=>{
        this.idPost = '',
        console.log('Post Deletado com Sucesso!!')
      })
    }
  }
}
</script>

<style scoped>

</style>
