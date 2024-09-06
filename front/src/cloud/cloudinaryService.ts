import axios from 'axios';

interface UploadResult {
    secure_url: string;
    public_id: string;
}

export const uploadToCloudinary = async (
    file: File,
    folder: string,
    uploadPreset: string = 'colllab_preset'
): Promise<UploadResult | null> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', folder);

    try {
        const cloud = import.meta.env.VITE_CLOUD_NAME;
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
            formData
        );

        return {
            secure_url: response.data.secure_url,
            public_id: response.data.public_id,
        };
    } catch (error) {
        console.error("Erreur lors de l'upload sur Cloudinary:", error);
        return null;
    }
};

export const deleteFromCloudinary = async (publicId: string): Promise<boolean> => {
    try {
        const cloud = import.meta.env.VITE_CLOUD_NAME;
        const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
        const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloud}/image/destroy`,
            {
                public_id: publicId,
                api_key: apiKey,
                api_secret: apiSecret,
            }
        );

        return response.data.result === 'ok';
    } catch (error) {
        console.error("Erreur lors de la suppression sur Cloudinary:", error);
        return false;
    }
};

export const replaceCloudinaryImage = async (
    oldPublicId: string | null,
    newFile: File,
    folder: string
  ): Promise<UploadResult | null> => {
    if (oldPublicId) {
      const deletionSuccess = await deleteFromCloudinary(oldPublicId);
      if (!deletionSuccess) {
        console.error("Échec de la suppression de l'ancienne image");
        return null;
      }
    }
  
    // On upload la nouvelle image
    const uploadResult = await uploadToCloudinary(newFile, folder);
    if (!uploadResult) {
      console.error("Échec de l'upload de la nouvelle image");
      return null;
    }
  
    return uploadResult;
  };