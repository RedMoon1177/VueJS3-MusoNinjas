import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

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

  return { error, isPending, deleteDocument };
};

export default useDocument;
