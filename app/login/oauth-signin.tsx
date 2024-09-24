"use client";

import { Provider } from "@supabase/supabase-js";
import { Github } from "lucide-react";
import { oAuthSignIn } from "./actions";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

export function OAuthButtons() {
  const oAuthProviders: OAuthProvider[] = [
    {
      name: "github",
      displayName: "Github",
      icon: <Github className="w-5 h-5 mr-2" />, // Icon size adjustment and margin for spacing
    },
  ];

  return (
    <div className="flex flex-col space-y-4">
      {oAuthProviders.map((provider) => (
        <button
          key={provider.name}
          onClick={async () => {
            try {
              const result = await oAuthSignIn(provider.name);
              console.log("OAuth sign-in successful:", result);
            } catch (error) {
              console.error("OAuth sign-in error:", error);
            }
          }}
          className="flex items-center justify-center w-full py-3 px-6 text-white bg-gray-800 rounded-lg shadow-md hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500"
        >
          {provider.icon} {/* Icon rendered before text */}
          <span className="font-medium">Login with {provider.displayName}</span>
        </button>
      ))}
    </div>
  );
}
