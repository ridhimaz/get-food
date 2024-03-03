import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import CustomCard from '../components/CustomCard';
import Footer from '../components/Footer';
export default function Home() {

  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    const response = await fetch("https://get-food-c31i.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const json = await response.json();
    setFoodItem(json[0]);
    setFoodCat(json[1]);
  }
  useEffect(() => {
    loadData();
  }, [])

  return (
    <div>
      <Header />

      <div id="carouselExample" className="carousel slide" style={{ objectFit: "contain" }}>
        <div className="carousel-inner" id="carousel">
          <div className='caption' style={{
            zIndex: "2", position: "absolute", top: "50%",
            left: "50%", width: "70%"
          }}>
            <input id='carousel-input' type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="btn" style={{
              borderColor: "#ff9800",
              color: "rgb(243, 148, 60)"
            }} type="submit">Search</button>
          </div>

          <div className="carousel-item active">
            <img width="80%" src="https://source.unsplash.com/random/3×3?pasta" style={{ filter: "brightness(40%)" }} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item ">
            <img width="80%" src="https://source.unsplash.com/random/3×3?burger" style={{ filter: "brightness(40%)" }} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img width="80%" src="https://source.unsplash.com/random/3×3?pizza" style={{ filter: "brightness(40%)" }} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className='container' style={{minHeight:"72vh"}}>
        {
          foodCat.length !== 0
            ? (foodCat.map((data) => {
              return (
                <div className='row' style={{rowGap: "40px"}} >
                  <div key={data._id} className='fs-3 food-category'style={{marginTop:"50px"}} >
                    {data.CategoryName}
                  </div>
                  <hr />
                  {
                    foodItem.length !== 0
                      ? (foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                        .map((filterItems) => {
                          return <div className='col-lg-4 col-md-6' key={filterItems._id}>
                            <div>
                              <CustomCard key={filterItems.id} foodItems={filterItems} foodOptions={filterItems.options[0]}></CustomCard>
                            </div>
                          </div>
                        }))
                      : ""
                  }
                </div>
              )
            }))
            : ""
        }
      </div>
<Footer/>
    </div >
  )
}
