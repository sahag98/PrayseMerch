"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

const HoodieImage = ({ itemId }: { itemId: number }) => {
  // State to manage which image to display (default is the normal image)
  const [isHovered, setIsHovered] = useState(false);

  // Image URLs based on itemId
  let imageUrl;
  let hoverImageUrl;

  switch (itemId) {
    case 2995762:
      imageUrl =
        "https://utfs.io/f/aZ7NTMjk7uDeZSpNx545Xz68YDiI1FM29KOHcV7ZLUpa3BRh";
      hoverImageUrl =
        "https://utfs.io/f/aZ7NTMjk7uDehBcQDfJmYIBdriuMobJcWAEj7LhUQy4DN5SH"; // Replace with actual hover image URL
      break;
    case 3045844:
      imageUrl =
        "https://utfs.io/f/aZ7NTMjk7uDeBZS5Sz3U2XYlhDSzH9NAG13Tjx4F7be65PEZ";
      hoverImageUrl =
        "https://utfs.io/f/aZ7NTMjk7uDeX6knhRAnD3PuKU7WZf8wgxCA5hMmBN4yLsa0"; // Replace with actual hover image URL
      break;
    case 2995765:
      imageUrl =
        "https://utfs.io/f/aZ7NTMjk7uDeTzswRSb70K6dCrwVQvBFnJ4bWPGzoTMeIf3D";
      hoverImageUrl =
        "https://utfs.io/f/aZ7NTMjk7uDe206T2xZtHXa9jznNi07QC3ZLYycRAgOIFvT8"; // Replace with actual hover image URL
      break;
    case 2995767:
      imageUrl =
        "https://utfs.io/f/aZ7NTMjk7uDe75yo2emrYPlv4i6F0joh3dLR1xy2ZnSp58fU";
      hoverImageUrl =
        "https://utfs.io/f/aZ7NTMjk7uDeC4YbUghQa7WpeJZEjBwXM9ugTvnol2H6KDkf"; // Replace with actual hover image URL
      break;
    default:
      imageUrl = "";
      hoverImageUrl = "";
      break;
  }

  // Determine which image to show based on hover state
  const displayedImage = isHovered && hoverImageUrl ? hoverImageUrl : imageUrl;

  return (
    <Image
      src={displayedImage}
      className={cn(
        "object-cover object-center aspect-square transition-transform duration-300",
        itemId === 2995767 && "object-top scale-110"
        // itemId === 2995767 && !isHovered && "object-top scale-150"
      )}
      width={500}
      height={500}
      alt={`Prayse Hoodie`}
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    />
  );
};

export default HoodieImage;
