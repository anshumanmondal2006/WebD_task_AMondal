function createBlog(blog, isDetailed = true) {
    const blogDiv = document.createElement('div');
    blogDiv.classList.add('blog');
    blogDiv.setAttribute('data-id', blog.id);

    const img = document.createElement('img');
    img.src = blog.image;
    blogDiv.appendChild(img);

    const headline = document.createElement('h4');
    headline.textContent = blog.headline;
    blogDiv.appendChild(headline);

    if (isDetailed) {
        const author = document.createElement('p');
        author.textContent = `Author: ${blog.author}`;
        blogDiv.appendChild(author);

        const type = document.createElement('p');
        type.textContent = `Type: ${blog.type}`;
        blogDiv.appendChild(type);

        const date = document.createElement('p');
        date.textContent = `Date: ${blog.date}`;
        blogDiv.appendChild(date);

    } else {
        const date = document.createElement('p');
        blogDiv.appendChild(date);
        date.textContent = `Date: ${blog.date}`;
    }

    const viewBtn = document.createElement('button');
    viewBtn.textContent = 'View More';
    viewBtn.addEventListener('click', () => {
        Content_display(blog);
    });
    blogDiv.appendChild(viewBtn);

    return blogDiv;
}

function Content_display(blog) {
    const cntntBox = document.getElementById('content-box');
    const contentDetails = document.getElementById('content-details');
    contentDetails.innerHTML = `
        <h4>${blog.headline}</h4>
        <p><strong><b>Date:</b></strong> ${blog.date}</p>
        <p><strong><b>Author:</b></strong> ${blog.author}</p>
        <p><strong><b>Type:</b></strong> ${blog.type}</p>
        <p>${blog.content}</p>
    `;
    cntntBox.style.display = 'block';
}

function closeContBox() {
    const cntntBox = document.getElementById('content-box');
    cntntBox.style.display = 'none';
}

function iniBlogs(blogs) {
    const leftPart = document.getElementById('left-part');
    const rightPart = document.getElementById('right-part');

    for (let i = 4; i < blogs.length; i++) {
        const blogHTML = createBlog(blogs[i], false);
        rightPart.appendChild(blogHTML);
    }
    for (let i = 0; i < 4; i++) {
        const blogHTML = createBlog(blogs[i]);
        leftPart.appendChild(blogHTML);
    }
    document.getElementById('close-button').addEventListener('click', closeContBox);
}

function createBlog(blog, detailed = true, horizontal = false) {
    const blogDiv = document.createElement('div');
    blogDiv.classList.add('blog');
    if (horizontal) {
        blogDiv.classList.add('horizontal');
    } else if (detailed) {
        blogDiv.classList.add('blog-30');
    } else {
        blogDiv.classList.add('blog-20-column');
    }
    blogDiv.innerHTML = `
        <img src="${blog.image}" ,alt="${blog.headline}">
        <div>
            <h4>${blog.headline}</h4>
            <p><strong>Date:</strong> ${blog.date}</p>
    `;
    if (detailed && !horizontal) {
        blogDiv.innerHTML += `
            <p><strong>Author:</strong>${blog.author}</p>
            <p><strong>Type:</strong> ${blog.type}</p>
        `;
    }
    blogDiv.innerHTML += `</div>`;
    blogDiv.onclick = ()=> Content_display(blog);
    return blogDiv;
}
async function fetchBlogs() {
    try {
        const response = await fetch('https://coding-week-2024-api.onrender.com/api/data');
        const blogs = await response.json();
        iniBlogs(blogs);
    } catch (error) {
        console.error('Error fetching all the blogs:', error);
    }
}
window.onload = fetchBlogs;
