// Importar o SDK do Firebase e inicializar o aplicativo
const firebaseConfig = {
    // Coloque aqui suas credenciais do Firebase
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Referência ao nó 'messages' do Realtime Database
  const messagesRef = firebase.database().ref('messages');
  
  // Ler os dados do nó 'messages'
  messagesRef.on('value', (snapshot) => {
    const messages = snapshot.val();
    console.log(messages);
  });
  
  // Adicionar uma nova mensagem ao nó 'messages'
  const newMessage = {
    text: 'Olá, Firebase!',
    timestamp: Date.now()
  };
  
  messagesRef.push(newMessage);