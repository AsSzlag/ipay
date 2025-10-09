import { Box, Paper, Stack } from '@mui/material';
import IpayBg from '@/components/IpayBg';
// import GoBackArrow from '@/components/Application/GoBackArrow';
import ProceedButton from '@/components/Application/ProceedButton';
import LoanParameters from '@/components/Application/LoanParameters';
import AddistionalPriceInfo from '@/components/Application/AddistionalPriceInfo';
import ProgressBarIndividual from '@/components/Application/ProgressBarIndividual';
import PromoMessage from '@/components/Application/PromoMessage';
import ValueSlider from '@/components/Application/ValueSlider';
import ProductCard from '@/components/Application/ProductCard';
import AddAnotherProduct from '@/components/Application/AddAnotherProduct';

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
      </Box>
    </IpayBg>
  );
}
