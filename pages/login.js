import React from "react";
import supabase from "../utils/supabase";

export default function Login() {
  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;

    await supabase.auth.signIn({ email });
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
