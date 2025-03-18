import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const provider = new GithubAuthProvider();
const auth = getAuth();

export const signinGithub = async () => {
  const res = await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const user = result.user;
      return { result, credential };
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error);
      return { error, credential };
    });
  return res;
};
