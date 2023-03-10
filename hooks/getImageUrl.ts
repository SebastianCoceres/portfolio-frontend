import images from "../constants/images";

const getImageUrl = (url: any) => {
  if (url) {
    return `https://images.sebastiancoceres.dev${url}`;
  } else {
    return images.dummy.src;
  }
};

export { getImageUrl };
