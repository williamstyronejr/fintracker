import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/HomePage.tsx"),

  route("signin", "routes/auth/SigninPage.tsx"),
  route("signup", "routes/auth/SignupPage.tsx"),
  route("terms", "routes/legal/TosPage.tsx"),
  route("privacy", "routes/legal/PrivacyPolicyPage.tsx"),
  route("about", "routes/AboutPage.tsx"),
  route("support", "routes/support/SupportPage.tsx"),
  route("demo", "routes/demo/DemoPage.tsx"),

  route("dashboard", "routes/dashboard/layout.tsx", [
    index("routes/dashboard/index.tsx"),
    route("settings", "routes/dashboard/settings/SettingsPage.tsx"),
    route("accounts", "routes/dashboard/accounts/AccountsPage.tsx"),
    route("accounts/:id", "routes/dashboard/accounts/AccountPage.tsx"),
    route(
      "accounts/:id/settings",
      "routes/dashboard/accounts/AccountSettingsPage.tsx"
    ),
    route("transactions", "routes/dashboard/transactions/TransactionsPage.tsx"),
    route(
      "transactions/:id",
      "routes/dashboard/transactions/TransactionPage.tsx"
    ),
    route("budget", "routes/dashboard/budget/BudgetPage.tsx"),
  ]),
] satisfies RouteConfig;
