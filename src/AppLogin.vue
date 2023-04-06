 <template>

  <div id="app">

  <div v-if="!user">
    <h1>Entrar</h1>

    <label>Email: </label>
    <input type="text" v-model="email"><br/><br/>
    <label>Senha: </label>
    <input type="text" v-model="senha">
    <br>
    <br>
    <button @click="entrar">Entrar</button>
  </div>
  <div v-else>
    <h1>Você esta logado</h1>
    <h2>Email: {{this.email}}</h2><br/>
    <button @click="sair">Sair</button>

  </div>
<hr/>

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
  <button @click="excluirPost(post.id)">Deletar Post</button>
  <br/>
  </li>
</ul>


  </div>
</template>

<script>
//Caso queira testar todas as funções do FIREBASE, utilize esse arquivo VUE como 'App.vue' principal.
import firebase from './services/firebaseConnection';
export default {
  name: 'App',
  data(){
    return{
      idPost:'',
      tarefa:'',
      autor:'',
      posts:[],
      email:'',
      senha:'',
      user: false,
    }
  },
  async created(){

    await firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.user = true;
        this.email = user.email
      }else{
        this.user = false;
        this.email = '';
      }
    })

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
    async excluirPost(id){

      await firebase.firestore().collection('posts').doc(id)
      .delete()
      .then(()=>{
        console.log('Post Deletado com Sucesso!!')
      })
    },
    async cadastrarUsuario(){
      await firebase.auth().createUserWithEmailAndPassword(this.email, this.senha)
      .then(()=>{
        this.email ='';
        this.senha ='';
      })
      .catch((error)=>{
        if(error.code === 'auth/weak-password'){
        alert('Senha muito fraca')
        }else if(error.code ==='auth/email-already-in-use'){
          alert('Email já existente!')
        }
      })
    },
    async sair(){
      await firebase.auth().signOut();
    },
    async entrar(){
      await firebase.auth().signInWithEmailAndPassword(this.email, this.senha)
      .then((response)=>{
        console.log(response)
      })
      .catch((error)=>{
        console.log('Erro' + error)
      })
    }
  }
}
</script>

<style scoped>

</style>
