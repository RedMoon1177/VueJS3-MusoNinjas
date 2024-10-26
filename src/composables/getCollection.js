import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";

const getCollection = (collectionName, queryConstraints) => {
  const documents = ref(null);
  const error = ref(null);

  // Set up the Firestore collection reference with query and orderBy
  let collectionRef = collection(projectFirestore, collectionName);

  if (queryConstraints) {
    // Apply the `where` constraint if `queryConstraints` is provided
    collectionRef = query(
      collectionRef,
      where(...queryConstraints),
      orderBy("createdAt")
    );
  } else {
    // Use just the orderBy constraint if no `where` constraint is provided
    collectionRef = query(collectionRef, orderBy("createdAt"));
  }

  const unsub = onSnapshot(
    collectionRef,
    (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        // must wait for the server to create the timestamp & send it back
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });

      // update values
      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "could not fetch the data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, documents };
};

export default getCollection;
