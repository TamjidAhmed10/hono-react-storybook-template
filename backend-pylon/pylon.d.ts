import "@getcronit/pylon";

declare module "@getcronit/pylon" {
  interface Bindings {
    TURSO_CONNECTION_URL: string;
    TURSO_AUTH_TOKEN: string;
  }

  interface Variables {}
}
