import { Item } from "@/app/our-products";

import CustomImage from "./custom-image";
import { Badge } from "./ui/badge";
import HoodieImage from "./hoodie-image";
import AddToCart from "./add-to-cart";

export type Variant = {
  id: number;
  productTypeId: number;
  productTypeName: string;
  productId: number;
  appearanceId: number;
  appearanceName: string;
  appearanceColorValue: string;
  sizeId: number;
  sizeName: string;
  sku: string;
  deprecatedSku: string;
  d2cPrice: number;
  imageIds: any[];
  stock: number;
};

const Product = ({ item }: { item: Item }) => {
  const itemImage: { imageUrl: string; appearanceName: string } =
    item.id === 2862748 ? item.images[0] : item.images[1] ?? item.images[0];

  const hoodieIds = [2995762, 3045844, 2995765, 2995767];
  const beanieIds = [3025621, 3041661, 3041663, 3046955];
  const NewBadgeIds = hoodieIds.concat(beanieIds);

  const capIds = [2862594];
  const bagIds = [2862646, 2862654, 2862748];
  const moreIds = [2862752, 2862757];
  return (
    <div className="">
      <div
        className="flex relative flex-col bg-background dark:bg-accent justify-center overflow-hidden duration-500 transition-all"
        key={item.id}
      >
        {NewBadgeIds.includes(item.id) && (
          <Badge
            variant={"outline"}
            className="w-fit absolute top-2 left-2 z-10 bg-background text-primary pt-1 flex items-center justify-center font-semibold"
          >
            NEW
          </Badge>
        )}
        <div className="relative flex items-center justify-center">
          {hoodieIds.includes(item.id) ? (
            <HoodieImage itemId={item.id} />
          ) : (
            <CustomImage image={itemImage} />
          )}
        </div>
      </div>
      <div className="bg-background flex-col flex border-t gap-1 px-4 py-2">
        <h3 className="font-semibold text-foreground text-lg">{item.title}</h3>
        <div className="flex items-center mt-2 mb-1 justify-between">
          <section>
            <span className="text-2xl text-primary font-semibold">
              ${item.variants[0].d2cPrice}
            </span>
          </section>
          <AddToCart item={item} />
        </div>
      </div>
    </div>
  );
};

export default Product;
