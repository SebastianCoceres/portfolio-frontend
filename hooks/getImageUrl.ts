import images from "../constants/images";
import { apiimages } from "../config/index";

const getImageUrl = (url: any) => {
  if (url) {
    return `${apiimages}${url}`;
  } else {
    return images.dummy.src;
  }
};

export { getImageUrl };
