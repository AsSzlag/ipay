import { Box, Paper, Stack } from '@mui/material';
import { lazy, Suspense } from 'react';
import IpayBg from '@/components/IpayBg';

// Lazy load Application components
const ProceedButton = lazy(
  () => import('@/components/Application/ProceedButton')
);
const LoanParameters = lazy(
  () => import('@/components/Application/LoanParameters')
);
const AddistionalPriceInfo = lazy(
  () => import('@/components/Application/AddistionalPriceInfo')
);
const ProgressBarIndividual = lazy(
  () => import('@/components/Application/ProgressBarIndividual')
);
const PromoMessage = lazy(
  () => import('@/components/Application/PromoMessage')
);
const ValueSlider = lazy(() => import('@/components/Application/ValueSlider'));
const ProductCard = lazy(() => import('@/components/Application/ProductCard'));
const AddAnotherProduct = lazy(
  () => import('@/components/Application/AddAnotherProduct')
);

type individualLoanProductType = {
  id: string;
  name: string;
  url: string;
  price: number;
  email: string;
};

export default function NewInvidualApplication() {
  const products: individualLoanProductType[] = [
    {
      id: '1',
      name: 'Product 1',
      url: 'https://www.google.com',
      price: 100,
      email: 'product1@gmail.com',
    },
    {
      id: '2',
      name: 'Product 2',
      url: 'https://www.google.com',
      price: 200,
      email: 'product2@gmail.com',
    },
  ];
  return (
    <IpayBg>
      <Box>
        <Suspense fallback={<div>Loading...</div>}>
          <ProgressBarIndividual />
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Box sx={{ flex: 2 }}>
              <Stack spacing={3}>
                <PromoMessage />
                <ValueSlider />
                <Paper>
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                  <AddAnotherProduct />
                </Paper>
                <AddistionalPriceInfo />
              </Stack>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Stack>
                <LoanParameters />
              </Stack>
            </Box>
          </Box>

          <Box>
            {/* <GoBackArrow /> */}
            <ProceedButton />
          </Box>
        </Suspense>
      </Box>
    </IpayBg>
  );
}
