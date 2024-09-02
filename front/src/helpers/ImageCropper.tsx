// import React, { useState, useCallback } from 'react';
// import Cropper from 'react-easy-crop';
// import { Button } from '@mui/material';
// import Slider from '@mui/material/Slider';
// import { getCroppedImg } from '../utils/cropImage';

// interface ImageCropperProps {
//   image: string;
//   onCropComplete: (croppedImage: File) => void;
// }

// const ImageCropper: React.FC<ImageCropperProps> = ({ image, onCropComplete }) => {
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

//   const onCropChange = (crop: any) => setCrop(crop);
//   const onZoomChange = (zoom: number) => setZoom(zoom);

//   const onCropCompleteCallback = useCallback(async () => {
//     if (croppedAreaPixels) {
//       const croppedImage = await getCroppedImg(image, croppedAreaPixels);
//       if (croppedImage) {
//         onCropComplete(croppedImage);
//       }
//     }
//   }, [croppedAreaPixels, image, onCropComplete]);

//   return (
//     <div className="crop-container">
//       <Cropper
//         image={image}
//         crop={crop}
//         zoom={zoom}
//         aspect={1}
//         onCropChange={onCropChange}
//         onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
//         onZoomChange={onZoomChange}
//       />
//       <Slider
//         value={zoom}
//         min={1}
//         max={3}
//         step={0.1}
//         onChange={(e, zoom) => onZoomChange(zoom as number)}
//       />
//       <Button variant="contained" onClick={onCropCompleteCallback}>
//         Crop Image
//       </Button>
//     </div>
//   );
// };

// export default ImageCropper;
