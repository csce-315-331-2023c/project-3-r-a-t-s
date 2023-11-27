import React from 'react';
import { useNavigate } from "react-router-dom";

import { GiFireBowl } from "react-icons/gi";
import { LuVegan, LuWheatOff } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaBagShopping } from "react-icons/fa6";


import './MenuBoard.css'
import { url } from 'inspector';

const MenuBoardGUI = () => {

    const navigate = useNavigate();

    return (
        <div className='menu-board'>
            <div className='menu-home-top-bar'>
                <h1 style={{fontSize: "5vh"}}> 
                <img src="piada-icon.jpg" alt="Piada Icon of a Motor bike." className='icon' onClick={() => navigate('/')}/> &nbsp;
                   <b>PIADA</b>  Italian Street Food
                <button onClick={() => navigate('/CustomerGUI')} className='navigate-buttons' style={{fontSize: "3vh"}}> 
                <FaBagShopping />  &nbsp; Order Online Here!  </button>
                </h1>
            </div> 
{/*             
            <div className='menu-bottom-bar'>
                <h3 style={{textAlign: "center", marginTop: "1vh", fontSize: "2.5vh"}}>
                <IoMdCheckmarkCircleOutline/> Guest Friendly &nbsp;&nbsp;
                <GiFireBowl/> Spicy &nbsp;&nbsp;
                <LuVegan/> Vegan &nbsp;&nbsp;
                <LuWheatOff/> Gluten Favorite
                </h3>
            </div> */}
            <br />

            {/* Piadas */}
            <h2 style={{fontSize: "5vh"}}> <b><u>Hand-Rolled Piadas</u></b></h2>
            <div className='menu-basic-div'>
                <div style={{display:'table-cell', width: "20wh", marginLeft: "5vw", backgroundColor: "wheat", padding: "50px 20px 50px 20px"}}>
                    <img src="https://mypiada.com/assets/menu/avocado-piada-866257202de9cdef0468c118aaa43bb4b23feedc3991fcfdc8bdb4dd3f952e9d.png" 
                    alt="Avocado Piada" style={{width: "15vw", backgroundColor: "white", borderRadius: "50%"}}/>
                    <h3 style={{marginTop: "2vh"}}> <b>Avocado Piada</b>
                    </h3>
                    <h5 style={{padding: "10px 10px 10px 10px", marginLeft: "auto", marginRight: "auto"}}>
                        Italian-style street wrap with pancetta (bacon), arugula, mozzarella, 
                        fresh avocado, sweet corn & tomato, basil aioli
                        <br />
                        <br /> <br /><b>9.89 (880 CAL)</b> 
                        <br /><br /><IoMdCheckmarkCircleOutline size={40}/>
                    </h5>
                </div>

                <div style={{display:'table-cell', width: "20wh", marginLeft: "5vw", padding: "50px 20px 50px 20px"}}>
                    <img src="https://mypiada.com/assets/menu/blt-piada-3b78d80293ced204208f7a02b6c793728da8772f933487c1674d4913abb672b8.png" 
                    alt="BLT Piada" style={{width: "15vw", backgroundColor: "white", borderRadius: "50%"}}/>
                    <h3 style={{marginTop: "2vh"}}> <b>BLT Piada</b>
                    </h3>
                    <h5 style={{padding: "10px 10px 10px 10px", marginLeft: "auto", marginRight: "auto"}}>
                        Italian-style street wrap with pancetta (bacon), romaine, bruschetta tomatoes, creamy parmesan, 
                        basil aioli. Best with crispy chicken
                        <br /> <br />
                        <b>9.29 (680 CAL)</b> 
                    </h5>
                </div>

                <div style={{display:'table-cell', width: "20wh", marginLeft: "5vw", backgroundColor: "wheat", padding: "50px 20px 50px 20px"}}>
                    <img src="https://mypiada.com/assets/menu/chefs-favorite-piada-86ab84da4f231f8014f170d8e45386c98832b5d8f52f9428bedf09c52f2d2445.png" 
                    alt="Avocado Piada" style={{width: "15vw", backgroundColor: "white", borderRadius: "50%"}}/>
                    <h3 style={{marginTop: "2vh"}}> <b>Chef's Favorite Piada</b>
                    </h3>
                    <h5 style={{padding: "10px 10px 10px 10px", marginLeft: "auto", marginRight: "auto"}}>
                        Italian-style street wrap with spicy diavolo sauce, romaine, mozzarella, sweet peppers, spicy ranch 
                        <br />
                        <br /> <br /><b>9.29 (540 CAL)</b> 
                        <br /><br /><GiFireBowl size={40}/>
                    </h5>
                </div>

                <div style={{display:'table-cell', width: "20wh", marginLeft: "5vw", padding: "50px 20px 50px 20px"}}>
                    <img src="https://mypiada.com/assets/menu/mediterranean-piada-b61f796376c2303f1da1934a4756b4e21e0e470b73d704a52693952f3fc43e23.png" 
                    alt="Avocado Piada" style={{width: "15vw", backgroundColor: "white", borderRadius: "50%"}}/>
                    <h3 style={{marginTop: "2vh"}}> <b>Mediterranean Piada</b>
                    </h3>
                    <h5 style={{padding: "10px 10px 10px 10px", marginLeft: "auto", marginRight: "auto"}}>
                        Italian-style street wrap with harissa grain blend, arugula, hummus, cucumber salad, pickled red onions, 
                        bruschetta tomatoes, feta, basil aioli
                        <br /> <br /><b>10.19 (900 CAL)</b> 
                        <br /><br /><IoMdCheckmarkCircleOutline size={40}/>
                    </h5>
                </div>
            </div> 


            {/* Salads */}
            <h2 style={{marginTop: "5vh", fontSize: "5vh"}}> <b><u>Greens & Grains</u></b></h2>
            <div className='menu-basic-div'>
                <div style={{display:'table-cell', width: "20wh", marginLeft: "5vw", backgroundColor: "rgb(153, 195, 153)", padding: "50px 20px 50px 20px"}}>
                    <img src="https://mypiada.com/assets/menu/blt-caesar-73ab2bc938a0ec2f81e3e6cc8358d6efe35812a4b173d8e22c4bf7183fdd7237.png" 
                    alt="DELUXE CAESAR" style={{width: "15vw", backgroundColor: "white", borderRadius: "50%"}}/>
                    <h3 style={{marginTop: "2vh"}}> <b>Deluxe Caesar</b>
                    </h3>
                    <h5 style={{padding: "10px 10px 10px 10px", marginLeft: "auto", marginRight: "auto"}}>
                        Romaine, cabbage & kale blend, parmesan crisps, pancetta (bacon), bruschetta tomatoes, grated parmesan, Caesar dressing
                        <br />
                        <br /> <br />
                        <b>7.69 / 9.99 <br /> (330 CAL / 630 CAL)</b> 
                        <br /><br /><IoMdCheckmarkCircleOutline size={40}/>
                    </h5>
                </div>

                <div style={{display:'table-cell', width: "20wh", marginLeft: "5vw", padding: "50px 20px 50px 20px"}}>
                    <img src="https://mypiada.com/assets/menu/farmers-market-salad-98472bbbfc55555fc8b1c67c6e50bc3f697d48dc7312643504cc57e4af93bb99.png" 
                    alt="Farmer's Market" style={{width: "15vw", backgroundColor: "white", borderRadius: "50%"}}/>
                    <h3 style={{marginTop: "2vh"}}> <b>Farmer's Market</b>
                    </h3>
                    <h5 style={{padding: "10px 10px 10px 10px", marginLeft: "auto", marginRight: "auto"}}>
                        Chopped greens, cabbage & kale blend, strawberries, feta, sweet corn & tomato, fresh avocado, glazed pecans, lemon-basil dressing
                        <br />
                        <br /> <br />
                        <b>98.59 / 10.79 <br /> (380 CAL / 640 CAL)</b> 
                    </h5>
                </div>

                <div style={{display:'table-cell', width: "20wh", marginLeft: "5vw", backgroundColor: "rgb(153, 195, 153)", padding: "50px 20px 50px 20px"}}>
                    <img src="https://mypiada.com/assets/menu/avocado-chop-salad-fd6433d6c5aae85742f5e400536bdd1c8a1572ca18112b0d4a5accb66007c420.png" 
                    alt="Avocado Chop" style={{width: "15vw", backgroundColor: "white", borderRadius: "50%"}}/>
                    <h3 style={{marginTop: "2vh"}}> <b>Avocado Chop</b>
                    </h3>
                    <h5 style={{padding: "10px 10px 10px 10px", marginLeft: "auto", marginRight: "auto"}}>
                        Chopped greens, cabbage & kale blend, sweet corn & tomato, fresh avocado, pickled red onions, shredded parmesan, 
                        spiced almonds, balsamic glaze, creamy basil parmesan dressing
                        <br /> <br />
                        <b>8.49 / 10.89 <br /> (599 CAL / 930 CAL)</b> 
                    </h5>
                </div>

                <div style={{display:'table-cell', width: "20wh", marginLeft: "5vw", padding: "50px 20px 50px 20px"}}>
                    <img src="https://mypiada.com/assets/menu/power-bowl-0f14c26c55ff40a9e44c47aa6d141e92a303785f3800c56f51a5fd72d2d1eded.png" 
                    alt="Power Bowl" style={{width: "15vw", backgroundColor: "white", borderRadius: "50%"}}/>
                    <h3 style={{marginTop: "2vh"}}> <b>Power Bowl</b>
                    </h3>
                    <h5 style={{padding: "10px 10px 10px 10px", marginLeft: "auto", marginRight: "auto"}}>
                        Harissa grain blend, hummus, roasted sweet potatoes, sweet corn & tomato, roasted broccoli, cucumber salad, 
                        pickled red onions, yogurt harissa.
                        <br /> 
                        <br /> <br /><b>11.79 (670 CAL)</b> 
                        <br /><br /><IoMdCheckmarkCircleOutline size={40}/>
                    </h5>
                </div>
            </div> 


            {/* Pastas */}
            <h2 style={{marginTop: "5vh", fontSize: "5vh"}}> <b><u>Tossed Pastas</u></b></h2>
            <div className='menu-basic-div'>
                <div style={{display:'table-cell', width: "20wh", marginLeft: "5vw", backgroundColor: "rgb(221, 169, 169)", padding: "50px 20px 50px 20px"}}>
                    <img src="https://mypiada.com/assets/menu/carbonara-dfa3e8b8715b3ca5791c31430ab90edc61b52470d52eded07c0d394f2854400a.png" 
                    alt="Carbonara Pasta" style={{width: "15vw", backgroundColor: "white", borderRadius: "50%"}}/>
                    <h3 style={{marginTop: "2vh"}}> <b>Carbonara Pasta</b>
                    </h3>
                    <h5 style={{padding: "10px 10px 10px 10px", marginLeft: "auto", marginRight: "auto"}}>
                        Pasta, parmesan alfredo, bruschetta tomatoes, pancetta (bacon), spinach, grated parmesan
                        <br /> <br /><b>8.29 / 10.19 <br />(550 CAL / 1070 CAL)</b> 
                        <br /><br /><IoMdCheckmarkCircleOutline size={40}/>
                    </h5>
                </div>

                <div style={{display:'table-cell', width: "20wh", marginLeft: "5vw", padding: "50px 20px 50px 20px"}}>
                    <img src="https://mypiada.com/assets/menu/diavolo-pasta-6c705f25988e2c773945c5fd250e748b6ab5d3f450c5c2c2111ca5216b31e501.png" 
                    alt="Diavolo Pasta" style={{width: "15vw", backgroundColor: "white", borderRadius: "50%"}}/>
                    <h3 style={{marginTop: "2vh"}}> <b>Diavolo Pasta</b>
                    </h3>
                    <h5 style={{padding: "10px 10px 10px 10px", marginLeft: "auto", marginRight: "auto"}}>
                        Pasta, spicy diavolo sauce, bruschetta tomatoes, chopped green onions, grated parmesan
                        <br />
                        <br /> <br /><b>8.29 / 10.19 <br />(360 CAL / 710 CAL)</b> 
                        <br /><br /><IoMdCheckmarkCircleOutline size={40}/> &nbsp;<GiFireBowl size={40}/>
                    </h5>
                </div>

                <div style={{display:'table-cell', width: "20wh", marginLeft: "5vw", backgroundColor: "rgb(221, 169, 169)", padding: "50px 20px 50px 20px"}}>
                    <img src="https://mypiada.com/assets/menu/basil-pesto-b80576bf0136c757e7fc1185477de6b7fdafd91f0b57e0cc6b164e13abc50180.png" 
                    alt="Basil Pesto Pasta" style={{width: "15vw", backgroundColor: "white", borderRadius: "50%"}}/>
                    <h3 style={{marginTop: "2vh"}}> <b>Basil Pesto Pasta</b>
                    </h3>
                    <h5 style={{padding: "10px 10px 10px 10px", marginLeft: "auto", marginRight: "auto"}}>
                        Pasta, parmesan alfredo, basil pesto, bruschetta tomatoes, grated parmesan
                        <br /> <br /> <br />
                        <b>8.29 / 10.19 <br />(520 CAL / 1130 CAL)</b> 
                    </h5>
                </div>

                <div style={{display:'table-cell', width: "20wh", marginLeft: "5vw", padding: "50px 20px 50px 20px"}}>
                    <img src="https://mypiada.com/assets/menu/roasted-tomato-pomodoro-9cd6475b5130e486bb68ca0bf0e6f5391411852ce9854b40e43c27416552b602.png" 
                    alt="Marinara Pasta" style={{width: "15vw", backgroundColor: "white", borderRadius: "50%"}}/>
                    <h3 style={{marginTop: "2vh"}}> <b>Marinara Pasta</b>
                    </h3>
                    <h5 style={{padding: "10px 10px 10px 10px", marginLeft: "auto", marginRight: "auto"}}>
                        Pasta, housemade tomato sauce, grated parmesan
                        <br /> <br /><br /><br />
                        <b>8.29 / 10.19 <br />(330 CAL / 640 CAL)</b> 
                    </h5>
                </div>
            </div> 

            <br /><br />

            <div className='menu-basic-div'> 



            </div>



            <br /><br />

        <div className='menu-basic-div'
            style={{backgroundColor: "rgb(255, 193, 113)"}}>
        <h2 style={{fontSize: "5vh"}}><b><u>Street Sides</u></b></h2>
        <br />
        <div style={{display: "table", marginLeft: "auto", marginRight: "auto", width: "70vw",}}>
            <div style={{display: "table-cell", width: "40vw"}}>
            <p style={{fontSize: "2.5vh", width: "35vw", marginRight: "2.5vw" }}>
                <b>SWEET CORN SALAD 2.69 (200 CAL) </b><br /><br />
                
                <b>PEPPERONI PIADA STICK 3.49 (840 CAL)</b><br />
                Baked Piada dough with pepperoni, hand-rolled and served with creamy parmesan <br /><br />

                <b>PARMESAN PIADA STICK 3.49 (790 CAL)</b> <br />
                Baked Piada dough with parmesan cheese, hand-rolled and served with creamy parmesan <br /> <br />

                <b>GARLIC DOUGH 1.99 (290 CAL)</b> <br />
                Crispy, small Piada dough baked with mozzarella and extra virgin olive oil  <br /> <br />

                <b>LOBSTER BISQUE 4.39 (250 CAL)</b>   <br />
            </p>
            </div>

            <div style={{display: "table-cell", width: "40vw",}}>
                <p style={{fontSize: "2.5vh", width: "35vw", marginLeft: "2.5vw" }}>
                    <b> CALAMARI & HOT PEPPERS 6.99 (740 CAL)</b> <br /> 
                    Calamari fried with hot peppers and served with housemade tomato dipping sauce <br /><br />

                    <b>GRASS-FED MEATBALLS 3.99 (550 CAL)</b> <br />
                    Three grass-fed beef meatballs rolled with Italian breadcrumbs and topped with housemade tomato sauce and parmesan <br /><br />

                    <b>SWEET STREET ™ COOKIE 2.79 (390 CAL)</b> <br />
                    Pick between a Chocolate Chunk Cookie (390 cal) or a Salted Caramel Cookie (350 cal). Both cookies are certified GMO-free <br /><br />

                    <b>SWEET STREET ™ CHOCOLATE BROWNIE <br /> 2.79 (360 CAL)</b><br />
                    Honduran chocolate brownie with chocolate chips. This decadent brownie is certified non-GMO, gluten free, and made with cage free eggs
                </p>
            </div>
        </div>
        </div >

        <div style={{display: "table", marginLeft: "auto", marginRight: "auto", borderSpacing: "5vw"}}>
        <div className='menu-basic-div' style={{display: "table-cell", width: "35vw"}}>
        <h2 style={{fontSize: "5vh"}}><b><u>Drinks</u></b></h2>
        <br />
        <b style={{fontSize: "2vh"}}>
            BLACKBERRY HIBISCUS LEMONADE  3.79 (130 CAL) <br /><br />
            ITALIAN SODAS AND TEAS  2.99 / 3.49 (250 - 280 CAL) <br /><br />
            SOFT DRINK  2.99 / 3.49 (0 - 270 CAL)<br /><br />
            ACQUA PANNA SPRING WATER  2.99 (0 CAL)<br /><br />
            SAN PELLEGRINO SPARKLING WATER  2.99 (0 CAL)<br /><br />
        </b>
        </div>

        <div className='menu-basic-div' style={{display: "table-cell", width: "35vw"}}>
        <h2 style={{fontSize: "5vh"}}><b><u>Kids Menu (12 & under)</u></b></h2>

        <p style={{fontSize: "2vh"}}>
            <b>All kids meals are served with organic low-fat milk (110 cal), organic chocolate milk (150 cal), or apple juice (90 cal) </b><br /><br />

            <b>KIDS PASTA 6.99 (450 - 1240 CAL)</b><br />
            Pasta with choice of sauce. Choose grilled chicken, crispy chicken or steak and up to four toppings <br /><br />

            <b>KIDS MEATBALLS 6.99 (540 CAL)</b> <br/>
            Grass-fed meatballs topped with marinara sauce and parmesan. Served on pasta <br /><br />

            <b>CHICKEN FINGERS 6.99 (480 CAL)</b><br/>
            Buttermilk marinated crispy chicken tenders served with a side of ketchup
        </p>
        <br />

        </div>
        </div>






            <br /><br /><br /><br />
        </div>
    )

}
export default MenuBoardGUI;

