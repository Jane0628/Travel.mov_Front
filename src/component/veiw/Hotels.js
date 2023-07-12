import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [
  {
    id: 1,
    heading: '킹태호텔',
    description: '깨끗한 숙박업소 킹태호텔.',
    imageUrl: 'https://source.unsplash.com/random?wallpapers',
  },
  {
    id: 2,
    heading: '동준신라호텔',
    description: '5성급을 자랑한다 동준신라호텔.',
    imageUrl: 'https://source.unsplash.com/random?nature',
  },
  {
    id: 3,
    heading: '김강현대호텔',
    description: '바다경치는 여기 김강현대호텔.',
    imageUrl: 'https://source.unsplash.com/random?architecture',
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Hotels() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            ></Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
            <Grid container spacing={2}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={4} md={6}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div>
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '70.25%',
                    }}
                    image={card.imageUrl}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.heading}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">예약하기</Button>
                  </CardActions>
                </div>
                </Card>
              </Grid>
            ))}
              </Grid>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}