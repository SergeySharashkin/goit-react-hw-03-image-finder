async function fetchPictures(currentPage, value) {
  const MY_KEY = "24256402-655c9b75f9739418750c25629";
  return fetch(
    `https://pixabay.com/api/?q=${value}&page=${currentPage}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error("Is not valid picture name"));
  });
}
const pictureAPI = { fetchPictures };
export default pictureAPI;
