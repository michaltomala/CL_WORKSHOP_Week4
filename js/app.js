document.addEventListener("DOMContentLoaded",function (evt) {

    getBooks();
    addBookAction();


});


function getBooks() {
    $.ajax({
        url: "http://localhost:8282/books",
        dataType: "json"
    })
        .done(function (books) {
            let listEl = document.getElementById("bookList");
            books.forEach(book => addBookToList(listEl,book));
        })
}

function addBookToList(listEl, bookObj) {
    let newLi = document.createElement("li");
    let h2El = document.createElement("h2");
    h2El.innerText = bookObj.title;
    newLi.appendChild(h2El);
    listEl.appendChild(newLi);
}

function addBookAction() {

    let listEl = document.getElementById("bookList");
    let form = document.getElementById("bookForm");


    form.addEventListener("submit",function (e) {
        e.preventDefault();

        let children = Array.from(form.children);
        let isbn = children[0].value;
        let title = children[1].value;
        let author = children[2].value;
        let publisher = children[3].value;
        let type = children[4].value;

        //es if variablename isthe same as obj.attribute
        let book  = {
            isbn : isbn,
            title: title,
            author: author,
            publisher: publisher,
            type:type,
        };

        $.ajax({
            url: "http://localhost:8282/books",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(book),
            dataType: "json"
        })
            .done(function (data) {
                console.log(data);
                form.reset();
                addBookToList(listEl,data);
            })
            .fail(function () {
                alert("nie działą/Nie udało się zapisać ksiązki/Spróbuj ponownie");
            })

    })
}