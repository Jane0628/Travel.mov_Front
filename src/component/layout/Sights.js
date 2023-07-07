import React from 'react'
import { useNavigate } from 'react-router';
import '../../design/sights.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const Sights = () => {

  const redirection = useNavigate();

  return (
    <>
      <Card sx={{ maxWidth: 320 }}>
        <CardMedia
          sx={{ height: 250 }}
          image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            여행지명
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
        <CardActions>
          <Button size="small">자세히보기</Button>
          <Button size="small">00000</Button>
        </CardActions>
      </Card>
    </>
  );
}

export default Sights;