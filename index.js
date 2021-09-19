async function gql(query, variables={}) {
  const data = await fetch('https://api.hashnode.com/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          query,
          variables
      })
  });
  
  return data.json();
}

const GET_USER_ARTICLES = `
    query GetUserArticles($page: Int!) {
        user(username: "namratakarmakar") {
            publication {
                posts(page: $page) {
                  title
                  brief
                  slug
                  coverImage
                }
            }
        }
    }
`;

gql(GET_USER_ARTICLES, { page: 0 })
    .then(result => {
        const blogPosts = result.data.user.publication.posts;
        let container = document.createElement('div');
        container.className = 'blog-posts';
        
        blogPosts.forEach(article => {
          let postContainer = document.createElement('div');
          postContainer.className = 'card';

          let coverImage = document.createElement('img');
          coverImage.src = article.coverImage;
          coverImage.className = 'card-img-top';

          let cardBody = document.createElement('div');
          cardBody.className = 'card-body';

          let title = document.createElement('h5');
          title.innerText = article.title;
          title.className = 'card-title';
                      
          let brief = document.createElement('p');
          brief.innerText = article.brief;
          brief.className = 'card-text';          

          let link = document.createElement('a');
          link.innerText = 'Read more...';
          link.href = `https://namratakarmakar.hashnode.dev/${article.slug}`;
        
          container.appendChild(postContainer);
          postContainer.appendChild(coverImage);
          postContainer.appendChild(title);
          postContainer.appendChild(brief);
          postContainer.appendChild(link);
      })

      document.querySelector('.app').appendChild(container);
});

window.onload = function() {
  document.getElementById('blogPosts').parentNode.innerHTML = `
  <div class="app">
  </div>`;
}


