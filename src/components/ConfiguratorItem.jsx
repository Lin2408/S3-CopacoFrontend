import {TableCell, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

function ConfiguratorItem({category, items, setItems, loading}) {
    const[item, setItem] = useState({});
    const navigate = useNavigate();

    const onClick = () => {
        sessionStorage.setItem('items', JSON.stringify(items));
        navigate('/Items', {state: {category}});
    }
    const onClickRemove = () => {
        console.log(items);
        setItems(prevItems => ({
            ...prevItems,
            [category]: {} // Resetting the item for this category
        }));
    };
    useEffect(() => {
        if (!loading) {
            const currentItem = items[category] || {};
            setItem(currentItem);
            console.log("Setting item for category", category, ":", currentItem);
        }
    }, [loading, items]);
  return (
      <>
          <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
              <TableCell component="th" scope="row">
                  {category}
              </TableCell>

              {!item.name ? (
                  <>
                  <TableCell align="right"><button onClick={onClick}>Select {category}</button></TableCell>
                  </>
              ) : (
                  <>
                      <TableCell align="right">{item.name}</TableCell>
                      <TableCell align="right">{item.price}</TableCell>
                      <TableCell align="right"><button onClick={onClickRemove}>Remove</button></TableCell>
                  </>
              )}
          </TableRow>
      </>

  );
}
export default ConfiguratorItem;