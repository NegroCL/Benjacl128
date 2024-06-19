import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyBXSVNft_iq8NAvbLKHzz7YqSlzAW4T3MY",
  authDomain: "benjacl8.firebaseapp.com",
  projectId: "benjacl8",
  storageBucket: "benjacl8.appspot.com",
  messagingSenderId: "46908801706",
  appId: "1:46908801706:web:2d0217611d95e401ff06d3",
  measurementId: "G-J846681R8F"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const save = (IngresarDatosClan) => {
    return addDoc(collection(db, 'Ingresar Datos Clan'), IngresarDatosClan)
}

export const getData = (dataCallback) => {
    return onSnapshot(collection(db, 'Ingresar Datos Clan'), dataCallback)
}

export const getAllData = async () => {
    const querySnapshot = await getDocs(collection(db, 'Ingresar Datos Clan'));
    return querySnapshot.docs;
}

export const remove = (id) => {
    return deleteDoc(doc(db, 'Ingresar Datos Clan', id))
}

export const getDocumento = (id) => {
    return getDoc(doc(db, 'Ingresar Datos Clan', id))
}

export const update = (id, emp) => {
    return updateDoc(doc(db, 'Ingresar Datos Clan', id), emp)
}
