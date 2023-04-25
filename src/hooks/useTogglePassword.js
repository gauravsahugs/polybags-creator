import React, { useState } from "react";
function useTogglePassword() {
  const [visible, setVisible] = useState(false);
  const Icon = (
    <div className="eyeicon">
      <i
        class={visible ? "bi bi-eye-slash" : "bi bi-eye"}
        onClick={() => setVisible(!visible)}
      />
    </div>
  );
  const PasswordInputType = visible ? "text" : "password";
  return [PasswordInputType, Icon];
}

export default useTogglePassword;
