import { collection, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const getElementById = async (collection, id) => {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);
  console.log(docRef)
  return docSnap;
};

const updateCollection = async (collectionName, id) => {
  deleteDoc(doc(db, collectionName, id));
};

const updateItem = async (collection, id, updatedData) => {
   const docRef = doc(db, collection, id);
   try{
    await updateDoc(docRef, updatedData);
    console.log("Document updated successfully!");
   } catch(err){
    console.log("Error ", err.message);
   }
}

export { getElementById, updateCollection, updateItem };
