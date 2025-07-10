let form = document.getElementById("myForm");
let title = document.getElementById("title");
let description = document.getElementById("description");
let image_url = document.getElementById("image_url");
let category = document.getElementById("category");
let condition = document.getElementById("condition");
let boxDiv = document.getElementById("boxDiv");

let msgTitle = document.getElementById("inputTitle");
let msgDescription = document.getElementById("inputDescription");

let reTitle = /^[a-zA-Z0-9\s]{3,12}$/;
let reDescription = /^[a-zA-Z0-9\s]{4,24}$/;

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let validTitle = reTitle.test(title.value);
    let validDescription = reDescription.test(description.value);

    if (!validTitle) {
        msgTitle.textContent = '3 ta dan 12 tagacha harf va raqam bo‘lishi kerak!';
        msgTitle.style.color = 'red';
        title.style.border = '1px solid red';
    } else {
        msgTitle.textContent = 'Thanks for you!';
        msgTitle.style.color = 'green';
        title.style.border = '1px solid green';
    }

    if (!validDescription) {
        msgDescription.textContent = '4 ta dan 24 tagacha harf va raqam bo‘lishi kerak!';
        msgDescription.style.color = 'red';
        description.style.border = '1px solid red';
    } else {
        msgDescription.textContent = 'Thanks for you!';
        msgDescription.style.color = 'green';
        description.style.border = '1px solid green';
    }

    if (validTitle && validDescription && image_url.value && category.value && condition.value) {
        dataB();
    } else {
        alert("Iltimos, barcha maydonlarni to‘g‘ri to‘ldiring.");
    }
});

title.addEventListener('input', () => {
    if (reTitle.test(title.value)) {
        msgTitle.textContent = 'Thanks for you!';
        msgTitle.style.color = 'green';
        title.style.border = '1px solid green';
    } else {
        msgTitle.textContent = '3 ta dan 12 tagacha harf va raqam bo‘lishi kerak!';
        msgTitle.style.color = 'red';
        title.style.border = '1px solid red';
    }
});

description.addEventListener('input', () => {
    if (reDescription.test(description.value)) {
        msgDescription.textContent = 'Thanks for you!';
        msgDescription.style.color = 'green';
        description.style.border = '1px solid green';
    } else {
        msgDescription.textContent = '4 ta dan 24 tagacha harf va raqam bo‘lishi kerak!';
        msgDescription.style.color = 'red';
        description.style.border = '1px solid red';
    }
});

image_url.addEventListener('input', () => {
    image_url.style.border = image_url.value.trim() !== "" ? '1px solid green' : '1px solid red';
});

category.addEventListener('change', () => {
    category.style.border = category.value !== "" ? '1px solid green' : '1px solid red';
});

condition.addEventListener('change', () => {
    condition.style.border = condition.value !== "" ? '1px solid green' : '1px solid red';
});



async function dataB() {
    try {
        let response = await fetch("https://effective-mobile.duckdns.org/api/ads/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title.value,
                description: description.value,
                image_url: image_url.value,
                category: category.value,
                condition: condition.value,
            }),
        });

        if (response.ok) {
            title.value = "";
            description.value = "";
            image_url.value = "";
            category.value = "";
            condition.value = "";
            alert("Qo‘shildi");
            one();
        } else {
            let error = await response.text();
            console.log("Xatolik:", error);
            alert("Qo‘shilmadi, serverdan xato keldi.");
        }
    } catch (err) {
        console.error("Ulanishda xatolik:", err);
    }
}

async function one() {
    try {
        let res = await fetch("https://effective-mobile.duckdns.org/api/ads/");
        if (!res.ok) throw new Error("Xatolik: " + res.status);
        let data = await res.json();
        two(Array.isArray(data.results) ? data.results : data);
    } catch (err) {
        console.error("Ma'lumot olishda xato:", err.message);
    }
}

function two(result) {
    boxDiv.innerHTML = "";
    result.forEach((item) => {
        let div = document.createElement("div");
        div.innerHTML = `
        <div class="card border p-4 mb- shadow bg-white rounded ">
            <img src="${item.image_url}" alt="${item.title}" class="w-200 h-40 object-cover rounded">
            <p class="card-title font-bold mt-2">${item.title}</p>
            <p class="card-description text-gray-700">${item.description}</p>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Condition:</strong> ${item.condition}</p>
             <button data-id="${item.id}" class=" hover:bg-gray-500 bg-gray-400 px-10 py-2 rounded-lg mt-2 shadow text-white btn_edit">Edit</button>
            <button data-id="${item.id}" class="bg-red-500 hover:bg-red-700 px-10 py-2 rounded-lg mt-2 shadow text-white btn_delete">Delete</button>
          
        </div>`;
        boxDiv.appendChild(div);
    });
    let btns = document.querySelectorAll('.btn_edit');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
                inputRender(e.target.getAttribute("data-id"));
            });


        })

    DeleteButton();
}

let deleteModal = document.getElementById("deleteModal");
let Delete = document.getElementById("Delete");
let cancelDelete = document.getElementById("cancelDelete");
let deleteId = null;

cancelDelete.addEventListener("click", () => {
    deleteId = null;
    deleteModal.classList.add("hidden");
});

Delete.addEventListener("click", async () => {
    if (deleteId) {
        let fetchOne = await fetch(`https://effective-mobile.duckdns.org/api/ads/${deleteId}/`, {
            method: "DELETE",
        });
        if (fetchOne.ok) {
            alert("Uchirildi");
            one();
        } else {
            alert("Xato yuz berdi");
        }
    }
    deleteModal.classList.add("hidden");
});

function DeleteButton() {
    let btn_delete = document.querySelectorAll(".btn_delete");
    btn_delete.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            deleteId = e.target.getAttribute("data-id");
            deleteModal.classList.remove("hidden");
        });
    });
}

async function inputRender(id) {
let dataId = await fetch(`https://effective-mobile.duckdns.org/api/ads/${id}/`)
    let res = await dataId.json()
    title.value = res.title
    description.value = res.description
    description.value = res.description
    image_url.value = res.image_url
    category.value = res.category
}
one();









