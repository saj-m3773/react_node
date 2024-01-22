import React from 'react';
import Footer from "../Components/Home/Footer/Footer";
import Navbar from "../Components/Home/Navbar/Navbar";
import TopMenu from "../Components/Home/TopMenu/TopMenu";
import about from '../../assets/images/about.webp'

const About = () => {
    return (
        <div>
            <TopMenu />
            <Navbar />
            <div className="about pt-5">
                <div className='container'>
                    <div className="columns">
                        <div className="column">
                               <h1 className='title mb-6 '> از ما بیشتر بدون</h1>
                            <p className='is-size-5'>
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                            </p>
                        </div>
                        <div className="column">
                            <img src={about} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;