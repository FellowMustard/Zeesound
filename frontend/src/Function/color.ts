export const extractDominantColor = (
  imageSrc: string
): Promise<{ color: string; textColor: string }> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
      reject("Canvas context not supported");
      return;
    }

    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;
      let r = 0,
        g = 0,
        b = 0;
      for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
      }
      r = Math.floor(r / (imageData.length / 4));
      g = Math.floor(g / (imageData.length / 4));
      b = Math.floor(b / (imageData.length / 4));
      const hex = rgbToHex(r, g, b);
      const textColor = getTextColor(r, g, b); // Determine text color based on luminance
      resolve({ color: hex, textColor: textColor });
    };
    image.onerror = (error) => reject(error);
    image.src = imageSrc;
  });
};

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const getTextColor = (r: number, g: number, b: number): string => {
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 128 ? "#000000" : "#ffffff"; // Return black for light colors, white for dark colors
};
