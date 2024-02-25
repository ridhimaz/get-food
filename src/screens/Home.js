import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CustomCard from '../components/CustomCard';

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
          <div className='carousel-caption' style={{ zIndex: "2" }}>
            <div className="d-flex justify-content-center" role="search" style={{}}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </div>
          </div>

          <div className="carousel-item active">
            <img width="80%" src="https://source.unsplash.com/random/3×3?indian-food" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item ">
            <img width="80%" src="https://source.unsplash.com/random/3×3?dessert" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img width="80%" src="https://source.unsplash.com/random/3×3?food" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
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

      <div className='container' > 
        {
          foodCat.length !== 0
            ? (foodCat.map((data) => {
              return (
                <div className='row' style={{rowGap:"20px"}} >
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {
                    foodItem.length !== 0
                      ? (foodItem.filter((item) => item.CategoryName === data.CategoryName &&  item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                        .map((filterItems) => {
                          return <div className='col-md-6 col-lg-3' key={filterItems._id}>
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
     
    </div>
  )
}
