import images from "../constants/images";

const getImageUrl = (url: any) => {
  if (url) {
    return `http://localhost:1337${url}`;
  } else {
    return images.dummy.src;
  }
};

export { getImageUrl };
