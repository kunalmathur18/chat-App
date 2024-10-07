// import React, { useContext, useState } from 'react'
// import './LeftSidebar.css'
// import assets from '../../assets/assets'
// import logo from '../../assets/background.gif'
// import { useNavigate } from 'react-router-dom'
// import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
// import { db } from '../../config/firebase'
// import { AppContext } from '../../context/AppContext'
// import { auth } from '../../config/firebase';
// import { toast } from 'react-toastify'

// function LeftSidebar() {
//     const navigate = useNavigate();
//     const {userData,chatData} = useContext(AppContext);
//     const [user,setUser]= useState(null);
//     const [showSearch,setShowSearch] = useState(false);
//     // const inputHandler = async(e)=>{
//     //     try {
//     //         const input = e.target.value;
//     //         const userRef = collection(db,'users');
//     //         const q = query(userRef,where("username","==",input.toLowerCase()));
//     //         const querySnap = await getDocs(q);
//     //         if(!querySnap.empty){
//     //             console.log(querySnap.docs[0].data);
//     //         }
            
//     //     } catch (error) {
            
//     //     }
//     // }

//     // const inputHandler = async(e) => {
//     //     try {
//     //         const input = e.target.value;
//     //         const userRef = collection(db, 'users');
//     //         const q = query(userRef, where("username", "==", input.toLowerCase()));
//     //         const querySnap = await getDocs(q);
            
//     //         // If there are any documents in the query result
//     //         if (!querySnap.empty && querySnap.doc.data().id !== userData.id) {
//     //             querySnap.forEach(doc => {
//     //                 console.log(doc.data());  // This will log the data of each matched user
//     //             });
//     //         } else {
//     //             console.log("No matching documents found");
//     //         }
//     //     } catch (error) {
//     //         console.error("Error fetching user data:", error);
//     //     }
//     // };



//     const inputHandler = async (e) => {
//         try {
//           const input = e.target.value;
//           if (input) {
//             setShowSearch(true);
//             const currentUser = auth.currentUser;
      
//             if (!currentUser) {
//               console.error("No user is currently logged in");
//               return;
//             }
        
//             // Reference to the users collection
//             const userRef = collection(db, 'users');
            
//             // Query to search for the user by username
//             const q = query(userRef, where("username", "==", input.toLowerCase()));
//             const querySnap = await getDocs(q);
            
//             if (!querySnap.empty) {
//               querySnap.forEach((doc) => {
//                 const userData = doc.data();
                
//                 // Exclude the current user's profile from search results
//                 if (userData.id !== currentUser.uid) { // Assuming 'id' field is the user.uid in Firestore
//                     let userExist =false
//                     chatData.map((user)=>{
//                        if(user.rId === doc.data().id){
//                         userExist=true;
//                        }
//                     })
//                     if(!userExist){
//                         setUser(userData);

//                     }


//                   // Log the data of the other users
//                 } else {
//                   console.log("Search result matches the current user, skipping...");
//                 }
//               });
//             } else {
//                 setUser(null);
//               console.log("No matching documents found");
//             }
            
//           }
//           else{
//             setShowSearch(false);
//           }
          
//           // Get the current logged-in user
         
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       };

//       const addChat = async()=>{
//         const  messagesRef = collection(db,"messages");
//         const chatsRef = collection(db,"chats");
//         try {
//             const newmessageRef = doc(messagesRef);
//             await setDoc(newmessageRef,{
//                 createAt:serverTimestamp(),
//                 messages:[]
//             })
//             await updateDoc(doc(chatsRef,user.id),{
//                 chatsData:arrayUnion({
//                     messsageId:newmessageRef.id,
//                 lastMessage:"",
//                 rId:userData.id,
//                 updatedAt:Date.now(),
//                 messageSeen: true
//                             })
//             })

//             await updateDoc(doc(chatsRef,userData.id),{
//                 chatsData:arrayUnion({
//                     messsageId:newmessageRef.id,
//                 lastMessage:"",
//                 rId:user.id,
//                 updatedAt:Date.now(),
//                 messageSeen: true
//                             })
//             })
//         } catch (error) {
//             toast.error(error.message);
//             console.error(error)
            
//         }

//       }



    
    
//   return (
    
//         <div className="ls bg-[#001030] text-white h-[75vh] overflow-hidden">
//             <div className="ls-top p-[20px]">
//                 <div className="ls-nav flex justify-between items-center ">
//                     <img src={logo} className='logo max-w-[140px] rounded-full' alt="" />
//                     <div className="menu  relative py-[10px] ">
//                         <img className='max-h-[20px] opacity-[0.6] cursor-pointer' src={assets.menu_icon} alt="" />
//                         <div className="submenu absolute top-[100%] right-0 w-[130px] p-[20px] rounded-sm bg-white text-black hidden ">
//                             <p className='cursor-pointer text-[14px]'onClick={()=>navigate('/profile')} >Edit profile</p>
//                             <hr className='border-none h-1 bg-[#a4a4a4] my-[8px] rounded-xl'/>
//                             <p className='cursor-pointer text-[14px]'>LogOut</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="ls-search flex bg-[#002670] items-center gap-4 py-[10px] px-[12px] mt-[20px] rounded-2xl">
//                     <img src={assets.search_icon} className='w-[16px]' alt="" />
//                     <input onChange={inputHandler} type="text" className='bg-transparent outline-none border-none text-[11px]' placeholder='Search here..' />
//                 </div>
//             </div>
//             <div className="ls-list flex flex-col h-[70%] overflow-y-scroll overflow-hidden">
//                 {
//                     showSearch && user ?<div onClick={addChat} className='friends flex items-center gap-[10px] py-[10px] px-[20px] cursor-pointer text-[13px] hover:bg-[#6081a4] rounded-2xl add-user'>
//                         <img className='w-[35px] aspect-square rounded-3xl' src={user.avatar} alt="" />
//                         <p>{user.name}</p>
//                         </div>
//                         :chatData.map((item,index)=>(
//                             <div className="friends flex items-center gap-[10px] py-[10px] px-[20px] cursor-pointer text-[13px] hover:bg-[#6081a4] rounded-2xl">
//                             <img className='w-[35px] aspect-square rounded-3xl' src={item.userData.avatar} alt="" />
//                             <div className='flex flex-col '> 
//                                 <p>{item.userData.name}</p>
//                                 <span className='text-[#9f9f9f] '>{item.lastMessage}</span>
//                             </div>
//                         </div>
//                         ))
//                 }
               

//             </div>
//         </div>
      
   
//   )
// }

// export default LeftSidebar





// // import React, { useState } from 'react';
// // import './LeftSidebar.css';
// // import assets from '../../assets/assets';

// // function LeftSidebar() {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar collapse

// //   return (
// //     <div className={`ls bg-[#001030] text-white h-[75vh] overflow-hidden ${isSidebarOpen ? 'w-[250px]' : 'w-[60px]'} transition-all duration-300 sm:w-[250px]`}>
// //       <div className="ls-top p-[20px] flex flex-col">
// //         <div className="ls-nav flex justify-between items-center ">
// //           <img src={assets.logo} className={`logo max-w-[140px] ${!isSidebarOpen && 'hidden sm:block'}`} alt="" />
// //           <div className="menu" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
// //             <img className='max-h-[20px] opacity-[0.6] cursor-pointer' src={assets.menu_icon} alt="" />
// //           </div>
// //         </div>
// //         <div className={`ls-search flex bg-[#002670] items-center gap-4 py-[10px] px-[12px] mt-[20px] rounded-2xl ${!isSidebarOpen && 'hidden sm:flex'}`}>
// //           <img src={assets.search_icon} className='w-[16px]' alt="" />
// //           <input type="text" className='bg-transparent outline-none border-none text-[11px]' placeholder='Search here..' />
// //         </div>
// //       </div>
// //       <div className={`ls-list flex flex-col h-[70%] overflow-y-scroll overflow-hidden ${!isSidebarOpen && 'hidden sm:flex'}`}>
// //         {
// //           Array(12).fill("").map((item, index) => (
// //             <div key={index} className="friends flex items-center gap-[10px] py-[10px] px-[20px] cursor-pointer text-[13px] hover:bg-[#6081a4] rounded-2xl">
// //               <img className='w-[35px] aspect-square rounded-3xl' src={assets.profile_img} alt="" />
// //               <div className='flex flex-col'>
// //                 <p>Kunal Mathur</p>
// //                 <span className='text-[#9f9f9f]'>Hello how are you?</span>
// //               </div>
// //             </div>
// //           ))
// //         }
// //       </div>
// //     </div>
// //   );
// // }

// // export default LeftSidebar;






import React, { useContext, useEffect, useState } from 'react';
import './LeftSidebar.css';
import assets from '../../assets/assets';
import logo from '../../assets/background.gif';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

function LeftSidebar() {
  const navigate = useNavigate();
  const { userData, chatData ,chatUser,setChatUser,setMessagesId,messagesId} = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]); // Holds all users
  const [filteredUsers, setFilteredUsers] = useState([]); // Holds filtered users for search
  const [showSearch, setShowSearch] = useState(false);

  // Fetch all users except the logged-in user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userRef = collection(db, 'users');
        const querySnap = await getDocs(userRef);

        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error('No user is currently logged in');
          return;
        }

        const usersList = [];
        querySnap.forEach((doc) => {
          const userData = doc.data();
          if (userData.id !== currentUser.uid) { // Exclude current logged-in user
            usersList.push(userData);
          }
        });
        setAllUsers(usersList);
        setFilteredUsers(usersList); // Initialize filtered users with all users
      } catch (error) {
        toast.error(error.message);
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  // Handle search input
  const inputHandler = async (e) => {
    const input = e.target.value;
    if (input) {
      setShowSearch(true);
      const filtered = allUsers.filter((user) =>
        user.username.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setShowSearch(false);
      setFilteredUsers(allUsers); // Reset to all users if search input is cleared
    }
  };

  const addChat = async (selectedUser) => {
    // Logic to add a new chat with the selected user (similar to what you had before)
  };
 const setChat =async(item)=>{
    setMessagesId(item.messagesId);
    setChatUser(item)
    
 }

  return (
    <div className="ls  text-white h-[75vh] overflow-hidden">
      <div className="ls-top p-[20px]">
        <div className="ls-nav flex justify-between items-center">
          <img src={logo} className="logo max-w-[140px] rounded-full animate-bounce" alt="" />
          <div className="menu relative py-[10px]">
            <img className="max-h-[20px] opacity-[0.6] cursor-pointer" src={assets.menu_icon} alt="" />
            <div className="submenu absolute top-[100%] right-0 w-[130px] p-[20px] rounded-sm bg-white text-black hidden">
              <p className="cursor-pointer text-[14px]" onClick={() => navigate('/profile')}>
                Edit profile
              </p>
              <hr className="border-none h-1 bg-[#a4a4a4] my-[8px] rounded-xl" />
              <p className="cursor-pointer text-[14px]">LogOut</p>
            </div>
          </div>
        </div>
        <div className="ls-search flex bg-[#002670] items-center gap-4 py-[10px] px-[12px] mt-[20px] rounded-2xl">
          <img src={assets.search_icon} className="w-[16px]" alt="" />
          <input
            onChange={inputHandler}
            type="text"
            className="bg-transparent outline-none border-none text-[11px]"
            placeholder="Search here.."
          />
        </div>
      </div>
      <div className="ls-list flex flex-col h-[70%] overflow-y-scroll overflow-hidden">
        {showSearch && filteredUsers.length === 0 ? (
          <p className="text-center text-[13px]">No users found</p>
        ) : (
          filteredUsers.map((user, index) => (
            <div
              key={index}
              onClick={() => {addChat(user);
                setChat(user);}}
              className="friends flex items-center gap-[10px] py-[10px] px-[20px] cursor-pointer text-[13px] hover:bg-[#6081a4] rounded-2xl"
            >
              <img className="w-[35px] aspect-square rounded-3xl" src={user.avatar || assets.profile_img} alt="" />
              <div className="flex flex-col">
                <p>{user.name}</p>
                <span className="text-[#9f9f9f]">Hello, how are you?</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LeftSidebar;
