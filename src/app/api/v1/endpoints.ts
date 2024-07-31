interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
}

export const apiEndpoints = [
  { method: "GET", path: "/api/v1/users" },
  {
    method: "GET",
    path: "/api/v1/users/[id]",
  },
  {
    method: "POST",
    path: "/api/v1/users",
  },
  {
    method: "PATCH",
    path: "/api/v1/users/[id]",
  },
  {
    method: "DELETE",
    path: "/api/v1/users/[id]",
  },
  {
    method: "POST",
    path: "/api/v1/auth/login",
  },
  {
    method: "POST",
    path: "/api/v1/auth/register",
  },
  {
    method: "POST",
    path: "/api/v1/auth/refresh",
  },
] satisfies ApiEndpoint[];

export function matchEndpoint(pathname: string): ApiEndpoint | undefined {
  for (const endpoint of apiEndpoints) {
    const regex = new RegExp(`^${endpoint.path.replace(/\[.*?\]/g, "[^/]+")}$`);
    if (regex.test(pathname)) return endpoint;
  }
  return undefined;
}
