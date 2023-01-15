import { startClient, navigate } from "rakkasjs";

let run = false;
let previousPathname = "";

const runOnce = () => {
  if (run) return;
  run = true;
  console.log("This will run only once");
  setInterval(() => {
    if (window.location.pathname !== previousPathname) {
      console.log("pathname changed", window.location.pathname, history.state);
      previousPathname = window.location.pathname;
      setTimeout(() => {
        window.history.replaceState(history.state, "", `?something=1`);
      }, 10);
    }
  }, 1);

  // setInterval(() => {
  //   navigate(window.location.pathname === "/about" ? "/" : "/about");
  // }, 2000);
};

const MyProvider = ({ children }: { children: React.ReactNode }) => {
  if (typeof window !== "undefined") {
    runOnce();
  }

  return <>{children}</>;
};

startClient({
  hooks: {
    wrapApp(app) {
      return <MyProvider>{app}</MyProvider>;
    },
  },
});
