"use client"

import { Provider } from "@supabase/supabase-js"
import { Github } from "lucide-react"
import { oAuthSignIn } from "./actions"

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
}

export function OAuthButtons() {
  const oAuthProviders: OAuthProvider[] = [{
    name: "github",
    displayName: 'Github',
    icon: <Github className="size-5" />
  }];

  return (
    <>
      {
        oAuthProviders.map(provider => (
          <button
            key={provider.name}
            onClick={async () => {
              try {
                const result = await oAuthSignIn(provider.name);
                console.log('OAuth sign-in successful:', result);
              } catch (error) {
                console.error('OAuth sign-in error:', error);
              }
            }}
            className="bg-gray-700 p-5"
          >
            Login with {provider.displayName}
          </button>
        ))
      }
    </>
  );
}
