import React from 'react'

const Banner = () => {
    return (
        <div className="banner">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-label="Slide 6"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="6" aria-label="Slide 7"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://cbsnews1.cbsistatic.com/hub/i/2015/08/24/7b3027e3-6c06-4d2f-ba65-8c179c66f50e/istock000039803170medium.jpg" alt="Banner1" className="d-block w-100 baner-imgs"/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://cutewallpaper.org/21/vegetables-wallpapers/Vegetables-Wallpaper-16-2560-X-1600-stmed.net.jpg" alt="Banner2" className="d-block w-100 baner-imgs"/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://cdn.wallpapersafari.com/7/26/byx476.jpg" alt="Banner3" className="d-block w-100 baner-imgs"/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://img.8wallpapers.com/uploads/2019/01/b3792f069a5d4016bff6cdc0.jpg" alt="Banner4" className="d-block w-100 baner-imgs"/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.wallpapertip.com/wmimgs/112-1123523_cool-vegetable-pics-creative-common-fruits-and-vegetables.jpg" alt="Banner5" className="d-block w-100 baner-imgs"/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://cummingstrengthandfitness.com/wp-content/uploads/2016/04/Fruits-And-Vegetables-1080x1920.jpg" alt="Banner6" className="d-block w-100 baner-imgs"/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/fruits_and_vegetables_assortment_other/1800x1200_fruits_and_vegetables_assortment_other.jpg" alt="Banner7" className="d-block w-100 baner-imgs"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner