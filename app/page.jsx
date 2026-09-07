import Hero from '@/components/home/Hero';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import ProductSection from '@/components/home/ProductSection';
import FlashSale from '@/components/home/FlashSale';
import FeaturedBrands from '@/components/home/FeaturedBrands';
import WhyShopWithUs from '@/components/home/WhyShopWithUs';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';
import {
  getTrendingProducts,
  getFlashSaleProducts,
  getNewArrivals,
  getBestSellers,
} from '@/data/products';

export default function HomePage() {
  const trending = getTrendingProducts();
  const flashSale = getFlashSaleProducts();
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();

  return (
    <>
      <Hero />
      <FeaturedCategories />
      <ProductSection
        title="Trending Now"
        subtitle="Popular picks this week."
        products={trending}
        viewAllHref="/shop"
      />
      <FlashSale products={flashSale} />
      <ProductSection
        title="New Arrivals"
        subtitle="Just landed on Ajo."
        products={newArrivals}
        viewAllHref="/shop?filter=new"
      />
      <FeaturedBrands />
      <ProductSection
        title="Best Sellers"
        subtitle="What everyone is buying."
        products={bestSellers}
        viewAllHref="/shop?filter=bestsellers"
      />
      <WhyShopWithUs />
      <Testimonials />
      <Newsletter />
    </>
  );
}
