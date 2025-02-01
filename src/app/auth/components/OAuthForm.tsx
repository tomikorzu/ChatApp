import React from "react";
import OAuthInput from "./OAuthInput";

export default function OAuthForm() {
  return (
    <div className="flex gap-3 mt-3 w-full">
      <OAuthInput href="google">
        <i className="fa-brands fa-google text-lg"></i>
      </OAuthInput>
      <OAuthInput href="facebook">
        <i className="fa-brands fa-facebook text-lg"></i>
      </OAuthInput>
      <OAuthInput href="github">
        <i className="fa-brands fa-github text-lg"></i>
      </OAuthInput>
    </div>
  );
}
