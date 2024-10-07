



// import { initializeApp } from "firebase/app";
// import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
// import { getFirestore, setDoc } from "firebase/firestore";
// import { toast } from "react-toastify";


// const firebaseConfig = {
//   apiKey: "AIzaSyA7DbICk3E5a8JFN9F0pbd4BYfXWIYn3VU",
//   authDomain: "chat-app-ne-d55c3.firebaseapp.com",
//   projectId: "chat-app-ne-d55c3",
//   storageBucket: "chat-app-ne-d55c3.appspot.com",
//   messagingSenderId: "484167282312",
//   appId: "1:484167282312:web:f1c4833504582a54d3b93d"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth =getAuth(app);
// const db = getFirestore(app);
// const signup = async (username, email, password) =>{
//     try {
//         const res = await createUserWithEmailAndPassword(auth,email,password);
//         const user = res.user;
//         await setDoc(doc(db,"users",user.uid),{
//             id:user.uid,
//             username:username.toLowerCase(),
//             email,
//             name:"",
//             avatar:"",
//             bio:"Hey,lets use Let's Talk",
//             lastSeen:Date.now()
//         })
//         await setDoc(doc(db,"chats",user.uid),{
//             chatData:[]
//         })
        
//     } catch (error) {
//         console.error(error)
//         toast.error(error.code)
        
//     }

// }
// export {signup}


import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore"; // Add doc here
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA7DbICk3E5a8JFN9F0pbd4BYfXWIYn3VU",
  authDomain: "chat-app-ne-d55c3.firebaseapp.com",
  projectId: "chat-app-ne-d55c3",
  storageBucket: "chat-app-ne-d55c3.appspot.com",
  messagingSenderId: "484167282312",
  appId: "1:484167282312:web:f1c4833504582a54d3b93d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        // Set user document
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: "",
            avatar: "",
            bio: "Hey, let's use Let's Talk",
            lastSeen: Date.now()
        });

        // Set chats document
        await setDoc(doc(db, "chats", user.uid), {
            chatsData: []
        });
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};
const login = async (email,password) => {
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}
const logout = async ()=>{
    try {
        await signOut(auth) 
    } catch (error) {
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
    
}

export { signup,login ,logout,auth,db};
