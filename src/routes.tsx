import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";

import Header from "./layouts/Header";
import TopPage from "./page/TopPage";
import Contact from "./page/Contact";
import Post from "./page/posts/[id]";

const routes = createBrowserRouter(
  createRoutesFromElements (
    <>
      <Route path='/' element={<Header />}>
        <Route path='/' element={<TopPage/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/posts/:id' element={<Post/>} />
      </Route>
    </>
  )
)

export default routes