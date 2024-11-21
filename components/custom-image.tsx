import Image from "next/image";
import React from "react";

const CustomImage = ({
  image,
}: {
  image: { imageUrl: string; appearanceName: string };
}) => {
  return (
    <Image
      src={image.imageUrl}
      className="aspect-square"
      width={500}
      height={500}
      alt={`Prayse ${image.appearanceName} Shirt`}
    />
  );
};

export default CustomImage;
