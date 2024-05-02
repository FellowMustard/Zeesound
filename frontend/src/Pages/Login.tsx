import { useState } from "react";
import Button_ from "../Components/Button_";
import Input_ from "../Components/Input_";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { userLogin } from "../api/link";
import useToast from "../Hooks/useToast";
import useAuth from "../Hooks/useAuth";

function Login() {
  const { setAuth } = useAuth();
  const toast = useToast();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const [loading, setLoading] = useState(false);
  const [emailValue, setEmailValue] = useState<string>("");
  const [passValue, setPassValue] = useState<string>("");

  const emailOnChange = (newValue: string) => {
    setEmailValue((prevState: string) => (prevState = newValue));
  };

  const passOnChange = (newValue: string) => {
    setPassValue((prevState: string) => (prevState = newValue));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading((prevState) => (prevState = true));
    if (!emailValue || !passValue) {
      toast?.open("Please Fill Username / Password!", "error");
      setLoading((prevState) => (prevState = false));
      return;
    }
    try {
      const response = await axios.post(
        userLogin,
        {
          email: emailValue,
          password: passValue,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setAuth(response.data);
      setLoading((prevState) => (prevState = false));
      navigate(from, { replace: true });
    } catch (err: any) {
      if (!err?.response) {
        toast?.open("No server response!", "error");
      } else {
        toast?.open(err.response.data.message, "error");
      }
      setLoading((prevState) => (prevState = false));
    }
  };

  return (
    <main className="w-full min-h-full bg-dark-card bg-gradient-to-b from-dark-primary flex flex-col items-center justify-center p-4">
      <h1 className="text-xl md:text-4xl font-bold tracking-tight text-light-main max-w-[300px]">
        Welcome Back, Login to <span className="zeesound">Zeesound</span>
      </h1>
      <form className="flex flex-col gap-2 mt-8" onSubmit={handleSubmit}>
        <Input_ id="email" label="Email" onChange={emailOnChange} />
        <Input_
          id="password"
          label="Password"
          onChange={passOnChange}
          type="password"
          showEye
        />
        <Button_
          type="submit"
          className="w-full mt-8 py-3 bg-dark-primary rounded-full text-white !text-base"
          loading={loading}
        >
          Login
        </Button_>
      </form>
      <p className="mt-4">
        Don't have an account?
        <Link
          to="/register"
          className="font-bold cursor-pointer hover:underline"
        >
          {" "}
          Create a new account
        </Link>
      </p>
    </main>
  );
}

export default Login;
