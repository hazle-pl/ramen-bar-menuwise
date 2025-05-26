import Layout from '@/components/Layout';
import PlaceOrder from '@/components/PlaceOrder';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const OrderPage = () => {
  const router = useRouter();

  const [tableNumber, setTableNumber] = useState<number | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    const { tableNumber } = router.query;
    if (typeof tableNumber === 'string') {
      const parsed = Number(tableNumber);
      setTableNumber(isNaN(parsed) ? null : parsed);
    } else {
      setTableNumber(null);
    }
  }, [router.isReady, router.query]);

  const restaurantId = process.env.NEXT_PUBLIC_MENUWISE_RESTAURANT_ID;

  return (
    <Layout>
      <PlaceOrder
        restaurantId={restaurantId}
        tableNumber={tableNumber}
      />
    </Layout>
  );
};

export default OrderPage;
