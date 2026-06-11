// RegisterPage.jsx
// Page de création de compte (wireframe Register_1).
// Assemble AuthLayout + RegisterForm.

import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
