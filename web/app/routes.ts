import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/HomePage.tsx"),

  route("signin", "routes/auth/SigninPage.tsx"),
  route("signup", "routes/auth/SignupPage.tsx"),
  route("terms", "routes/legal/TosPage.tsx"),
  route("privacy", "routes/legal/PrivacyPolicyPage.tsx"),
  route("about", "routes/AboutPage.tsx"),
  route("support", "routes/support/SupportPage.tsx"),
  route("demo", "routes/demo/DemoPage.tsx"),

  ...prefix("api", [
    ...prefix("account", [
      route("/:id/delete", "routes/api/account/delete.ts"),
      route("create", "routes/api/account/create.ts"),
      route(
        "/:id/transactions/delete",
        "routes/api/account/delete-transactions.ts"
      ),
      route("/:id/export", "routes/api/account/data.ts"),
      route("/:id/share", "routes/api/account/shareable.ts"),
      route("/:id/edit", "routes/api/account/edit.ts"),
    ]),

    route("/transactions/create", "routes/api/transactions/create.tsx"),
    route("/transactions/:id/edit", "routes/api/transactions/edit.ts"),
    route("/transactions/:id/delete", "routes/api/transactions/delete.ts"),
  ]),

  route("/a/:id", "routes/public/PublicAccountPage.tsx"),

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
