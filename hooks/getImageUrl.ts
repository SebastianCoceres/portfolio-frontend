import images from "../constants/images";

const getImageUrl = (url: any) => {
  if (url) {
    return `https://api.sebastiancoceres.dev${url}`;
  } else {
    return images.dummy.src;
  }
};

export { getImageUrl };
