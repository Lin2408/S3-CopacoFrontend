import {TableCell, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

function ConfiguratorItem({category, index, items, setItems, loading}) {
    const[item, setItem] = useState({});
    const navigate = useNavigate();

    const onClick = () => {
        sessionStorage.setItem('items', JSON.stringify(items));
        navigate('/Items', {state: {category}});
    }
    const onClickRemove = () => {
        setItems(prevItems => {
            const updatedItems = {
                ...prevItems,
                [category]: {}
            };
            sessionStorage.setItem('items', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };
    useEffect(() => {
        if (!loading) {
            const currentItem = items[category] || {};
            setItem(currentItem);
        }
    }, [loading, items]);
  return (
      <>
          <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style={{
                  backgroundColor: index % 2 === 0 ? '#F5FBFD' : 'white',
              }}
          >
              <TableCell component="th" scope="row">
                  {category}
              </TableCell>

              {!item.name ? (
                  <>
                  <TableCell ><button onClick={onClick}>Select {category}</button></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right"></TableCell>
                  </>
              ) : (
                  <>
                      <TableCell>{item.name}</TableCell>
                      <TableCell >€{item.price.toFixed(2)}</TableCell>
                      <TableCell align="right"><button onClick={onClickRemove}>Remove</button></TableCell>
                  </>
              )}
          </TableRow>
      </>

  );
}
export default ConfiguratorItem;