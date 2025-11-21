document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("add-book-form");
    const status = document.getElementById("add-book-result");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const genre = document.getElementById("genre").value.trim();

        if (!title || !author || !genre) {
            status.className = "status error";
            status.textContent = "Please fill in all fields.";
            return;
        }

        try {
            const res = await fetch("/api/add-book", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ title, author, genre })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                status.className = "status success";
                status.textContent = "Book added successfully!";
                form.reset();
            } else {
                status.className = "status error";
                status.textContent = data.message || "Error adding book.";
            }
        } catch (err) {
            status.className = "status error";
            status.textContent = "Server error. Please try again.";
        }
    });
});
