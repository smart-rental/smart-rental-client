import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Navbar from '../src/components/Navbar/navbar';
import { ThemeProvider } from "@emotion/react";
import { Provider, useSelector } from "react-redux";
import store from "./Store";
import { customTheme } from "./styles";
import Home from "./pages/Home/home";
import HouseCardMap from "./pages/PropertiesForRent/HouseCardMap/HouseCardMap";
import Houses from "./pages/PropertiesForRent/Houses";
import Issues from "./pages/Issues/Issues";
import AddIssue from "./pages/Issues/AddIssue/addIssue";
import EditIssue from "./pages/Issues/EditIssue/editIssue";
import EditProperty from "./pages/Properties/Property/EditProperty/editProperty";
import AddProperty from "./pages/Properties/Property/AddProperty/addProperty";
import Properties from "./pages/Properties/Properties";
import AddTenant from "./pages/Properties/Tenant/AddTenant/AddTenant";
import EditTenant from "./pages/Properties/Tenant/EditTenant/EditTenant";
import Signup from "./pages/Signup/signup";
import Signin from "./pages/Signin/signin";
import Applications from "./pages/Applications/Applications";
import Profile from "./pages/Profile/Profile";

const App = function () { 
    return (
        <Provider store={store}>
                <BrowserRouter>
                    <ThemeProvider theme={customTheme}>
                        <Navbar/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<Signin/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/house" element={<Houses/>}/>
                            <Route path="/map/:propertyLocation/:propertyId" element={<HouseCardMap/>}/>
                            <Route element={<ProtectedRoutes/>}>
                                <Route path="/landlord/:id" element={<Properties/>}/>
                                <Route path="/addProperty/:id" element={<AddProperty/>}/>
                                <Route path="/editProperty/:ownerId/:propertyId" element={<EditProperty/>}/>
                                <Route path="/addTenant/:ownerId/:propertyId" element={<AddTenant/>}/>
                                <Route path="/editTenant/:ownerId/:propertyId" element={<EditTenant/>}/>
                                <Route path="/issue" element={<Issues/>}/>
                                <Route path="/issue/:propertyId" element={<Issues/>}/>
                                <Route path="/addIssue/:tenantId" element={<AddIssue/>}/>
                                <Route path="/editIssue/:tenantId/:issueId" element={<EditIssue/>}/>
                                <Route path="/applications/:propertyId" element={<Applications/>}/>
                                <Route path="/profile/:ownerId" element={<Profile/>}/>
                            </Route>
                        </Routes>
                    </ThemeProvider>
                </BrowserRouter>
        </Provider>
    );
}

const ProtectedRoutes = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    return isLoggedIn ? <Outlet/> : <Signin/>
}

export default App;