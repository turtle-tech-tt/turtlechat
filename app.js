import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCxPKZYqiBdlHTr6vUbIVIEvzwxpkeTOEQ",
  authDomain: "turtle-chat-a93fb.firebaseapp.com",
  databaseURL: "https://turtle-chat-a93fb-default-rtdb.firebaseio.com",
  projectId: "turtle-chat-a93fb",
  storageBucket: "turtle-chat-a93fb.appspot.com",
  messagingSenderId: "338945234611",
  appId: "1:338945234611:web:4abe6a3107bdee88b3c2c6",
  measurementId: "G-3WPR9KEVXN"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, "messages");

// Invia un messaggio
function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;
  push(messagesRef, {
    user: currentUser,
    text: text,
    timestamp: Date.now()
  });
  messageInput.value = '';
}

// Mostra i messaggi in tempo reale
onValue(messagesRef, snapshot => {
  const data = snapshot.val();
  chatArea.innerHTML = '';
  for (let id in data) {
    const msg = data[id];
    chatArea.appendChild(createMessage(msg, id));
  }
  chatArea.scrollTop = chatArea.scrollHeight;
});

function createMessage(msg, id) {
    const div = document.createElement('div');
    div.className = 'message ' + (msg.user === currentUser ? 'self' : 'other');
  
    // Contenuto messaggio
    const messageText = document.createElement('span');
    messageText.innerHTML = `<strong>${msg.user}</strong>: ${msg.text}`;
    div.appendChild(messageText);
  
    // Pulsante elimina (solo per Owner o autore del messaggio)
    if (isOwner || msg.user === currentUser) {
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '✖';
      deleteBtn.className = 'delete-btn';
      deleteBtn.onclick = () => {
        deleteMessage(id);
      };
      div.appendChild(deleteBtn);
    }
  
    return div;
  }
  

  function deleteMessage(id) {
    const messageRef = ref(db, 'messages/' + id);
    remove(messageRef);
  }
  
