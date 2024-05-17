const firebaseConfig = {
  apiKey: "AIzaSyAg-hNrn7Sk3CupBr95yk-l69wII0kpKYk",
  authDomain: "flip-it-game-c1f44.firebaseapp.com",
  databaseURL: "https://flip-it-game-c1f44-default-rtdb.firebaseio.com",
  projectId: "flip-it-game-c1f44",
  storageBucket: "flip-it-game-c1f44.appspot.com",
  messagingSenderId: "154910747796",
  appId: "1:154910747796:web:1f077fbcdaa9c1d2755881",
  measurementId: "G-GD5NQTJ3Y8",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
// sign-up function

const signInUser = async (userData) => {
  try {
    const userCredential = await firebase
      .auth()
      .signInAnonymously()
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });

    const uid = userCredential.user.uid;

    await database.ref("users/").push({
      username: userData.username,
      password: userData.password,
    });
    const scoreboard = firebase.database().ref("scorebord");
    scoreboard.once("value", (snapshot) => {
      let lobbyPlayers = snapshot.val() || {};
      let score = 0;
      lobbyPlayers[userData.username] = score; // Use userName variable as key and score as value
      console.log("This is working");
      scoreboard.set(lobbyPlayers);
    });

    // document.getElementById("loginForm-player1").style.display = "block";
    // document.getElementById("signupForm-player1").style.display = "none";
  } catch (error) {
    console.error("Error signing in anonymously: ", error);
  }
};

// const form = document.getElementById("sign-up-form");
// form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const formData = new FormData(form);
//     const username = formData.get("username");
//     const password = formData.get("password");

//     console.log(username, password);

//     try {
//         const userCredential = await firebase
//             .auth()
//             .signInAnonymously()
//             .catch((error) => {
//                 var errorCode = error.code;
//                 var errorMessage = error.message;

//                 console.log(errorCode, errorMessage);
//             });

//         const uid = userCredential.user.uid;
//         const scoreboard = firebase.database().ref('scorebord');

//         await database.ref("users/").push({
//             username: username,
//             password: password

//         });
//         scoreboard.once('value', snapshot => {
//             let lobbyPlayers = snapshot.val() || {};
//             let score = 0;
//             lobbyPlayers[username] = score; // Use userName variable as key and score as value
//             console.log('This is working')
//             scoreboard.set(lobbyPlayers);
//         });

//         document.getElementById("loginForm-player1").style.display = "block";
//         document.getElementById("signupForm-player1").style.display = "none";
//     } catch (error) {
//         console.error("Error signing in anonymously: ", error);
//     }
// });

const loginForm = document.getElementById("player-one-login-form");

// login reference function
const getUserDataRef = () => {
  return new Promise((resolve, reject) => {
    try {
      const userRef = database.ref("users");
      resolve(userRef);
    } catch (error) {
      reject(`Error getting user data reference: ${error}`);
    }
  });
};

const loginUser = async (loginData) => {
  console.log(loginData);
  try {
    // Get a reference to the user data in the database
    const userRef = await getUserDataRef();
    userRef.on("child_added", async (snapshot) => {
      const userData = snapshot.val();
      console.log(userData);

      if (
        userData.username === loginData.username &&
        userData.password === loginData.password
      ) {
        console.log("Authenticated");

        localStorage.setItem(loginData.player, loginData.username);
        //   window.location.href="lobby.html"
      } else {
        console.log("Authentication failed");
      }
    });
  } catch (error) {
    console.error(error);
  }
};

// // log in auth function
// loginForm.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const formData2 = new FormData(loginForm);
//     const username = formData2.get("username");
//     const password = formData2.get("password");

//     try {
//         // Get a reference to the user data in the database
//         const userRef = await getUserDataRef();
//         userRef.on('child_added', async (snapshot) => {
//             const userData = snapshot.val();
//             console.log(userData);

//             if (userData.username === username && userData.password === password) {
//                 console.log('Authenticated');

//                 localStorage.setItem("username", username);
//                 //   window.location.href="lobby.html"

//             } else {
//                 console.log('Authentication failed');
//             }
//         });
//     } catch (error) {
//         console.error(error);
//     }
// });

// update score function

const updateWinData = (username, point) => {
  const database = firebase.database();
  const userRef = firebase.database().ref("scorebord");
  let score;
  userRef
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();
      score = data[username];
      console.log("Data:", data);
      const updateData = {};
      updateData[username] = score + point;
      console.log();
      userRef
        .update(updateData)
        .then(() => {
          console.log("Score updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating score:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export { signInUser, loginUser, updateWinData };

// updateWinData('sinu',10);

// const updateWinData = (username,point) => {
//     const database = firebase.database();

//     const userRef = firebase.database().ref("scorebord")

//     // Construct an object with the key-value pair to update
//     const updateData = {};
//     updateData[username] = point; // New score value

//     // Update the data for the user

//     userRef.update(updateData)
//         .then(() => {
//             console.log("Score updated successfully!");
//         })
//         .catch((error) => {
//             console.error("Error updating score:", error);
//         });
// }
// updateWinData('sinu',1);

let playersJoined = {
  playerOne: false,
  playerTwo: false,
};

let login = document.getElementsByClassName("login-form");
for (let i = 0; i < login.length; i++) {
  login[i].addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(login[i]);
    let playerLogin = {
      username: formData.get("username"),
      password: formData.get("password"),
      player: formData.get("player"),
    };

    console.log(playerLogin);

    loginUser(playerLogin);

    if (playerLogin.player == "PlayerOne") {
      playersJoined.playerOne = true;
      console.log("Player One", playerLogin);
    } else if (playerLogin.player == "PlayerTwo") {
      playersJoined.playerTwo = true;
      console.log("Player Two", playerLogin);
    }
    if (playersJoined.playerOne && playersJoined.playerTwo) {
      document.getElementById("login").style.display = "none";
      document.getElementById("category-section").style.display = "block";
    }
  });
}

let signup = document.getElementsByClassName("signup-form");
for (let i = 0; i < signup.length; i++) {
  signup[i].addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(signup[i]);
    let playerSignup = {
      username: formData.get("username"),
      password: formData.get("password"),
      conformPassword: formData.get("conform-password"),
      player: formData.get("player"),
    };
    if (playerSignup.password === playerSignup.conformPassword) {
      signInUser({
        username: playerSignup.username,
        password: playerSignup.password,
      });
      if (playerSignup.player == "PlayerOne") {
        console.log("Player One", playerSignup);
        document.getElementById("loginForm-player1").style.display = "block";
        document.getElementById("signupForm-player1").style.display = "none";
      } else {
        console.log("Player Two", playerSignup);
        document.getElementById("loginForm-player2").style.display = "block";
        document.getElementById("signupForm-player2").style.display = "none";
      }
    } else {
      alert("Please Re-Enter the Password");
    }
  });
}
