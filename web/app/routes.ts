import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/HomePage.tsx"),

  route("signin", "routes/auth/SigninPage.tsx"),
  route("signup", "routes/auth/SignupPage.tsx"),
  route("terms", "routes/legal/TosPage.tsx"),
  route("privacy", "routes/legal/PrivacyPolicyPage.tsx"),

  route("dashboard", "routes/dashboard/layout.tsx", [
    index("routes/dashboard/index.tsx"),
    route("settings", "routes/dashboard/settings/SettingsPage.tsx"),
  ]),

  route("support", "routes/support/SupportPage.tsx"),
  route("demo", "routes/demo/DemoPage.tsx"),
] satisfies RouteConfig;
