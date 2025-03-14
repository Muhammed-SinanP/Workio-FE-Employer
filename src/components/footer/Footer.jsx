import React from 'react'
import SignFooter from './SignFooter'
import { useNavigate } from "react-router-dom"

import { footerBrandData, footerContactData, footerEmployerData, footerSeekerData } from "../Data";

const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-brand-dark dark:bg-dark-input text-gray-200">

      <div className="inner-div grid grid-cols-12 gap-y-4 p-4 py-10 sm:gap-0" >

        <div className="footer-column">
          <div className="footer-content-container">
            <div className="footer-content-title">Workio</div>
            {footerBrandData.map((element, index) =>
              <div key={index} className="cursor-pointer hover:underline text-xs hover:text-gray-50 dark:text-dark-text dark:hover:text-gray-100">{element.title}</div>
            )}

          </div>
        </div>

        <div className="footer-column">
          <div className="footer-content-container">
            <div className="footer-content-title">For Employers</div>
            {footerEmployerData.map((element, index) =>
              <div key={index} onClick={() => navigate(element.path)} className="cursor-pointer hover:underline dark:text-dark-text  text-xs hover:text-gray-50 dark:hover:text-gray-100">{element.title}</div>)}
          </div>
        </div>

        <div className="footer-column">
          <div className="footer-content-container">
            <div className="footer-content-title">For Job Seekers</div>
            {footerSeekerData.map((element, index) =>
              <div key={index} onClick={() => window.open(element.link)} className="cursor-pointer hover:underline dark:text-dark-text   text-xs hover:text-gray-50 dark:hover:text-gray-100">{element.title}</div>)}
          </div>
        </div>

        <div className="footer-column">
          <div className="footer-content-container">
            <div className="font-semibold text-gray-50  dark:text-gray-200">Contact Us</div>
            {footerContactData.map((element, index) =>
              <div key={index} onClick={() => window.open(element.emailTo)} className="cursor-pointer hover:underline dark:text-dark-text  text-xs hover:text-gray-50 dark:hover:text-gray-100">{element.title}</div>)}
            <div className="  text-xs hover:text-gray-50 dark:text-dark-text dark:hover:text-gray-100">Call us 2255</div>
          </div>
        </div>

      </div>

      <SignFooter />
    </div>
  )
}

export default Footer