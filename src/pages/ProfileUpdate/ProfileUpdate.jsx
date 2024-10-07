// import React, { useEffect, useState } from 'react'
// import './ProfileUpdate.css'
// import assets from '../../assets/assets'
// import logo from '../../assets/background.gif'
// import { onAuthStateChanged } from 'firebase/auth'
// import { auth, db } from '../../config/firebase'
// import { doc, getDoc, updateDoc } from 'firebase/firestore'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import uplode from '../../lib/uplode'
// const ProfileUpdate = () => {
//   const navigate = useNavigate();
//   const [image,setImage] =useState(false);
//   const [name, setName] =useState("");
//   const [bio,setBio] = useState("");
//   const [uid,setUid]= useState("");
//   const [prevImage,setPrevImage] = useState("")

//   const profileUpdate = async (event) =>{

//     event.preventDefault();
//     try {
//       if(!prevImage && !image){
//         toast.error("uplode profile pic")
//       }
//       const docRef = doc(db,'users',uid);
//       if (image) {
//         const imgUrl = await uplode(image);
//         setPrevImage(imgUrl);
//         await updateDoc(docRef,{
//           avatar:imgUrl,
//           bio:bio,
//           name:name
//         })
//       }
//       else{
//         await updateDoc(docRef,{
          
//           bio:bio,
//           name:name
//         })

//       }
//     } catch (error) {
      
//     }
//   }



//   useEffect(()=>{
//     onAuthStateChanged(auth,async(user)=>{
//       if(user){
//         setUid(user.uid)
//         const docRef = doc(db,"users",user.uid);
//         const docSnap =await getDoc(docRef);
//         if(docSnap.data().name){
//           setName(docSnap.data().name);
//         }
//         if(docSnap.data().bio){
//           setBio(docSnap.data().bio);
//         }
//         if(docSnap.data().avatar){
//           setPrevImage(docSnap.data().avatar);
//         }
       
        

//       }
//       else{
//         navigate("/")
//       }
//     })

//   },[])

//   return (
//     <div className='profile min-h-[100vh] '>
//       <div className="profile-container  flex items-center justify-between min-w-[700px] rounded-md">
//         <form onSubmit={profileUpdate} className='flex flex-col gap-[20px] p-[40px]' action="">
//           <h3 className='font-medium'>Profile Details</h3>
//           <label htmlFor="avatar" className='flex items-center gap-[10px] text-gray-50'>
//             <input onChange={(e)=>setImage(e.target.files[0])} type="file" id ='avatar' accept='.png, .jpg, .jpeg' hidden />
//             <img className='w-[50px] h-[120px]  grow rounded-[50%] overflow-hidden' src={image?URL.createObjectURL(image) : assets.avatar_icon} alt="" />
//             uplode profile image

//           </label>
//           <input onChange={(e)=>setName(e.target.value)} value={name} className='p-[10px] min-w-[300px] border-[1px] border-solid border-[#c9c9c9] outline-[#077eff] rounded-lg' type="text" placeholder='Your Name' required/>
//           <textarea  onChange={(e)=>setBio(e.target.bio)} value={bio} className='p-[10px] min-w-[300px] border-[1px] border-solid border-[#c9c9c9] outline-[#077eff] rounded-lg'placeholder='Write profile bio' required></textarea>
//           <button className='border-none text-white bg-[#077eff] p-[8px] text-[16px] cursor-pointer rounded-2xl' type='submit'>Save</button>
//         </form>
//         <img className='profile-pic max-w-[160px] w-[100px] h-[170px] grow my-20px mx-auto rounded-full overflow-hidde' src={image?URL.createObjectURL(image): logo} alt="" />
//       </div>
      
//     </div>
//   )
// }

// export default ProfileUpdate





import React, { useContext, useEffect, useState } from 'react';
import './ProfileUpdate.css';
import assets from '../../assets/assets';
import logo from '../../assets/background.gif';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import uplode from '../../lib/uplode';
import { AppContext } from '../../context/AppContext';

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);  // Changed false to null
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const {setUserData} =useContext(AppContext)

  const profileUpdate = async (event) => {
    event.preventDefault();
    try {
      if (!prevImage && !image) {
        toast.error("Upload profile pic");
        return;  // Prevent submission if no image
      }

      const docRef = doc(db, 'users', uid);

      if (image) {
        const imgUrl = await uplode(image);  // Upload the image and get the URL
        setPrevImage(imgUrl);  // Corrected typo: imgurl -> imgUrl
        await updateDoc(docRef, {
          avatar: imgUrl,
          bio: bio,
          name: name
        });
      } else {
        await updateDoc(docRef, {
          bio: bio,
          name: name
        });
      }
      const snap = await getDoc(docRef);
      setUserData(snap.data());
      navigate('/chat');


      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile.");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setName(docSnap.data().name || "");
          setBio(docSnap.data().bio || "");
          setPrevImage(docSnap.data().avatar || "");
        }
      } else {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <div className='profile min-h-[100vh]'>
      <div className="profile-container flex items-center justify-between min-w-[700px] rounded-md">
        <form onSubmit={profileUpdate} className='flex flex-col gap-[20px] p-[40px]' action="">
          <h3 className='font-medium'>Profile Details</h3>
          <label htmlFor="avatar" className='flex items-center gap-[10px] text-gray-50'>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
            <img className='w-[50px] h-[120px] grow rounded-[50%] overflow-hidden' src={image ? URL.createObjectURL(image) : prevImage || assets.avatar_icon} alt="" />
            Upload profile image
          </label>
          <input onChange={(e) => setName(e.target.value)} value={name} className='p-[10px] min-w-[300px] border-[1px] border-solid border-[#c9c9c9] outline-[#077eff] rounded-lg' type="text" placeholder='Your Name' required />
          <textarea onChange={(e) => setBio(e.target.value)} value={bio} className='p-[10px] min-w-[300px] border-[1px] border-solid border-[#c9c9c9] outline-[#077eff] rounded-lg' placeholder='Write profile bio' required></textarea>
          <button className='border-none text-white bg-[#077eff] p-[8px] text-[16px] cursor-pointer rounded-2xl' type='submit'>Save</button>
        </form>
        <img className='profile-pic max-w-[160px] w-[100px] h-[170px] grow my-20px mx-auto rounded-full overflow-hidden' src={image ? URL.createObjectURL(image) : prevImage || logo} alt="" />
      </div>
    </div>
  );
}

export default ProfileUpdate;
