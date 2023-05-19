async function myRequest(method, url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(JSON.parse(xhr.responseText));
      }
    };
    xhr.onerror = () => reject(xhr.statusText);

    xhr.open(method, url, true);
    xhr.send();
  });
}

async function main() {
  try {
    let images = []; // Store all loaded images

    // Fetch initial set of random images
    let initialData = await myRequest('GET', 'Data.json');
    images = images.concat(initialData);

    // Function to create and append an <img> element with the given URL
    function appendImage(url) {
      let img = document.createElement('img');
      img.src = url;
      document.body.appendChild(img);
    }

    // Display a single random image from the initial set
    let randomIndex = Math.floor(Math.random() * initialData.length);
    let randomImage = initialData[randomIndex];
    appendImage(randomImage.url);

    // Handle scroll event
    window.addEventListener('scroll', async () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // Reach the bottom of the page, load more images

        // Select a random image from the available set
        let randomIndex = Math.floor(Math.random() * images.length);
        let randomImage = images[randomIndex];
        appendImage(randomImage.url);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

main();
