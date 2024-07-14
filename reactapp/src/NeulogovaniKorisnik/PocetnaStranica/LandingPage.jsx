import React from 'react';
import './vendor/bootstrap/css/bootstrap.min.css';
import './assets/css/animated.css';
import './assets/css/fontawesome.css'; 
import { Link, useNavigate } from 'react-router-dom';

import './assets/css/templatemo-space-dynamic.css';
import { FaPlane, FaChartLine, FaGlobe, FaEnvelope, FaPhone, FaCalendarAlt, FaUser, FaUsers, FaFolder, FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="App"> 
      <div className="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  <div className="left-content header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                    <h6>Welcome to Flight Deals</h6>
                    <h2>We Offer <em>Best Flights</em> &amp; <span>Travel Packages</span></h2>
                    <p>Flight Deals is a professional platform providing the best deals on flights and travel packages. This template is provided by <a rel="nofollow" href="https://templatemo.com/page/1" target="_parent">TemplateMo</a>.</p>
                    <form id="search" action="#" method="GET">
                    
                    </form>
                  </div>
                </div>  
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="about" className="about-us section">
        <div className="container">
          <div className="row"> 
            <div className="col-lg-8 align-self-center">
              <div className="services">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
                      <div className="icon">
                        <FaChartLine size="50px" />
                      </div>
                      <div className="right-text">
                        <h4>Best Deals</h4>
                        <p>Get the best deals on flights and travel packages</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.7s">
                      <div className="icon">
                        <FaPlaneDeparture size="50px" />
                      </div>
                      <div className="right-text">
                        <h4>Convenient Booking</h4>
                        <p>Book your flights and travel packages with ease</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.9s">
                      <div className="icon">
                        <FaPlaneArrival size="50px" />
                      </div>
                      <div className="right-text">
                        <h4>Flexible Dates</h4>
                        <p>Choose the dates that suit you best</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="1.1s">
                      <div className="icon">
                        <FaEnvelope size="50px" />
                      </div>
                      <div className="right-text">
                        <h4>Customer Support</h4>
                        <p>We offer 24/7 customer support for all your needs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="services" className="our-services section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.2s">
              
            </div>
            <div className="col-lg-6 wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.2s">
              <div className="section-heading">
                <h2>Enhance your travel experience with our <em>Exclusive Deals</em> &amp; <span>Packages</span></h2>
                <p>Flight Deals HTML5 template is free to use for your website projects. However, you are not permitted to redistribute the template ZIP file on any CSS template collection websites. Please contact us for more information. Thank you for your kind cooperation.</p>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="first-bar progress-skill-bar">
                    <h4>Flight Availability</h4>
                    <span>84%</span>
                    <div className="filled-bar"></div>
                    <div className="full-bar"></div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="second-bar progress-skill-bar">
                    <h4>Travel Packages</h4>
                    <span>88%</span>
                    <div className="filled-bar"></div>
                    <div className="full-bar"></div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="third-bar progress-skill-bar">
                    <h4>Customer Satisfaction</h4>
                    <span>94%</span>
                    <div className="filled-bar"></div>
                    <div className="full-bar"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 

      <div id="blog" className="our-blog section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.25s">
              <div className="section-heading">
                <h2>Check Out What Is <em>Trending</em> In Our Latest <span>News</span></h2>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.25s">
              <div className="top-dec">
                <img src="assets/images/blog-dec.png" alt="" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.25s">
              <div className="left-image">
                <a href="#"><img src="assets/images/big-blog-thumb.jpg" alt="Travel Blog" /></a>
                <div className="info">
                  <div className="inner-content">
                    <ul>
                      <li><i className="fa fa-calendar"></i> 24 Mar 2023</li>
                      <li><i className="fa fa-users"></i> Flight Deals</li>
                      <li><i className="fa fa-folder"></i> Travel</li>
                    </ul>
                    <a href="#"><h4>Top Travel Destinations in 2023</h4></a>
                    <p>Discover the top travel destinations to visit in 2023 and get the best deals on flights and hotels.</p>
                    <div className="main-blue-button">
                      <a href="#">Read More</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.25s">
              <div className="right-list">
                <ul>
                  <li>
                    <div className="left-content align-self-center">
                      <span><i className="fa fa-calendar"></i> 18 Mar 2023</span>
                      <a href="#"><h4>Travel Tips for First-Time Flyers</h4></a>
                      <p>Essential travel tips for first-time flyers to make their journey smooth and enjoyable.</p>
                    </div>
                    <div className="right-image">
                      <a href="#"><img src="assets/images/blog-thumb-01.jpg" alt="" /></a>
                    </div>
                  </li>
                  <li>
                    <div className="left-content align-self-center">
                      <span><i className="fa fa-calendar"></i> 14 Mar 2023</span>
                      <a href="#"><h4>How to Find the Best Flight Deals</h4></a>
                      <p>Learn how to find the best flight deals and save money on your next trip.</p>
                    </div>
                    <div className="right-image">
                      <a href="#"><img src="assets/images/blog-thumb-01.jpg" alt="" /></a>
                    </div>
                  </li>
                  <li>
                    <div className="left-content align-self-center">
                      <span><i className="fa fa-calendar"></i> 06 Mar 2023</span>
                      <a href="#"><h4>Top Travel Apps for 2023</h4></a>
                      <p>Explore the top travel apps for 2023 to make your travel experience seamless and enjoyable.</p>
                    </div>
                    <div className="right-image">
                      <a href="#"><img src="assets/images/blog-thumb-01.jpg" alt="" /></a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="contact" className="contact-us section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center wow fadeInLeft" data-wow-duration="0.5s" data-wow-delay="0.25s">
              <div className="section-heading">
                <h2>Feel Free To Send Us a Message About Your Travel Needs</h2>
                <p>We are here to help you with all your travel needs. Contact us for any inquiries or support.</p>
                <div className="phone-info">
                  <h4>For any enquiry, Call Us: <span><i className="fa fa-phone"></i> <a href="#">010-020-0340</a></span></h4>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight" data-wow-duration="0.5s" data-wow-delay="0.25s">
              <form id="contact" action="" method="post">
                <div className="row">
                  <div className="col-lg-6">
                    <fieldset>
                      <input type="text" name="name" id="name" placeholder="Name" autoComplete="on" required />
                    </fieldset>
                  </div>
                  <div className="col-lg-6">
                    <fieldset>
                      <input type="text" name="surname" id="surname" placeholder="Surname" autoComplete="on" required />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your Email" required />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <textarea name="message" type="text" className="form-control" id="message" placeholder="Message" required></textarea>
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <button type="submit" id="form-submit" className="main-button ">Send Message</button>
                    </fieldset>
                  </div>
                </div>
                <div className="contact-dec">
                  <img src="assets/images/contact-decoration.png" alt="" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.25s">
              <p>© Copyright 2023 Flight Deals Co. All Rights Reserved.
                <br />Design: <a rel="nofollow" href="https://templatemo.com">TemplateMo</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

