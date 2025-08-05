'use client'
import { useState } from "react";

export default function NormalForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (password !== confrimPassword) {
      setErrors(["Passwords do not match"]);
      setSubmitting(false);
      return;
    }

    await new Promise((re) => setTimeout(re ,1000))
    setErrors([]);
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center bg-gray-500 h-screen">
      <h1 className="text-[50px]">
        Form
      </h1>
      <label>email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
        type="email"
        className="bg-white rounded outline-none p-5 text-black placeholder:text-gray-500"
        placeholder="user@gmail.com"
      />
      <label>password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
        minLength={8}
        type="password"
        className="bg-white rounded outline-none p-5 text-black placeholder:text-gray-500"
        placeholder="password"
      />
      <label>confrim password</label>
      <input
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confrimPassword}
        required
        type="password"
        className="bg-white rounded outline-none p-5 text-black placeholder:text-gray-500"
        placeholder="confirm password"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="disabled:bg-gray-600 bg-rose-700 px-12 py-5 hover:bg-rose-800 rounded-2xl w-auto text-white "
      >
        Submit
      </button>
        {errors.length > 0 && (
        <div className="bg-red-500 text-white px-5 py-2 rounded">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </form>
  );
}
