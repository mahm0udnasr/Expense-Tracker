import { API_PATHS } from "./api";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formdata = new FormData();
  formdata.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading image", error);
    throw error;
  }
};

export default uploadImage;