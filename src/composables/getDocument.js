import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

const getDocument = (collectionName, id) => {
  const document = ref(null);
  const error = ref(null);

  // register the document reference with query
  const documentRef = doc(projectFirestore, collectionName, id);

  const unsub = onSnapshot(
    documentRef,
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        error.value = null;
      } else {
        error.value = "that document does not exist";
      }
    },
    (err) => {
      console.log(err.message);
      error.value = "could not fetch the document";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, document };
};

export default getDocument;
