const newComment = document.querySelector(".comment-form");

async function postComment(event) {
  event.preventDefault();

  const content = document.querySelector("#comment-input").value;
// Posts new comment
  const asteroid_id = document.querySelector("#asteroid_id").value;
  const response = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ content, asteroid_id }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  if (response.ok) {
    document.location.reload();
    console.log("ok");
  } else {
    alert(response.statusText);
  }
}

newComment.addEventListener("submit", postComment);
