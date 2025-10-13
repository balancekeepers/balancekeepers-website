import LoginContent from "./content";

export const metadata = {
  title: "Sign In - The Balance Keepers",
  description: "Sign in to your Balance Keepers account to access your financial dashboard and accounting services.",
  keywords: "login, sign in, balance keepers, accounting dashboard, financial services",
  openGraph: {
    title: "Sign In - The Balance Keepers",
    description: "Sign in to your Balance Keepers account to access your financial dashboard and accounting services.",
    type: "website",
  },
};

export default function Login() {
  return <LoginContent />;
}