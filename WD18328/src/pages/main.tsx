import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { TLIST } from '../interface/TLIST';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
  list: TLIST[];
  onDel: (id: number) => void;
};

const Main: React.FC<Props> = ({ list, onDel }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  const handleCheckboxChange = (id: number) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const isAnyItemChecked = Object.values(checkedItems).some(checked => checked);

  return (
    <div>
      <h1 className="display-4 text-center">TO-DO LIST</h1>
      <Table  bordered hover className="text-center">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">CLICK ME</th>
            <th scope="col">LIST</th>
            <th scope="col">AUTHOR</th>
            {isAnyItemChecked && <th scope="col">ACTION</th>}
            <th scope="col">
              <a href="#" className="text-decoration-none">ADD</a>
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id} className={checkedItems[item.id] ? 'table' : ''}>
              <td>{item.id}</td>
              <td>
                <input
                  type="checkbox"
                  checked={checkedItems[item.id] || false}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </td>
              <td className={checkedItems[item.id] ? 'text-decoration-line-through' : ''}>{item.title}</td>
              <td className={checkedItems[item.id] ? 'text-decoration-line-through' : ''}>{item.author}</td>
              {isAnyItemChecked && (
                <td>
                  {checkedItems[item.id] && (
                    <Button variant="outline-danger" onClick={() => onDel(item.id)}>
                      🗑️
                    </Button>
                  )}
                </td>
              )}
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Main;
