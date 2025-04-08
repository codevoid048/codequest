export const userSchema = {
    name: "users",
    fields: [
      { name: "id", type: "string" },
      { name: "name", type: "string" },
      { name: "username", type: "string" },
      { name: "profilePicture", type: "string", optional: true },
      { name: "collegeName", type: "string", optional: true },
      { name: "branch", type: "string", optional: true },
      { name: "points", type: "string", optional: true },
      { name: "rank", type: "string", optional: true },
    ],
};