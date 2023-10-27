/*page used allow to calculate user prices, page 6 on canva */


import './Pricing.css';
import Navbar from "./Navbar";


export default function Pricing() {
    return (
      <>
        <header>
          <h1>This is a Test Page for Pricing</h1>
        </header>
        <Navbar active='pricing'/>

        <div class="form-container">
        <div class="whitebox">
            <form id="project-formation">
                <h3>Your Hourly Rate</h3>
                <textarea class="hourlyrate" placeholder="Enter your hourly rate"></textarea>
                
                <h3>Number of Hours to Complete Project</h3>
                <textarea class="hourcomplete" placeholder="Enter hours required"></textarea>

                <h3>Materials</h3>
                <textarea class="materials" placeholder="Enter materials cost"></textarea>

                <h3>Tax</h3>
                <textarea class="tax" placeholder="Enter tax percentage"></textarea>

                <h3>Shipping</h3>
                <textarea class="shipping" placeholder="Enter shipping cost"></textarea>

                <h3>Estimated Price for Project</h3>
                <textarea class="estimatedPrice" placeholder="Enter project price"></textarea>
            </form>
        </div>
    </div>
    </>
    )
  }