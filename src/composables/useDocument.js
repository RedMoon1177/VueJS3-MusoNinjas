import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const useDocument = (collectionName, id) => {
  const error = ref(null);
  const isPending = ref(false);

  const documentRef = doc(projectFirestore, collectionName, id);

  const deleteDocument = async () => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await deleteDoc(documentRef);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = "could not delete the document";
    }
  };

  const updateDocument = async (updates) => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await updateDoc(documentRef, updates);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = "could not update the document";
    }
  };

  return { error, isPending, deleteDocument, updateDocument };
};

export default useDocument;
