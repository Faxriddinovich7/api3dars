let myForm = document.getElementById("myForm");
let title = document.getElementById("title");
let description = document.getElementById("description");
let image_url = document.getElementById("image_url");
let category = document.getElementById("category");
let condition = document.getElementById("condition");
let boxDIVV = document.getElementById("boxDIVV");

myForm.addEventListener("submit", (event) => {
    event.preventDefault();
    dataB();
});

async function dataB() {
    if (!title.value || !description.value || !image_url.value || !category.value || !condition.value) {
        alert("Xammasini tuldiring!");
        return;
    }

    let dataa = await fetch("https://effective-mobile.duckdns.org/api/ads/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title.value,
            description: description.value,
            image_url: image_url.value,
            category: category.value,
            condition: condition.value,
        }),
    });

    title.value = "";
    description.value = "";
    image_url.value = "";
    category.value = "";
    condition.value = "";

    if (dataa.ok) {
        one();
        alert("Qo‘shildi");
    } else {
        let error = await dataa.text();
        console.log("Xatolik:", error);
        alert("Qo‘shilmadi, serverdan xato keldi.");
    }
}

async function one() {
    try {
        let res = await fetch("https://effective-mobile.duckdns.org/api/ads/", { method: "GET" });
        if (!res.ok) throw new Error("Serverdan xato javob keldi: " + res.status);
        let data = await res.json();
        if (Array.isArray(data.results)) {
            two(data.results);
        } else {
            two(data);
        }
    } catch (error) {
        console.log("Xatolik yuz berdi:", error.message);
    }
}

function two(result) {
    boxDIVV.innerHTML = "";
    result.forEach((item) => {
        let div = document.createElement("div");
        div.innerHTML = `
        <div class="card border p-4 mb-4 shadow">
            <img src="${item.image_url}" alt="${item.image_url}" class="w-46 h-20 object-cover">
            <p class="card-title font-bold mt-2">${item.title}</p>
            <p class="card-description">${item.description}</p>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Condition:</strong> ${item.condition}</p>
        </div>`;
        boxDIVV.appendChild(div);
    });
}


let form = document.querySelector('#myForm');
let inputTitle = document.querySelector('#title');
let inputDescription = document.querySelector('#description');
let msgTitle = document.querySelector('#inputTitle');
let msgDescription = document.querySelector('#inputDescription');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let reTitle = /^[a-zA-Z0-9\s]{3,12}$/;
    let validTitle = reTitle.test(inputTitle.value);
    let reDescription = /^[a-zA-Z0-9\s]{4,24}$/;
    let validDescription = reDescription.test(inputDescription.value);

    if (validTitle && validDescription) {
        msgTitle.textContent = 'Thanks for you!';
        msgTitle.style.color = 'green';
        inputTitle.style.border = '1px solid green';

        msgDescription.textContent = 'Thanks for you!';
        msgDescription.style.color = 'green';
        inputDescription.style.border = '1px solid green';

        dataB();
    } else {
        if (!validTitle) {
            msgTitle.textContent = '3 ta dan 12 tagacha harf va raqam bo‘lishi kerak!';
            msgTitle.style.color = 'red';
            inputTitle.style.border = '1px solid red';
        }
        if (!validDescription) {
            msgDescription.textContent = '4 ta dan 24 tagacha harf va raqam bo‘lishi kerak!';
            msgDescription.style.color = 'red';
            inputDescription.style.border = '1px solid red';
        }
    }
});

inputTitle.addEventListener('input', (e) => {
    let reTitle = /^[a-zA-Z0-9\s]{3,12}$/;
    if (reTitle.test(e.target.value)) {
        msgTitle.textContent = 'Thanks for you!';
        msgTitle.style.color = 'green';
        inputTitle.style.border = '1px solid green';
    } else {
        msgTitle.textContent = '3 ta dan 12 tagacha harf va raqam bo‘lishi kerak!';
        msgTitle.style.color = 'red';
        inputTitle.style.border = '1px solid red';
    }
});

inputDescription.addEventListener('input', (e) => {
    let reDescription = /^[a-zA-Z0-9\s]{4,24}$/;
    if (reDescription.test(e.target.value)) {
        msgDescription.textContent = 'Thanks for you!';
        msgDescription.style.color = 'green';
        inputDescription.style.border = '1px solid green';
    } else {
        msgDescription.textContent = '4 ta dan 24 tagacha harf va raqam bo‘lishi kerak!';
        msgDescription.style.color = 'red';
        inputDescription.style.border = '1px solid red';
    }
});


let inputImage = document.querySelector('#image_url');
let selectCategory = document.querySelector('#category');
let selectCondition = document.querySelector('#condition');
inputImage.addEventListener('input', (e) => {
    if (e.target.value.trim() !== "") {
        inputImage.style.border = '1px solid green';
    } else {
        inputImage.style.border = '1px solid red';
    }
});
selectCategory.addEventListener('change', (e) => {
    if (e.target.value !== "category") {
        selectCategory.style.border = '1px solid green';
    } else {
        selectCategory.style.border = '1px solid red';
    }
});
selectCondition.addEventListener('change', (e) => {
    if (e.target.value !== "") {
        selectCondition.style.border = '1px solid green';
    } else {
        selectCondition.style.border = '1px solid red';
    }
});







