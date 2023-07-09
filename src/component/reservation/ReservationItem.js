import { Checkbox, Link, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import React from 'react'

const ReservationItem = ({item}) => {

    const {id, title, date,  img} = item;

  return (
      <List>
            <ListItem
              key={id}
              disablePadding
            >
              <Link to={`ReservationDetail/${id}`}>
                <ListItemAvatar>
                  <Avatar
                    alt={`image ${title}`}
                    src={`${img}`}
                  />
                </ListItemAvatar>
                <ListItemText id={id} primary={`${title} 날짜 ${date}`} />
              </Link>
            </ListItem>
          
      </List>
  );
};

export default ReservationItem