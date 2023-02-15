const newComment = document.querySelector(".comment-form");

async function postComment(event) {
  event.preventDefault();

  const content = document.querySelector("#comment-input");
  const user_id = document.querySelector(`#user_id`);
  const asteroid_id = document.querySelector("#asteroid_id");

  const response = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ content, user_id, asteroid_id }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

newComment.addEventListener("subit", postComment);
