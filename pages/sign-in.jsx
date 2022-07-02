import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Button from "components/Button";
import Input from "components/Input";
import PageHeader from "components/PageHeader";

// TODO
// ✓ Use mutation with hard-coded values (working)
// • Pass in values via form to mutation
// • Install NextAuth
// • Pass JWT to NextAuth

// Components
// ----------------------------------------------------------------------------

const SignInForm = ({ title, id, setTitle }) => {
  let input;

  const AUTH_MUTATION = gql`
    mutation Authenticate {
      authenticate(email: "asmith.esq@gmail.com", password: "Yaeder, 1998!") {
        jwt
        jwtExpiresAt
        refreshToken
        refreshTokenExpiresAt
        user {
          id
          email
          username
        }
      }
    }
  `;

  const [authenticateNow, { data, loading, error }] = useMutation(
    AUTH_MUTATION,
    {
      onError(error) {
        loading = false;
        console.log("Invalid credentials");
        console.log(error);
      },
      onCompleted(data) {
        loading = false;
        console.log("Logged in");
        console.log(data);
      }
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    authenticateNow();
  }

  return (
    <form className="space-y-24" onSubmit={e => handleSubmit(e)}>
      {error && <div className="text-red-500">{error.message}</div>}
      <Button type="submit">{loading ? "…" : "Sign In"}</Button>
    </form>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function SignIn() {
  return (
    <>
      <PageHeader title="Sign In" />
      <SignInForm />
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      PageTitle: "Sign In"
    }
  };
}
