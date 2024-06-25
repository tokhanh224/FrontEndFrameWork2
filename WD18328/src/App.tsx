/* eslint-disable @typescript-eslint/no-unused-vars */
import {  Route, Routes } from "react-router";
import "./App.css";
import Main from "./pages/main";
import { useEffect, useState } from "react";
import { TLIST } from "./interface/TLIST";
import instance from "./api/instance";
function App() {
  const [list, setList] = useState<TLIST[]>([]);
  useEffect(() =>{
    (async() =>{
      const {data} = await instance.get(`posts`)
      setList(data)
    } ) ()
  }, [])
  const Delete = (id: number) =>{
    (async() =>{
      const confirmDel = confirm("Xoa ?")
      if(confirmDel){
        await instance.delete(`posts/${id}`)
        setList(list.filter((item) => item.id !== id && item))
      }
    }) ()
  }
  return (
    <>
    <Routes>
      <Route>
        <Route index element={<Main list={list} onDel={Delete}/>} />
      </Route>
    </Routes>
  </>
  )
}

export default App;
