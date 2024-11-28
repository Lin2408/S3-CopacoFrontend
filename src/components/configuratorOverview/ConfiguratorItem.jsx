import {TableCell, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import placeholder from "../../assets/placeholder.png";

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
              key={item.part ? item.part.id : 0}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style={{
                  backgroundColor: index % 2 === 0 ? '#F5FBFD' : 'white',
              }}
          >
              <TableCell component="th" scope="row">
                  {category}
              </TableCell>

              {!item.part ? (
                  <>
                  <TableCell ><button onClick={onClick}>Select {category}</button></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right"></TableCell>
                  </>
              ) : (
                  <>
                      <TableCell><span className="tableName">
                          <img src={item.part.image && !item.part.image.includes('https://inishop.com') ? item.part.image : placeholder} alt="part"/>
                          <p>{item.part.name}</p>
                      </span></TableCell>
                      <TableCell >€{parseFloat(item.part.price).toFixed(2)}</TableCell>
                      <TableCell align="right"><button onClick={onClickRemove}>Remove</button></TableCell>
                  </>
              )}
          </TableRow>
      </>

  );
}
export default ConfiguratorItem;