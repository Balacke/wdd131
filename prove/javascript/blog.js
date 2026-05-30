
const articles = [
    {
        id: 1,
        title: 'Septimus Heap Book One: Magyk',
        date: 'July 5, 2022',
        description:
            'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
        imgAlt: 'Book cover for Septimus Heap 1',
        ages: '10-14',
        genre: 'Fantasy',
        stars: '⭐⭐⭐⭐✩'
    },
    {
        id: 2,
        title: 'Magnus Chase Book One: Sword of Summer',
        date: 'December 12, 2021',
        description:
            'The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.',
        imgSrc:
            'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
        imgAlt: 'Book cover for Magnus Chase 1',
        ages: '12-16',
        genre: 'Fantasy',
        stars: '⭐⭐⭐⭐✩'
    },
    {
        id: 3,
        title: "Belgariad Book One: Pawn of Prophecy",
        date: "Feb 12, 2022",
        description:
            "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
        imgSrc:
            "https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
        imgAlt: "Book cover for Pawn of Prophecy",
        ages: "12-16",
        genre: "Fantasy",
        stars: "⭐⭐⭐⭐⭐"
    }
];


let selectElem = document.getElementById('book-select')
let articleContent = document.querySelector('article')

selectElem.addEventListener('change', changeArticle);

function changeArticle() {
    //had to look up how to convert a string id to a number
    let index = parseInt(selectElem.value) -1;
    // || articles[0] is to have a fallback if index is not a number
    const book = articles[index] || articles[0]
            const article = `
                <article id="${book.id}">
                    <section class="about_book">
                        <p id="date"><i>${book.date}</i></p>
                        <p id="ages" >${book.ages}</p>
                        <p id="genre">${book.genre}</p>
                        <p id="stars"> ${book.stars} </p>
                    </section>
                    <section class="book">
                        <h2 id="title">${book.title}</h2>
                        <img id="book_image" src="${book.imgSrc}" alt="${book.imgAlt}">
                        <p id="description"> ${book.description} </p>
                    </section>
                </article>
            
            `;
            articleContent.innerHTML = article
        
    
}
