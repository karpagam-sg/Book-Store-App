export function checkAuthorName(name) {
  return fetch(`http://localhost:3001/authors/authorname_available/${name}`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(
            error.message || "Failed to check authorname availability"
          );
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error checking authorname availability:", error);
      throw error;
    });
}

export function checkAuthorNameForEdit(id, name) {
  return fetch(
    `http://localhost:3001/authors/authorname_available_edit/${id}/${name}`,
    {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(
            error.message || "Failed to check authorname availability"
          );
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error checking authorname availability:", error);
      throw error;
    });
}
