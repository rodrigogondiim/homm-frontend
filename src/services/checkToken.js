import router from "@/router";

const isLogged = (redirect = false) => {
  const token = localStorage.getItem("-tknA");
  if (!token) return redirect ? router.push({ path: "/auth" }) : false;

  const payload = JSON.parse(atob(token.split(".")[1]));
  const now = Math.floor(Date.now() / 1000);

  if (now > payload.exp) {
    localStorage.removeItem("-tknA");
    return redirect ? router.push({ path: "/auth" }) : false;
  }

  return true;
};

export default isLogged;
