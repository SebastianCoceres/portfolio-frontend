import images from "../constants/images";

const getImageUrl = (url: any) => {
  if (url) {
    return `${process.env.MY_API_IMAGES}${url}`;
  } else {
    return images.dummy.src;
  }
};

export { getImageUrl };
