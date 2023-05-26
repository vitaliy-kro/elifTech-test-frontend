import { Button, Grid, TextField, Box, Paper, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { useChosenProducts } from '../../hooks/useChosenProducts';
import { useAddOrdersData } from '../../hooks/useOrders';

export const UserCredentialsForm = () => {
  const { totalPrice, chosenProducts, handleClearCart } = useChosenProducts();
  const { mutate } = useAddOrdersData();

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    address: '',
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    initialValues,
    mode: 'onBlur',
  });

  const onSubmit = async values => {
    await mutate({ ...values, products: chosenProducts, totalPrice });
    handleClearCart();
    reset();
  };

  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
      <Paper elevation={2} sx={{ padding: '16px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ maxWidth: 250 }}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 30 }}
                {...register('name', {
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Min-length is 2' },
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: 'Name can include only letters',
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 30 }}
                {...register('email', {
                  required: 'Please,enter your email',
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: 'Please, enter valid email',
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="phone"
                defaultValue=""
                control={control}
                rules={{ validate: matchIsValidTel }}
                render={({ field, fieldState }) => (
                  <MuiTelInput
                    {...field}
                    defaultCountry="UA"
                    helperText={fieldState.invalid ? 'Phone is invalid' : ''}
                    error={fieldState.invalid}
                    inputProps={{ maxLength: 16 }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                label="Address"
                variant="outlined"
                fullWidth
                {...register('address', {
                  required: 'Please,enter your address',
                  pattern: {
                    value: /^[A-Za-z\s]+,\s[A-Za-z\s]+\s\d+$/,
                    message:
                      'Please, enter valid address in format: City, Street 2',
                  },
                })}
                error={!!errors.address}
                inputProps={{ maxLength: 100 }}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h6">Total: {totalPrice}$</Typography>
              <Button
                type="submit"
                size="large"
                variant="contained"
                disabled={!!Object.keys(errors).length}
              >
                Buy
              </Button>
              <Button
                type="button"
                size="large"
                variant="contained"
                color="error"
                sx={{ mt: 1 }}
                onClick={handleClearCart}
              >
                Clear cart
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};
