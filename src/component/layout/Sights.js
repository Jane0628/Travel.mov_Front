import * as React from 'react'
import { useNavigate } from 'react-router';
import '../../design/sights.scss';
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

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://Tramovle.com/">
        Tramovle.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const cards = [1, 2, 3, 4, 5, 6];
const cards = [
  {
    id: 1,
    image : 'https://source.unsplash.com/random?wallpapers',
    place : 'place',
    placeDetail : 'placeDetail'
  },
  {
    id: 2,
    image : 'https://source.unsplash.com/random?nature',
    place : 'place2',
    placeDetail : 'placeDetail2'
  },
  {
    id: 3,
    image : 'https://source.unsplash.com/random?film',
    place : 'place3',
    placeDetail : 'placeDetail3'
  },
  {
    id: 4,
    image : 'https://source.unsplash.com/random?street',
    place : 'place4',
    placeDetail : 'placeDetail4'
  },
  {
    id: 5,
    image : 'https://source.unsplash.com/random?person',
    place : 'place5',
    placeDetail : 'placeDetail5'
  },
  {
    id: 6,
    image : 'https://source.unsplash.com/random?travel',
    place : 'place6',
    placeDetail : 'placeDetail6'
  }

];


export default function Sights() {

  const redirection = useNavigate();

  return (
    <>
      <CssBaseline />
      <main>
        {/* Hero unit */}
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
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              영화 촬영지 추천
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
              실제 영화 촬영지를 방문해보세요~!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">1 action</Button>
              <Button variant="outlined">2 action</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} image={card.image} place={card.place} placeDetail={card.placeDetail} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={card.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2">
                      {card.place}
                    </Typography>
                    <Typography>
                      {card.placeDetail}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <br/>
        <Copyright />
        </Container>
      </main>
    </>
  );
}