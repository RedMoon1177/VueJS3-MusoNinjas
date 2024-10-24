import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";

const useCollection = (collectionName) => {
  const error = ref(null);
  const isPending = ref(false);
  const id = ref("");

  // add a new document
  const addDocument = async (doc) => {
    error.value = null;
    isPending.value = true;

    try {
      // Get a reference to the collection
      const colRef = collection(projectFirestore, collectionName);
      // Add a new document to the collection
      const docRef = await addDoc(colRef, doc);
      isPending.value = false;
      return { id: docRef.id };
    } catch (err) {
      console.log(err.message);
      error.value = "could not send the message";
      isPending.value = false;
    }
  };

  return { error, addDocument, isPending };
};

export default useCollection;
