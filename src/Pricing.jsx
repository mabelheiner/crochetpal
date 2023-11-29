/*page used allow to calculate user prices, page 6 on canva */

import React, { useEffect, useState } from 'react';
import './Pricing.css';
import Navbar from "./Navbar";
import "./index.css";
import Footer from './Footer';

export default function Pricing() {
  const [tax, setTax] = useState("");
  const [shipping, setShipping] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [materials, setMaterialsCost] = useState("");
  const [hours_charged, setHourlyCost] = useState("");
  const [hours, setHours] = useState("");

  useEffect(() => {
    const taxPercentage = parseFloat(tax) || 0;
    const shippingValue = parseFloat(shipping) || 0;
    const materialsCost = parseFloat(materials) || 0;
    const hourlyRate = parseFloat(hours_charged) || 0;
    const hoursToComplete = parseFloat(hours) || 0;
    const taxValue = (taxPercentage / 100) * (hourlyRate * hoursToComplete);
    const estimatedPriceValue = hourlyRate * hoursToComplete + materialsCost + taxValue + shippingValue;
      setEstimatedPrice(estimatedPriceValue.toFixed(2));
      }, [tax, shipping, materials, hours_charged, hours]);

  return (
    <>
      <Navbar active='pricing' />

      <div class="form-container">
        <div class="whitebox">
          
          <form id="project-formation">
            <h3>Your Hourly Rate</h3>
            <textarea
              class="hourlyrate"
              placeholder="Enter your hourly rate"
              value={hours_charged}
              onChange={(e) => setHourlyCost(e.target.value)}
            ></textarea>

            <h3>Number of Hours to Complete Project</h3>
            <textarea
              class="hourcomplete"
              placeholder="Enter hours required"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            ></textarea>

            <h3>Materials</h3>
            <textarea
              class="materials"
              placeholder="Enter materials cost"
              value={materials}
              onChange={(e) => setMaterialsCost(e.target.value)}
            ></textarea>

            <h3>Tax (in percentage)</h3>
            <textarea
              class="tax"
              placeholder="Enter tax percentage"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
            ></textarea>

            <h3>Shipping</h3>
            <textarea
              class="shipping"
              placeholder="Enter shipping cost"
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
            ></textarea>

            <h3>Estimated Price for Project</h3>
            <textarea
              class="estimatedPrice"
              placeholder="Enter project price"
              value={estimatedPrice}
            ></textarea>
          </form>
        
        </div>
      </div>
      <Footer />
    </>
  );
}
