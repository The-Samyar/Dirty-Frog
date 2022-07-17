import React from 'react'
import './ContactMain.css'

const ContactMain = () => {
    return (
        <div className="ContactMainContainer">
            <div className="leftSection">
                <h3>Get In Touch</h3>
                <p>
                    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                    there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics,
                    a large language ocean.
                </p>
                <form className="form">
                    <div className="inputsContainer">
                        <div className="inputContainer">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" />
                        </div>

                        <div className="inputContainer">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" />
                        </div>
                    </div>
                    <textarea name="" id="" cols="30" rows="10" placeholder="Enter your message"></textarea>
                    <button>Send Message</button>
                </form>
            </div>

            <div className="rightsection">

            </div>
        </div>
    )
}

export default ContactMain