
//ADICIONE SEUS LINKS FIREBASE

const firebaseConfig = {
  apiKey: "AIzaSyAghDgHULIqRvu8a1T5HFtzZnrXC2phsU4",
  authDomain: "aula-c94.firebaseapp.com",
  databaseURL: "https://aula-c94-default-rtdb.firebaseio.com",
  projectId: "aula-c94",
  storageBucket: "aula-c94.appspot.com",
  messagingSenderId: "77004001955",
  appId: "1:77004001955:web:fc8a5238ebefaacc9ee516"
};

firebase.initializeApp(firebaseConfig);

  userName = localStorage.getItem("userName");

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom()
{
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    purpose : "adicionar nome de sala"
  });

    localStorage.setItem("roomName", roomName);
    
    window.location = "kwitterPage.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       roomNames = childKey;
       console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("roomName", name);
    window.location = "kwitterPage.html";
}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
    window.location = "index.html";
}
