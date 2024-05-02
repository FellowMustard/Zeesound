import { useState } from "react";
import Button_ from "../Components/Button_";
import Input_ from "../Components/Input_";
import useInputValidator from "../Hooks/useInputValidator";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { userRegister } from "../api/link";
import useToast from "../Hooks/useToast";

function Register() {
  //Regex
  const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,25}$/;
  const PASSWORD_REGEX =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s])(.{8,32})$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  //Input Hooks

  const [userValue, userValidity, userOnChange] = useInputValidator({
    initialValue: "",
    regexValue: USERNAME_REGEX,
  });
  const [passValue, passValidity, passOnChange] = useInputValidator({
    initialValue: "",
    regexValue: PASSWORD_REGEX,
  });
  const [emailValue, emailValidity, emailOnChange] = useInputValidator({
    initialValue: "",
    regexValue: EMAIL_REGEX,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    if (!emailValidity) {
      toast?.open("Please provide valid email.", "error");
      setLoading(false);
      return;
    }
    if (!userValidity) {
      toast?.open("Please provide valid username.", "error");
      setLoading(false);
      return;
    }
    if (!passValidity) {
      toast?.open("Please provide valid password.", "error");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        userRegister,
        {
          email: emailValue,
          username: userValue,
          password: passValue,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast?.open(response.data.message, "success");
      setLoading(false);
      navigate("/login", { replace: true });
    } catch (err: any) {
      if (!err?.response) {
        toast?.open("No server response!", "success");
      } else {
        toast?.open(err.response.data.message, "error");
      }
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-full bg-dark-card bg-gradient-to-b from-dark-primary flex flex-col items-center justify-center p-4 overflow-auto">
      <h1 className="text-xl md:text-4xl font-bold tracking-tight text-light-main max-w-[300px]">
        Create Your New <span className="zeesound">Zeesound</span> Account Now
      </h1>
      <form className="flex flex-col gap-2 mt-8" onSubmit={handleSubmit}>
        <Input_
          id="email"
          label="Email"
          onChange={emailOnChange}
          placeholder="name@domain.com"
          valid={emailValidity}
          errorMessage={<p>Please provide valid email.</p>}
        />
        <Input_
          id="username"
          label="Username"
          onChange={userOnChange}
          valid={userValidity}
          errorMessage={
            <p>
              4 to 25 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
          }
        />
        <Input_
          id="password"
          label="Password"
          onChange={passOnChange}
          type="password"
          valid={passValidity}
          errorMessage={
            <p>
              8 to 32 characters.
              <br />
              Must contain Uppercase, Lowercase, Number and Symbol.
            </p>
          }
          showEye
        />
        <Button_
          type="submit"
          className="w-full mt-8 py-3 bg-dark-primary rounded-full text-white !text-base disabled:bg-dark-primarySaturated"
          loading={loading}
        >
          Create Account
        </Button_>
      </form>
      <p className="mt-4">
        Already have an Account?
        <Link to="/login" className="font-bold cursor-pointer hover:underline">
          {" "}
          Login here
        </Link>
      </p>
    </main>
  );
}

export default Register;
