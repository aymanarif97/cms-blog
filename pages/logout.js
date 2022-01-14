import React from "react";
import supabase from "../utils/supabase";

export default function Logout() {
  async function handleSignOut(event) {
    event.preventDefault();

    const signInUserEmail = supabase.auth.user().email;

    await supabase.auth.signOut({ signInUserEmail });
  }

  const userEmail = supabase.auth.user().email;
  console.log(userEmail);
  return (
    <div>
      <h1>Logout</h1>
      <p>{userEmail}</p>
      <form onSubmit={handleSignOut}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
