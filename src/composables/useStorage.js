import { projectStorage } from "@/firebase/config";
import { ref } from "vue";
import getUser from "./getUser";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage"; // Correct imports from Firebase v9

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`;

    // Create a reference to the file in Firebase Storage
    const storageReference = storageRef(projectStorage, filePath.value);

    try {
      // Upload the file
      const res = await uploadBytes(storageReference, file);
      // Get the file URL
      url.value = await getDownloadURL(res.ref);
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return { url, filePath, error, uploadImage };
};

export default useStorage;
