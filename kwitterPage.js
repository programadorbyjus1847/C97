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
    roomName = localStorage.getItem("roomName");

    function send()
    {
        msg = document.getElementById("msg").value;
        firebase.database().ref(roomName).push({
            name:userName,
            message:msg,
            like:0
        });

        document.getElementById("msg").value = "";
            }

            function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) {
                document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
              firebaseMessageId = childKey;
              messageData = childData;      
              console.log(firebaseMessageId);
              console.log(messageData);
              name = messageData['name'];
              message = messageData['message'];
              like = messageData['like'];
              nameWithTag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
              messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
              like_button="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>";
              spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

              row = nameWithTag + messageWithTag + like_button + spanWithTag;
              document.getElementById("output").innerHTML += row;
                } }); }); }
                getData();

                function updateLike(messageId)
            {
                console.log("botão de like pressionado - " + messageId);
                buttonId = messageId;
                likes = document.getElementById(buttonId).value;
                updatedLikes = Number(likes) + 1;
                console.log(updatedLikes);

                firebase.database().ref(roomName).child(messageId).update({
                    like : updatedLikes
                });

            }

            function logout() {
                localStorage.removeItem("userName");
                localStorage.removeItem("roomName");
                window.location.replace("index.html");
            }

            
    