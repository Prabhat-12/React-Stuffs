import React, {useState} from 'react';
import "./style.css";
import Menu from './menuApi';
import MenuCards from './MenuCards';
import Navbar from './Navbar';

const uniqueList = [
  ...new Set(
    Menu.map((curElement)=>{
      return curElement.category;
    })
  ),
  "All"
];

console.log(uniqueList);

const Restaurant = () => {
    const [menuData, setMenuData] = useState(Menu);
    const [menuList, setMenuList] = useState(uniqueList);

    const filterItem=(category) =>{

      if(category==="All"){
        setMenuData(Menu);
        return;
      }
      const updatedList = Menu.filter((curElement)=>{
        return curElement.category === category;
      })

      setMenuData(updatedList)
    }

  return (
    <>
        <Navbar filterItem={filterItem} menuList={menuList}/>
        <MenuCards menuData={menuData} />
    </>
  )
};

export default Restaurant;
